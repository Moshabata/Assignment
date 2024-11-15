const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Replace with your MySQL password if any
    database: "inventory_system"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

// User Registration
app.post("/api/register", async(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "User registered!" });
    });
});

// User Login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async(err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("User not found");

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Incorrect password");

        const token = jwt.sign({ id: user.id }, "secretkey");
        res.json({ token });
    });
});

// Product Management
app.post("/api/products", (req, res) => {
    const { name, quantity, description, image } = req.body;
    const sql = "INSERT INTO products (name, quantity, description, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, quantity, description, image], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "Product added!" });
    });
});

app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Dashboard data
app.get("/api/dashboard", (req, res) => {
    const sql = "SELECT name, quantity FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});