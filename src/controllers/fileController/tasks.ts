import { Request, Response } from 'express';
import WorkWithFile from '../../workFile';
import User, { Task } from '../../models/modelForFile';

let idTodo = WorkWithFile.readIDFromFile();

class TaskControllerFile {
    async getAllTask(req: Request, res: Response) {
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const dataFromFile: User[] = WorkWithFile.readUsersFromFile();
                if (dataFromFile !== undefined) {
                    const user = dataFromFile.find(el => el.login == userLogin);
                    res.send(JSON.stringify({ "items": user?.items }))
                }
                else {
                    res.status(403).send(JSON.stringify({ "error": "forbidden" }));
                }
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async createNewTask(req: Request, res: Response) {
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const text: string = req.body.text;
                const dataFromFile: User[] = WorkWithFile.readUsersFromFile();
                let userTasks = dataFromFile.find(el => el.login == userLogin)?.items;
                const newTask: Task = { id: idTodo, text: text, checked: false };
                if (userTasks !== undefined && userTasks.length !== 0) {
                    const arrayTaskId: number[] = userTasks.map(el => el.id);
                    while (arrayTaskId.includes(idTodo)) {
                        idTodo++;
                    }
                }
                const newData: User[] = dataFromFile.map((el) => {
                    if (el.login == userLogin) {
                        let newItems: Task[] = el.items;
                        newItems.push(newTask);
                    }
                    return el;
                });
                res.send(JSON.stringify({ id: idTodo }));
                WorkWithFile.writeUsersToFile(newData);
                idTodo++;
                WorkWithFile.writeIDToFile(idTodo);
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    // json { id: 22, text: "...", checked: true } а возвращать { "ok" : true }
    async updateTask(req: Request, res: Response) {
        const { id, text } = req.body;
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const dataFromFile: User[] = WorkWithFile.readUsersFromFile();
                const newData: User[] = dataFromFile.map((el) => {
                    if (el.login == userLogin) {
                        el.items.map(item => {
                            if (item.id == id) {
                                item.text = text;
                                item.checked = true;
                            }
                        })
                    }
                    return el;
                });
                res.send(JSON.stringify({ "ok": true }));
                WorkWithFile.writeUsersToFile(newData);
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
                const dataFromFile: User[] = WorkWithFile.readUsersFromFile();
                const newData = dataFromFile.map((el) => {
                    if (el.login == userLogin) {
                        let a: Task[] = el.items.filter(obj => { return obj.id !== id })
                        el.items = a as [];  // приведення типів !!!!!!
                    }
                    return el;
                });
                WorkWithFile.writeUsersToFile(newData);
                res.send(JSON.stringify({ "ok": true }));
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new TaskControllerFile();