function newMarker(){
	$('#modal').css('display', 'block');
	$.ajax({
		url: `./html/modal_newMarker.html`,
		success: function(data){
			$('#modal').html(data);
			$('#m_title').text(list[selected[1]].label);
		}
	});
}

function newMarkerApply(){
	if($('#m_sets').val() == null || $('#m_key').val() == null || $('#m_label').val() == null || $('#m_pos_x').val() == null || $('#m_pos_y').val() == null || $('#m_pos_z').val() == null){
		alert('값을 입력하세요.');
		return;
	}
	if(dynmapJSON.sets[$('#m_sets').val()] == undefined){
		alert(`${$('#m_sets').val()} 범주가 없습니다.`);
		return;
	}

	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()] = {};
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].label = $('#m_label').val();
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].icon = $('#m_icon').val();
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].x = $('#m_pos_x').val();
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].y = $('#m_pos_y').val();
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].z = $('#m_pos_z').val();
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].markup = false;
	dynmapJSON.sets[$('#m_sets').val()].markers[$('#m_key').val()].dim = '16x16';

	resetModal();
	var newList = {};
	newList.data = JSON.stringify(dynmapJSON);
	postList(newList);
}

function newSets(){
	$('#modal').css('display', 'block');
	$.ajax({
		url: `./html/modal_newSets.html`,
		success: function(data){
			$('#modal').html(data);
			$('#m_title').text(list[selected[1]].label);
		}
	});
}

function newSetsApply(){
	if($('#m_key').val() == null || $('#m_label').val() == null || $('#m_hide').val() == null || $('#m_showlabels').val() == null || $('#m_layer').val() == null){
		alert('값을 입력하세요.');
		return;
	}

	dynmapJSON.sets[$('#m_key').val()] = {};
	dynmapJSON.sets[$('#m_key').val()].label = $('#m_label').val();

	if($('#m_hide').val() == 'false')	dynmapJSON.sets[$('#m_key').val()].hide = false;
	else 								dynmapJSON.sets[$('#m_key').val()].hide = true;

	if($('#m_showlabels').val() == 'false')	dynmapJSON.sets[$('#m_key').val()].showlabels = false;
	else									dynmapJSON.sets[$('#m_key').val()].showlabels = true;

	dynmapJSON.sets[$('#m_key').val()].layerprio = $('#m_layer').val();
	dynmapJSON.sets[$('#m_key').val()].areas = {};
	dynmapJSON.sets[$('#m_key').val()].circles = {};
	dynmapJSON.sets[$('#m_key').val()].lines = {};
	dynmapJSON.sets[$('#m_key').val()].markers = {};

	resetModal();
	var newList = {};
	newList.data = JSON.stringify(dynmapJSON);
	postList(newList);
}

function editMarker(){
	if(selected.length == 2){
		$('#modal').css('display', 'block');
		$.ajax({
			url: `./html/modal_editMarker.html`,
			success: function(data){
				$('#modal').html(data);
				var pos = list[selected[1]].pos.split(', ');
				$('#m_title').text(list[selected[1]].label);

				$('#m_label').val(list[selected[1]].label);
				$('#m_pos_x').val(pos[0]);
				$('#m_pos_y').val(pos[1]);
				$('#m_pos_z').val(pos[2]);
				$('#m_icon').val(list[selected[1]].icon);
			}
		});
	}
	else	alert('선택된 마커가 없습니다.');
}

function editMarkerApply(){
	dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key].label = $('#m_label').val();
	dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key].icon = $('#m_icon').val();
	dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key].x = $('#m_pos_x').val();
	dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key].y = $('#m_pos_y').val();
	dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key].z = $('#m_pos_z').val();
	
	resetModal();
	var newList = {};
	newList.data = JSON.stringify(dynmapJSON);
	postList(newList);
}

function editSets(){
	if(selected.length == 2){
		$('#modal').css('display', 'block');
		$.ajax({
			url: `./html/modal_editSets.html`,
			success: function(data){
				$('#modal').html(data);
				var sets = selected[0].split('_')[0];
				$('#m_title').text(sets);

				$('#m_label').val(dynmapJSON.sets[sets].label);
				$('#m_hide').val(dynmapJSON.sets[sets].hide);
				if(dynmapJSON.sets[sets].showlabels == undefined)	$('#m_showlabels').val('true');
				else	$('#m_showlabels').val(dynmapJSON.sets[sets].showlabels);
				$('#m_layer').val(dynmapJSON.sets[sets].layerprio);
			}
		});
	}
	else	alert('선택된 마커가 없습니다.');
}

function editSetsApply(){
	var sets = selected[0].split('_')[0];
	dynmapJSON.sets[sets].label = $('#m_label').val();

	if($('#m_hide').val() == 'false')	dynmapJSON.sets[sets].hide = false;
	else 								dynmapJSON.sets[sets].hide = true;

	if($('#m_showlabels').val() == 'false')	dynmapJSON.sets[sets].showlabels = false;
	else									dynmapJSON.sets[sets].showlabels = true;

	dynmapJSON.sets[sets].layerprio = $('#m_layer').val();
	
	resetModal();
	var newList = {};
	newList.data = JSON.stringify(dynmapJSON);
	postList(newList);
}

function mgrSets(){
	$('#modal').css('display', 'block');
	$.ajax({
		url: `./html/modal_mgrSets.html`,
		success: function(data){
			$('#modal').html(data);
			var list = [];
			setsList.forEach(element => {
				var input = {
					'key': element,
					'label': dynmapJSON.sets[element].label,
					'length': Object.keys(dynmapJSON.sets[element].markers).length
				}
				list.push(input);
			});

			var align = 'key';
			list = list.sort((a, b) => a[align].toLowerCase() < b[align].toLowerCase() ? -1 : 1);
			var length = list.length;
			var result = '';
			for(var i = 0; i < length; i++){
				result = result + `
					<div id="marker_${list[i].key}" style="float: none; height: 24px;">
						<div class="onclick_blue_o24 …" style="width: 134px" title="${list[i].key}">
							${list[i].key}
						</div>
						<div class="onclick_blue_o24 …" style="width: 134px" title="${list[i].label}">
							${list[i].label}
						</div>
						<div class="onclick_blue_o24 …" style="width: 39px" title="${list[i].length}">
							${list[i].length}
						</div>
						<div class="onclick_blue_o24" style="width: 60px">
							<div class='blue' style="width: 24px; margin: 0; border: unset;" onclick="mgrSetsSelect('${list[i].key}', 'edit');">
								<span class="Segoe">&#xE104;</span>
							</div>
							<div class='blue' style="width: 24px; margin: 0; float:left; border: unset;" onclick="mgrSetsSelect('${list[i].key}', 'delete');">
								<span class="Segoe">&#xE10A;</span>
							</div>
						</div>
					</div>`;
			}
			$('#m_result').html(result);
		}
	});
}

function mgrSetsSelect(key, act){
	console.log(`${key} 선택`);
	$(`#marker_${selected}`).css('background-color', '');
	selected[0] = key;
	selected[1] = null;

	if(act == 'delete')		deleteSets();
	else if(act == 'edit')	editSets();
}

function deleteMarker(){
	if(selected.length == 2){
		if(confirm(`${list[selected[1]].label} 마커를 지우시고 후회하시지는 않으시겠습니까?`)){
			delete dynmapJSON.sets[list[selected[1]].sets][list[selected[1]].type][list[selected[1]].key];
			
			var newList = {};
			newList.data = JSON.stringify(dynmapJSON);
			console.log(newList);
			postList(newList);
		}
	}
	else	alert('선택된 마커가 없습니다.');
}

function deleteSets(){
	if(selected.length == 2){
		if(confirm(`${selected[0].split('_')[0]} 범주를 지우시고 후회하시지는 않으시겠습니까?\n이 범주에 포함된 마커가 모두 삭제됩니다.`)){
			delete dynmapJSON.sets[selected[0].split('_')[0]];
			
			var newList = {};
			newList.data = JSON.stringify(dynmapJSON);
			console.log(newList);
			postList(newList);
		}
	}
	else	alert('선택된 마커가 없습니다.');
}