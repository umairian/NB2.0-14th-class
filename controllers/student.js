const {students} = require("../models/index");
const Students = students;

module.exports = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Students.count({
        where: {
          gender: "Female",
        },
        // attributes: ["name", "email", "gender"],
        order: [['id', 'DESC']],
      });
      res.status(200).send({ students: students });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  createStudent: async (req, res) => {
    try {
      const { name, email, address, phone_number, gender } = req.body;

      if(!name || !email || !gender) {
        return res.status(400).send("Required fields cannot be empty");
      }
      const genderValues = await Students.rawAttributes.gender.values;
      if(!genderValues.includes(gender)) {
        return res.status(400).send("Invalid Gender value");
      }
      const student = await Students.create({
        name: name,
        email: email,
        address: address,
        phone_number: phone_number,
        gender
      });
      res.status(200).send({
        student: student
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  getStudent: async (req, res) => {
    try {
      const studentId = Number(req.params.studentId);
      if(isNaN(studentId)) {
        return res.status(400).send("Invalid student id");
      }
      const student = await Students.findByPk(studentId);
      res.status(200).send({ student: student });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  update: async (req, res) => {
    try {
      const {name, phone_number} = req.body;
      const studentId = Number(req.params.studentId);
      if(isNaN(studentId)) {
        return res.status(400).send("Invalid student id");
      }
      if(!name) {
        return res.status(400).send("Name is required!")
      }

      const student = await Students.findByPk(studentId);
      if(!student) {
        return res.status(400).send("Invalid student ID")
      }
      await Students.update({
        name: name,
        phone_number: phone_number
      }, {
        where: {
          id: studentId
        }
      });
      res.status(200).send("Student updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  delete: async (req, res) => {
    try {
      const studentId = Number(req.params.studentId);
      if(isNaN(studentId)) {
        return res.status(400).send("Invalid student id");
      }

      const student = await Students.findByPk(studentId);
      if(!student) {
        return res.status(400).send("Invalid student ID")
      }
      await Students.destroy({
        where: {
          id: studentId
        }
      })
      res.status(200).send("Student deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  findOrCreate: async (req, res) => {
    try {
      const { name, email, gender, address} = req.body;

      const [student, created] = await Students.findOrCreate({
        where: {
          name,
        },
        defaults: {
          email,
          gender,
          address
        },
      });
      res.status(200).send({ student, created });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  findAndCountAll: async (req, res) => {
    try {
      const gender = req.query.gender;

      const {count, rows} = await Students.findAndCountAll({
        where: {
          gender,
        },
      });
      res.status(200).send({ count, rows });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
}

/*

vice_chancellors => id, name, gender, university_id
universities => id, name, address, country
students => id, name, gender, email, university_id
courses => id, name, credit_hours
student_courses => id, student_id, course_id
                   1, 3, 4
                   2, 3, 5,
                   3, 3, 89,
                   4, 87, 4,
                   5, 87, 87
                   

3 Laiq Hassan Male 55


 */





// Node <=> MySQL2 driver <=> MySQL
// Node <=> ORM <=> MySQL2 driver <=> MySQL