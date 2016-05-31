require('angular');
require('angular-ui-router');
require('lodash');
require('restangular');

angular.module('cyrcleoflifeApp', ['ui.router', 'restangular'])
  .config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/birth');
    $stateProvider
      .state('birth', {
        url: '/birth',
        template: '<div>{{apiText}}><button ui-sref=".childhood">Enfance</button><div ui-view></div></div>',
	controller: function($scope, apiText){
          $scope.apiText = apiText.message;
	},
        resolve: {
           apiText : function(Restangular){
             Restangular.setBaseUrl('http://foaas.com/');
             return Restangular.one('awesome', 'moi').get();
           }
        }
        
      })
      .state('birth.childhood', {
        url: '/childhood',
        template: '<div>{{apiText}}<br><button ui-sref=".study">Etude</button><br><button ui-sref="birth.childhood.career">Carrière</button><div ui-view></div></div>',
	controller: function($scope, apiText){
          $scope.apiText = apiText.message;
	},
        resolve: {
           apiText : function(Restangular){
             Restangular.setBaseUrl('http://foaas.com/');
             return Restangular.one('zain', 'moi').get();
           }
        }
      })
      .state('birth.childhood.study', {
        url: '/study',
        template: '<div>{{apiText}}<br><button ui-sref=".phd">phd</button><button ui-sref=".workinglife">Travaille le reste de ta vie</button><div ui-view></div></div>',
	controller: function($scope, apiText){
          $scope.apiText = apiText.message;
	},
        resolve: {
           apiText : function(Restangular){
             Restangular.setBaseUrl('http://foaas.com/');
             return Restangular.one('what', 'moi').get();
           }
        }
      })
      .state('birth.childhood.study.phd', {
        url: '/phd',
        template: '<div>{{apiText}}<br><button ui-sref=".workinglife">Travaille le reste de ta vie</button><div ui-view></div></div>',
	controller: function($scope, apiText){
          $scope.apiText = apiText.message;
	},
        resolve: {
           apiText : function(Restangular){
             Restangular.setBaseUrl('http://foaas.com/');
             return Restangular.one('donut', 'moi').get();
           }
        }
      })
      .state('birth.childhood.career', {
        url: '/career',
        template: '<div>{{apiText}}<br><button ui-sref=".workinglife">Travaille le reste de ta vie</button><div ui-view></div></div>',
	controller: function($scope, apiText){
          $scope.apiText = apiText.message;
	},
        resolve: {
           apiText : function(Restangular){
             Restangular.setBaseUrl('http://foaas.com/');
             return Restangular.one('thanks', 'moi').get();
           }
        }
      });

      addWorkingLife($stateProvider, 'birth.childhood.study.phd');
      addWorkingLife($stateProvider, 'birth.childhood.study');
      addWorkingLife($stateProvider, 'birth.childhood.career');

      function addWorkingLife($stateProvider, parent){
        $stateProvider.state(`${parent}.workinglife`, {
          url: '/workinglife',
          template: '<div>{{apiText}}<br><button ui-sref=".pension">pension</button><div ui-view></div></div>',
	  controller: function($scope, apiText){
         	 $scope.apiText = apiText.message;
	  },
	  resolve: {
	     apiText : function(Restangular){
		     Restangular.setBaseUrl('http://foaas.com/');
		     return Restangular.one('life', 'moi').get();
	     }
	  }
        })
        .state(`${parent}.workinglife.pension`, {
          url: '/pension',
          template: '<div>{{apiText}}<br><button ui-sref=".death">La mort</button><div ui-view></div></div>',
	  controller: function($scope, apiText){
         	 $scope.apiText = apiText.message;
	  },
	  resolve: {
	     apiText : function(Restangular){
	     Restangular.setBaseUrl('http://foaas.com/');
	     return Restangular.one('because', 'moi').get();
	    }
	  }
        })
        .state(`${parent}.workinglife.pension.death`, {
          url: '/death',
          template: '<div>{{apiText}}<br><button ui-sref="birth">Renaissance !</button></div>',
	  controller: function($scope, apiText){
         	 $scope.apiText = apiText.message;
	  },
	  resolve: {
	    apiText : function(Restangular){
	     Restangular.setBaseUrl('http://foaas.com/');
	     return Restangular.one('bye', 'moi').get();
	    }
	   }
        });
      }

}]);
