import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [emp, setEmp] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmpDetails();
  }, []);

  const fetchEmpDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("JWT token is missing.");
        return;
      }

      const { data } = await axios.get("http://localhost:8080/getEmp", {
        headers: {
          Authorization: `${token}`,
        },
      });

      setEmp(data?.emp);
    } catch (error) {
      console.error("Error fetching emp details:", error.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/add");
  };
  return (
    <>
      <h1>Employee Detail</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Designation</th>
            <th scope="col">Salary</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {emp?.map((e) => (
            <>
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.designation}</td>
                <td>{e.salary}</td>
                <td>
                  <button
                    className="btn btn-primary ms-2"
                    style={{
                      backgroundColor: "#0d6efd",
                      borderColor: "#0d6efd",
                      color: "white",
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(`/update/${e.id}`);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary ms-2"
        style={{
          backgroundColor: "#0d6efd",
          borderColor: "#0d6efd",
          color: "white",
        }}
        onClick={handleClick}
      >
        Add new Employee
      </button>
    </>
  );
};

export default Home;
