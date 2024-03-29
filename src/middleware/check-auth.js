import { verify } from "jsonwebtoken";

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verify(token, process.env.JWT_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({
            message: "Auth failed"
        })
    }

}