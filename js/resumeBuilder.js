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
  projects: $('#projects')
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
    var contact = $('.contact').last();

    contact.append(icon, text);
  }
};

$.when(sideBar.getBio()).done(function (data) {
  sideBar.data = data;
  sideBar.build.addImage();
  sideBar.build.addHeaderInfo();
  sideBar.build.addContacts();
});

main.work.click(function () {
  closeIfOpen(myProjects);
  if ( myJobs.open === true ) {
    alert('Already displaying jobs');
    return;
  }
  else {
    myJobs.open = true;
    $.when(myJobs.build.getWorks()).done(function (data) {
      myJobs.data = data;
      myJobs.build.header();
      myJobs.build.selectedJob();
    });
  }
});

main.projects.click(function () {
  closeIfOpen(myJobs);
  if ( myProjects.open === true ) {
    alert('Already displaying projects');
    return;
  }
  else {
    myProjects.open = true;
    $.when(myProjects.build.getProjects()).done(function (data) {
      myProjects.data = data;
      myProjects.build.header();
      myProjects.build.dropDownMenu();
    });
  }
});

main.clean = function () {
  main.header.empty();
};

function closeIfOpen(section) {
  if ( section.open ) {
    section.open = false;
    main.clean();
  }
}

myJobs.build.getWorks = function () {
  return $.get('js/json_data/work.json');
};

myJobs.build.header = function () {
  main.header.append(HTMLcontentHeader);
  var ulHeader = $('#header ul');

  myJobs.data.jobs.forEach( function (job) {
    var jobTitle = HTMLcontentMenu.replace('%data%', job.employer).replace('%dataId%', job.id);
    ulHeader.append(jobTitle);
  });
};

myJobs.build.selectedJob = function () {
  var jobsArray = myJobs.data.jobs;
  for ( var job in jobsArray) {
    var job = jobsArray[job];
    var id = job.id;
    onJobClick (id);
  }
};

function onJobClick(id) {
  $('#' + id).click(function (event) {
    showJob(this.id);
  });
}

function showJob(id) {
  var jobsArray = myJobs.data.jobs;
  var job = jobsArray.find(clicked, id);

  var employer = HTMLjobEmployer.replace('%data%', job.employer);
  var title = HTMLjobTitle.replace('%data%', job.title);
  var location = HTMLjobLocation.replace('%data%', job.location);
  var dates = HTMLjobDate.replace('%data%', job.dates);
  var description = HTMLjobDescription.replace('%data%', job.description);

  if (main.contentInfo.children().length !== 0) {
    main.contentInfo.children().remove();
  }

  main.contentInfo.append(employer, title, location, dates, description);
}

function clicked(element) {
  return element.id.toString() === this[0];
}

// projects
myProjects.build.getProjects = function () {
  return $.get('js/json_data/projects.json');
};

myProjects.build.header = function () {
  main.header.append(HTMLcontentHeader);
  var ulHeader = $('#header ul');
  var languages = unique(myProjects.data.projects);

  languages.forEach( function (language) {
    var projectTitle = HTMLcontentMenuLanguages.replace('%data-language%', language).replace('%data%', language);
    ulHeader.append(projectTitle);
  });
};

myProjects.build.dropDownMenu = function () {
  var li = $('#menu li');
  li.mouseenter(function () {
    $(this).append(HTMLdropdownMenu);
    var dataLanguage = $(this).data();
    var projects = findProjectsBy(dataLanguage.language);
    projects.forEach( function (project) {
      var projectTitle = project.title;
      var title = HTMLcontentMenu.replace('%data%', projectTitle).replace('%dataId%', project.id);
      $('#dropdown').append(title);
      showProject();
    });
  }).mouseleave(function () {
    $('#dropdown li').remove();
    $('#dropdown').remove();
  });
};

function showProject() {
  var projectsNames = $('#dropdown li');
  projectsNames.each( function () {
    $(this).click( function () {
      var projects = myProjects.data.projects;
      var project = projects.find(clicked, this.id);

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
  })
};

function findProjectsBy(language) {
  var projects = myProjects.data.projects;
  return projects.filter( function (project) {
    return project.language === language;
  });
}

function unique(xs) {
  var languages = [];
  var seen = {};
  xs.filter(function (x) {
    if (languages.includes(x.language)) {
      return;
    }
    languages.push(x.language);
  });
  return languages;
}
