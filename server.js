const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://saipadgilwar25_db_user:DGg2VWTMR3Nb82Jh@cluster0.2tbbvyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  gender: String,
  skills: [String]
});

const Student = mongoose.model('Student', studentSchema);

// POST endpoint to save data
// app.post('/students', async (req, res) => {
//   const { name, rollno, gender, skills } = req.body;

//   try {
//     const newStudent = new Student({ name, rollno, gender, skills });
//     await newStudent.save();
//     res.status(201).send('Student data saved');
//   } catch (error) {
//     res.status(400).send('Error saving student data');
//   }
// });
app.post('/students', async (req, res) => {
  const { name, rollno, gender, skills } = req.body;

  try {
    const newStudent = new Student({ name, rollno, gender, skills });
    await newStudent.save();
    res.status(201).json({ message: 'Student data saved' });  // <-- Changed here
  } catch (error) {
    res.status(400).json({ message: 'Error saving student data' });  // And here for error
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
