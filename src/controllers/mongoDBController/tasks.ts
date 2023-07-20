import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User, {taskSchema} from '../../models/modelForMongoDB';
import WorkWithFile from '../../workFile';

//create a model 'Task' according to the scheme 'taskSchema'
mongoose.model('Task', taskSchema);

// read a number from a file to create a new ID for new task
let idTodo = WorkWithFile.readIDFromFile();

class TaskControllerDB {
    async getAllTask(req: Request, res: Response) {
        try {
            const userLogin = req.session.login;
            if (userLogin) {
                const user = await User.findOne({ login: userLogin })
                res.send(JSON.stringify({ items: user?.items }))
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
                await User.findOneAndUpdate(
                    { login: userLogin },
                    { $push: { items: { id: idTodo, text: text, checked: false } } },
                    { new: true }
                );
                res.send(JSON.stringify({ id: idTodo }));
                idTodo++;
                WorkWithFile.writeIDToFile(idTodo);
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
                const newTask = { id: id, text: text, checked: true };
                await User.findOneAndUpdate(
                    { login: userLogin, "items.id": id },
                    {
                        $set: {
                            "items.$": newTask
                        }
                    });
                res.send(JSON.stringify({ "ok": true }));
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
                await User.findOneAndUpdate(
                    { login: userLogin, "items.id": id },
                    {
                        $pull: {
                            items: { id: id }
                        }
                    });
                res.send(JSON.stringify({ "ok": true }));
            } else {
                res.status(403).send(JSON.stringify({ "error": "forbidden" }));
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new TaskControllerDB();