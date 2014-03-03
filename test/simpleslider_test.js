(function($) {

  // QUnit.log = function(result, message)
  // {
  //     if (window.console && window.console.log)
  //     {
  //        window.console.log(result +' :: '+ message);
  //     }
  // }

  /*global sinon:false */
  var slider = null;

  module("SimpleSlider", {
    setup: function () {
      slider = $("#simpleslider").simpleslider({
          breadcrumb_selector: '#breadcrumb',
          breadcrumb: true,
          link_selector: '.slink',
          back_link_selector: '.back'
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
      equal(slider.link_selector, '.slink', 'sets slider link_selector attributes');
      equal(slider.back_link_selector, '.back', 'sets slider back_link_selector attribute');
      equal(slider.breadcrumb, true, 'sets breadcrub attribute');
      equal(slider.breadcrumb_selector, '#breadcrumb', 'sets breadcrumb_selector attribute');
  });

  test("activeLink() - should return jQuery object for active slider link", function () {
      $( "a.slink" ).first().click();

      var link = slider.activeLink();
      equal(window.location.hash, "#1", 'location hash');
      equal(link.attr('href'), '/posts/1', 'link href');
      equal(link.data('target'), '#1', 'data target');

      $( "a.back" ).first().click();

  });

  test("showBreadCrumb() - should show a slider breadcrumb", function () {
      slider.showBreadCrumb();

      equal($(slider.breadcrumb_selector).css("display"), 'block', 'breadcrumb visibility');
      equal($('#breadcrumb').find('li').length, 2, "number of items" );
      equal($('#breadcrumb').find('li').last().find('a').html(), slider.activeLink().data('title'), "last item name" );
  });

  test("hideBreadCrumb() - should hide a slider breadcrumb", function () {
      slider.hideBreadCrumb();
      equal($('#breadcrumb').find('li').length, 0, "number of items" );
  });

  test("forward() - slide and append AJAX response", function () {
      $( "a.slink" ).first().click();

      this.server.respond();
      equal($('#simpleslider').find('li').last().html(), "AJAX response", "updates details view" );
      notEqual($('#simpleslider').find('li').first().css('margin-left'), "0px", "last slider page");
      ok($('#simpleslider').find('li').last().hasClass('active'));

      $( "a.back" ).first().click();
  });

  test("back() - slide back to index page", function () {
      slider.back();

      equal($('#simpleslider').find('li').first().css('margin-left'), "0px", "first slider page");
      ok(!$('#simpleslider').find('li').last().hasClass('active'));
  });

  test("html() - sets last slider page content", function () {
      slider.html("Test");
      equal($('#simpleslider').find('li').last().html(), "Test", "HTML content");
  });

}(jQuery));
