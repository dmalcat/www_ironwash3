$(function() {
	replaceSVG();
   showHamburger();

   var scroll = new SmoothScroll('a[href*="#"]');
	
   function showHamburger() {
      var menu = $('#nav');

      $('#hamburger-trigger').click(function() {
         $(menu).toggleClass('menu--active');
      });
   }
});