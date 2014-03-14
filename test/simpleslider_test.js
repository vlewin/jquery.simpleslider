(function($) {
  /*global sinon:false */
  var slider = null;

  module("SimpleSlider", {
    setup: function () {
		slider = $("#simpleslider").simpleslider({
			link_selector: '.forward',
			back_link_selector : '.back',
			breadcrumb: {
				'selector': '#breadcrumb',
				'show': true,
				'animate': false,
				'speed': 150
			}
		});

      this.server = sinon.fakeServer.create();
      this.server.respondWith("GET", "/posts/1", [200, { "Content-Type": "plain/text" }, "AJAX response"]);

      sinon.stub(window.history, 'pushState', function (object) {
        if(object.path.indexOf('#') > -1) {
          location.hash = '#1';
        }
      });
    },

    teardown: function () {
      this.server.restore();
      window.history.pushState.restore();
    }
  });


  test("init() - should initialize a simpleslider", function () {
      equal(slider.id, '#simpleslider', 'sets slider id attribute');
      equal(slider.link_selector, '.forward', 'sets slider link_selector attributes');
      equal(slider.back_link_selector, '.back', 'sets slider back_link_selector attribute');
      equal(slider.breadcrumb.show, true, 'sets breadcrub attribute');
      equal(slider.breadcrumb_selector, '#breadcrumb', 'sets breadcrumb_selector attribute');
  });

  test("showBreadCrumb() - should show a slider breadcrumb", function () {
      slider.showBreadCrumb();
      equal($(slider.breadcrumb_selector).css("display"), 'block', 'breadcrumb visibility');
      equal($('#breadcrumb').find('li').length, 2, "number of items" );
  });

  test("hideBreadCrumb() - should hide a slider breadcrumb", function () {
      slider.hideBreadCrumb();
      equal($('#breadcrumb').find('li').length, 0, "number of items" );
  });

  test("forward() - slide and append AJAX response", function () {
      $( "a.forward" ).first().click();

      this.server.respond();
      equal($('#simpleslider').find('article').last().html(), "AJAX response", "updates details view" );
      equal($('#breadcrumb').find('li').length, 2, "number of items" );

      $( "a.back" ).first().click();
  });

  test("back() - slide back to index page", function () {
      $( "a.forward" ).first().click();
      $( "a.back" ).first().click();

      equal($('#breadcrumb').find('li').length, 0, "number of items" );
  });

  test("html() - sets last slider page content", function () {
      slider.html("Test");
      equal($('#simpleslider').find('article').last().html(), "Test", "HTML content");
  });

}(jQuery));
