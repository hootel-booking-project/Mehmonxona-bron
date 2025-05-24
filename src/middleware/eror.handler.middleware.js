import { BaseException } from '../exception/base.exception.js';
import logger from '../config/winston.config.js';

function dublicateFileError(err) {
    if (err?.code === 11000) {
        return new BaseException(`Ushbu "${Object.values(err.keyValue).join(", ")}" qiymatlari allaqachon mavjud`,409)
    }
    return err;
}

function castErrorHandler(err) {
    if (err.name === 'CastError') {
        return new BaseException(`Noto'gri tipdagi qiymat: ${err.value}`,400)
    }
    return err;
}

function mongoServerErrorHandler(err) {
    if (err.name === 'MongoServerError') {
        return new BaseException(`MongoDB server xatosi: ${err.message}`,500)
    }
    return err;
}

export const ErrorHandlerMiddleware = (err, _, res, __) => {
    console.log("error=>", err);
    
    if (err instanceof Error) {
        logger.error(err.message);
    } else {
        logger.error(err);
    }

    err = dublicateFileError(err);
    err = castErrorHandler(err);
    err = mongoServerErrorHandler(err);

    if (err.isException) {
        return res.status(err.status).send({
            message: err.message,
        });
    }

    res.status(500).send({
        message: 'Internal Server Error',
    });
};
