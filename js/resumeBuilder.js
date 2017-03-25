function Bio() {
}

function requestData() {
  return $.ajax({
    method: 'GET',
    url: 'js/json_data/bio.json',
    dataType: 'json'
  });
}

Bio.prototype.setData = function () {
  var _this = this;
  requestData().done(function (result) {
    _this.data = result;
  });
};

Bio.prototype.displayImage = function() {
  var image = this.pictureUrl;
}
