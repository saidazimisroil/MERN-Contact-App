const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded(extends: false));

// mongo connnection
mongoose.connect(
  "mongodb+srv://saidazim:test123@cluster0.mhvu77y.mongodb.net/contact?retryWrites=true&w=majority"
);

// mong schema
const contactSchema = mongoose.Schema({
  name: String,
  description: String,
  number: Number,
});

// mong model
const Contact = new mongoose.model("Contact", contactSchema);

// all contacts
app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();

  res.json(contacts);
});

// new contact
app.post("/newcontact", async (req, res) => {
  const { name, description, number } = req.body;
  const newContact = await Contact.create({ name, description, number });
  console.log("new contact was saved: " + newContact);
});

// delete contact
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const deletedContact = await Contact.findByIdAndDelete(id);
  console.log("contact was deleted: " + deletedContact);
});

// update contact
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
  console.log("contact was updated: " + updatedContact);
});

app.listen(5000, () => console.log("Server is running on port 5000..."));
