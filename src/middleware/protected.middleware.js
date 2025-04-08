import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";
import { BaseException } from "../exception/base.exception.js";

export const Protected = (isProtected) => {
  return (req, res, next) => {
    if (!isProtected) {
      req.role = "VIEWER";
      return next();
    }

    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.redirect("/customers/login");
    }

    if (!accessToken) {
      const data = jwt.verify(refreshToken, jwtConfig.REFRESH_TOKEN);

      const newAccessToken = jwt.sign(data, jwtConfig.ACCESS_TOKEN, {
        expiresIn: +jwtConfig.ACCESS_TOKEN_EXPIRE * 1000,
        algorithm: "HS256",
      });

      const newRefreshToken = jwt.sign(data, jwtConfig.REFRESH_TOKEN, {
        expiresIn: +jwtConfig.REFRESH_TOKEN_EXPIRE * 1000,
        algorithm: "HS256",
      });

      res.cookie("accessToken", newAccessToken, {
        maxAge: +jwtConfig.ACCESS_TOKEN_EXPIRE * 1000,
      });

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: +jwtConfig.REFRESH_TOKEN_EXPIRE * 1000,
      });

      return res.redirect(req.url);
    }

    try {
      const decodedData = jwt.verify(accessToken, jwtConfig.ACCESS_TOKEN);

      req.role = decodedData.role;
      req.user = decodedData.user;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(new BaseException("Token muddati eskirgan", 406));
      } else if (err instanceof jwt.JsonWebTokenError) {
        return next(
          new BaseException("JWT token xato formatda yuborildi", 400)
        );
      } else if (err instanceof jwt.NotBeforeError) {
        return next(new BaseException("Not Before Error", 409));
      } else {
        next(err);
      }
    }
  };
};
