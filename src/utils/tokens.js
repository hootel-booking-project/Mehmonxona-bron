import jwt from "jsonwebtoken"
import jwtConfig from "../config/jwt.config.js"

export async function generateTokens (payload) {
    const accessToken = jwt.sign( {payload}, jwtConfig.ACCESS_TOKEN, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRE })
    const refreshToken = jwt.sign( {payload}, jwtConfig.REFRESH_TOKEN, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRE })
    return { accessToken, refreshToken }
}