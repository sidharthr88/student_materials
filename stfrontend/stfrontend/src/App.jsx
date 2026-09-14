import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import Login from "./components/Login";
import StudentList from "./components/StudentList";
 import Feedback from "./components/Feedback";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App(){

  return(

    <BrowserRouter>

      <Navbar />


      <Routes>

        <Route 
          path="/" 
          element={<Registration />}
        />

        <Route
          path="/register"
          element={<Registration />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
        path="/students"
        element={
         <ProtectedRoutes>
          <StudentList />
          </ProtectedRoutes>
          }
        />
       
        <Route 
        path="/feedback"
         element={
         <ProtectedRoutes><Feedback /></ProtectedRoutes>} />
      </Routes>


    </BrowserRouter>

  );

}


export default App;