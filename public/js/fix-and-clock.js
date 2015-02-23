$(document).ready(function() {
var a = 3;


//-----------------------------------------------------------------------------------
//	4.	Dock
//-----------------------------------------------------------------------------------

$('.dock ul li').hover(
	function(){
		$(this).addClass('ok').prev().addClass('prev').prev().addClass('prev-ancor');
		$(this).addClass('ok').next().addClass('next').next().addClass('next-ancor');
	},
	function(){
		$('.dock ul li').removeClass('ok prev next next-ancor prev-ancor');
	}
);

//-----------------------------------------------------------------------------------
//	5.	Hide and Close
//-----------------------------------------------------------------------------------
var left = 50 + '%';
var top = 15 + '%';
var item = $('<div class="fresh"></div>').hide();
var itemR = $('<div class="fresh"></div>').hide();

$("a[data-rel=close]").click(function(e) {
    e.preventDefault();
    $(this.hash).fadeOut(200, function() {
		$(this).css({ top: top, left: left });
	});
});

$("a[data-rel=show]").click(function(e) {
    e.preventDefault();
    $(this.hash).show();
});

$(".dock li a[data-rel=showOp]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#warning").delay(1630).queue(function() { $(this).show(); $(this).dequeue(); });
});

$(".dock li a[data-rel=showPreferences]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window97").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window97").delay(1630).queue(function() { menuWindow_openOne(97); $(this).dequeue(); });
});

$(".dock li a[data-rel=showFloorplan]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window1").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window1").delay(1630).queue(function() { menuWindow_openOne(1); $(this).dequeue(); });
});

$(".dock li a[data-rel=showbmv600]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window6").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window6").delay(1630).queue(function() { menuWindow_openOne(6); $(this).dequeue(); });
});

$(".dock li a[data-rel=showGraphTemp]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window93").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window93").delay(1630).queue(function() { menuWindow_openOne(93); $(this).dequeue(); });
});

$(".dock li a[data-rel=showGraphPower]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window94").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window94").delay(1630).queue(function() {menuWindow_openOne(94); $(this).dequeue(); });
});

$(".dock li a[data-rel=showTemperatures]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window7").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window7").delay(1630).queue(function() { menuWindow_openOne(7); $(this).dequeue(); });
});

$(".dock li a[data-rel=showSafari]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window92").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window92").delay(1630).queue(function() { menuWindow_openOne(92); $(this).dequeue(); });
});

$(".dock li a[data-rel=showClock]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#window91").css({"opacity": "1"});
    //$("#window97").css({"visibility": "visible"});
    $("#window91").delay(1630).queue(function() { menuWindow_openOne(91); $(this).dequeue(); });
});

$("#warning a[data-rel=close]").click(function(e) {
    e.preventDefault();
	item.fadeOut(500);
    $(this.hash).hide();
});

$(".dock li a[data-rel=showOpTrash]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(1600).queue(function() { $(this).removeClass('bounce'); $(this).append(itemR); itemR.fadeIn(500); $(this).dequeue(); });
    $("#trash").delay(1630).queue(function() { $(this).show(); $(this).dequeue(); });
});

$("#trash a[data-rel=close]").click(function(e) {
    e.preventDefault();
	itemR.fadeOut(500);
    $(this.hash).hide();
});


}); 