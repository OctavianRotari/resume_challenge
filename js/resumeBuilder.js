// sidebar
const sideBar = {
  divSidebar: $('#sidebar'),
  divHeader: $('#sidebar-header'),
  divContacts: $('#contacts'),
  showBar: true,
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

sideBar.build.hideSide = function () {
  $('#hide-side-bar').click( function () {
    if ( sideBar.showBar ) {
      closeSidebar()
    }
    else {
      openSidebar()
    }
  });
};

function closeSidebar() {
  $('#main').addClass('slide-left');
  sideBar.showBar = false;
}

function openSidebar() {
  $('#main').removeClass('slide-left');
  sideBar.showBar = true;
}

$.when(sideBar.getBio()).done(function (data) {
  sideBar.data = data;
  sideBar.build.addImage();
  sideBar.build.addHeaderInfo();
  sideBar.build.addContacts();
  sideBar.build.hideSide();
  $(document).ready(function () {
    setTimeout(function () {
      closeSidebar();
    }, 1000);
  });
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
    slideUpContentInfo().promise().done( function () {
      $('#menu').promise().done( function () {
        closeIfOpen();
        iconCategory.open = true;
        $.when(iconCategory.build.getData()).done(function (data) {
          iconCategory.data = data;
          iconCategory.build.header();
        });
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

  var options = {
    data: myJobs.data.jobs,
    keyMenu: 'title',
    keyDropdown: 'employer',
    html: HTMLcontentMenu,
    htmlDropdown: HTMLdropdownLiMenu,
    build: buildProject
  };

  buildHeader(options);
};

// job specific function

// this is executed as a callback to the function showContentInfo

function buildJob(dataValue) {
  var jobs = myJobs.data.jobs;
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
}

function slideUpContentInfo() {
  return $('#content-info').slideUp();
}

// projects

myProjects.build.getData = function () {
  return $.get('js/json_data/projects.json');
};

myProjects.build.header = function () {

  var options = {
    data: myProjects.data.projects,
    keyMenu: 'language',
    keyDropdown: 'title',
    html: HTMLcontentMenu,
    htmlDropdown: HTMLdropdownLiMenu,
    build: buildProject
  };

  buildHeader(options);
};

// project specific function

// this is executed as a callback to the function showContentInfo

function buildProject(dataValue) {
  var projects = myProjects.data.projects;
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
}

// education

myEducation.build.getData = function () {
  return $.get('js/json_data/education.json');
};

myEducation.build.header = function () {

  var options = {
    data: myEducation.data.courses,
    keyMenu: 'type',
    keyDropdown: 'name',
    html: HTMLcontentMenu,
    htmlDropdown: HTMLdropdownLiMenu,
    build: buildCourses
  };

  buildHeader(options);
};

// education specific function

// this is executed as a callback to the function showContentInfo

function buildCourses(dataValue) {
  var courses = myEducation.data.courses;
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
}

// common functions

function buildHeader(options) {
  animateMenu().promise().done(function () {
    setTimeout(function () {
      $('.animation').hide();

      main.header.append(HTMLcontentHeader);
      $('#menu').slideDown();

      var ulHeader = $('#header ul');
      var uniqueValues = unique(options.data, options.keyMenu);

      uniqueValues.forEach( function (value) {
        var title = options.html.replace('%data%', value)
          .replace('%data-value%', value);
        ulHeader.append(title);
      });

      $('#menu li').each( function () {
        $(this).css('width', `${ 100 / uniqueValues.length }%`);
      });

      buildDropDownMenu(options);
    }, 1000);
  });
}

function animateMenu() {
  $('body').append(HTMLdivAnimation);
  var animationDot = $('.animation');
  var position = $('.icon-projects').offset();
  animationDot.css('left', position.left += 35 );
  animationDot.css('top', position.top += 20 );

  var headerPosition = $('#header').offset();
  var menuWidth = parseInt($('.main-content').css('width'));

  return animationDot.animate({
    transition: '1s',
    top: `${headerPosition.top}px`,
    left: `${headerPosition.left}px`,
    width: `${menuWidth}`
  });
}

function buildDropDownMenu(options) {
  var li = $('#menu li');
  li.mouseenter(function () {
    $(this).append(HTMLdropdownMenu);
    var dataValue = $(this).data().value;
    var specificObjects = findBy(options.data, options.keyMenu, dataValue);

    specificObjects.forEach( function (specificObject) {
      var menuItem = specificObject[options.keyDropdown];
      var item = options.htmlDropdown.replace('%data%', menuItem).replace('%data-value%', specificObject.id);
      $('#dropdown').append(item);
      $('#dropdown li').addClass('dropdown-item');
      showContentInfo(options.build);
    });
  }).mouseleave(function () {
    $('#dropdown li').remove();
    $('#dropdown').remove();
  });
}

function showContentInfo(callback) {
  var jobNames = $('#dropdown li');
  jobNames.each( function () {
    var job = $(this);
    job.click( function (evt) {
      evt.stopImmediatePropagation();
      var dataValue = $(this).data().value;
      if ($('#content-info').children().length !== 0) {
        slideUpContentInfo().promise().done( function () {
          callback(dataValue);
          $('#content-info').slideDown();
        });
      }
      else {
        callback(dataValue);
        $('#content-info').slideDown();
      }
    });
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
