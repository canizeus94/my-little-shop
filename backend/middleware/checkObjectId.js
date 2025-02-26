//@ts-check
import { isValidObjectId } from "mongoose";

/*
 * Checks if the provided ID is a valid MongoDB ObjectId.
 *******************************************************************************
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @throws {Error} - Throw error if the ObjectId is not valid.
 ********************************************************************************
*/

function checkObjectId(req, res, next){
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error(`The Object Id: ${req.params.id} is not a valid Object Id.`);
    }
    next();
}

export default checkObjectId;
