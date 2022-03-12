var div = [ "#kospi200", "#sp500", "#eurostoxx50" ];
var color = [ "red", "blue", "green" ];
var backgroundColor = [ "#ff7b5a", "#7296c1", "#6eaa5e" ];
var keyList = [ 'k', 's', 'e' ];
var labels = [ [], [], [] ];
var dataList = [ [], [], [] ];

function setChart() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbx3JmJVyNTGJrpNMJ3n8aMz8_0DoC3INL1a57onof42cfmrYm7B4hjcIPIjk_nrI99z/exec",
		data: {
			"sheet": "chart"
		},
		success : function(rows) {
			setLabelsAndDataList(rows);
			setChartTitle();
			setChartContents();
		}
	});
}

function setLabelsAndDataList(rows) {
	for (var i = 0; i < rows.length; i++) {
		if (i == 0)
			continue;
		var row = rows[i];
		for (var j = 0; j < keyList.length; j++) {
			var key = keyList[j];
			if (row[key + 'date'] == null || row[key + 'date'] == "")
				continue;
			labels[j].push(getDateLabel(row[key + 'date']));
			dataList[j].push(row[key + 'percent'].replace("%", ""));
		}
	}
}

function getDateLabel(date) {
	return date.split(" ")[0].substring(2, 5) + date.split(" ")[1] + date.split(" ")[2];
}

function setChartTitle() {
	$("#kTable").append($("<tr/>", {}).append($("<th/>", { html : "KOSPI 200"})));
	$("#sTable").append($("<tr/>", {}).append($("<th/>", { html : "S&P 500"})));
	$("#eTable").append($("<tr/>", {}).append($("<th/>", { html : "EuroStoxx 50"})));
}

function setChartContents() {
	for (var i = 0; i < div.length; i++) {
		new Chart($(div[i]), {
			type : 'line', 
			data : {
				labels : labels[i],
				datasets : [{
					data : dataList[i],
					borderColor : color[i],
					backgroundColor : backgroundColor[i],
					borderWidth : 2,
					pointStyle : 'dash',
					pointBorderWidth : 0.01
				}]
			},
			options: {
				legend: {
					display: false
				},
				scales : {
                    			yAxes : [{
                        			ticks : {
                            				min : 0
                        			}
                    			}]
                		}
			}
		});
	}
}
