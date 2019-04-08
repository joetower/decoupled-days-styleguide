/**
* @file
* Provide JavaScript for main menu toggle.
*/
/*global jQuery*/

$(document).ready(function() {
  'use strict';

  // hide items depending on the viewport
  $('.js-hidden--small').addClass('hidden--small');
  $('.js-hidden--medium').addClass('hidden--medium');
  $('.js-hidden--large').addClass('hidden--large');
  // remove the hidden (everywhere) class
  $('.js-not-hidden').removeClass( 'hidden' );

    // Toggle
    $('.js-menu-item .more-link').on('click', function() {

      // Toggle text
      var el = $(this);
      el.text() === el.data('text-swap') ? el.text(el.data('text-original')) : el.text(el.data('text-swap'));

      // Show/unshow hidden menu
      $('.js-hidden--small').toggleClass('hidden--small');
      $('.js-hidden--medium').toggleClass('hidden--medium');
  });

})(jQuery);
