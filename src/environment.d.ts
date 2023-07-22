export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_MONGO: string;
      PORT: number;
      DB_SQL:string;
      USER_SQL:string;
      PASSWORD_SQL:string;
    }
  }
}


