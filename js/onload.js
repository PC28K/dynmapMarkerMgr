var dynmapJSON;
var list = [];
var selected = [];
var prevAlign = 'label';
var setsList = [];

window.onload = function(){
	$('.url').text(config.URL.API);
	selected = [];

	refresh(prevAlign);
}

function refresh(align){
	writeList(null, ['areas', 'circles', 'lines', 'markers'], align);
	prevAlign = align;
}

function resetModal(){
	$('#modal').css('display', 'none');
	$('#modal').html('처리중');
}

function selectMarker(marker, i){
	console.log(`${marker}(${i}) 선택`);
	resetModal();
	//if(window[`#marker_${selected[0]}`])
		$(`#marker_${selected[0]}`).css('background-color', '');
	selected[0] = marker;
	selected[1] = i;
	$(`#marker_${marker}`).css('background-color', '#CCE8FF');
}

function openDynmap(){
	if(selected.length == 2){
		var pos = list[selected[1]].pos.split(', ');
		var url = config.URL.dynmap +`?worldname=world&mapname=flat&zoom=3&x=${pos[0]}&y=${pos[1]}&z=${pos[2]}`
		window.open(url, '_blank');
	}
	else	alert('선택된 마커가 없습니다.');
}