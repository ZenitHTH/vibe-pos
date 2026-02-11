use super::{CellValue, ExportTable};
use rust_xlsxwriter::*;
use std::error::Error;
use std::path::Path;

pub fn export_to_xlsx<P: AsRef<Path>>(table: &ExportTable, path: P) -> Result<(), Box<dyn Error>> {
    let mut workbook = Workbook::new();
    let worksheet = workbook.add_worksheet();

    // Headers
    for (i, header) in table.headers.iter().enumerate() {
        worksheet.write(0, i as u16, header)?;
    }

    // Rows
    for (row_idx, row) in table.rows.iter().enumerate() {
        let current_row = (row_idx + 1) as u32;
        for (col_idx, cell) in row.iter().enumerate() {
            let current_col = col_idx as u16;
            match cell {
                CellValue::Text(s) => {
                    worksheet.write(current_row, current_col, s)?;
                }
                CellValue::Number(n) => {
                    worksheet.write(current_row, current_col, *n)?;
                }
                CellValue::Int(n) => {
                    worksheet.write(current_row, current_col, *n)?;
                }
                CellValue::Bool(b) => {
                    worksheet.write(current_row, current_col, *b)?;
                }
                CellValue::None => {} // Do nothing for None
            };
        }
    }

    workbook.save(path)?;
    Ok(())
}
