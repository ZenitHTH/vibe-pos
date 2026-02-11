# Tauri Backend Architecture

This directory contains the Rust backend for the Simple POS application, built with Tauri v2.

## Architecture

![Backend Architecture](./mermaid-diagram-2026-02-11-180408.svg)

## Structure

- **`src/`**: Core Rust source files (`main.rs`, `lib.rs`, `commands/`).
- **`database/`**: Local crate for database interactions (Diesel ORM).
- **`export_lib/`**: Local crate for handling data exports.
- **`tauri.conf.json`**: Tauri configuration file.
