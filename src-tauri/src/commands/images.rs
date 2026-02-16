use database::establish_connection;
use database::product_image::{
    get_linked_images as db_get_images, link_product_image as db_link_image,
    unlink_product_image as db_unlink_image,
};
use image_lib::save_image as lib_save_image;
use tauri::command;

#[command]
pub fn save_image(key: String, data: Vec<u8>, filename: String) -> Result<database::Image, String> {
    let settings = super::settings::get_settings().map_err(|e| e.to_string())?;
    let target_dir = settings.image_storage_path.map(std::path::PathBuf::from);
    lib_save_image(&data, &filename, target_dir.as_deref(), &key).map_err(|e| e.to_string())
}

#[command]
pub fn link_product_image(
    key: String,
    product_id: i32,
    image_id: i32,
) -> Result<database::product_image::model::ProductImage, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    db_link_image(&mut conn, product_id, image_id).map_err(|e| e.to_string())
}

#[command]
pub fn unlink_product_image(key: String, product_id: i32, image_id: i32) -> Result<usize, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    db_unlink_image(&mut conn, product_id, image_id).map_err(|e| e.to_string())
}

#[command]
pub fn get_product_images(
    key: String,
    product_id: i32,
) -> Result<Vec<database::image::model::Image>, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    db_get_images(&mut conn, product_id).map_err(|e| e.to_string())
}
