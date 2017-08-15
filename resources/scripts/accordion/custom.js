(function($) {
 "use strict";

$(function() {
	
	$('#st-accordion').accordion();
	
	$('#st-accordion-two').accordion({
				oneOpenedItem	: false,
		open: 0
			});
	
	$('#st-accordion-three').accordion({
				oneOpenedItem	: false,
				open			: 0
			});
	
	$('#st-accordion-four').accordion({
        oneOpenedItem	: true
        });

	$('#st-accordion-five').accordion({
				open			: 0
			});
		
});

})(jQuery);
