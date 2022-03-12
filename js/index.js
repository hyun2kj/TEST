function setIndex() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbwq5XrfDBrERnd0mL3LzVAHbC5IRr4UlfEanTiWePIF1jjstKdapSEXjEaduQMIClC-/exec",
		data: {
			"sheet": "index"
		},
        	success : function(rows) {
			setIndexTitle();
			setIndexContents(rows);
		}
	});
}

function setIndexTitle() {
	$("#index").append($('<tr/>')
		.append($('<th/>', { html : '일자' }))
		.append($('<th/>', { html : '항목' }))
		.append($('<th/>', { html : '금액' }))
	);
}

function setIndexContents(rows) {
	for (var row of rows) {
		$("#index").append($('<tr/>')
			.append($('<td/>', { html : row['일자'], class : 'stock' }))
			.append($('<td/>', { html : row['항목'], class : 'index' }))
			.append($('<td/>', { html : row['금액'], class : getAddClass('rate', row['index'], row['yindex']) }))
			//.append($('<td/>', { html : getCRate(row['index'], row['yindex'], row['crate']), class : getAddClass('crate', row['index'], row['yindex']) }))
		);
	}
}

function getAddClass(oClass, index, yindex) {
	if (index > yindex) {
		oClass += ' red';
	} else if (index < yindex) {
		oClass += ' blue';
	}
	return oClass;
}

function getCRate(index, yindex, crate) {
	if (index > yindex) {
		return '▲' + crate;
	} else if (index < yindex) {
		crate = crate.replace('-', '');
		return '▼' + crate;
	} else {
		//return crate.toFixed(2);
		return '0.00%';
	}
}
