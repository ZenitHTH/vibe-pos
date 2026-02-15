// @generated automatically by Diesel CLI.

diesel::table! {
    category (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    images (id) {
        id -> Integer,
        file_name -> Text,
        file_hash -> Text,
        file_path -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    product (product_id) {
        product_id -> Integer,
        title -> Text,
        catagory -> Text,
        satang -> Integer,
    }
}

diesel::table! {
    product_images (product_id, image_id) {
        product_id -> Integer,
        image_id -> Integer,
    }
}

diesel::table! {
    receipt_item (id) {
        id -> Integer,
        receipt_id -> Integer,
        product_id -> Integer,
        quantity -> Integer,
    }
}

diesel::table! {
    receipt_list (receipt_id) {
        receipt_id -> Integer,
        datetime_unix -> Integer,
    }
}

diesel::table! {
    stock (stock_id) {
        stock_id -> Integer,
        product_id -> Integer,
        catagory -> Text,
        satang -> Integer,
    }
}

diesel::joinable!(product_images -> images (image_id));
diesel::joinable!(product_images -> product (product_id));
diesel::joinable!(receipt_item -> product (product_id));
diesel::joinable!(receipt_item -> receipt_list (receipt_id));

diesel::allow_tables_to_appear_in_same_query!(
    category,
    images,
    product,
    product_images,
    receipt_item,
    receipt_list,
    stock,
);
