const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    auth: async (req, res, next) => {
        try {
            const {authorization} = req.headers;

            console.log ('token :', authorization);
            if (!authorization) {
                return res.status(401).json({
                    status: false,
                    message: 'token tidak ada',
                    data: null
                });
            }

            const data = await jwt.verify(authorization, JWT_SECRET_KEY);
            req.user = {
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email
            };
            next();

        } catch (e) {
            next (e);
        }
    }
}