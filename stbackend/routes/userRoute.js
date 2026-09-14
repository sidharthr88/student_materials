const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
router.use(express.json());


//function verification
function verifyToken(req,res,next){
    let token = req.headers.token;
    try{
        if (!token) throw("Unauthorized request");
        else{
            const payload = jwt.verify(token,"secret");
            if(!payload) throw("Unauthorized request");
            next();
        }      
    }catch (error){
        console.log(error);
    }
}

// Register User
router.post("/register", verifyToken, async (req, res) => {
    try {
        const {
            regNo,
            candidateName,
            course,
            email,
            marks,
            password
        } = req.body;

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            regNo,
            candidateName,
            course,
            email,
            marks,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const payload = {
            email: user.email
        };

        const token = jwt.sign(
            payload,
            "secret",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                regNo: user.regNo,
                candidateName: user.candidateName,
                course: user.course,
                email: user.email,
                marks: user.marks
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get All Users
router.get("/",verifyToken, async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get User by ID
router.get("/:id",verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Update User
router.put("/:id",verifyToken, async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If password is being updated, hash it
        if (updateData.password) {
            updateData.password = await bcrypt.hash(
                updateData.password,
                10
            );
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Delete User
router.delete("/:id", verifyToken,async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



module.exports = router;