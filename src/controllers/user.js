import { hash as _hash, compare } from "bcryptjs";
import User, { findOne } from "../models/user";
import { sign } from "jsonwebtoken";

export function createUser(req, res, next) {
    _hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    message: "User created",
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    message: "signup failed"
                })
            })
    });
}
export function userLogin(req, res, next) {
    let fetchedUser;
    findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "auth failed"
                })
            }
            fetchedUser = user;
            return compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "auth failed"
                });
            }
            const token = sign({ email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h',
                });
            res.status(200).json({
                message: "log in successfully",
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            })

        })
        .catch(err => {
            return res.status(401).json({
                message: "auth failed"
            })
        })
}