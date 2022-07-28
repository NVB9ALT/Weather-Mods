//This increases the maximum clouds density and also adjusts the density scalar with weather.
//If the weather is supposed to have a broken cloud layer, it actually renders such.
//And if there's few clouds, the clouds are actually few and far between.
//It is slightly laggier on Chromebooks but otherwise should have zero performance impact.

geofs.advancedClouds = {};
let clouds = geofs.preferences.advancedClouds;
geofs.advancedClouds.update = function() {
  if (clouds == true) {
    clouds = false;
    toggleA.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
  } else {
    clouds = true;
    toggleA.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded is-checked")
  }
};
let elementSel = document.getElementsByClassName('geofs-preference-list')[0].getElementsByClassName('geofs-advanced')[0].getElementsByClassName('geofs-stopMousePropagation')[0];
let toggleA = document.createElement("label");
    toggleA.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
    toggleA.setAttribute("for", "advancedClouds");
    toggleA.setAttribute("id", "advancedClouds");
    toggleA.setAttribute("tabindex", "0");
    toggleA.setAttribute("dataUpgraded", ",MaterialSwitch,MaterialRipple");
    toggleA.innerHTML = '<input type="checkbox" id="advancedClouds" class="mdl-switch__input" data-gespref="geofs.advancedClouds.preference"><span class="mdl-switch__label">Advanced 2d Clouds</span>';
elementSel.appendChild(toggleA);
toggleA.addEventListener("click", geofs.advancedClouds.update);
function runBetterClouds() {
if (geofs.preferences.graphics.advancedAtmosphere == false && clouds == true) {
   if (weather.definition.cloudCover <= 20) {
	   geofs.fx.cloudManager.cloudCoverToCloudNumber = 5
	};
	if (weather.definition.cloudCover > 20 && weather.definition.cloudCover <= 40) {
	   geofs.fx.cloudManager.cloudCoverToCloudNumber = 25
	};
	if (weather.definition.cloudCover > 40) {
	   geofs.fx.cloudManager.cloudCoverToCloudNumber = 75
   };
};
geofs.preferences.advancedClouds = clouds
geofs.savePreferences();
};
cloudsInterval = setInterval(function(){runBetterClouds()},1000)
