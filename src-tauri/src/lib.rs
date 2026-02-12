// 1. Declare the commands module
pub mod commands;

// 2. Import everything you need for the run function
use commands::category::*;
use commands::product::*;
use commands::receipt::*;
use commands::stock::*;

use commands::export::*;
use commands::settings::*;
use commands::database::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|_app| {
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Product Commands
            get_products,
            create_product,
            update_product,
            delete_product,
            // Stock Commands
            get_stock,
            insert_stock,
            update_stock,
            remove_stock,
            // Receipt Commands
            create_invoice,
            add_invoice_item,
            get_invoice_detail,
            get_invoices_by_date,
            // Category Commands
            get_categories,
            create_category,
            update_category,
            delete_category,
            // Export Commands
            export_receipts,
            // Settings Commands
            get_settings,
            save_settings,
            // Database Commands
            initialize_database,
            check_database_exists
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
