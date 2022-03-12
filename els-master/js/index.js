function setIndex() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbx3JmJVyNTGJrpNMJ3n8aMz8_0DoC3INL1a57onof42cfmrYm7B4hjcIPIjk_nrI99z/exec",
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
		.append($('<th/>', { html : '종목' }))
		.append($('<th/>', { html : '지수' }))
		.append($('<th/>', { html : '비율' }))
		.append($('<th/>', { html : '변동' }))
	);
}

function setIndexContents(rows) {
	for (var row of rows) {
		$("#index").append($('<tr/>')
			.append($('<td/>', { html : row['stock'], class : 'stock' }))
			.append($('<td/>', { html : row['index'], class : 'index' }))
			.append($('<td/>', { html : row['rate'], class : getAddClass('rate', row['index'], row['yindex']) }))
			.append($('<td/>', { html : getCRate(row['index'], row['yindex'], row['crate']), class : getAddClass('crate', row['index'], row['yindex']) }))
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
