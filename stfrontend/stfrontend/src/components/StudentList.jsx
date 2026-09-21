import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button
} from "@mui/material";


const StudentList = () => {


  const [students,setStudents] = useState([]);


  useEffect(()=>{

    getStudents();

  },[]);



  const getStudents = async()=>{

    try{

      const response = await axios.get(
        "/users"
      );

      setStudents(response.data);

    }
    catch(error){

      console.log(error);

    }

  };



  return(

    <Container sx={{mt:5}}>

      <Typography variant="h4" align="center">
        Student List
      </Typography>


      <TableContainer component={Paper} sx={{mt:3}}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Registration No</TableCell>
              <TableCell>Candidate Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

          {
            students.map((student)=>(

              <TableRow key={student._id}>

                <TableCell>
                  {student.regNo}
                </TableCell>

                <TableCell>
                  {student.candidateName}
                </TableCell>

                <TableCell>
                  {student.course}
                </TableCell>

                <TableCell>
                  {student.email}
                </TableCell>

                <TableCell>
                  {student.marks}
                </TableCell>

                <TableCell>

                  <Button 
                    variant="contained"
                    size="small"
                  >
                    Edit
                  </Button>


                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ml:1}}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))
          }


          </TableBody>


        </Table>

      </TableContainer>


    </Container>

  );

};


export default StudentList;