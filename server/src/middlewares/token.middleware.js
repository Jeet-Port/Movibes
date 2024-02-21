import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        }
        return false;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Handle token expiration
            return false;
        } else if (error.name === 'JsonWebTokenError') {
            // Handle invalid token
            return false;
        } else {
            // Handle other errors
            return false;
        }
    }
};

    
const auth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || authorizationHeader === 'Bearer null') {
        return responseHandler.unauthorize(res, 'Invalid or missing Bearer token');
    }

    const tokenDecoded = tokenDecode(req);
    
    if (!tokenDecoded) {
        return responseHandler.unauthorize(res, 'Invalid token');
    }

    const user = await userModel.findById(tokenDecoded.data);
    
    if (!user) {
        return responseHandler.unauthorize(res, 'User not found');
    }
    
    req.user = user;
    
    next();
};


export default { auth, tokenDecode };