use crate::schema::images;
use diesel::prelude::*;

pub mod model {
    use super::*;
    use chrono::NaiveDateTime;
    use serde::{Deserialize, Serialize};

    #[derive(Queryable, Selectable, Debug, PartialEq, Serialize, Deserialize)]
    #[diesel(table_name = images)]
    #[diesel(check_for_backend(diesel::sqlite::Sqlite))]
    pub struct Image {
        pub id: i32,
        pub file_name: String,
        pub file_hash: String,
        pub file_path: String,
        pub created_at: NaiveDateTime,
    }

    #[derive(Insertable, Debug, PartialEq, Serialize, Deserialize)]
    #[diesel(table_name = images)]
    pub struct NewImage<'a> {
        pub file_name: &'a str,
        pub file_hash: &'a str,
        pub file_path: &'a str,
    }
}

pub fn insert_image(
    conn: &mut SqliteConnection,
    new_image: &model::NewImage,
) -> Result<model::Image, diesel::result::Error> {
    use crate::schema::images::dsl::*;

    diesel::insert_into(images)
        .values(new_image)
        .returning(model::Image::as_returning())
        .get_result(conn)
}

pub fn get_image(
    conn: &mut SqliteConnection,
    image_id: i32,
) -> Result<model::Image, diesel::result::Error> {
    use crate::schema::images::dsl::*;

    images
        .find(image_id)
        .select(model::Image::as_select())
        .first(conn)
}

pub fn get_image_by_hash(
    conn: &mut SqliteConnection,
    hash: &str,
) -> Result<Option<model::Image>, diesel::result::Error> {
    use crate::schema::images::dsl::*;

    images
        .filter(file_hash.eq(hash))
        .select(model::Image::as_select())
        .first(conn)
        .optional()
}
