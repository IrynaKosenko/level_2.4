import { Request, Response } from 'express';
import connection from '../../configSQL'
import { ITask } from '../../models/modelForSQL'

const createTableTask = `CREATE TABLE IF NOT EXISTS tasks(
    id integer not null AUTO_INCREMENT primary key, 
    text varchar(100) not null unique, 
    checked boolean,
    login varchar(25),
    foreign key (login) references users(login))`;

class TaskControllerSQL {
    // Here I tried to implement the "Singleton" design pattern.
    private static instance: TaskControllerSQL;
    private constructor() { }
    public static getInstance(): TaskControllerSQL {
        if (!TaskControllerSQL.instance) {
            TaskControllerSQL.instance = new TaskControllerSQL();
        }
        return TaskControllerSQL.instance;
    }

    async getAllTask(req: Request, res: Response) {
        // create new table if not exist
        connection.query(createTableTask, (err, rows) => {
            if (err) console.log(err.message)
        })
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const query = 'SELECT * FROM tasks where login=?';
                connection.query<ITask[]>(query, [userLogin], (err, result) => {
                    if (err) console.log(err.message)
                    else {
                        res.send(JSON.stringify({ items: result }));
                    }
                });
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async createNewTask(req: Request, res: Response) {
        try {
            const { text } = req.body;
            const userLogin = req.session.login;
            if (userLogin) {
                let query = 'INSERT INTO tasks (text, checked, login) VALUES (?,?,?)';
                connection.query<ITask[]>(query, [text, 0, userLogin], (err, row) => {
                    if (err) console.log(err.message);
                    query = 'SELECT id FROM tasks where text=?';
                    connection.query<ITask[]>(query, [text], (err, task) => {
                        if (err) console.log(err.message);
                        res.send(JSON.stringify({ id: task[0].id }));
                    });
                });
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id, text } = req.body;
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                let query = 'UPDATE tasks SET text=?, checked=1 WHERE id =?';
                connection.query<ITask[]>(query, [text, id], (err, row) => {
                    if (err) console.log(err.message);
                    res.send(JSON.stringify({ "ok": true }));
                });
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async deleteOne(req: Request, res: Response) {
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const { id } = req.body;
                let query = 'DELETE FROM tasks WHERE id=?';
                connection.query<ITask[]>(query, [id], (err, row) => {
                    if (err) console.log(err.message);
                    res.send(JSON.stringify({ "ok": true }));
                });
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
const taskControllerSQL = TaskControllerSQL.getInstance();
export default taskControllerSQL;