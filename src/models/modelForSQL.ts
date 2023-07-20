import { RowDataPacket } from "mysql2"

export interface IUser extends RowDataPacket {
  login: string
  pass: string
}

export interface ITask extends RowDataPacket {
  id: number
  text: string
  checked: boolean
  login: string   // foreign key
}