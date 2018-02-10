let timeout;
let mdown = false;
let eraser = false;
let currColor = 'black';
let gridBG='#fff';

//Get Go actions
$(document).ready(function(){
		$('.table-box').css('background-color',gridBG);
		$('.tool-container').draggable();
		//brush-colors launcher && table background launcher
		colorChoice($('.brush'));
		colorChoice($('.table-bg'));
		$('.brush-choices').hide();
		$('.background-choices').hide();	
	});
//Grid Creators
$('#creator').click(makeGrid);
function makeGrid(){
	let l = Number($('#l-action').val());
	let w = Number($('#w-action').val());
	let tr= ("<tr><tr>").repeat(w);
	$('#grid').append(("<tr class='columns'></tr>").repeat(l));
	$('.columns').each(function(element){
		$(this).append(('<td class="rows"></td>').repeat(w));
	});
	$('.rows').mousedown(function(){
			mdown =true;
		}).mouseup(function(){
			mdown = false;
		}).mousemove(function(){
			if(mdown===true){
				colorSqr($(this));
			}
		});
}
function colorChoice(arr){
	arr.each(function(){
		let color = $(this).attr('value');
		$(this).css('color',color).hover(
			function(){
					$(this).css('opacity','0.8');
				},
			function(){
				$(this).css('opacity','1');
		}).click(function(){
			if($(this).parent()[0].className == 'brush-choices'){
				currColor = color;
			}else{
				gridBG=color;
				$('.table-box').css('background-color',gridBG);
			};
		});
		
	});
}	
//Brush and Grid Coloring
function colorSqr(element){
	if(eraser) element.css('background','none');
	else element.css('background-color',currColor);
}
function colorPalet(){
	$('.brush-choices').show();
	$('.background-choices').hide();
}
function colorGrid(){
	$('.brush-choices').hide();
	$('.background-choices').show();
}
//DropDown Handlers
$(window).click(function(e){
	if(!e.target.matches('.fa-paint-brush')){
		$('.brush-choices').hide();
	}
	if(!e.target.matches('.fa-square-o')){
		$('.background-choices').hide();
	}
});
//eraser
function eraseOn(){
	eraser = !eraser;
}