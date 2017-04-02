// sidebar
const sideBar = {
  divSidebar: $('#sidebar'),
  divHeader: $('#sidebar-header'),
  divContacts: $('#contacts'),
  build: {}
};

// main
const main = {
  main: $('#main'),
  header: $('#header'),
  iconsResume: $('#icons-resume'),
  conten: $('#content'),
  contentHeader: $('#content-header'),
  contentInfo: $('#content-info'),
  work: $('#work'),
  projects: $('#projects'),
  education: $('#education')
};

// projects
const myProjects = {
  build: {},
  open: false
};

// jobs

const myJobs = {
  build: {},
  open: false
};

// education

const myEducation = {
  build: {},
  open: false
};

sideBar.getBio = function () {
  return $.get( 'js/json_data/bio.json');
};

sideBar.build.addImage = function  () {
  var imageUrl = sideBar.data.pictureUrl;
  var image = HTMLimageSidebar.replace('%data%', imageUrl);
  sideBar.divSidebar.prepend(image);
};

sideBar.build.addHeaderInfo = function () {
  var bioName = sideBar.data.name;
  var bioRole = sideBar.data.role;
  var bioWelcomeMessage = sideBar.data.welcomeMessage;

  var name = HTMLname.replace('%data%', bioName);
  var role  = HTMLrole.replace('%data%', bioRole);
  var welcomeMessage = HTMLwelcomeMessage.replace('%data%', bioWelcomeMessage);

  sideBar.divHeader.append(name, role, welcomeMessage);
};

sideBar.build.addContacts = function () {
  var contacts = sideBar.data.contacts;
  for ( var contact in contacts ) {
    var contactText = contacts[contact];

    var icon = HTMLiconContacts.replace('%data%', `img/${contact}.svg`);
    var text = HTMLcontactInfo.replace('%data%', contactText).replace('%contactType%', contact);

    sideBar.divContacts.append(HTMLcontact);
    var lastContact = $('.contact').last();

    lastContact.append(icon, text);
  }
};

$.when(sideBar.getBio()).done(function (data) {
  sideBar.data = data;
  sideBar.build.addImage();
  sideBar.build.addHeaderInfo();
  sideBar.build.addContacts();
});

main.work.click(function () {
  onIconClick(myJobs);
});

main.projects.click(function () {
  onIconClick(myProjects);
});

main.education.click( function () {
  onIconClick(myEducation);
});

function onIconClick(iconCategory) {
  if (iconCategory.open === true ) {
    alert('Already displaying.');
    return;
  }
  else {
    $('#menu').slideUp();
    $('#menu').promise().done( function () {
      closeIfOpen();
      iconCategory.open = true;
      $.when(iconCategory.build.getData()).done(function (data) {
        iconCategory.data = data;
        iconCategory.build.header();
        iconCategory.build.dropDownMenu();
      });
    });
  }
}

function closeIfOpen() {
  if ( myEducation.open === true ) {
    myEducation.open = false;
    cleanMain();
  }
  else if (myProjects.open === true) {
    myProjects.open = false;
    cleanMain();
  }
  else if (myJobs.open === true) {
    myJobs.open = false;
    cleanMain();
  }
}

function cleanMain() {
  main.header.empty();
  main.contentInfo.empty();
}

myJobs.build.getData = function () {
  return $.get('js/json_data/work.json');
};

myJobs.build.header = function () {
  buildHeader(myJobs.data.jobs, 'title', HTMLcontentMenu);
};

myJobs.build.dropDownMenu = function () {
  buildDropDownMenu(myJobs.data.jobs, 'employer', HTMLcontentMenu, showJob, 'title');
};

// job specific function
function showJob() {
  var jobNames = $('#dropdown li');
  jobNames.each( function () {
    $(this).click( function () {
      var jobs = myJobs.data.jobs;
      var dataValue = $(this).data().value;
      var job = jobs.find(clicked, dataValue);

      var employer = HTMLjobEmployer.replace('%data%', job.employer);
      var title = HTMLjobTitle.replace('%data%', job.title);
      var location = HTMLjobLocation.replace('%data%', job.location);
      var dates = HTMLjobDate.replace('%data%', job.dates);
      var description = HTMLjobDescription.replace('%data%', job.description);

      if (main.contentInfo.children().length !== 0) {
        main.contentInfo.children().remove();
      }

      main.contentInfo.append(employer, title, location, dates, description);
    });
  });
}

// projects

myProjects.build.getData = function () {
  return $.get('js/json_data/projects.json');
};

myProjects.build.header = function () {
  buildHeader(myProjects.data.projects, 'language', HTMLcontentMenu);
};

myProjects.build.dropDownMenu = function () {
  buildDropDownMenu(myProjects.data.projects, 'title', HTMLdropdownLiMenu, showProject, 'language');
};

// project specific function

function showProject() {
  var projectsNames = $('#dropdown li');
  projectsNames.each( function () {
    $(this).click( function () {
      var projects = myProjects.data.projects;
      var dataValue = $(this).data().value;
      var project = projects.find(clicked, dataValue);

      var title = HTMLprojectTitle.replace('%data%', project.title);
      var date = HTMLprojectDate.replace('%data%', project.date);
      var language = HTMLprojectLanguage.replace('%data%', project.language);
      var frameworks = HTMLprojectFrameworks.replace('%data%', project.framewors);
      var description = HTMLprojectDescription.replace('%data%', project.description);
      var image = HTMLprojectImage.replace('%data%', project.image);

      if (main.contentInfo.children().length !== 0) {
        main.contentInfo.children().remove();
      }
      main.contentInfo.append(title, date, language, frameworks, description, image);
    });
  });
}

// education

myEducation.build.getData = function () {
  return $.get('js/json_data/education.json');
};

myEducation.build.header = function () {
  buildHeader(myEducation.data.courses, 'type', HTMLcontentMenu);
};

myEducation.build.dropDownMenu = function () {
  buildDropDownMenu(myEducation.data.courses, 'name', HTMLdropdownLiMenu, showCourses, 'type');
};

// education specific function

function showCourses() {
  var coursesNames = $('#dropdown li');
  coursesNames.each( function () {
    $(this).click( function () {
      var courses = myEducation.data.courses;
      var dataValue = $(this).data().value;
      var course = courses.find(clicked, dataValue);

      var name = HTMLeducationName.replace('%data%', course.name);
      var location = HTMLeducationLocation.replace('%data%', course.location);
      var date = HTMLeducationDate.replace('%data%', course.degreeDates);
      var url = HTMLeducationUrl.replace('%data%', course.url).replace('%data%', course.name);
      var description = HTMLeducationDescription.replace('%data%', course.description);
      var grade = HTMLeducationGrade.replace('%data%', course.grade);

      if (main.contentInfo.children().length !== 0) {
        main.contentInfo.children().remove();
      }
      main.contentInfo.append(name, location, date, url, description, grade);
    });
  });
}

// common functions

function buildHeader(jsonData, key, html) {
  main.header.append(HTMLcontentHeader);
  $('#menu').slideDown();
  var ulHeader = $('#header ul');
  var uniqueValues = unique(jsonData, key);

  uniqueValues.forEach( function (value) {
    var title = html.replace('%data%', value)
      .replace('%data-value%', value)
      .replace('%rows%', 12 / uniqueValues.length);
    ulHeader.append(title);
  });
}

function buildDropDownMenu(objects, key, html, callback, uniqueValue) {
  var li = $('#menu li');
  li.mouseenter(function () {
    $(this).append(HTMLdropdownMenu);
    var dataValue = $(this).data().value;
    var specificObjects = findBy(objects, uniqueValue, dataValue);

    specificObjects.forEach( function (specificObject) {
      var menuItem = specificObject[key];
      var item = html.replace('%data%', menuItem).replace('%data-value%', specificObject.id);
      $('#dropdown').append(item);
      callback();
    });
  }).mouseleave(function () {
    $('#dropdown li').remove();
    $('#dropdown').remove();
  });
}

function findBy(objects, key, value) {
  return objects.filter( function (object) {
    return object[key] === value;
  });
}

function unique(xs, key) {
  var uniqueObj = [];
  var seen = {};
  xs.filter(function (x) {
    if (uniqueObj.includes(x[key])) {
      return;
    }
    uniqueObj.push(x[key]);
  });
  return uniqueObj;
}

function clicked(element) {
  return element.id === this.valueOf();
}
