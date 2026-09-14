import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );


  useEffect(() => {

    setIsLoggedIn(
      localStorage.getItem("isLoggedIn") === "true"
    );

  }, [location]);


  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("logintoken");

    setIsLoggedIn(false);

    navigate("/login");

  };


  return (
    <AppBar position="static">

      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Portal
        </Typography>


        <Box>

          {!isLoggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>


              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/students"
              >
                Student List
              </Button>


              <Button
                color="inherit"
                component={Link}
                to="/feedback"
              >
                Feedback
              </Button>


              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

        </Box>

      </Toolbar>

    </AppBar>
  );
};

export default Navbar;