import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmp = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/create`,
        {
          id,
          name,
          email,
          phone,
          password,
          designation,
          salary,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (res && res.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Create a new Employee</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="inputId" className="col-sm-2 col-form-label">
            Id
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputId"
              placeholder="Id"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-5">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPhone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputDesignation" className="col-sm-2 col-form-label">
            Designation
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputDesignation"
              placeholder="Designation"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputSalary" className="col-sm-2 col-form-label">
            Salary
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputSalary"
              placeholder="Salary"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEmp;
