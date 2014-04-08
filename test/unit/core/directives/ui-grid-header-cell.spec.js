describe('uiGridHeaderCell', function () {
  var grid, $scope, $compile, $document, recompile;

  var data = [
    { "name": "Ethel Price", "gender": "female", "company": "Enersol" },
    { "name": "Claudine Neal", "gender": "female", "company": "Sealoud" },
    { "name": "Beryl Rice", "gender": "female", "company": "Velity" },
    { "name": "Wilder Gonzales", "gender": "male", "company": "Geekko" }
  ];

  beforeEach(module('ui.grid'));

  beforeEach(inject(function (_$compile_, $rootScope, _$document_) {
    $scope = $rootScope;
    $compile = _$compile_;
    $document = _$document_;

    $scope.gridOpts = {
      enableSorting: true,
      data: data
    };

    recompile = function () {
      grid = angular.element('<div style="width: 500px; height: 300px" ui-grid="gridOpts"></div>');
      
      $compile(grid)($scope);

      $document[0].body.appendChild(grid[0]);

      $scope.$digest();
    };

    recompile();
  }));

  afterEach(function() {
    grid.remove();
  });

  describe('column menu', function (){ 
    var headerCell1,
          headerCell2,
          menu;

      beforeEach(function () {
        headerCell1 = $(grid).find('.ui-grid-header-cell:nth(0)');
        headerCell2 = $(grid).find('.ui-grid-header-cell:nth(1)');

        menu = $(grid).find('.ui-grid-column-menu .inner');
      });

    describe('showing a menu with long-click', function () {
      it('should open the menu', inject(function ($timeout) {
        headerCell1.trigger('mousedown');
        $scope.$digest();
        $timeout.flush();
        $scope.$digest();

        expect(menu.hasClass('ng-hide')).toBe(false, 'column menu is visible (does not have ng-hide class)');
      }));
    });

    describe('right click', function () {
      it('should do nothing', inject(function($timeout) {
        headerCell1.trigger({ type: 'mousedown', button: 3 });
        $scope.$digest();
        $timeout.flush();
        $scope.$digest();

        expect(menu.hasClass('ng-hide')).toBe(true, 'column menu is not visible');
      }));
    });

    describe('clicking outside visible menu', function () {
      it('should close the menu', inject(function($timeout) {
        headerCell1.trigger('mousedown');
        $scope.$digest();
        $timeout.flush();
        $scope.$digest();

        expect(menu.hasClass('ng-hide')).toBe(false, 'column menu is visible');

        $document.trigger('click');
        $scope.$digest();
        
        expect(menu.hasClass('ng-hide')).toBe(true, 'column menu is hidden');        
      }));
    });
  });

});