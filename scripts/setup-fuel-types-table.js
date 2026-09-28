const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupFuelTypesTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_DATABASE || 'drinks_db',
  });

  try {
    console.log('Creating fuel_types table...');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS fuel_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ fuel_types table created successfully');
  } catch (error) {
    console.error('❌ Error creating fuel_types table:', error);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

setupFuelTypesTable();
