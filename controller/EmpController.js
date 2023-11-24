import EmployeeModel from "../Model/EmployeeModel.js";
import JWT from "jsonwebtoken";

//POST LOGIN
export const loginEmp = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check email
    const emp = await EmployeeModel.findOne({ email });
    if (!emp) {
      return res.status(404).send({
        success: false,
        message: "Email  not found",
      });
    }
    //check password
    const match = await EmployeeModel.findOne({ password });
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: emp._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      emp: {
        id: emp.id,
        name: emp.name,
        email,
        password,
        phone: emp.phone,
        designation: emp.designation,
        salary: emp.salary,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//create a new employee
export const createEmp = async (req, res) => {
  try {
    const { id, name, email, password, phone, designation, salary } = req.body;
    //blank validation
    if (!id) {
      return res.send({ error: "ID is Required" });
    }
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone number is Required" });
    }
    if (!designation) {
      return res.send({ error: "Designation is Required" });
    }
    if (!salary) {
      return res.send({ error: "Salary is Required" });
    }

    //validation using regex
    if (!validateEmail(email)) {
      return res.send({ error: "Entered Email is not valid" });
    }

    if (!validatePhone(phone)) {
      return res.send({ error: "Phone number is not valid" });
    }

    if (!validateSalary(salary)) {
      res.send({ error: "Invalid salary" });
    }

    const emp = await EmployeeModel.create({
      id,
      name,
      email,
      password,
      phone,
      designation,
      salary,
    });

    res.status(201).send({
      success: true,
      message: "Employee Created Successfully",
      emp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating emp",
      error,
    });
  }
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePhone = (phone) => {
  return phone.match(/^\+?\d{10,15}$/);
};

const validateSalary = (salary) => {
  return /^-?[1-9]+([0-9]+)*$/.test(salary);
};

//get all emp
export const getAllEmp = async (req, res) => {
  try {
    const emp = await EmployeeModel.find();
    if (!emp) {
      res.send("No emp found");
    }
    res.status(200).send({
      success: true,
      mesage: "all emp fetched",
      emp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting emp",
      error,
    });
  }
};

//get single emp
export const singleEmp = async (req, res) => {
  try {
    const emp = await EmployeeModel.findById(req.params.id);
    if (!emp) {
      res.send("No emp found");
    }
    res.status(200).send({
      success: true,
      mesage: "single emp fetched",
      emp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single emp",
      error,
    });
  }
};

//update emp
export const updateEmp = async (req, res) => {
  try {
    const { name, email, phone, designation, salary } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }

    if (!validateEmail(email)) {
      return res.send({ error: "Entered Email is not valid" });
    }

    if (!validatePhone(phone)) {
      return res.send({ error: "Phone number is not valid" });
    }

    if (!designation) {
      return res.send({ error: "Designation is Required" });
    }

    if (!validateSalary(salary)) {
      res.send({ error: "Invalid salary" });
    }
    console.log(req.params);
    const id = req.params.id;
    const emp = await EmployeeModel.findOneAndUpdate(
      { id },
      { ...req.body },
      { new: true }
    );
    await emp.save();
    res.status(200).send({
      success: true,
      mesage: "emp updated successfully",
      emp,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating emp",
      error,
    });
  }
};
