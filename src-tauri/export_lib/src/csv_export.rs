use super::ExportTable;
use std::error::Error;
use std::path::Path;

pub fn export_to_csv<P: AsRef<Path>>(table: &ExportTable, path: P) -> Result<(), Box<dyn Error>> {
    let mut wtr = csv::Writer::from_path(path)?;

    // Write headers
    wtr.write_record(&table.headers)?;

    // Write rows
    for row in &table.rows {
        // Convert CellValues to strings for CSV
        let row_strings: Vec<String> = row.iter().map(|cell| cell.to_string()).collect();
        wtr.write_record(&row_strings)?;
    }

    wtr.flush()?;
    Ok(())
}
