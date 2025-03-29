import { config } from "dotenv";

config();

const jwtConfig = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
};

export default jwtConfig;
