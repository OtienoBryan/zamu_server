const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupOmcsTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_DATABASE || 'drinks_db',
  });

  try {
    console.log('Creating omcs table...');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS omcs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NULL,
        contact VARCHAR(50) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ omcs table created successfully');
  } catch (error) {
    console.error('❌ Error creating omcs table:', error);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

setupOmcsTable();
