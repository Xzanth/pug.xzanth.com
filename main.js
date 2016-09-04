$(document).ready(function () {
	$.getJSON("http://localhost:9494/api/", function(data) {
	    $.each(data, function(index, element) {
	        $('body').append($('<div class="server-box">', {
			text: element.queue_name
		}));
	    });
	});
});
