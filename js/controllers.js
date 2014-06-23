'use strict';

openWarUtilsMod.controller('BattleCtrl', ['$scope', 'forces', function ($scope, forces) {
	$scope.fight = function () {
		var clanForces = forces.getUnits(),
			otherClanName,
			units,
			otherUnits,
			unit,
			otherUnit,
			deal,
			take,
			damage
		;

		for (var clanName in clanForces) {
			// While we just have two clans fighting this works TODO - pluralize for more
			for (var testClanName in clanForces) {
				if (testClanName != clanName) {
					otherClanName = testClanName;
					otherUnits = clanForces[otherClanName];
				}
			}
			console.log(clanName + ' vs ' + otherClanName);
			units = clanForces[clanName];
			for (var i = 0; i < units.length; i++) {
				unit = units[i];
				if (!unit.dead) {
					// TODO - this is not proper binary progression of value
					unit.dealt = Math.floor(Math.random() * (unit.attack + 1));
					console.log(clanName, unit.name, 'total dealt:', unit.dealt);
					damage = 0;
					for (var j = 0; j < otherUnits.length; j++) {
						otherUnit = otherUnits[j];
						if (otherUnit.dead || otherUnit.taken == otherUnit.blocked + 1) {
							continue;
						}
						if (damage >= unit.dealt) {
							break;
						}
						if (!otherUnit.blocked) {
							// TODO - this is not proper binary progression of value
							otherUnit.blocked = Math.floor(Math.random() * (otherUnit.defense + 1));
						}
						if (!otherUnit.taken) {
							otherUnit.taken = 0;
						}
						console.log(clanName, unit.name, 'hits:', otherUnit.name, 'total blocked:', otherUnit.blocked);
						// TODO - eventually we may have health
						if (otherUnit.taken <= otherUnit.blocked + 1) {
							deal = unit.dealt - damage;
							take = Math.min(deal, otherUnit.blocked + 1 - otherUnit.taken);
							otherUnit.taken = otherUnit.taken + take;
							damage = damage + take;
							console.log(otherClanName, otherUnit.name,'take/deal:', take + '/' + deal, 'total taken:', otherUnit.taken, 'damage dealt', damage);
						}
					}
				}
			}
		};
		for (var clanName in clanForces) {
			console.log('cleanup', clanName);
			units = clanForces[clanName];
			// CLEANUP
			for (var i = 0; i < units.length; i++) {
				unit = units[i];
				if (unit.taken >= unit.blocked + 1) {
					console.log(unit, unit.taken, unit.blocked, ' dead')
					unit.dead = 1;
				}
				unit.dealt = 0;
				unit.blocked = 0;
			}
		}
		console.log(forces.battles);
		forces.battles = forces.battles + 1;
		console.log(forces.battles);
		$scope.error = "Fight!";
		//$scope.error = "Sorry, can't fight - programming isn't done yet!";
	}
}]);

openWarUtilsMod.controller('ClanCtrl', ['$scope', '$attrs', 'unitTypes', 'forces',  function ($scope, $attrs, unitTypes, forces) {
	var shuffle = function (array) {
		var m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
		}

		return array;
	},
	safeName = function(name) {
		return name.replace(/[^a-z0-9]/g, function(s) {
			var c = s.charCodeAt(0);
			if (c == 32) return '-';
			if (c >= 65 && c <= 90) return s.toLowerCase();
			return '__' + ('000' + c.toString(16)).slice(-4);
		});
	},
	// sort by indexes
	// http://stackoverflow.com/q/4046967/3261678
	getSorted = function(arr, sortArr) {
		var result = [];
		for(var i=0; i<arr.length; i++) {
			result[i] = arr[sortArr[i]];
		}
		return result;
	},
	setupSortable = function() {
		var mySort = document.getElementById($scope.clanSortName),
			group = $scope.clanName,
			sortable = new Sortable(mySort, {
			handle: '.sortable-handle',
			draggable: '.sortable-item',
			onUpdate: function (evt){
				// get new sort order based on indexes
				var newSortIndexes = [];
				var itemsList = mySort.querySelectorAll('.sortable-item');
				for (var i=0; i<itemsList.length; i++) {
					newSortIndexes.push(itemsList[i].getAttribute('data-index'));
				}

				// process change
				$scope.newSortIndexes = newSortIndexes;
				$scope.units = getSorted($scope.units, newSortIndexes);
				$scope.$apply();
				
				// example of a standard $http request you would do
				// note that you don't need $scope.$apply(); for $http requests
				// http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
				/*
				$http.post('your/url', { newSortIndexes: newSortIndexes }).success(function(data) {
				$scope.people = data;
				})
				*/
			}
		});
	},
	initClan = function(name) {
		if (name) {
			$scope.clanName = name.toString();
			$scope.clanSortName = safeName(name.toString()) + '-sortable';
			// TODO - could make a getClan method to test existence
			if (forces.getUnits(name)) {
				$scope.units = forces.getUnits(name);
			} else {
				forces.addClan(name);
				$scope.units = forces.getUnits($scope.clanName);
			}
			updateUnits($scope.clanName, $scope.units);
			$scope.battles = forces.battles;
		}
	},
	updateUnits = function(name, units) {
		forces.addUnits(name, units);
	}
	;

	// EXPORT METHODS FOR TEMPLATE UI BINDING
	$scope.addUnit = function (unitType) {
		var inc = 0,
			newUnit = {
				typeId : unitType.id,
				inc : inc,
				name : unitType.name,
				attack : unitType.attack,
				defense : unitType.defense,
				cost : unitType.cost,
				upkeep : unitType.upkeep,
			},
			unit
		;

		for (var i in $scope.units) {
			unit = $scope.units[i];
			if (unit && unit.hasOwnProperty('typeId')) {
				if (unit.typeId == unitType.id) {
					inc = Math.max(unit.inc, inc);
				}
			} else {
				console.log('error adding', unit)
			}
		}
		newUnit.inc = inc + 1;
		newUnit.name = newUnit.name + '_' + newUnit.inc;
		$scope.units.push(newUnit);
		setupSortable();
	};
	$scope.removeUnit = function (unitName) {
		var unit
		;

		for (var i in $scope.units) {
			unit = $scope.units[i];
			if (unit.name == unitName) {
				break;
			}
		}

		$scope.units.splice(i, 1);
		setupSortable();
	};
	$scope.shuffleUnits = function () {
		$scope.units = shuffle($scope.units);
	};

	// INITIALIZE
	$scope.unitTypeList = unitTypes;
	$scope.selectedUnit = null;
	if ('openWarClan' in $attrs) {
		initClan($attrs.openWarClan);
	}

	// TESTING
	$scope.$watch('units', function (newValue, oldValue, scope) {
		console.log('watcher')
	});
	//forces.addClan($scope.clanName);
}]);
