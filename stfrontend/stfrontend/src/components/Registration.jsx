import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";


const Registration = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    regNo: "",
    candidateName: "",
    course: "",
    email: "",
    marks: "",
    password: "",
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/users/register",
        form
      );

      console.log(response.data);

      alert("Registration successful");

      navigate("/students");

    }
    catch(error) {

      console.log(error.response);
      console.log(error.message);

      alert("Registration failed");

    }

  };


  return (

    <Container maxWidth="sm">

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt:5,
          display:"flex",
          flexDirection:"column",
          gap:2
        }}
      >

        <Typography variant="h4">
          Registration
        </Typography>


        <TextField
          label="Registration No"
          name="regNo"
          value={form.regNo}
          onChange={handleChange}
        />


        <TextField
          label="Candidate Name"
          name="candidateName"
          value={form.candidateName}
          onChange={handleChange}
        />


        <TextField
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
        />


        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />


        <TextField
          label="Marks"
          name="marks"
          type="number"
          value={form.marks}
          onChange={handleChange}
        />


        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />


        <Button
          type="submit"
          variant="contained"
        >
          Register
        </Button>


      </Box>

    </Container>

  );

};


export default Registration;