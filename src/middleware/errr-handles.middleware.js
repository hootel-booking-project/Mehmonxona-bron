import logger from "../config/winston.config.js"

function dublicateFileError(err){
    if(err?.code === 11000){
        err.status = 409
        err.isException = true
        err.message = `Ushbu "${Object.values(err.keyValue).join(", ")}" qiymatlari allaqachon ishlatilgan`
    }
}



export const ErrorHandlerMiddleware = (err,_,res,__) => {
    logger.info(err)

    err = dublicateFileError(err)
    
    if(err.isException) {
        return res.status(err.status).send({
            message:err.message,
        })
    }
    res.status(500).send({
        message: 'Internal Server Error',
    })
}