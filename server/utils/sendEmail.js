require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (students, project, guide) => {
    console.log(students)
    console.log(project)
    console.log(guide)
  const guideName = `${guide.name}`;
  const guideEmail = guide.email;
  const guidePhno = guide.phno;

  students.forEach((student) => {
    console.log('student: ');
    console.log(student);
    const msg = {
      to: student.email,
      from: 'sssorte1428@gmail.com', 
      subject: 'Congratulations! Your Project Hub application has been selected.',
      text: 
`Dear ${student.name},

Congratulations on being selected to work on ${project.title}! We were impressed by your qualifications and experience, and believe that you will be a valuable asset and make significant contributions to the project.

As a team member, you'll be expected to attend all meetings, complete your assigned tasks on time, and work collaboratively with your team members. Please get in touch with ${guideName} (${guideEmail}, ${guidePhno}) as soon as possible to get started.

Here are some important details about the project:

Project Title: ${project.title}
Project Domain: ${project.domain}
Project Type: ${project.projectType}

Best regards,

Motion`
    };
  
    sgMail.send(msg)
      .then(() => {
        console.log(`Email sent to ${student.email}`);
      })
      .catch((error) => {
        console.error(`Error sending email to ${student.email}: ${error}`);
      });
  });
};

module.exports = sendEmail;
