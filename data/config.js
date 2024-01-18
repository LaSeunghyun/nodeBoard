export const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1234", // mysql 초기 설정한 비밀번호
  DB: "lashnode",
  dialect: "mysql",
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
