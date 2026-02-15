use crate::schema::product_images;
use diesel::prelude::*;

pub mod model {
    use super::*;
    use serde::{Deserialize, Serialize};

    #[derive(Queryable, Selectable, Debug, PartialEq, Serialize, Deserialize)]
    #[diesel(table_name = product_images)]
    #[diesel(check_for_backend(diesel::sqlite::Sqlite))]
    pub struct ProductImage {
        pub product_id: i32,
        pub image_id: i32,
    }

    #[derive(Insertable, Debug, PartialEq, Serialize, Deserialize)]
    #[diesel(table_name = product_images)]
    pub struct NewProductImage {
        pub product_id: i32,
        pub image_id: i32,
    }
}

pub fn link_product_image(
    conn: &mut SqliteConnection,
    prod_id: i32,
    img_id: i32,
) -> Result<model::ProductImage, diesel::result::Error> {
    use crate::schema::product_images::dsl::*;

    let new_link = model::NewProductImage {
        product_id: prod_id,
        image_id: img_id,
    };

    diesel::insert_into(product_images)
        .values(&new_link)
        .returning(model::ProductImage::as_returning())
        .get_result(conn)
}

pub fn unlink_product_image(
    conn: &mut SqliteConnection,
    prod_id: i32,
    img_id: i32,
) -> Result<usize, diesel::result::Error> {
    use crate::schema::product_images::dsl::*;

    diesel::delete(product_images.filter(product_id.eq(prod_id).and(image_id.eq(img_id))))
        .execute(conn)
}

pub fn get_product_images(
    conn: &mut SqliteConnection,
    prod_id: i32,
) -> Result<Vec<model::ProductImage>, diesel::result::Error> {
    use crate::schema::product_images::dsl::*;

    product_images
        .filter(product_id.eq(prod_id))
        .select(model::ProductImage::as_select())
        .load(conn)
}
