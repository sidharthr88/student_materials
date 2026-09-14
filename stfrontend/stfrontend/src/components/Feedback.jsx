import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";


const Feedback = () => {

  const [form,setForm] = useState({
    email:"",
    course:"",
    feedback:""
  });


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5000/feedback/add",
        form
      );

      alert("Feedback submitted");

      setForm({
        email:"",
        course:"",
        feedback:""
      });

    }
    catch(error){

      console.log(error);
      alert("Feedback failed");

    }
  };


  return(

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
          Feedback
        </Typography>


        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />


        <TextField
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
        />


        <TextField
          label="Feedback"
          name="feedback"
          multiline
          rows={4}
          value={form.feedback}
          onChange={handleChange}
        />


        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>


      </Box>

    </Container>

  );

};


export default Feedback;