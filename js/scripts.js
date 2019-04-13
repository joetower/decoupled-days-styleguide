/**
* @file
* Provide JavaScript for main menu toggle.
*/

(function ($) {
  'use strict';
  $(document).ready(function () {
    $('.main-menu-toggle').on('click touchstart', function(event) {
        event.preventDefault();
        if ($('.main-menu').hasClass('active')) {
          $('.main-menu').removeClass('active');
          $('.main-menu-toggle').removeClass('active');
        } else {
          $('.main-menu-toggle').addClass('active');
          $('.main-menu').addClass('active');
        }
    });
  });
})(jQuery);
