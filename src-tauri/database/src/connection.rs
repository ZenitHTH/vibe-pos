use diesel::prelude::*;
use directories::ProjectDirs;
use std::fs;

pub fn establish_connection(key: &str) -> Result<SqliteConnection, String> {
    // Otherwise, determine the system-standard data directory
    // Use "simple-pos" as the app name to match the product name
    let proj_dirs = ProjectDirs::from("", "", "simple-pos").ok_or_else(|| {
        "No valid home directory path could be retrieved from the operating system.".to_string()
    })?;

    let data_dir = proj_dirs.data_dir();

    // Ensure the directory exists
    if !data_dir.exists() {
        fs::create_dir_all(data_dir)
            .map_err(|e| format!("Error creating database directory: {}", e))?;
    }

    let database_path = data_dir.join("database.db");
    let database_url = database_path
        .to_str()
        .ok_or_else(|| "Database path contains invalid unicode".to_string())?;

    let mut conn = SqliteConnection::establish(database_url)
        .map_err(|e| format!("Error connecting to {}: {}", database_url, e))?;

    // Set the encryption key
    // TODO: Replace hardcoded key with a secure source (e.g., config, keyring, or user input)
    diesel::sql_query(format!("PRAGMA key = '{}';", key))
        .execute(&mut conn)
        .map_err(|e| format!("Error setting encryption key: {}", e))?;

    Ok(conn)
}
