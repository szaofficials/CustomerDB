const { z } = require("zod");
const Customer = require('../models/customerModel');

const AddCustomerSchema = z.object({
    adrNumber: z
        .string({ required_error: "Aadhaar Number is required " })
        .trim()
        .min(12, { message: "Aadhaar Number must be 12 digits" })
        .max(12, { message: "Aadhaar Number must not be only more than 12 digits" }),

    c_id: z
        .string({ required_error: "Customer ID is required " })
        .trim()
        .min(4, { message: "Customer ID must be 4 digits" })
        .max(4, { message: "Customer ID must be only 4 digits" }),

    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast of 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars" }),

    gender: z.enum(Customer.schema.path('gender').enumValues),

    relation: z.enum(Customer.schema.path('relation').enumValues),


    relationshipName: z
        .string({ required_error: "Relative Name is required" })
        .trim()
        .min(3, { message: "Relative Name must be atleast of 3 chars." })
        .max(255, { message: "Relative Name must not be more than 255 chars" }),


    banksLinked: z
        .string({ required_error: "Linked Banks are required" })
        .trim()
        .min(3, { message: "Enter the name of atleast one bank " })
        .max(1000, { message: "Banks must not be more than 1000 chars" }),

    mobileNo: z
        .string({ required_error: "Mobile Number is required" })
        .trim()
        .min(10, { message: "Mobile Number must be atleast of 10 chars." })
        .max(25, { message: "Mobile Number must not be more than 25 chars" }),


    dob: z.string({ required_error: "Date of birth is required" }),


    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(3, { message: "Address must be atleast of 3 chars." })
        .max(800, { message: "Address must not be more than 800 chars" }),

    jcNo: z
        .string({ required_error: "Job Card No. is required" }),


    addedBy: z
        .string({ required_error: "Added By is required" }),


});


module.exports = AddCustomerSchema;