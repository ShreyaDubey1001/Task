import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const id1 = params.id;

  const r = {
    id: params.id,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("JWT token is missing.");
        return;
      }
      const newData = new FormData();
      newData.set("name", name);
      newData.set("email", email);
      newData.set("phone", phone);
      newData.set("designation", designation);
      newData.set("salary", salary);
      const data = await axios.put(
        `http://localhost:8080/updateEmp/${id1}`,
        {
          name,
          email,
          phone,
          designation,
          salary,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (data && data.success) {
        navigate("/");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>Update Employee</h1>
      <form>
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
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateEmp;
