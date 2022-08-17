function postList(newList){
	$.ajax({
		type: "POST",
		url: `${config.URL.API}?k=${config.key}&q=push`,
		data: newList,
		success: function(data){
			console.log(data);
			refresh(prevAlign);
		},
		error: function(data) {
			console.log(data);
			$('#result').html(`서버 API가 ${data.status} 오류를 반환했습니다.<br>내용: ${data.responseText}`)
		}
	});
}

function writeList(sets, types, align){
	resetModal();
	$('#result').html(`통신중`)
	selected = [];
	$.ajax({
		url: `${config.URL.API}?k=${config.key}&q=list`,
		dataType: 'jsonp',
		jsonpCallback: "cb",
		success: function(data){
			console.log(data);
			dynmapJSON = data;
			$('#result').html(`처리중`)

			list = [];

			setsList = Object.keys(data.sets).sort();
			setsList.forEach(sets => {
				console.log(`sets: ${sets}`);
				console.log(data.sets[sets]);

				//markers
				var elements = data.sets[sets].markers;
				keyList = Object.keys(elements);
				if(types.includes('markers')){
					keyList.forEach(key => {
						var input = {
							'sets': sets,
							'type': 'markers',
							'key': key,
							'icon': elements[key].icon,
							'label': elements[key].label,
							'pos': `${Math.floor(elements[key].x)}, ${Math.floor(elements[key].y)}, ${Math.floor(elements[key].z)}`
						}
						list.push(input);
					});
				}
			});

			//정렬
			list = list.sort((a, b) => a[align].toLowerCase() < b[align].toLowerCase() ? -1 : 1);
			var length = list.length;
			var result = '';
			for(var i = 0; i < length; i++){
				result = result + `
					<div id="marker_${list[i].sets}_${list[i].type}_${list[i].key}" class="blue" style="float: none; height: 24px;" onclick="javascript:selectMarker('${list[i].sets}_${list[i].type}_${list[i].key}', ${i});">
						<div class="onclick_blue_o24" style="width: 71px" title="${list[i].sets}">
							${list[i].sets}
						</div>
						<div class="onclick_blue_o24" style="width: 71px" title="${list[i].type}">
							${list[i].type}
						</div>
						<div class="onclick_blue_o24" style="width: 101px" title="${list[i].key}">
							${list[i].key}
						</div>
						<div class="onclick_blue_o24" style="width: 101px" title="${list[i].icon}">
							<img src="${config.URL.icon}${list[i].icon}.png" class="icon"/>
							${list[i].icon}
						</div>
						<div class="onclick_blue_o24" style="width: 351px" title="${list[i].label}">
							${list[i].label}
						</div>
						<div class="onclick_blue_o24" style="width: 201px;" title="${list[i].pos}">
							${list[i].pos}
						</div>
					</div>`;
			}
			$('#result').html(result);
		},
		error: function(data) {
			console.log(data);
			$('#result').html(`서버 API가 ${data.status} 오류를 반환했습니다.<br>내용: ${data.responseText}`)
		}
	});
}