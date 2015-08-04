/**
 * @author Administrator
 */
(function( $ ){

  var methods = {
    init : function( opts ) { 
          var defaults = {};
		  var setting = $.extend({}, defaults, opts)
    } 
  };

  $.dateAnimate = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.dateAnimate' );
    }    
  
  };

})( jQuery );