use database::connection::establish_connection;
use diesel::prelude::*;

#[derive(QueryableByName, Debug)]
struct FkCheckResult {
    #[diesel(sql_type = diesel::sql_types::Text)]
    table: String,
    #[diesel(sql_type = diesel::sql_types::BigInt)]
    rowid: i64,
    #[diesel(sql_type = diesel::sql_types::Text)]
    parent: String,
    #[diesel(sql_type = diesel::sql_types::Integer)]
    fkid: i32,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Establish connection to the actual database using the default path
    // The key "testpassword123" is commonly used during dev
    let mut conn =
        establish_connection("Runner01").map_err(|e| format!("Failed to connect: {}", e))?;

    println!("Checking foreign keys...");

    // PRAGMA foreign_key_check returns: table, rowid, parent, fkid
    let results: Vec<FkCheckResult> =
        diesel::sql_query("PRAGMA foreign_key_check;").load(&mut conn)?;

    if results.is_empty() {
        println!("No foreign key violations found.");
    } else {
        println!("Found foreign key violations:");
        for res in results {
            println!("{:?}", res);
        }
    }

    Ok(())
}
