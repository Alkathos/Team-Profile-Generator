const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const employees = [];

//Inititate the app
function init() {
  addTeamMember();
  beginHtml();
}
init();

function addTeamMember() {
  inquirer.prompt([
    {type: "input", name: "name", message: "Enter team member's name."},
    {type: "list", name: "role", message: "What is your team memmber's role?", choices:["Engineer", "Manager", "Intern"]},
    {type: "input", name: "id", message: "What is your team member's ID?"},
    {type: "input", name: "email", message: "What is your team member's email address?"}
  ]).then(function({name, role, id, email}) {
    let roleInput = "";
    if (role === "Engineer") {
      roleInput = "GitHub Username";
    } else if (role === "Intern") {
      roleInput = "School name";
    } else {
      roleInput = "Office Number"
    }
    inquirer.prompt([
      {type: "input", name: "roleInput", message: `Enter team member's ${roleInput}`},
      {type: "list", name: "moreTeamMembers", message: "Would you like to add more Team Members to your team?", choices: ["Yes", "No"]}
  ]).then(function({roleInput, moreTeamMembers}) {
    let newTeamMember;
    if (role === "Engineer") {
      newTeamMember = new Engineer(name, id, email, roleInput);
    } else if (role === "Intern") {
      newTeamMember = new Intern(name, id, email, roleInput);
    } else {
      newTeamMember = new Manager(name, id, email, roleInput);
    }
    employees.push(newTeamMember);
    additionalHtml(newTeamMember).then(function() {
      if (moreTeamMembers === "Yes") {
        addTeamMember();
      } else {
        endHtml();
      }
    });
  });
  });
}


//Generates the HTML file
function beginHtml() {
  const topHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Team Profile</title>
    </head>
    <body class="grey lighten-5">
        <nav>
            <div class="nav-wrapper">
                <span class="brand-logo center">Team Profile</span>
            </div> 
        </nav>
        <div class="container">
        <div class="row">`;
  fs.writeFile("dist/teamprofile.html",topHtml, function(error) {
    console.log(error);
  })};

function additionalHtml(newTeamMember) {
  return new Promise(function(resolve, reject) {
    const name = newTeamMember.getName();
    const role = newTeamMember.getRole();
    const id = newTeamMember.getId();
    const email = newTeamMember.getEmail();
    let html = "";
    if (role === "Engineer") {
      const gitHub = newTeamMember.getGithub();
      html = `<div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${name} Engineer<span class="card-title material-icons">integration_instructions</span></span>
          <p>ID: ${id}</p>
        </div>
        <div class="card-action">
          <a href="mailto:${email}">Email</a>
          <a target="_blank" href="https://github.com/${gitHub}">GitHub</a>
        </div>
      </div>
    </div>`
    } else if (role === "Intern") {
      const school = newTeamMember.getSchool();
      html = `<div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${name} Intern<span class="card-title material-icons">school</span></span>
          <p>ID: ${id}</p>
          <p>School: ${school}</p>
        </div>
        <div class="card-action">
          <a href="mailto:${email}">Email</a>
        </div>
      </div>
    </div>`
    } else {
      const officeNum = newTeamMember.getOfficeNum();
      html = `<div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${name} Team Manager<span class="card-title material-icons">emoji_food_beverage</span></span>
          <p>ID: ${id}</p>
          <p>Office Number: ${officeNum}</p>
        </div>
        <div class="card-action">
          <a href="mailto:${email}">Email</a>
        </div>
      </div>
    </div>`
    }
    console.log("Adding Team Member to Profile Page!");
    fs.appendFile("dist/teamprofile.html", html, function(error) {
      if (error) {
        return reject(error);
      };
      return resolve();
    })
})};


function endHtml() {
  const html = `</div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js" integrity="sha512-m2PhLxj2N91eYrIGU2cmIu2d0SkaE4A14bCjVb9zykvp6WtsdriFCiXQ/8Hdj0kssUB/Nz0dMBcoLsJkSCto0Q==" crossorigin="anonymous"></script>   
  </body>
  </html>`;
  fs.appendFile("dist/teamprofile.html", html, function(error) {
    if (error) {
      console.log(error);
    };
  });
  console.log("Finishing your HMTL!")
}