const sideBar = {
  build: {}
};

sideBar.getBio = function (buildBio) {
  $.get( 'js/json_data/bio.json'
  ).done(function (data) {
    buildBio(data);
  });
};

function buildBio(data) {
  sideBar.bio = data;
}

sideBar.buil.addImage = function  () {
  var imageUrl = sideBar.data.pictureUrl;
  var image = HTMLimageSidebar.replace('%data%', imageUrl)
  $('#sidebar').append(image);
};

sideBar.getBio(buildBio);
sidebar.build.addImage()
