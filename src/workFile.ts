import fs from 'fs';
import User from './models/modelForFile';

class WorkWithFile {
    idTodo: number = 0;
    readIDFromFile() {
        this.idTodo = Number.parseInt(fs.readFileSync('id.txt', 'utf-8'));
        return this.idTodo
    };

    writeIDToFile(id: number) {
        try {
            fs.writeFileSync('id.txt', id.toString());
        } catch (error) {
            console.log(error)
        }
    }
    readUsersFromFile() {
        try {
            return JSON.parse(fs.readFileSync('usersTasks.json', "utf8"))
        } catch (error) {
            console.log(error)
        }
    };

    addNewUserToFile(newObject: User, users: User[]) {
        try {
            users.push(newObject);
            fs.writeFileSync('usersTasks.json', JSON.stringify(users));
        } catch (error) {
            console.log(error)
        }
    }
    writeNewUserToFile(newObject: User) {
        try {
            let users: User [] = [];
            users.push(newObject);
            fs.writeFileSync('usersTasks.json', JSON.stringify(users));
        } catch (error) {
            console.log(error)
        }
    }

    writeUsersToFile(users: User[]) {
        try {
            fs.writeFileSync('usersTasks.json', JSON.stringify(users));
        } catch (error) {
            console.log(error)
        }
    }

}
export default new WorkWithFile();