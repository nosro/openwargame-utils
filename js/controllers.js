'use strict';

OpenWarUtilsApp.controller('BattleCtrl', ['$scope', function ($scope) {
 
}]);

OpenWarUtilsApp.controller('UnitCtrl', ['$scope', 'UnitTypesData', function ($scope, UnitTypesData) {
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
	// sort by indexes
	// http://stackoverflow.com/q/4046967/3261678
	getSorted = function(arr, sortArr) {
		var result = [];
		for(var i=0; i<arr.length; i++) {
			result[i] = arr[sortArr[i]];
		}
		return result;
	}
	;

	$scope.unitTypeList = UnitTypesData;
	$scope.units = [];
	$scope.selectedUnit = null;
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

	var setupSortable = function() {
		var mySort = document.getElementById($scope.sortableId),
			group = $scope.sortableId,
			sortable = new Sortable(mySort, {
			handle: '.sortable-handle',
			draggable: '.sortable-item',
			onUpdate: function (evt){
				// get new sort order based on indexes
				var newSortIndexes = [];
				var liElements = mySort.getElementsByTagName("tr");
				for (var i=0; i<liElements.length; i++) {
					newSortIndexes.push(liElements[i].getAttribute('data-index'));
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
	}

	//console.log($scope.attr('title'));
}]);

// OpenWarUtilsApp.directive('tooltip', [function () {
// 	return {
// 		restrict:'A',
// 		link: function(scope, element, attrs)
// 		{
// 			$(element)
// 				.attr('title',scope.$eval(attrs.tooltip))
// 				.tooltip({placement: "right"});
// 		}
// 	}
// }]);

// OpenWarUtilsApp.directive('openWarUnits', [function(){
// 	return {
// 		restrict: 'A',
// 		replace: false,
// 		// transclude: true,
// 		scope: { openWarUnits:'@' }
// 	};
// }]);
