// from data.js
var tableData = data;

// create a tbody variable to get a handle on the html element
var tbody = d3.select('tbody');

// function to add data to the html table
var fullTable = tableData.forEach(report => {
    var row = tbody.append('tr');
    Object.values(report).forEach(info => {
        var cell = row.append('td');
        cell.text(info);
    })
});

// select the button
var button = d3.select('#filter-btn');

// select the form
var form = d3.select('form');

// create an event handler for clicking the button or pressing the enter key
button.on('click', runEnter);
form.on('submit', runEnter);

// create a function to run for both events
function runEnter () {

    // delete the existing table data rows
    d3.selectAll('tbody>tr').remove();

    // prevent the page from refreshing
    d3.event.preventDefault();

    // select the input date and get the raw html node
    var inputDate = d3.select('#datetime');

    // get the value property of the input date
    var inputValue = inputDate.property('value');

    var dates = tableData.map(date => date.datetime);
    if (dates.includes(inputValue)) {

    // use the form input to filter data by date
    var sighting = tableData.filter(report => report.datetime === inputValue);

    sighting.forEach(report => {
        var row = tbody.append('tr');
        Object.values(report).forEach(info => {
            var cell = row.append('td');
            cell.text(info);
        })
    });
    }
    else{
        // function to add data to the html table
        var fullTable = tableData.forEach(report => {
        var row = tbody.append('tr');
        Object.values(report).forEach(info => {
            var cell = row.append('td');
            cell.text(info);
        })
    });
    }
}; 

// TODO:
// 1. create warning message when the dates are not available