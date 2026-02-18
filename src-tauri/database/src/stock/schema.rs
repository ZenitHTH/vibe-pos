diesel::table! {
    stock (stock_id) {
        stock_id -> Integer,
        product_id -> Integer,
        catagory -> Text,
        satang -> Integer,
        quantity -> Integer,
    }
}
