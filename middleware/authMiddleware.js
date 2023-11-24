import JWT from "jsonwebtoken";
import EmployeeModel from "../Model/EmployeeModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract the token from the header
    const token = authorizationHeader;

    // Verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token has the necessary information
    if (!decode || !decode._id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch the employee from the database using the decoded employeeId
    const employee = await EmployeeModel.findById(decode._id);

    // Check if the employee exists
    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }

    // Attach the decoded information and the employee to the request object
    req.decodedToken = decode;
    req.employee = employee;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
