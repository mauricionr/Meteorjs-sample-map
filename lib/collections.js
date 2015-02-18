Markers = new Mongo.Collection('Markers')

if(Meteor.isClient){
	Meteor.subscribe('Markers')
}