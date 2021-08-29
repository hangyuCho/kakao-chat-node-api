module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PW,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_TYPE,
};
