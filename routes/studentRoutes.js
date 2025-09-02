const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

const router = express.Router();


// Register a new student for competition
router.post('/register', validateStudentRegistration, async (req, res) => {
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
      grade,
      phase1,
      phase2,
      phase3,
      phase4,
      phase5
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
      grade,
      phase1: phase1 || false,
      phase2: phase2 || false,
      phase3: phase3 || false,
      phase4: phase4 || false,
      phase5: phase5 || false
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
        phase1: student.phase1,
        phase2: student.phase2,
        phase3: student.phase3,
        phase4: student.phase4,
        phase5: student.phase5,
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
