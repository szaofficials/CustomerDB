const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to handle user login
const login = async (req, res) => {
    try {
        const { c_id, password } = req.body;
        const user = await User.findOne({ c_id });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid Customer ID or password.' });
        }

        if (user) {
            // Generate and send token if login is successful and pass in the variable mentioned below
            // const token = await user.generateToken();
            // token: token,

            res.status(200).json({
                msg: "Login Successful",
               token : await user.generateToken(),
                userId: user.c_id
            });


        } else {
            res.status(401).json({ message: "Login page ke controller logic me error hai " })
        }


        // const token = jwt.sign({ userId: user.c_id }, process.env.JWT_SECRET);
        // res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};







const home = async (req, res) => {
    try {
        res
            .status(200)
            .send('Hello, This is the server page by controller page!' // Respond with "Hello, world!" for requests to the root URL
            );

    } catch (error) {
        console.log(error);
    }
};



// *--------------------------------
// * Logic for adding New User
// *---------------------------------

// Code for creating user in the database user folder or collection

const adduser = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, c_id, password, isAdmin } = req.body;



        // Create a new user object using the User model
        const newUser = new User({
          name,
          c_id,
          password,
          isAdmin 
        });

        // Save the new user object to the database
        const savedUser = await User.create(newUser);


       res.status(201).json(savedUser);

       //adding user with token
        // res.status(201).json({ msg: "user Added Successfully", token: await savedUser.generateToken(), userId: savedUser.c_id }); 


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server unable to create user Error' });
    }
};






//For testing the controller and routers
const user = async (req, res) => {
    try {

        const userData = req.user;

        // console.log(userData);
        res
        .status(200)
        .json({userData} 
        );

    } catch (error) {
        res.status(400).send({ message: `error from the user route ${error}` })
    }
};



module.exports = { home, login, user, adduser };