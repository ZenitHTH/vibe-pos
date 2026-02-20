CREATE TABLE customer (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tax_id TEXT,
    address TEXT
);
ALTER TABLE receipt_list
ADD COLUMN customer_id INTEGER REFERENCES customer(id);