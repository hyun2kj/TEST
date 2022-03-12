function setRepay() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbx3JmJVyNTGJrpNMJ3n8aMz8_0DoC3INL1a57onof42cfmrYm7B4hjcIPIjk_nrI99z/exec",
		data: {
			"sheet": "repay"
		},
		success : function(rows) {
			setRepayTitle();
			setRepayContents(rows);
		}
	});
}

function setRepayTitle() {
	$("#repay").append($('<tr/>')
		.append($('<th/>', { html : '구분' }))
		.append($('<th/>', { html : '평가일' }))
		.append($('<th/>', { html : '배리어' }))
		.append($('<th/>', { html : '상환' }))
	);
}

function setRepayContents(rows) {
	for (var i = 0; i < rows.length; i++) {
		if (i == 0)
			continue;
		var row = rows[i];
		var repay = row['repay'] == '#N/A' ? '' : row['repay'];
		$("#repay").append($('<tr/>')
			.append($('<td/>', { html : row['gbn'] }))
			.append($('<td/>', { html : row['date'] }))
			.append($('<td/>', { html : row['barrier'] }))
			.append($('<td/>', { html : repay, class : getRepayClass(repay) }))
		);
	}
}

function getRepayClass(repay) {
	if (repay == "성공")
		return 'repay red';
	return '';
}
