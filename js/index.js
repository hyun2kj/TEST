function setIndex() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbyMfbyTnhg-SRMMv5dprbXTEL_qFVtFBFz5tpcIzyfCxnDHwpdW69MIYG6qtZosxXPz/exec",
		data: {
			"sheet": "index"
			, "cmd" : "get"
		},
        	success : function(rows) {
			console.log(rows);
			setIndexTitle();
			setIndexContents(rows);
		},
		error : function (e) {
		console.log(e);
		}
	});
}

function setIndexTitle() {
	$("#index").append($('<tr/>')
		.append($('<th/>', { html : '일자' }))
		.append($('<th/>', { html : '항목' }))
		.append($('<th/>', { html : '금액' }))
			   .append($('<th/>', { html : '비고' }))
	);
}

function setIndexContents(rows) {
	for (var row of rows) {
		$("#index").append($('<tr/>')
			.append($('<td/>', { html : row['date'], class : 'index' }))
			.append($('<td/>', { html : row['item'], class : 'index' }))
			.append($('<td/>', { html : row['amt'], class : 'index' }))
				   .append($('<td/>', { html : '', class : 'index' }))
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
