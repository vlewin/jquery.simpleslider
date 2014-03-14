/*! Simplediv - 1.0.4 - 2014-03-14
* https://github.com/vlewin/jquery.simplediv
* Copyright (c) 2014 Vladislav Lewinn; Licensed MIT */

/*global $:false */

var SimpleSlider = function(element, opts) {
  this.init = function() {
    this.id = element.selector;
    this.element = $(this.selector);
    this.link_selector = opts.link_selector;
    this.back_link_selector = opts.back_link_selector;

    this.spinner = opts.spinner;
    this.breadcrumb = opts.breadcrumb;
    this.breadcrumb_selector = opts.breadcrumb.selector;

    this.bind();

    return this;
  };

  //=== Helper methods
  this.activeLink = function() {
    return $(this.id).find("a[data-target='" + location.hash + "']");
  };

  //=== Chainable methods
  this.showBreadCrumb = function() {
    if(this.breadcrumb.show) {
      var parentName = $(this.id).find('section').data('crumb');

      if(!parentName) {
        parentName = location.pathname.replace(/\//g, '').capitalize();
      }

      var pathname = (location.pathname+location.hash);
      var childName = sessionStorage.getItem(pathname);
      var back_arrow = '<i class="fa fa-lg fa-arrow-circle-left"></i> ';
      var parent = '<li><a class="' + this.back_link_selector.replace('.', '') +'">' + back_arrow + parentName + '</a>';
      var child = '<li>' + childName + '</li>';

      var $breadcrumb = $(this.breadcrumb_selector);

      if(this.breadcrumb.animate === true) {
        $breadcrumb.html(parent).append(child).css('width', '0').show().animate({
          width: "100%"
        }, this.breadcrumb.speed);
      } else {
        $breadcrumb.html(parent).append(child).show();
      }
    }

    return this;
  };

  this.hideBreadCrumb = function() {
    if(this.breadcrumb.show) {
      var $breadcrumb = $(this.breadcrumb_selector);
      if(this.breadcrumb.animate === true) {
        $breadcrumb.css('width', '0').html('');
      } else {
        $breadcrumb.html('');
      }
    }
    return this;
  };

  this.html = function(data) {
    $(this.id).find('section article:last-of-type').html(data);
    return this;
  };

  this.wait = function() {
    if(this.spinner) {
      this.html(this.spinner);
    } else {
      this.html('<img src="/assets/spinner.gif" alt="Spinner"> Please wait ...');
    }

    return this;
  };

  this.slide = function(direction) {
    var $first_slide = $(this.id).find('section article:first-of-type');
    var $last_slide = $(this.id).find('section article:last-of-type');

    if (direction === 'right') {
      $first_slide.css('margin-left', '-100%').css('visibility', 'hidden');
      $last_slide.css('visibility', 'visible');
    } else {
      $first_slide.css('margin-left', '0%').css('visibility', 'visible');
      $last_slide.css('visibility', 'hidden');
    }

    return this;
  };

  this.remember = function(url, title) {
    sessionStorage.setItem(url, title);
  };

  this.forward = function(pageurl) {
    var plugin  = this;

    $.ajax({
      url: pageurl,
      beforeSend: function() {
        setTimeout(function(){
          plugin.slide('right');
        }, 150);

        plugin.wait();
      }
    }).done(function( data ) {
      plugin.showBreadCrumb().html(data);
    });

    return this;
  };

  this.back = function() {
    $(this.id).find('section article:first-of-type').css('visibility', 'visible');
    $(this.id).find('section article:last-of-type').css('visibility', 'hidden');
    this.slide('left').hideBreadCrumb();
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
      var title = $(this).data('title');
      var history_pathname = this.pathname.replace(id, target);

      plugin.remember(history_pathname, title);
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
          { path: location.pathname },
          'Index',
          location.pathname
        );

        return false;
      }
    });
  };

};

$.fn.simpleslider = function(options) {
  var opts = $.extend({}, $.fn.simpleslider.defaults, options);
  var slider_instance = new SimpleSlider($(this), opts);
  return slider_instance.init();
};


// Javascript helpers
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.string = function () {
  return this.replace('.', '');
};

Number.prototype.px = function () {
  return this + ('px');
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

