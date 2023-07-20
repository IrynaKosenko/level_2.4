import mysql2 from 'mysql2';

// connection to SQL phpMyAdmin DB

const connection = mysql2.createConnection({
    host: 'sql8.freesqldatabase.com',
    port: 3306,
    database: 'sql8632802',
    user: 'sql8632802',
    password: 'T847tCfd86'
});

// connection to MySQL Workbench (local)

// const connection = mysql2.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     database: 'todos',
//     user: 'userIryna',
//     password: ''
// });

export default connection;
