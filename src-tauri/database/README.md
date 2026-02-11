# Database Module

This crate `simple-pos-database` manages the data persistence layer for the Simple POS application. It uses **Diesel ORM** with **SQLite** to handle database operations.

## Architecture

The module is structured to separate concerns between connection management and domain-specific logic.

![Architecture Diagram](./mermaid-diagram-2026-02-11-180349.svg)

### Modules

- **lib.rs**: The library entry point.
- **connection.rs**: Handles the SQLite connection pool.
- **Domain Modules**:
  - `product`: Manages product data (barcode, name, price, etc.).
  - `category`: Manages product categories.
  - `stock`: Manages inventory levels for products.
  - `receipt`: Handles sales transactions and receipt generation.

## Database Schema

The following ER diagram illustrates the relationships between the database entities.

![ER Diagram](./mermaid-diagram-2026-02-11-180323.svg)

### Entities

- **CATEGORY**: Groups products.
- **PRODUCT**: Represents individual items for sale.
- **STOCK**: Tracks quantity on hand for each product.
- **RECEIPT**: Records a single sales transaction (payment type, total, timestamp).
- **RECEIPT_LIST**: Line items associated with a receipt (specific products sold, quantity, price at time of sale).

## Development

### Prerequisites

- Rust (latest stable)
- Diesel CLI: `cargo install diesel_cli --no-default-features --features sqlite`

### Setup

1.  Ensure `.env` is configured with `DATABASE_URL`.
2.  Run migrations:
    ```bash
    diesel migration run
    ```
