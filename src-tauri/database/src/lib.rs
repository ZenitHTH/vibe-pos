use diesel::prelude::*;
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn run_migrations(
    connection: &mut SqliteConnection,
) -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
    connection.run_pending_migrations(MIGRATIONS)?;
    Ok(())
}

pub mod category;
pub mod connection;
pub mod product;
pub mod receipt;
pub mod schema;
pub mod stock;

pub use category::model::{Category, NewCategory};
pub use connection::{establish_connection, get_database_path};
pub use image::model::{Image, NewImage};
pub use image::{get_image, get_image_by_hash, insert_image};
pub use product::model::{NewProduct, Product};
pub use product_image::model::{NewProductImage, ProductImage};
pub use product_image::{get_product_images, link_product_image, unlink_product_image};
pub use receipt::model::{NewReceipt, NewReceiptList, Receipt, ReceiptList};
pub use stock::model::{NewStock, Stock};

pub mod image;
pub mod product_image;
