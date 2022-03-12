function setIndex() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbzCpbDpO60xdFwRpD8uFDNRexjH17FLzNL457ACe-B0CuyL_WzkKoroAtttDscSycyh/exec",
		data: {
			"sheet": "index"
			, "cmd" : "get"
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
			.append($('<td/>', { html : row['date'], class : 'index' }))
			.append($('<td/>', { html : row['item'], class : 'index' }))
			.append($('<td/>', { html : row['amt'], class : 'index' }))
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
