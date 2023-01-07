const { transcripts, students } = require("../models/index");
const Transcripts = transcripts;

module.exports = {
  get: async (req, res) => {
    try {
      const transcripts = await Transcripts.findAll({
        include: {
            model: students,
            as: "student"
        }
      });
      res.status(200).send({ transcripts });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  create: async (req, res) => {
    try {
      const { cgpa, studentId } = req.body;

      const transcriptFound = await Transcripts.findOne({
        where: {
            student_id: studentId
        }
      });

      if(transcriptFound) {
        return res.status(409).send("Transcript for the student already exists")
      }

      if (!cgpa || !studentId) {
        return res.status(400).send("Required fields cannot be empty");
      }
      const transcript = await Transcripts.create({
          cgpa,
          student_id: studentId,
      });
      res.status(200).send({
        transcript,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
};

// Node <=> MySQL2 driver <=> MySQL
// Node <=> ORM <=> MySQL2 driver <=> MySQL
