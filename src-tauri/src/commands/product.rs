use database::establish_connection;
use database::product;
use database::product::model::ProductWithImage;
use database::{NewProduct, Product};

#[tauri::command]
pub fn get_products(key: String) -> Result<Vec<ProductWithImage>, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    product::get_all_products_with_images(&mut conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn create_product(
    key: String,
    title: String,
    catagory: String,
    satang: i32,
) -> Result<Product, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    let new_prod = NewProduct {
        title: &title,
        catagory: &catagory,
        satang,
    };
    product::insert_product(&mut conn, &new_prod).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_product(
    key: String,
    id: i32,
    title: String,
    catagory: String,
    satang: i32,
) -> Result<Product, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    let prod = Product {
        product_id: id,
        title,
        catagory,
        satang,
    };
    product::update_product(&mut conn, prod).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_product(key: String, id: i32) -> Result<usize, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    product::remove_product(&mut conn, id).map_err(|e| e.to_string())
}
