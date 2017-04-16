getBio = function () {
  return $.get( 'js/json_data/bio.json');
};

// sidebar
const sideBar = {
  divSidebar: $('#sidebar'),
  divHeader: $('#sidebar-header'),
  divContacts: $('#contacts'),
  showBar: true,
  display: function () {
    addImageSidebar();
    addHeaderInfo();
    addContactsSidebar();
    hideSidebar();
  }
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
  open: false,
  options: {
    keyMenu: 'language',
    keyDropdown: 'title',
    build: buildProject,
    icon: $('#projects')
  }
};

// project specific function
//
myProjects.getData = function () {
  return $.get('js/json_data/projects.json');
};

myProjects.display = function (data) {
  myProjects.options.data = data.projects;
  buildHeader(myProjects.options);
};

// this is executed as a callback to the function showContentInfo

function buildProject(dataValue) {
  var projects = myProjects.options.data;
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

  main.contentInfo.append(HTMLdivText, HTMLdivMultimedia);
  $('.text').append(title, date, language, frameworks, description);
  $('.multimedia').append(image);
}

// jobs

const myJobs = {
  open: false,
  options: {
    keyMenu: 'title',
    keyDropdown: 'employer',
    build: buildJob,
    icon: $('#work')
  }
};

myJobs.display = function (data) {
  myJobs.options.data = data.jobs;
  buildHeader(myJobs.options);
};

// this is executed as a callback to the function showContentInfo

function buildJob(dataValue) {
  var jobs = myJobs.options.data;
  var job = jobs.find(clicked, dataValue);

  var employer = HTMLjobEmployer.replace('%data%', job.employer);
  var title = HTMLjobTitle.replace('%data%', job.title);
  var location = HTMLjobLocation.replace('%data%', job.location);
  var dates = HTMLjobDate.replace('%data%', job.dates);
  var description = HTMLjobDescription.replace('%data%', job.description);

  if (main.contentInfo.children().length !== 0) {
    main.contentInfo.children().remove();
  }

  main.contentInfo.append(HTMLdivText);
  $('.text').append(employer, title, location, dates, description);
}

// education

const myEducation = {
  open: false,
  options: {
    keyMenu: 'type',
    keyDropdown: 'name',
    build: buildCourses,
    icon: $('#education')
  }
};

myEducation.display = function (data) {
  myEducation.options.data = data.courses;
  buildHeader(myEducation.options);
};

// this is executed as a callback to the function showContentInfo

function buildCourses(dataValue) {
  var location;
  var grade;
  var image;
  var courses = myEducation.options.data;
  var course = courses.find(clicked, dataValue);
  var name = HTMLeducationName.replace('%data%', course.name);
  var date = HTMLeducationDate.replace('%data%', course.degreeDates);
  var description = HTMLeducationDescription.replace('%data%', course.description);

  if ( course.grade ) {
    grade = HTMLeducationGrade.replace('%data%', course.grade);
  }

  if (main.contentInfo.children().length !== 0) {
    main.contentInfo.children().remove();
  }

  main.contentInfo.append(HTMLdivText, HTMLdivMultimedia);

  if ( course.location ) {
    location = HTMLeducationLocation.replace('%data%', course.location);
    initializeWhenReady([ course.location ], '.multimedia', googleMapSmall);
  }

  $('.text').append(name, location, date, grade, description);

  if ( course.certificate ) {
    image = HTMLeducationCertificate.replace('%data%', course.certificate);
    $('.multimedia').append(image);
  }

  $('.text').fadeIn();
  $('.multimedia').fadeIn();
}

// functions for building the sidebar

function  addImageSidebar() {
  var imageUrl = sideBar.data.pictureUrl;
  var image = HTMLimageSidebar.replace('%data%', imageUrl);
  sideBar.divSidebar.prepend(image);
}

function addHeaderInfo() {
  var bioName = sideBar.data.name;
  var bioRole = sideBar.data.role;
  var bioWelcomeMessage = sideBar.data.welcomeMessage;

  var name = HTMLname.replace('%data%', bioName);
  var role  = HTMLrole.replace('%data%', bioRole);
  var welcomeMessage = HTMLwelcomeMessage.replace('%data%', bioWelcomeMessage);

  sideBar.divHeader.append(name, role, welcomeMessage);
}

function addContactsSidebar() {
  var contacts = sideBar.data.contacts;
  for ( var contact in contacts ) {
    var contactText = contacts[contact];

    var icon = HTMLiconContacts.replace('%data%', `img/${contact}.svg`);
    var text = HTMLcontactInfo.replace('%data%', contactText).replace('%contactType%', contact);

    sideBar.divContacts.append(HTMLcontact);
    var lastContact = $('.contact').last();

    lastContact.append(icon, text);
  }
}

function hideSidebar() {
  $('#hide-side-bar').click( function () {
    if ( sideBar.showBar ) {
      closeSidebar();
    }
    else {
      openSidebar();
    }
  });
}

function closeSidebar() {
  $('#main').addClass('slide-left');
  sideBar.showBar = false;
}

function openSidebar() {
  $('#main').removeClass('slide-left');
  sideBar.showBar = true;
}

$.when(getBio()).done(function (data) {
  sideBar.data = data;
  sideBar.display();

  $(document).ready(function () {
    setTimeout(function () {
      closeSidebar();
    }, 1000);
  });
});

// when clicking an icon the relative content is displayed

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
    if ( $('#map').css('display') !== 'none') {
      $('#map').fadeOut('slow', function () {
        $(this).remove();
      });
    }
    $('#menu').slideUp();
    slideUpContentInfo().promise().done( function () {
      $('#menu').promise().done( function () {
        closeIfOpen();
        iconCategory.open = true;
        $.when(getBio()).done(function (data) {
          iconCategory.display(data);
        });
      });
    });
  }
}

// close main content if open

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

function buildHeader(options) {
  animateMenu(options.icon).promise().done(function () {
    setTimeout(function () {
      $('.animation').remove();

      main.header.append(HTMLcontentHeader);
      $('#menu').slideDown();

      var ulHeader = $('#header ul');
      var uniqueValues = unique(options.data, options.keyMenu);

      uniqueValues.forEach( function (value) {
        var title = HTMLcontentMenu.replace('%data%', value)
          .replace('%data-value%', value);
        ulHeader.append(title);
      });

      $('#menu li').each( function () {
        $(this).css('width', `${ 100 / uniqueValues.length }%`);
      });

      buildDropDownMenu(options);
    });
  });
}

function animateMenu(icon) {
  $('body').append(HTMLdivAnimation);
  var animationDot = $('.animation');
  var position = icon.offset();
  var headerPosition = $('#header').offset();
  var menuWidth = parseInt($('.main-content').css('width'));

  return animationDot.animate({
    left: `${position.left += 35}px`,
    top: `${position.top += 20}px`
  }).animate({
    top: `${headerPosition.top}px`,
    left: `${headerPosition.left}px`,
    width: `${menuWidth}`
  }, 1000, 'easeOutQuart');
}

function buildDropDownMenu(options) {
  var li = $('#menu li');
  li.mouseenter(function () {
    $(this).append(HTMLdropdownMenu);
    var dataValue = $(this).data().value;
    var specificObjects = findBy(options.data, options.keyMenu, dataValue);

    specificObjects.forEach( function (specificObject) {
      var menuItem = specificObject[options.keyDropdown];
      var item = HTMLdropdownLiMenu.replace('%data%', menuItem).replace('%data-value%', specificObject.id);
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
          slideDownContentInfo().promise().done(function () {
            callback(dataValue);
          });
        });
      }
      else {
        slideDownContentInfo().promise().done(function () {
          callback(dataValue);
        });
      }
    });
  });
}

function slideUpContentInfo() {
  $('#content-info').children().fadeOut();
  return $('#content-info').slideUp();
}

function slideDownContentInfo() {
  return $('#content-info').slideDown({
    start: function () {
      $(this).css({
        display: 'flex'
      });
    }
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
