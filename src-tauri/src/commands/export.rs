use chrono::DateTime;
use database::establish_connection;
use database::product;
use database::receipt::{self, model::ReceiptList};

use export_lib::{CellValue, ExportTable};
use std::path::PathBuf;
use tauri::command;

#[command]
pub fn export_receipts(
    key: String,
    export_path: String,
    format: String,
    start_date: i64,
    end_date: i64,
) -> Result<String, String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;

    // 1. Fetch Receipts in range
    // Note: We need to implement get_invoices_by_date logic here or reuse it
    // For simplicity, let's fetch headers first
    let headers: Vec<ReceiptList> =
        receipt::find_headers_by_date_range(&mut conn, start_date, end_date)
            .map_err(|e| e.to_string())?;

    // 2. Fetch all products for lookup (optimization: lookup map)
    let products = product::get_all_products(&mut conn).map_err(|e| e.to_string())?;

    // 3. Prepare Export Table
    let table_headers = vec![
        "Receipt ID".to_string(),
        "Date".to_string(),
        "Product Name".to_string(),
        "Quantity".to_string(),
        "Price".to_string(),
        "Total".to_string(),
    ];
    let mut export_table = ExportTable::new(table_headers);

    for header in headers {
        let items = receipt::get_full_receipt(&mut conn, header.receipt_id)
            .map_err(|e| e.to_string())?
            .1; // .1 is the items vector

        let date_str = DateTime::from_timestamp(header.datetime_unix, 0)
            .unwrap_or_default()
            .format("%Y-%m-%d %H:%M:%S")
            .to_string();

        for item in items {
            let product_name = products
                .iter()
                .find(|p| p.product_id == item.product_id)
                .map(|p| p.title.clone())
                .unwrap_or_else(|| format!("Unknown Product {}", item.product_id));

            let price = products
                .iter()
                .find(|p| p.product_id == item.product_id)
                .map(|p| p.satang as f64 / 100.0)
                .unwrap_or(0.0);

            let total = price * item.quantity as f64;

            let row = vec![
                CellValue::Int(header.receipt_id as i64),
                CellValue::Text(date_str.clone()),
                CellValue::Text(product_name),
                CellValue::Int(item.quantity as i64),
                CellValue::Number(price),
                CellValue::Number(total),
            ];
            export_table.add_row(row);
        }
    }

    // 4. Export
    let path = PathBuf::from(&export_path);
    match format.as_str() {
        "csv" => export_table.export_csv(&path).map_err(|e| e.to_string())?,
        "xlsx" => export_table.export_xlsx(&path).map_err(|e| e.to_string())?,
        // "ods" => {
        //     export_table.export_ods(&path).map_err(|e| e.to_string())?
        // }
        _ => return Err("Unsupported format".to_string()),
    }

    Ok("Export successful".to_string())
}
