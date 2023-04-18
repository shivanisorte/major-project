const Excel = require("exceljs");
const Guide = require("../models/guide.model");
const { isEmail, isMobilePhone } = require("validator");

async function readGuideSheet(filename) {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.getWorksheet("Sheet1");
  const guides = []
  const validationViolations = [];

  worksheet.eachRow(function (row, rowNumber) {
    if (rowNumber >= 3) {
      const guide = new Guide({
        empid: row.findCell(1).value,
        name: row.findCell(2).value,
        phno: row.findCell(3).value,
        email: row.findCell(4).value,
        domain:row.findCell(5).value,
        experienceYrs: row.findCell(6).value,
        bachelors: row.findCell(7).value === 'yes',
        masters: row.findCell(8).value === 'yes',
        phd: row.findCell(9).value === 'yes',
        postPhd: row.findCell(10).value === 'yes',
      });


      //Check for invalid values
      if (row.findCell(7).value !== 'yes' && row.findCell(77).value !== 'no') {
        throw new Error('Invalid value for bachelors field');
      }
      if (row.findCell(8).value !== 'yes' && row.findCell(8).value !== 'no') {
        throw new Error('Invalid value for masters field');
      }
      if (row.findCell(9).value !== 'yes' && row.findCell(9).value !== 'no') {
        throw new Error('Invalid value for phd field');
      }
      if (row.findCell(10).value !== 'yes' && row.findCell(10).value !== 'no') {
        throw new Error('Invalid value for postPhd field');
      }

      //Check for validation violations
      if (isEmail(guide.email) && isMobilePhone(guide.phno)) {
        guides.push(guide);
      } else {
        validationViolations.push(`Row ${rowNumber} has invalid Email or Phone number`);
      }
    }
  });

  try {
    if(validationViolations.length > 0) {
      return {
        success: false,
        message: validationViolations,
      };
    } else{
      await Guide.insertMany(guides);
      return {
        success: true,
        message: "guides are added to db successfully",
      };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

module.exports = readGuideSheet;
