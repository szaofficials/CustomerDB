const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const AddCustomerSchema = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");
const authMiddleware= require("../middlewares/authMiddleware");
const customerController = require('../controllers/customerController');


// router.get('/', (req, res) => {
//     res
//         .status(200)
//         .send('Hello, This is the server page by router page!'); // Respond with "Hello, world!" for requests to the root URL
// });


router.route("/").get(authController.home);


// customers list
router.route("/customers").get(customerController.customers);

 // Route for deleting a customer
router.route("/deleteCustomer/:c_id").delete(customerController.deleteCustomer);


router.route("/checkCustomerExists/:c_id").get(customerController.checkCustomerExists);



router.route("/AddCustomer").post(
    validate(AddCustomerSchema),
    customerController.AddCustomer
);




router.route("/login").post(authController.login);







// this route is for creating users


// post
router.route("/adduser").post(authController.adduser);


// get
router.route("/user").get(authMiddleware, authController.user);






module.exports = router;


