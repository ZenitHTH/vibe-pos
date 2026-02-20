use database::establish_connection;
use database::receipt;
use database::stock;
use database::{NewReceipt, Receipt, ReceiptList};

#[tauri::command]
pub fn create_invoice(key: String) -> Result<ReceiptList, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    // Create a new header with "Now" timestamp (None)
    receipt::create_receipt_header(&mut conn, None).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn add_invoice_item(
    key: String,
    receipt_id: i32,
    product_id: i32,
    quantity: i32,
) -> Result<Receipt, String> {
    if quantity <= 0 || quantity > 1_000_000 {
        return Err("Invalid quantity.".to_string());
    }

    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;

    // Fetch product to get the current price (satang)
    use database::product;
    let product_info = product::find_product(&mut conn, product_id).map_err(|e| e.to_string())?;

    let item = NewReceipt {
        receipt_id,
        product_id,
        quantity,
        satang_at_sale: product_info.satang,
    };
    let saved_item = receipt::add_item(&mut conn, &item).map_err(|e| e.to_string())?;

    // Update stock
    if let Ok(current_stock) = stock::get_stock(&mut conn, product_id) {
        let new_qty = current_stock.quantity - quantity;
        let _ = stock::update_stock(&mut conn, product_id, new_qty).map_err(|e| e.to_string())?;
    }

    Ok(saved_item)
}

#[tauri::command]
pub fn get_invoice_detail(
    key: String,
    receipt_id: i32,
) -> Result<(ReceiptList, Vec<Receipt>), String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    receipt::get_full_receipt(&mut conn, receipt_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_invoices_by_date(
    key: String,
    start_unix: i64,
    end_unix: i64,
) -> Result<Vec<ReceiptList>, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    receipt::find_headers_by_date_range(&mut conn, start_unix, end_unix).map_err(|e| e.to_string())
}
