const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameExists = await User.findOne({ username });
        // console.log(usernameExists);
        if (usernameExists) {return res.json({msg: "Username already taken", status: false})};
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.json({msg: "Email already in use", status: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({
            username,
            email,
            password: hashedPassword,
        });
        console.log(`${username} successfully registered`);
        delete user.password;
        return res.json({status: true, user});
    } catch (exception) {
        // Next is used to call the next function to call
        next(exception);
    }
};