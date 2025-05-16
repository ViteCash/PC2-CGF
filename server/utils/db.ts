import mysql from 'mysql2/promise'

export async function getConnection() {
    return await mysql.createConnection({
        host: process.env.DATABASE_HOST || 'hopper.proxy.rlwy.net',
        port: parseInt(process.env.DATABASE_PORT || '4000'),
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'password',
        database: process.env.DATABASE_NAME || 'railway'
    })
}
