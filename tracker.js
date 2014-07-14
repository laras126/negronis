$('form').hide();
$('#message').html('Please enable geolocation if you want a Negroni (look below your URL bar).').addClass('alert warning');

navigator.geolocation.getCurrentPosition(showPosition);
$('.pos').text(showPosition);

function showPosition(position) {
	console.log(position);
  
  var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;

  var targetLatitude = 40.725644;
	var targetLongitude = -73.984055;
  
  var proximity = distance(userLatitude, userLongitude, targetLatitude, targetLongitude);
  var radius = 0.1;
  
  var miles = Math.round(proximity*.6214);

  if ( proximity < radius ) {
		// user is at location
    $('form').show();
    $('#message').text('Check in with your Twitter handle:');

  } else {
    // user not at location
    $('form').hide();
    $('#message').html('You are ' + miles + ' miles from a delicious Negroni at the <strong><a href="http://ginpalaceny.com/" target="blank">Gin Palace</a></strong> in East Village.').removeClass('warning').addClass('notice');
  }
	
  console.log(proximity);
}

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;
}
