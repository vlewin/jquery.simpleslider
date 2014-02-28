/*! Simpleslider - v0.1.0 - 2014-02-28
* https://github.com/vlewin/jquery.simpleslider
* Copyright (c) 2014 Vladislav Lewinn; Licensed MIT */

/*global $:false */

var simpleSlider = function(element, opts) {
  this.init = function() {
    this.id = element.selector;
    this.element = $(this.selector);
    this.breadcrumb = opts.breadcrumb;
    this.breadcrumb_selector = opts.breadcrumb_selector;
    this.link_selector = opts.link_selector;
    this.back_link_selector = opts.back_link_selector;

    this.bind();
  };

  //=== Helper methods
  this.activeLink = function() {
    return $(this.id).find("a[data-target='" + location.hash + "']");
  };

  //=== Chainable methods
  this.showBreadCrumb = function() {
    if(this.breadcrumb) {
      var parentName = location.pathname.replace(/\//g, '').capitalize();
      var childName = this.activeLink().data('title');
      var back_arrow = '<i class="fa fa-lg fa-arrow-circle-left"></i> ';
      var parent = '<li><a class="back">' + back_arrow + parentName + '</a>';
      var child = '<li><a>' + childName + '</a></li>';
      $(this.breadcrumb_selector).html(parent).append(child).show();
    }
    return this;
  };

  this.hideBreadCrumb = function() {
    if(this.breadcrumb) {
      $(this.breadcrumb_selector).html('');
    }
    return this;
  };

  this.html = function(data) {
    $(this.id).find('ul li:last-of-type').html(data);
    return this;
  };

  this.wait = function() {
    this.html('<img src="/assets/spinner.gif" alt="Spinner"> Please wait ...');
    return this;
  };

  this.slide = function(direction, animation) {
    var first_slide = $(this.id).find('ul li:first-of-type');

    if (typeof(animation) === 'undefined') {
      first_slide.addClass('animated');
    } else {
      first_slide.removeClass('animated');
    }

    if (direction === 'right') {
      first_slide.css('margin-left', '-100%');
    } else {
      first_slide.css('margin-left', '0%');
    }
    return this;
  };

  this.forward = function(pageurl) {
    var plugin  = this;
    $.get(pageurl, function(data) {
      plugin.showBreadCrumb().slide('right').html(data);
    });

    return this;
  };

  this.back = function() {
    this.hideBreadCrumb().slide('left');
  };

  // DOM event handling
  this.bind = function() {
    var plugin = this;

    $(window).on('load', function(e) {
      if (location.hash) {
        e.preventDefault();

        plugin.forward(location.href.replace('#', ''));
        return false;

      } else {
        // Browser history
        window.history.pushState(
          { path: location.pathname },
          'Index',
          location.pathname
        );
      }
    });

    $(window).on('popstate', function(e) {
      if (location.hash) {
        e.preventDefault();

        plugin.forward(location.href.replace('#', ''));
        return false;

      } else {
        plugin.back();
      }
    });

    $(document).on('click', this.link_selector, function(e) {
      e.preventDefault();

      var id = $(this).data('id');
      var target = $(this).data('target');
      var history_pathname = this.pathname.replace(id, target);

      plugin.forward(this.pathname);

      // Browser history
      window.history.pushState(
        {path: history_pathname},
        $(this).data('title'),
        history_pathname
      );

      return false;
    });

    $(document).on('click', this.back_link_selector, function(e) {
      if (location.hash) {
        e.preventDefault();

        plugin.back();

        // Browser history
        window.history.pushState(
          {path: location.pathname},
          'Index',
          location.pathname
        );

        return false;
      }
    });

  };

};

(function($) {
  $.fn.simpleslider = function(options) {
    var opts = $.extend({}, $.fn.simpleslider.defaults, options);
    var instance = new simpleSlider($(this), opts);
    instance.init();
  };
}(jQuery));



