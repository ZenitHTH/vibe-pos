use database::establish_connection;
use database::run_migrations;

#[tauri::command]
pub fn initialize_database(key: String) -> Result<(), String> {
    let mut conn = establish_connection(&key).map_err(|e| e.to_string())?;
    run_migrations(&mut conn).map_err(|e| e.to_string())?;
    Ok(())
}
