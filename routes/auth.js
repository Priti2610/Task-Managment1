const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../db");
router.get("/", (req, res) => {

    res.render("login");

});
router.get("/register", (req, res) => {

    res.render("register");

});
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.send("All fields are required");

    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) throw err;

            if (result.length > 0) {

                return res.send("Email already exists");

            }

            const hashPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                [name, email, hashPassword],
                (err) => {

                    if (err) throw err;

                    res.redirect("/");

                }
            );

        }
    );

});
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) throw err;

            if (result.length == 0) {

                return res.send("Invalid Email");

            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.send("Invalid Password");

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.cookie("token", token);

            res.redirect("/dashboard");

        }
    );

});
router.get("/logout", (req, res) => {

    res.clearCookie("token");

    res.redirect("/");

});
module.exports = router;