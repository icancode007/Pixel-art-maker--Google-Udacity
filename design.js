	
let mdown = false; // M o u s e
	
let eraser = false; // E r a s e r  T o o l

let currColor = 'black'; // B r u s h  I n i t i a l  C o l o r

let gridBG='#fff';	// G r i d  I n i t i a l C o l o r

let prevX=-1; // D r a g  D i r e c t i o n

let selectorsArr = ['.tool-kit-table','.brush-choices','.background-choices','.tool-container','#dragItLeft','#dragItRight','.bottomContainment','#reseter'];// O n l o a d  H i d d e n  E l e m e n t s

let leftArrowProps = { axis:"x", drag:rightOrLeft, distance:20, revert:true, containment:"window"};
let rightArrowProps = { axis:"x", drag:rightOrLeft, distance:20, revert:true, containment:"window"};
	
let wicharrow; // R i g h t D r a g  o r  L e f t D r a g

let gridTdSize = 25; // C u r r e n t  T d  S i z e

let td = `<td class="rows" style='width:${gridTdSize}px;height:${gridTdSize}px'></td>`

	// G e t  G o  A c t i o n s
$(document).ready(function(){
		$('.table-box').css('background-color',gridBG);
		$('.tool-container').draggable();
		$('#dragItLeft').draggable(leftArrowProps);
		$('#dragItRight').draggable(rightArrowProps);

		//brush-colors launcher && table background launcher
		colorChoice($('.brush'));
		colorChoice($('.table-bg'));
		hideAll(selectorsArr);	
	});
	// G r i d  A r e a 
$('#creator').click(makeGrid);

function makeGrid(){
	let l = Number($('#l-action').val());
	let w = Number($('#w-action').val());
	//making use of each and repeat I avoid manually looping in the objs to add the elements in the dom
	$('#grid').append(("<tr class='columns'></tr>").repeat(l));//append the whatever integer amount of l we got from the client
	
	$('.columns').each(function(element){
		$(this).append((td).repeat(w));//for every column add whatever integer of w we got from the client
	});
	
	// $('.rows').css({'width':gridTdSize+'px','height':gridTdSize+'px'});
	
	mouseHandler($('.rows'));

	showAll(selectorsArr);
	
	$('#creator').hide();
	
	tdSizeSelect($('.tdSizes'));
}
	// T o o l  -  K i t  C o l o r  O p t i o n s 
function colorChoice(arr){
	arr.each(function(){
		let color = $(this).attr('value');
		//Dynamically retrieve the values that I stored in the element and then use .hover() before and after behavior to change the opacity from .8 to 1
		//Lastly I chain one more function that changes the global value for background.
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
	// G r i d / D r a g  H e l p e r s
function rightOrLeft(event, ui){
	//Cheking wether the dragged positon is less,greater or equal to prevX,thats how I can tell if the element is being dragged right or left
	if(prevX == -1) {
        prevX = event.pageX;    
        return false;
    }
    if(prevX > event.pageX) {
    		// dragged Left
    		wicharrow = $(this).attr('id'); 
    	if(wicharrow ==='dragItLeft') addWidth(wicharrow);
    	else removeWidth(wicharrow); 
    }
    else if(prevX < event.pageX) { 
    	// dragged right
    	if($(this).attr('id')==='dragItLeft')window.setTimeout(removeWidth,300); 
     	//this function has a timeout because the elements are removed at an incredibly faster rate than they are added 
     	else addWidth();
    }
    prevX = event.pageX;
}

function addWidth(arrow){

	$('.columns').each(function(element){
		if(arrow ==='dragItLeft'){
			
			$(this).prepend(td);
			mouseHandler($('.rows'));
		}else{
			$(this).append(td);
			mouseHandler($('.rows'));
		}
		$('.rows').css({'width':gridTdSize+'px','height':gridTdSize+'px'});
	});
}
function removeWidth(arrow){
	if(arrow ==='dragItLeft'){
		$('.columns').each(function(element,index){
			$(this).children()[0].remove();
		});
	}else{
		$('.columns').each(function(element,index){
			$(this).children().last().remove();
		});
	}
}
function resetGrid(){
	$('.columns').each(function(ele,ind){
		$(this).remove();
	});
	$('#creator').show();
	hideAll(selectorsArr);

}
	// B r u s h , G r i d - C o l o r i n g, Grid-Sizing
function colorSqr(element){
	if(eraser) element.css('background','none');
	else element.css('background-color',currColor);
}
function colorPalet(){
	eraser = false;
	$('.table-box').css({cursor:'url(https://s3.amazonaws.com/imgendpoint2018/paint-brush.png), auto'});
	$('.brush-choices').show();
	$('.background-choices').hide();
	$('.tool-kit-table').hide();
	//----> NOTE TO SELF: THIS CODE SEEMS REPETITIVE COME BACK TO REFRACT IT!!!!!!!
}
function colorGrid(){
	eraser=false;
	$('.table-box').css({cursor:'url(https://s3.amazonaws.com/imgendpoint2018/paint-brush.png), auto'});
	$('.brush-choices').hide();
	$('.tool-kit-table').hide();
	$('.background-choices').show();

}
function tdSizer(){
	eraser=false;
	$('.table-box').css({cursor:'url(https://s3.amazonaws.com/imgendpoint2018/paint-brush.png), auto'});
	$('.brush-choices').hide();
	$('.background-choices').hide();
	$('.tool-kit-table').show();
}
function tdSizeSelect(arr){
	arr.each(function(){		
		$(this).click(function(){
			gridTdSize = $(this).attr('value')+'px';
			$('.rows').css({
				'width':gridTdSize, 
				'height':gridTdSize
			});
		});
	});
}
	//C o l o r  H a n d l e r s
$(window).click(function(e){
	if(!e.target.matches('.fa-paint-brush')){
		$('.brush-choices').hide();
	}
	if(!e.target.matches('.fa-square-o')){
		$('.background-choices').hide();
	if(!e.target.matches('.fa-plus')){
		$('tool-kit-table').hide();
	}
	}
});
	// E r a s e r
function eraseOn(){
	eraser = !eraser;
	if(eraser) $('.table-box').css({cursor:'url(https://s3.amazonaws.com/imgendpoint2018/eraser1.png), auto'});
	else $('.table-box').css('cursor','default');
	
}
	// M o u s e  H a n d l e r s 
function mouseHandler(element){
		//chain of mouse handlers to the same element that is always expecting the preceding behavior to act on the next one
	element.mousedown(function(){
			mdown =true;
		}).mouseup(function(){
			mdown = false;
		}).mousemove(function(){
			if(mdown===true)colorSqr($(this));
		});
}
	// H i d e - S h o w  H e l p e r s
function hideAll(array){
	$(array).each(function(elem,val){
		$(val).hide();
	});
}
function showAll(array){
	$(array).each(function(elem,val){
		if(elem > 2) $(val).show();
		//here Im making sure that only elements after the third index are shown on this call because the first two depend on a click function to be shown
	});
}







