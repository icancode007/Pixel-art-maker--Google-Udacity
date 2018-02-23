//							<---- G R I D  T O O L S  A N D  F U N C T I O N A L I T Y ---->
let mdown = false; // M o u s e
	
let eraser = false; // E r a s e r  T o o l

let currColor = 'black'; // B r u s h  I n i t i a l  C o l o r

let gridBG='#fff';	// G r i d  I n i t i a l C o l o r

let prevX=-1; // D r a g  D i r e c t i o n

let selectorsArr = ['.tool-kit-table','.brush-choices','.background-choices','.tool-container','#dragItLeft','#dragItRight','.bottomContainment','#reseter'];// O n l o a d  H i d d e n  E l e m e n t s

let leftArrowProps = { axis:'x',drag:rightOrLeft, distance:20, revert:true, containment:'#grid-container',scroll:false,cursor:'grabing'};
let rightArrowProps = {axis:'x', drag:rightOrLeft, distance:20, revert:true, containment:'#grid-container',scroll:false,cursor:'grabing'};
	
let wicharrow; // R i g h t D r a g  o r  L e f t D r a g

let gridTdSize='size-md'; // C u r r e n t  T d  S i z e

let td = `<td class="rows ${gridTdSize}"></td>`

	// G e t  G o  A c t i o n s
$(document).ready(function(){
		$('.table-box').addClass('brush-cursor');
		$('.table-box').css('background-color',gridBG);
		$('.tool-container',).draggable();
		$('#dragItLeft').draggable(leftArrowProps);
		$('#dragItRight').draggable(rightArrowProps);
		colorChoice($('.brush'));
		colorChoice($('.table-bg'));
		ShowHideToggle(selectorsArr);	
		whichTutorial();
	});
	// G r i d  A r e a 
$('#creator').click(makeGrid);

function makeGrid(){
	let l = Number($('#l-action').val());
	let w = Number($('#w-action').val());
	if( ((l>40 || l < 1)||(w>40 || w < 1)) ){
		alert("Choose Values withing the real range of 1 to 40 and Make sure that your inputs are numbers not letters!");
	}
	else{
		$('#grid').append(("<tr class='columns'></tr>").repeat(l));//making use of each and repeat I avoid manually looping in the objs to add the elements in the dom
		$('.columns').each(function(element){
			$(this).append((td).repeat(w));//for every column add whatever integer of w we got from the client
		});
		mouseHandler($('.rows'));
		ShowHideToggle(['#creator'],selectorsArr);
		tdSizeSelect($('.tdSizes'));
	}	
}
	// T o o l  -  K i t  C o l o r  O p t i o n s 
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
		
	});//Dynamically retrieve the values that I stored in the element and then use .hover() before and after behavior to change the opacity from .8 to 1
}
	// G r i d / D r a g  H e l p e r s
function rightOrLeft(event, ui){//Cheking wether the dragged positon is less,greater or equal to prevX,thats how I can tell if the element is being dragged right or left
	if(prevX == -1) {
        prevX = event.pageX;    
        return false;
    }
    if(prevX > event.pageX) {// dragged Left
    	wicharrow = $(this).attr('id'); 
    	if(wicharrow ==='dragItLeft') addWidth(wicharrow);
    	else removeWidth(wicharrow); 
    }
    else if(prevX < event.pageX) { // dragged right
    	if($(this).attr('id')==='dragItLeft')window.setTimeout(removeWidth,300); //this function has a timeout because the elements are removed at an incredibly faster rate than they are added 
     	else addWidth();
    }
    prevX = event.pageX;
}

function getTdSize(){
	return(gridTdSize);
}

function addWidth(arrow){
	let newtd = `<td class="rows ${getTdSize()}"></td>`;//created a new td with the last selected <td> size class;
	let wind =($(window).width()-100); //window's width
	let tabg= $('.table-box').width(); //grid's width
	$('.columns').each(function(element){
		if(wind - tabg > 100){ //if the difference of the window and the grid's with leave a margin greater than 100 keep adding <td>
			if(arrow ==='dragItLeft'){
				$(this).prepend(newtd);
				mouseHandler($('.rows'));
			}else{
				$(this).append(newtd);
				mouseHandler($('.rows'));
			}
		}
	});
}

function removeWidth(arrow){
	if(arrow ==='dragItLeft'){
		$('.columns').each(function(){
			$(this).children()[0].remove();
		});
	}else{
		$('.columns').each(function(){
			$(this).children().last().remove();
		});
	}
}

function resetGrid(){
	$('.columns').each(function(){
		$(this).remove();
	});
	
	ShowHideToggle(selectorsArr,[],'#creator');
}
	// B r u s h , G r i d - C o l o r i n g, Grid-Sizing
function colorSqr(element){
	if(eraser) element.css('background','none');
	else element.css('background-color',currColor);
}

function colorPalet(){
	eraser = false;
	$('.table-box').removeClass('eraser-cursor');
	$('.table-box').addClass('brush-cursor');
	ShowHideToggle(['.background-choices','.tool-kit-table'],[],'.brush-choices');

}

function colorGrid(){
	ShowHideToggle(['.brush-choices','.tool-kit-table'],[],'.background-choices');

}

function tdSizer(){
	ShowHideToggle(['.brush-choices','.background-choices'],[],'.tool-kit-table');
}

function tdSizeSelect(arr){
	arr.each(function(){		
		$(this).click(function(){
			let className = $(this).attr('value');
			switch(className){
			case 'size-xs':
				$('.rows').removeClass('size-md size-lg size-sm');
				gridTdSize = 'size-xs';
				$('.rows').addClass(gridTdSize);
				break;
			case 'size-sm':
				$('.rows').removeClass('size-md size-lg size-xs');
				gridTdSize = 'size-sm';
				$('.rows').addClass(gridTdSize);
				break;
			case 'size-lg':
				$('.rows').removeClass('size-md size-xs size-sm');
				gridTdSize = 'size-lg';
				$('.rows').addClass(gridTdSize);
				break;
			case 'size-md':
				$('.rows').removeClass('size-lg size-xs size-sm');
				gridTdSize = 'size-md';
				$('.rows').addClass(gridTdSize);
				break;
			}
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
		$('.tool-kit-table').hide();
	}
	}
});
	// E r a s e r
function eraseOn(){
	eraser = !eraser;
	if(eraser) {
		$('.table-box').removeClass('brush-cursor');
		$('.table-box').addClass('eraser-cursor');
	}else{
		$('.table-box').removeClass('eraser-cursor');
		$('.table-box').addClass('brush-cursor');
	}	
}
	// M o u s e  H a n d l e r s 
function mouseHandler(element){
		
	element.mousedown(function(){//chain of mouse handlers to the same element that is always expecting the preceding behavior to act on the next one
			mdown =true;
		}).mouseup(function(){
			mdown = false;
		}).mousemove(function(){
			if(mdown===true)colorSqr($(this));
		});
}
	// H i d e - S h o w  H e l p e r s
function ShowHideToggle(hideArr=[],showArr=[],str=''){//As Of Es6 variables can be initialized as params so I add the optional values of and empty arr in case the function is
	$(hideArr).each(function(elem,val){
		$(val).hide();
	});

	$(showArr).each(function(elem,val){//here Im making sure that only elements after the third index are shown on this call because the first two depend on a click function to be shown
		if(elem > 2) $(val).show();
	});
	$(str).show();
}








