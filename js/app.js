'use strict';

/* Main Game Module */

/*
var OpenWarUtilsModule = angular.module('openWarUtils', [])
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/battle', {templateUrl: 'partials/battle.html', controller: OpenWarUtilsModule.BattleCtrl}).
		when('/upgrade', {templateUrl: 'partials/upgrade.html', controller: OpenWarUtilsModule.UpgradeCtrl}).
		otherwise({redirectTo: '/home'});
	}])
	.run(function( $rootScope) {
	// listen for any change to the model, and show save/cancel buttons when model changes.

	});
*/
var OpenWarUtilsApp = angular.module('OpenWarUtilsApp', []);

OpenWarUtilsApp.factory('UnitTypesData', [function () {
	var unitTypeList = [
 { id: '1', name: 'scout', attack: '0', defense: '0', cost: '10', upkeep: '1'}
,{ id: '2', name: 'ranger', attack: '1', defense: '0', cost: '20', upkeep: '2'}
,{ id: '3', name: 'lookout', attack: '0', defense: '1', cost: '20', upkeep: '2'}
,{ id: '4', name: 'warrior', attack: '1', defense: '1', cost: '30', upkeep: '2'}
,{ id: '5', name: 'archer', attack: '2', defense: '0', cost: '40', upkeep: '3'}
,{ id: '6', name: 'guard', attack: '0', defense: '2', cost: '40', upkeep: '3'}
,{ id: '7', name: 'knight', attack: '2', defense: '2', cost: '70', upkeep: '3'}
,{ id: '8', name: 'fusileer', attack: '3', defense: '1', cost: '90', upkeep: '4'}
,{ id: '9', name: 'sentinel', attack: '1', defense: '3', cost: '90', upkeep: '4'}
,{ id: '10', name: 'champion', attack: '3', defense: '3', cost: '150', upkeep: '4'}
,{ id: '11', name: 'autocannon', attack: '4', defense: '2', cost: '190', upkeep: '5'}
,{ id: '12', name: 'shieldmech', attack: '2', defense: '4', cost: '190', upkeep: '5'}
,{ id: '13', name: 'warstrider', attack: '4', defense: '4', cost: '310', upkeep: '5'}
,{ id: '14', name: 'bomber', attack: '5', defense: '3', cost: '390', upkeep: '6'}
,{ id: '15', name: 'tank', attack: '3', defense: '5', cost: '390', upkeep: '6'}
,{ id: '16', name: 'juggernaut', attack: '5', defense: '5', cost: '630', upkeep: '6'}
	];
	return unitTypeList
}]);
