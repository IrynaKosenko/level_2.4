import { Request, Response } from 'express';
import { IUser } from '../../models/modelForSQL'
import connection from '../../configSQL'

const createTableUser = `CREATE TABLE IF NOT EXISTS users(
    login varchar(25) not null unique primary key, 
    pass varchar(25) not null)`;

class AutorizationControllerSQL {
    // Here I tried to implement the "Singleton" design pattern.
    private static instance: AutorizationControllerSQL;
    private constructor() { }
    public static getInstance(): AutorizationControllerSQL {
        if (!AutorizationControllerSQL.instance) {
            AutorizationControllerSQL.instance = new AutorizationControllerSQL();
        }
        return AutorizationControllerSQL.instance;
    }

    async login(req: Request, res: Response) {
        const { login, pass } = req.body;
        try {
            const query = 'SELECT * FROM users where login=?';
            connection.query<IUser[]>(query, [login], (err, row) => {
                if (err) console.log(err.message);

                if (row.length == 0) {
                    res.status(401).send({ error: `User '${login}' not found` });
                } else if (row[0].login == login && row[0].pass !== pass) {
                    res.status(401).send({ error: `Incorrect password for user '${login}'` });
                } else {
                    req.session.login = login;
                    res.send(JSON.stringify({ "ok": true }));
                }
            });
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }

    async register(req: Request, res: Response) {
        // create new table if not exist
        connection.query(createTableUser, (err, rows) => {
            if (err) console.log(err.message)
        })
        let userLogin = req.body.login;
        let password = req.body.pass;
        try {
            let query = 'INSERT INTO users (login, pass) VALUES (?,?)';
            connection.query(query, [userLogin, password], (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(400).send({ error: `Such user '${userLogin}' already exist` });
                } else {
                    res.send(JSON.stringify({ "ok": true }));
                }
            });
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }

    logout(req: Request, res: Response) {
        req.session.destroy(err => { })
        res.send(JSON.stringify({ "ok": true }));
    }
}
const autorizationControllerSQL = AutorizationControllerSQL.getInstance();
export default autorizationControllerSQL;