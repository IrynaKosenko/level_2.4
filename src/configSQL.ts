import mysql2 from 'mysql2';

// connection to MySQL Workbench (local)

const connection = mysql2.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: process.env.DB_SQL,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD_SQL
});
export default connection;
