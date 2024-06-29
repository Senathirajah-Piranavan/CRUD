const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
const port = 8000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

const usersFilePath = path.join(__dirname, 'sample.json');

const getUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

const saveUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Display all users
app.get("/users", (req, res) => {
  const users = getUsersFromFile();
  res.json(users);
});

// Delete user details
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  let users = getUsersFromFile();
  users = users.filter((user) => user.id !== id);
  saveUsersToFile(users);
  res.json(users);
});

// Add New User
app.post("/users", (req, res) => {
  const { name, age, district } = req.body;
  if (!name || !age || !district) {
    return res.status(400).send({ message: "All Fields Required" });
  }
  const users = getUsersFromFile();
  const id = Date.now();
  users.push({ id, name, age, district });
  saveUsersToFile(users);
  res.json({ message: "User Details added successfully" });
});

// Update Users
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age, district } = req.body;
  if (!name || !age || !district) {
    return res.status(400).send({ message: "All Fields Required" });
  }

  let users = getUsersFromFile();
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { id, name, age, district };
    saveUsersToFile(users);
    res.json({ message: "User Details updated successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
