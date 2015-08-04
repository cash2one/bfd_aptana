/**
 * @author Administrator
 */
$(function(){
	     var methods = {
	     init : function( opts ) { 
		         var defaults = {}
			   
				 function Filter(){

				 }


				 
				  $('body').data('grid_setting',setting)
				 $('body').data('grid',grid)
				 $('body').data('filter',filter)
	     },
		 reflush:function(resetCol){
            $('body').data('grid').reflush(resetCol)
		 },
		 changeSetting:function(fun,resetCol){
			 fun($('body').data('grid_setting'))
			 $('body').data('grid').reflush(resetCol)
		 },
		 flushFilter:function(){
		 	 $('body').data('filter').flushFilter()
		 }
		 
  };

  $.baeToggleFilterGrid = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.baeToggleFilterGrid' );
    }    
  };
})
