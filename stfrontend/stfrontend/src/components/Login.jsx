import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      "/api",
      form
    );


    localStorage.setItem("isLoggedIn", "true");


    if(response.data.token){
      localStorage.setItem(
        "logintoken",
        response.data.token
      );
    }


    alert(response.data.message);


    navigate("/feedback");


  } catch(error) {

    console.log(error.response);

    alert(
      error.response?.data?.message ||
      "Login failed"
    );

  }

};

  return (
    <Container maxWidth="sm">

      <Paper sx={{ mt: 5, p: 3 }}>

        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom
        >
          Login
        </Typography>


        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />


          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />


          <Box sx={{ display: "flex", justifyContent: "center" }}>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                width: "120px",
              }}
            >
              Login
            </Button>

          </Box>


        </Box>

      </Paper>

    </Container>
  );
};


export default Login;