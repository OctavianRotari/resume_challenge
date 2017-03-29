// sidebar
const sideBar = {
  divSidebar: $('#sidebar'),
  divHeader: $('#sidebar-header'),
  divContacts: $('#contacts'),
  build: {}
};

sideBar.getBio = function () {
  return $.get( 'js/json_data/bio.json')
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

    sideBar.divContacts.append(HTMLcontact)
    var contact = $('.contact').last();

    contact.append(icon, text);
  }
};

$.when(sideBar.getBio()).done(function (data) {
  sideBar.data = data;
  sideBar.build.addImage()
  sideBar.build.addHeaderInfo();
  sideBar.build.addContacts();
});

// main
const main = {
  main: $('#main'),
  header: $('#header'),
  iconsResume: $('#icons-resume'),
  conten: $('#content'),
  contentHeader: $('#content-header'),
  contentInfo: $('#content-info'),
  work: $('#work')
};

// jobs

const jobs = {
  build: {},
}

jobs.getWorks = function () {
  return $.get('js/json_data/work.json');
}

jobs.build.header = function () {
  main.header.append(HTMLcontentHeader);
  var ulHeader = $('#header ul');

  jobs.data.jobs.forEach( function (job) {
    var jobTitle = HTMLcontentMenu.replace('%data%', job.employer).replace('%dataId%', job.id);
    ulHeader.append(jobTitle);
  });
};

jobs.build.selectedJob = function () {
  var jobsArray = jobs.data.jobs;
  for ( var job in jobsArray) {
    var job = jobsArray[job];
    var id = job.id;
    onJobClick (id)
  }
};

function onJobClick(id) {
  $('#' + id).click(function (event) {
    showJob(this.id)
  })
}

function showJob(id) {
  var jobsArray = jobs.data.jobs;
  var job = jobsArray.find(clickedJob, id);

  var employer = HTMLjobEmployer.replace('%data%', job.employer);
  var title = HTMLjobTitle.replace('%data%', job.title);
  var location = HTMLjobLocation.replace('%data%', job.location);
  var dates = HTMLjobDate.replace('%data%', job.dates);
  var description = HTMLjobDescription.replace('%data%', job.description);

  if (main.contentInfo.children().length === 0) {
    main.contentInfo.append(employer, title, location, dates, description);
  }
  else {
    main.contentInfo.children().remove();
    main.contentInfo.append(employer, title, location, dates, description);
  }
}

function clickedJob(element) {
  return element.id.toString() === this[0];
}

main.work.click(function () {
  $.when(jobs.getWorks()).done(function (data) {
    jobs.data = data;
    jobs.build.header();
    jobs.build.selectedJob();
  })
})

