Meteor.publish('Markers',function(){
	return Markers.find()
})

//Allows Methods

Markers.allow({
	insert:function(){return true;},
	remove:function(){return true;},
	update:function(){return false;},
})