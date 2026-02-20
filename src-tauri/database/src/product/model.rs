use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize, Debug, Clone)]
#[diesel(table_name = crate::schema::product)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Product {
    pub product_id: i32,
    pub title: String,
    pub category_id: i32,
    pub satang: i32,
}

#[derive(Serialize, Debug, Clone)]
pub struct ProductWithImage {
    #[serde(flatten)]
    pub product: Product,
    pub image_path: Option<String>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::product)]
pub struct NewProduct<'a> {
    pub title: &'a str,
    pub category_id: i32,
    pub satang: i32,
}

/*
Struct Product {
id:i32
Name:String
Category:String
Price Satang : i32
Quantity : i32 }

*/
