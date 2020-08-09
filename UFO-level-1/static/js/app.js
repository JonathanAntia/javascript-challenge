// from data.js
var tableData = data;

// create a tbody variable to get a handle on the html element
var tbody = d3.select('tbody');

// write a function that will add data to the html table
tableData.forEach(report => {
    var row = tbody.append('tr');
    Object.entries(report).forEach(([key,value]) => {
        var cell = row.append('td');
        cell.text(value);
    })
});

