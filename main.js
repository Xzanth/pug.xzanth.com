$(document).ready(function () {
	update_list();
});

window.setInterval(update_list, 10000);

function showPlayers(id) {
	$("#server" + id + "list").slideToggle("fast", "linear");
}

function update_list() {
	$.getJSON("/api/queue_list", function(data) {
		w = $("#webchat").detach();
		$("content").empty();
		$("<div class=\"server-box info-box\"/>").prependTo("content").text("Last updated at " + Date().toString());
		$.each(data, function(index, element) {
			if (element.games.length > 0) {
				color = "server-online"
			} else {
				color = "server-empty"
			}
			$("<div class=\"button\" id=\"server" + index + "\" onclick=\"showPlayers(" + index + ")\"><div class=\"server-box " + color + "\"/></div>").appendTo("content");
			item = "#server" + index + " > div"
			$("<div id=\"box-title\"/>").appendTo(item).text(element.queue_name);
			$("<div id=\"box-middle\"/>").appendTo(item);
			nearend = $("<div id=\"box-mission\"/>").appendTo(item);
			if (element.games.length > 0) {
				nearend.text(element.games.length + " GAMES");
			}
			$("<div id=\"box-end\"/>").appendTo(item).text(element.current_players + "/" + element.max_players);
			if (element.players.length > 0) {
				$("<div class=\"playerlist\" id=\"server" + index + "list\"/>").insertAfter("#server" + index);
				$.each(element.players, function(index2, player) {
					$("<div class=\"box-name\"/>").appendTo("#server" + index + "list").text(player);
				});
			}
		});
		w.appendTo("content");
	});
}
