import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req?.cookies?.accessToken;
        console.log(req?.cookies)
        console.log("Token:", token); // Log the token

        if (!token) {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }

        // If token exists, then verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is invalid' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("Error",error)
    }
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User:", req.user); // Log the user object

        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: 'You are not authenticated' });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User:", req.user); // Log the user object

        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }
    });
};