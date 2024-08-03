const { jwtDecode } = require('jwt-decode');
const db = require('../models');
const User = db.users;

const decodeAccessToken = (accessToken) => {
    try {
        let decodedToken = jwtDecode(accessToken);
        console.log('decodedToken -> ', decodedToken)
        return decodedToken;
    } catch {
        return null;
    }
};

const extractMobileFromAccessToken = (accessToken) => {
    const decodedToken = decodeAccessToken(accessToken);
    console.log('decodedToken->', decodedToken)
    return decodedToken?.phone_number || null;
};

const getUserDetails = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization.split(' ')[1];

        try {
            if (!accessToken) {
                return res.status(203).json({ msg: 'Access Token is required' });
            }

            let mobile = extractMobileFromAccessToken(accessToken);
            console.log('mobile -> ', mobile, accessToken)
            if (!mobile) {
                return res.status(400).json({ msg: 'Phone number is required' });
            }
            const userData = await User.findOne({ where: { mobile } });
            if (!userData) {
                return res.status(203).json({ msg: 'User not found' });
            }
            const response = {
                data: userData
            };
            res.status(200).json(response);
        } catch (error) {
            res.status(203).json({ msg: 'User Not Found' });
        }
    }
};

const saveUserDetails = async (req, res) => {
    const { mobile, name, address } = req.body;

    try {
        await User.create({
            mobile,
            name,
            address,
            isAdmin: false
        });
        res.status(201).json({ msg: 'User Registered Successfully !!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(203).json({ msg: 'Internal Server Error' });
    }
};

module.exports = {
    getUserDetails,
    saveUserDetails
};
