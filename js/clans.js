angular.module('openWarUtilsMod')
.directive('openWarClan', function() {
  return {
	restrict: 'A',
	scope: {
		name : '=openWarClan',
		units: '&openWarUnits'
	},
	templateUrl: 'clans.html'
  };
});
