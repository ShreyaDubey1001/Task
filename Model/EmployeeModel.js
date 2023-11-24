import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    reuired: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Employee", employeeSchema);
