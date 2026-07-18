const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const db = require("../db");

// Dashboard
router.get("/dashboard", verifyToken, (req, res) => {

    const search = req.query.search || "";
    const status = req.query.status || "";
    const priority = req.query.priority || "";

    let sql = "SELECT * FROM tasks WHERE user_id=? AND title LIKE ?";
    let values = [
        req.user.id,
        "%" + search + "%"
    ];

    if (status != "") {
        sql += " AND status=?";
        values.push(status);
    }

    if (priority != "") {
        sql += " AND priority=?";
        values.push(priority);
    }

    sql += " ORDER BY id DESC";

    db.query(sql, values, (err, result) => {

        if (err) throw err;

        res.render("dashboard", {
            user: req.user,
            tasks: result,
            search,
            status,
            priority
        });

    });

});
router.get("/addTask", verifyToken, (req, res) => {

    res.render("addTask");

});
router.post("/addTask", verifyToken, (req, res) => {

    const { title, description, due_date, priority } = req.body;

    db.query(

        "INSERT INTO tasks(user_id,title,description,due_date,priority) VALUES(?,?,?,?,?)",

        [
            req.user.id,
            title,
            description,
            due_date,
            priority
        ],

        (err) => {

            if (err) throw err;

            res.redirect("/dashboard");

        }

    );

});
router.get("/editTask/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM tasks WHERE id=?",
        [id],
        (err, result) => {

            if (err) throw err;

            res.render("editTask", {
                task: result[0]
            });

        }
    );

});
router.post("/updateTask/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    const {
        title,
        description,
        due_date,
        priority,
        status
    } = req.body;

    db.query(
        "UPDATE tasks SET title=?, description=?, due_date=?, priority=?, status=? WHERE id=?",
        [
            title,
            description,
            due_date,
            priority,
            status,
            id
        ],
        (err) => {

            if (err) throw err;

            res.redirect("/dashboard");

        }
    );

});
// Delete Task
router.get("/deleteTask/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id=? AND user_id=?",
        [id, req.user.id],
        (err) => {

            if (err) throw err;

            res.redirect("/dashboard");

        }
    );

});
// Mark Task Completed
router.get("/completeTask/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE tasks SET status='Completed' WHERE id=? AND user_id=?",
        [id, req.user.id],
        (err) => {

            if (err) throw err;

            res.redirect("/dashboard");

        }
    );

});


module.exports = router;