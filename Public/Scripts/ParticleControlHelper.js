// ParticleControlHelper.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Plays Particle on trigger

// @input string particleTrigger = TouchStartEvent { "widget": "combobox", "values": [ { "label": "Brows Lowered", "value": "BrowsLoweredEvent" }, { "label": "Brows Raised", "value": "BrowsRaisedEvent" }, { "label": "Brows Returned To Normal", "value": "BrowsReturnedToNormalEvent" }, { "label": "Face Found", "value": "FaceFoundEvent" }, { "label": "Face Lost", "value": "FaceLostEvent" }, { "label": "Kiss Finished", "value": "KissFinishedEvent" }, { "label": "Kiss Started", "value": "KissStartedEvent" }, { "label": "Mouth Closed", "value": "MouthClosedEvent" }, { "label": "Mouth Opened", "value": "MouthOpenedEvent" }, { "label": "Smile Finished", "value": "SmileFinishedEvent" }, { "label": "Smile Started", "value": "SmileStartedEvent" }, { "label": "Touch Start", "value": "TouchStartEvent" }, { "label": "Touch End", "value": "TouchEndEvent" }, { "label": "Tap", "value": "TapEvent" } ] }

//@ui {"widget":"separator"}
// @input bool stoppable = false 
// @input string particleStopper = TouchEndEvent { "widget": "combobox", "values": [ { "label": "Brows Lowered", "value": "BrowsLoweredEvent" }, { "label": "Brows Raised", "value": "BrowsRaisedEvent" }, { "label": "Brows Returned To Normal", "value": "BrowsReturnedToNormalEvent" }, { "label": "Face Found", "value": "FaceFoundEvent" }, { "label": "Face Lost", "value": "FaceLostEvent" }, { "label": "Kiss Finished", "value": "KissFinishedEvent" }, { "label": "Kiss Started", "value": "KissStartedEvent" }, { "label": "Mouth Closed", "value": "MouthClosedEvent" }, { "label": "Mouth Opened", "value": "MouthOpenedEvent" }, { "label": "Smile Finished", "value": "SmileFinishedEvent" }, { "label": "Smile Started", "value": "SmileStartedEvent" }, { "label": "Touch Start", "value": "TouchStartEvent" }, { "label": "Touch End", "value": "TouchEndEvent" }, { "label": "Tap", "value": "TapEvent" }], "showIf":"stoppable" }

// Get the Particle's Mesh Visual
var meshVis = script.getSceneObject().getFirstComponent("Component.MeshVisual");
// Variable to store what time particle started
var startTime;

// Update the particle time every frame when needed
function update()
{
	if (startTime) 
	{
		// Calculate how many seconds have elapsed since we've triggered partcles
		var particleTime = getTime() - startTime;

		// Pass it in to our Particle Material
		meshVis.mainPass.externalTimeInput = particleTime; 
	}
}
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(update);


// On an event, store the time when particle is triggered
function startParticle()
{
	startTime = getTime();
}
var particleTriggerEvent = script.createEvent(script.particleTrigger);
particleTriggerEvent.bind(startParticle);


if (script.stoppable) {
	// On an event, store the time when particle is triggered
	function stopParticle()
	{
		startTime = 0;
		meshVis.mainPass.externalTimeInput = 0; 
	}
	var particleStopEvent = script.createEvent(script.particleStopper);
	particleStopEvent.bind(stopParticle);	
}
