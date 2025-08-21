const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

const router = express.Router();

// Validation middleware


// Register a new student for competition
router.post('/register', async (req, res) => {
  try {

    const {
      name,
      email,
      gender,
      birthDate,
      phone,
      state,
      country,
      school,
      grade
    } = req.body;

    // Check if student already exists with this email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'A student with this email is already registered'
      });
    }

    // Create new student
    const student = new Student({
      fullName: name,
      email,
      gender,
      birthDate,
      phone,
      state,
      country,
      schoolName: school,
      grade
    });

    await student.save();

    // Email functionality removed - student registered successfully
    console.log(`✅ Student registered successfully: ${student.email}`);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully for competition',
      data: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        gender: student.gender,
        birthDate: student.birthDate,
        phone: student.phone,
        state: student.state,
        country: student.country,
        schoolName: student.schoolName,
        grade: student.grade,
        registrationDate: student.registrationDate
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register student',
      error: error.message
    });
  }
});


module.exports = router;
