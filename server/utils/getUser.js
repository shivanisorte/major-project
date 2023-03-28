const { Student } = require("../models/student.model");
async function getUser(phno) {
  try {
    const student = await Student.findOne({ phno: phno });
    if (student === null) {
      return { success: false, messsge: "student not found!" };
    }
    return { success: true, messsge: "student found!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

module.exports = getUser;
