Template.home.onRendered(function(){
  //We use Tracker to re-render map
  //when a new marker is added
   Tracker.autorun(function(){
          initializeMap();
   })
})

//Global Function to initialize the map
initializeMap = function() {
	//Global Variables
	var marker2,markers = [],markerCords = Markers.find({},{fields:{lat:1,lng:1}}).fetch();
	console.log(markerCords)
	//Map options
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(26.093158, -98.282743), //Reynosa,Tamaulipas Lat and Long (where im)
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(
        document.getElementById('map'),
          mapOptions
        );
    //Event to insert map on the "click" event
    google.maps.event.addListener(map, 'click', function(event,template) {
       var myLatLng = event.latLng,
           lat = myLatLng.lat(),
           lng = myLatLng.lng();
        Markers.insert({lat:lat,lng:lng},function(err,result){
            if(!err){
            	console.log(result)
            }
        })
  });
  //function to create the markers
  function crearMarkers(){
          for(var i=0;i<markerCords.length;i++){
     var lat = markerCords[i].lat
         lng = markerCords[i].lng;
    marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(lat ,lng),
          map: map,
          title: 'Dynamic marker on the lat ' + lat + ' and long ' + lng,
          icon :'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
           
          markers.push(marker2);  
    }
  }
  //Initializing the marker function.
  crearMarkers();
  for(var i =0;i<markers.length;i++){
  	        //Deleting markers event
            google.maps.event.addListener(markers[i], 'click', function() {
              var finde = Markers.findOne({lng:this.position.D});
              Markers.remove({_id:finde._id})
          });
  }

 
}
