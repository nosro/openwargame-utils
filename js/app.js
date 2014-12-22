'use strict';

/* Main Game Module */

/*
var openWarUtilsModule = angular.module('openWarUtils', [])
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/battle', {templateUrl: 'partials/battle.html', controller: openWarUtilsModule.BattleCtrl}).
		when('/upgrade', {templateUrl: 'partials/upgrade.html', controller: openWarUtilsModule.UpgradeCtrl}).
		otherwise({redirectTo: '/home'});
	}])
	.run(function( $rootScope) {
	// listen for any change to the model, and show save/cancel buttons when model changes.

	});
*/
angular.module('openWarUtilsMod', []);

angular.module('openWarUtilsMod')
.value('unitTypes', [
 { id: '1', name: 'scout', attack: 0, defense: 0, cost: 10, upkeep: 1}
,{ id: '2', name: 'ranger', attack: 1, defense: 0, cost: 20, upkeep: 2}
,{ id: '3', name: 'lookout', attack: 0, defense: 1, cost: 20, upkeep: 2}
,{ id: '4', name: 'warrior', attack: 1, defense: 1, cost: 30, upkeep: 2}
,{ id: '5', name: 'archer', attack: 2, defense: 0, cost: 40, upkeep: 3}
,{ id: '6', name: 'guard', attack: 0, defense: 2, cost: 40, upkeep: 3}
,{ id: '7', name: 'knight', attack: 2, defense: 2, cost: 70, upkeep: 3}
,{ id: '8', name: 'fusileer', attack: 3, defense: 1, cost: 90, upkeep: 4}
,{ id: '9', name: 'sentinel', attack: 1, defense: 3, cost: 90, upkeep: 4}
,{ id: '10', name: 'champion', attack: 3, defense: 3, cost: 150, upkeep: 4}
,{ id: '11', name: 'autocannon', attack: 4, defense: 2, cost: 190, upkeep: 5}
,{ id: '12', name: 'shieldmech', attack: 2, defense: 4, cost: 190, upkeep: 5}
,{ id: '13', name: 'warstrider', attack: 4, defense: 4, cost: 310, upkeep: 5}
,{ id: '14', name: 'bomber', attack: 5, defense: 3, cost: 390, upkeep: 6}
,{ id: '15', name: 'tank', attack: 3, defense: 5, cost: 390, upkeep: 6}
,{ id: '16', name: 'juggernaut', attack: 5, defense: 5, cost: 630, upkeep: 6}
]);

// This can become a simple service factory if we don't need to configure it
angular.module('openWarUtilsMod')
.provider('forces', [function Forces() {
	this.clans = {};
	// this.battles = 0;


	this.addClan = function (clanName) {
		if (clanName) {
			this.clans[clanName] = {name: clanName, units : []};
		}
		console.log('added Clan', this.clans);
	}

	this.getClans = function () {
		return this.clans;
	}

	this.getClan = function (clanName) {
		return this.clans[clanName];
	}

	this.addUnits = function (clanName, unitsCollection) {
		if (clanName && unitsCollection) {
			this.clans[clanName].units = unitsCollection;
		}
		console.log('added Units', this.clans[clanName].units);
	}
	this.getUnits = function (clanName) {

		if (clanName) {
			return this.clans[clanName].units;
		}
		console.log('get Units', this.clans[clanName].units);
	}	

// TODO this could be a separate battles service
	this.updateBattles = function (n) {
		this.battles = n;
	}
	this.getBattles = function () {
		return this.battles;
	}

	this.$get = function () {
		return new Forces();
	}
}]);

angular.module('openWarUtilsMod')
.config(function (forcesProvider) {
	var knight = {
			typeId : '7',
			inc : 1,
			name : 'knight_1',
			attack : 2,
			defense : 2,
			cost : 70,
			upkeep : 3
		};
	forcesProvider.addClan("The Good Guys");
	knight.name = 'white_knight';
	forcesProvider.addUnits("The Good Guys", new Array(angular.copy(knight)));
	forcesProvider.addClan("The Bad Guys");
	knight.name = 'black_knight';
	forcesProvider.addUnits("The Bad Guys", new Array(angular.copy(knight)));
});

angular.module('openWarUtilsMod')
.filter('deadClass', [function() {
	return function(input) {
		return (input)? 'dead' : '';
	}
}]);

// openWarUtilsMod.directive('openWarClan', [function () {
// 	restrict:'E',
// 	linkFunction: 
// 	return {
// 		controller: function($scope, $element, $attrs) {
// 			$scope.test = 'foo';
// 			// clanCtrl.initClan(attrs.openWarClan);
// 		}
// 	}
// }]);


