import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Not authenticated',
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: 'Invalid Token',
                success: false
            });
        }

        req.id = decode.userId; // Ensure the 'userId' is passed to req.id
        next();
    } catch (error) {
        console.log(error); // Log the error to help debugging
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default isAuthenticated;