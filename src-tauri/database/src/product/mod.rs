pub mod model;
pub mod schema;

use crate::product::model::{NewProduct, Product};
use crate::schema::product as product_schema;
use diesel::prelude::*;
use diesel::result::Error;

// FIX: Return Result<Product, Error> instead of ()
pub fn insert_product(conn: &mut SqliteConnection, newprod: &NewProduct) -> Result<Product, Error> {
    diesel::insert_into(product_schema::table)
        .values(newprod)
        .returning(Product::as_returning())
        .get_result(conn)
    // FIX: Removed .expect(), letting the caller handle the error
}

pub fn remove_product(conn: &mut SqliteConnection, id: i32) -> Result<usize, Error> {
    diesel::delete(product_schema::dsl::product.find(id)).execute(conn)
}

pub fn get_all_products(conn: &mut SqliteConnection) -> Result<Vec<Product>, Error> {
    product_schema::table.load::<Product>(conn)
}
pub fn update_product(conn: &mut SqliteConnection, prod: Product) -> Result<Product, Error> {
    use product_schema::dsl::{catagory, product as product_dsl, product_id, satang, title};

    diesel::update(product_dsl.find(prod.product_id))
        .set((
            product_id.eq(prod.product_id),
            title.eq(prod.title),
            catagory.eq(prod.catagory),
            satang.eq(prod.satang),
        ))
        .returning(Product::as_returning())
        .get_result(conn)
}

pub fn find_product(conn: &mut SqliteConnection, id: i32) -> Result<Product, Error> {
    product_schema::table.find(id).first(conn)
}

pub fn get_all_products_with_images(
    conn: &mut SqliteConnection,
) -> Result<Vec<crate::product::model::ProductWithImage>, Error> {
    use crate::product::model::ProductWithImage;
    use crate::schema::images;
    use crate::schema::product_images;
    use std::collections::BTreeMap;

    let raw_data = product_schema::table
        .left_join(
            product_images::table.on(product_schema::product_id.eq(product_images::product_id)),
        )
        .left_join(images::table.on(product_images::image_id.eq(images::id)))
        .select((product_schema::all_columns, images::file_path.nullable()))
        .load::<(Product, Option<String>)>(conn)?;

    let mut products_map: BTreeMap<i32, ProductWithImage> = BTreeMap::new();

    for (prod, img_path) in raw_data {
        products_map
            .entry(prod.product_id)
            .or_insert(ProductWithImage {
                product: prod,
                image_path: img_path,
            });
    }

    Ok(products_map.into_values().collect())
}
