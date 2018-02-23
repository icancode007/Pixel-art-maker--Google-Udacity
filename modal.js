//							<----         M O D A L  F U N C T I O N A L I T Y 		   ---->
$('fa-question').hide();
function whichTutorial(){
	let ind = 0;
	let gifPlayer = $('#player');
	let gifCaption = ["Background Coloring && Td Sizing", "Coloring && Erasing","Creating && Reseting Grid", "Draggable Elements"]
	gifPlayer.addClass('gif'+[ind]);
	$('#caption').text(gifCaption[ind]);
	$('#next').click(function(){
		let prevInd = ind;	
		if(ind  >= 0 && ind < 3) {//Make sure that right clicking is bounded between 0 and 2 and if the value that comes is different from the bounds then start over from 0
			ind += 1
			gifPlayer.removeClass('gif'+[prevInd])
			gifPlayer.addClass('gif'+[ind]);
			$('#caption').text(gifCaption[ind]);
		}else {
			ind = 0;
		}
	});
	$('#previous').click(function(){
		let prevInd = ind;
		if(ind >= 1 && ind <= 3) {//Make sure that the left click is bounded between 1 and 3 and if the value that comes is diff from the bounds then start over from 3
			ind -= 1;
			gifPlayer.removeClass('gif'+[prevInd])
			gifPlayer.addClass('gif'+[ind]);
			$('#caption').text(gifCaption[ind]);
		}
		else {
			ind = 3;
		}
	});
	$('.modal-container').show();
	$('.fa-question').show();
	$('.fa-question').click(function(){
		whichTutorial();
	});
}
	
function hideModal(){
	$('.modal-container').hide();
}
