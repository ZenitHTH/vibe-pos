use database::establish_connection;
use database::product;
use database::stock;
use database::{NewStock, Stock};

#[tauri::command]
pub fn get_stock(key: String, product_id: i32) -> Result<Stock, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    stock::get_stock(&mut conn, product_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_all_stocks(key: String) -> Result<Vec<Stock>, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    stock::get_all_stocks(&mut conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn insert_stock(key: String, product_id: i32, quantity: i32) -> Result<Stock, String> {
    if quantity < 0 || quantity > 1_000_000 {
        return Err("Invalid stock quantity.".to_string());
    }

    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;

    // Fetch product details first
    let product_info = product::find_product(&mut conn, product_id).map_err(|e| e.to_string())?;

    let new_stock = NewStock {
        product_id,
        quantity,
        catagory: &product_info.catagory,
        satang: product_info.satang,
    };
    stock::insert_stock(&mut conn, &new_stock).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_stock(key: String, product_id: i32, quantity: i32) -> Result<Stock, String> {
    if quantity < 0 || quantity > 1_000_000 {
        return Err("Invalid stock quantity.".to_string());
    }

    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    // Pass product_id directly to the DB function
    stock::update_stock(&mut conn, product_id, quantity).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn remove_stock(key: String, stock_id: i32) -> Result<usize, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    stock::remove_stock(&mut conn, stock_id).map_err(|e| e.to_string())
}
