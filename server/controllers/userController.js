const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameExists = await User.findOne({ username });
        
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

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.json({msg: "Incorrect password or username", status: false});
        
        const isPasswordSame = await bcrypt.compare(password, user.password);
        if (!isPasswordSame) return res.json({msg: "Incorrect password or username", status: false});

        console.log(`${username} logged in`);
        delete user.password;
        return res.json({status: true, user});
    } catch (exception) {
        // Next is used to call the next function to call
        next(exception);
    }
};