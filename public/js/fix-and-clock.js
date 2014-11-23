$(document).ready(function() {
	

		//$('input[type=password]').addClass('valid');
		//$('.tooltip-pass').hide();
		//$('.submit').removeClass('submit').addClass('charge');
		//$('#pageLogin').addClass('initLog').delay(3900).queue(function() { $(this).removeClass('initLog').addClass('initLogExit'); $(this).dequeue(); });;
		$('#page, #head').delay(5500).queue(function() { $(this).addClass('vis'); $(this).dequeue(); });
	//	$('.window').delay(3000).queue(function() { $(this).addClass('windows-vis'); $(this).dequeue(); });
		event.preventDefault();		

//-----------------------------------------------------------------------------------
//	3.	Draggable Windows
//-----------------------------------------------------------------------------------

//$('.content').remove();

var a = 3;
//$('.content,.specific,.project,.share').draggable({ handle: '.title-inside', start: function(event, ui) { $(this).css("z-index", a++); }});
//$(".window").draggable({ handle: '.titleInside, .title-mac, .tab', refreshPositions: true, containment: 'window', start: function(event, ui) { $(this).css("z-index", a++); } });


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
    $("#window97").delay(1630).queue(function() { $(this).show(); $("#window97").css({"visibility": "visible"}); $(this).dequeue(); });

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