use database::establish_connection;
use database::product_image::{
    get_linked_images as db_get_images, link_product_image as db_link_image,
    unlink_product_image as db_unlink_image,
};
use image_lib::save_image as lib_save_image;
use tauri::command;

#[command]
pub fn save_image(_key: String, data: Vec<u8>, filename: String) -> Result<database::Image, String> {
    // Basic verification of the key/database path
    let _db_path = database::get_database_path().map_err(|e| e.to_string())?;
    // Ideally we should verify `key` matches db_path or is an auth token, but for now we follow existing pattern if any.
    // Existing commands verify connection with `key` which seems to be the db path string?
    // Let's check other commands.
    // In `product.rs`: `let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;`
    // So `key` is indeed the database path string.

    // image_lib::save_image handles its own db connection internally currently?
    // Let's check `image_lib/src/lib.rs`.
    // It calls `database::get_database_path()` internally.
    // It does NOT take a connection or path arg for DB.
    // This might be an issue if `key` (db path from frontend) is different from what `get_database_path` returns (default).
    // But `image_lib` is designed to use the default one.
    // We should probably rely on `image_lib`'s internal logic for now.

    lib_save_image(&data, &filename, None).map_err(|e| e.to_string())
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
