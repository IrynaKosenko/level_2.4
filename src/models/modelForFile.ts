
export  type Task = {
    id: number,
    text: string,
    checked: boolean
}

type User = {
    login: string,
    pass: string,
    items: [Task] | []
}
export default User;