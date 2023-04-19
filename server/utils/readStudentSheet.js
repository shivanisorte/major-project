const Excel = require("exceljs");
const Student = require("../models/student.model");
const Team = require("../models/team.model");

async function readStudentSheet(filename) {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.getWorksheet("ISA");
  const students = [];
  const teams = [];
  const currentTeam = [];
  let currentGroup = 1;
  worksheet.eachRow(function (row, rowNumber) {
    if (rowNumber >= 3) {
      if (row.findCell(1).value == "x") {
        const team = new Team({ students: currentTeam });
        teams.push(team);
        currentTeam.map((student) => {
          student.team = team;
        });
        currentTeam.length = 0;
      } else {
        const student = new Student({
          name: row.findCell(4).value,
          email: row.findCell(6).value,
          erno: row.findCell(3).value,
          rno: row.findCell(2).value,
          github: row.findCell(7).value,
          phno: row.findCell(5).value,
          isTopicFinalised: false,
        });
        students.push(student);
        if (currentGroup == row.findCell(1).value) {
          currentTeam.push(student);
        } else {
          const team = new Team({ students: currentTeam });
          teams.push(team);
          currentTeam.map((student) => {
            student.team = team;
          });
          currentTeam.length = 0;
          currentTeam.push(student);
          currentGroup++;
        }
      }
    }
  });
  try {
    await Student.insertMany(students);
    await Team.insertMany(teams);
    return {
      success: true,
      message: "students and teams added to db successfully",
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

module.exports = readStudentSheet;
