const Student = require("../models/student.model");
const Guide = require("../models/guide.model");
const Coordinator = require("../models/coordinator.model");

async function getEntity(phno, entity) {
  try {
    if (entity === "STUDENT") {
      const student = await Student.findOne({ phno: phno });
      if (student === null) {
        return { success: false, messsge: "student not found!" };
      }
      return { success: true, messsge: "student found!" };
    } else if (entity === "GUIDE") {
      const guide = await Guide.findOne({ phno: phno });
      if (guide === null) {
        return { success: false, messsge: "guide not found!" };
      }
      return { success: true, messsge: "guide found!" };
    } else {
      const coordinator = await Coordinator.findOne({ phno: phno });
      if (coordinator === null) {
        return { success: false, messsge: "coordinator not found!" };
      }
      return { success: true, messsge: "coordinator found!" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

module.exports = getEntity;
