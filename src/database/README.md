# Database Module

This module uses TypeORM for database management.

## Setup

1. Install dependencies:
```bash
npm install typeorm mysql2 reflect-metadata
```

2. Create a `.env` file from `.env.dist` and set the database credentials.

## Migrations

- Generate a new migration: `npm run migration:generate -- --name=<MigrationName>`
- Run migrations: `npm run migration:run`
- Revert last migration: `npm run migration:revert`

## Entities

Entities are located in `src/database/entities`.
