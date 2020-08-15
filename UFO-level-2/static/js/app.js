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

/// create a function to run for both events
function runEnter () {

    // delete the existing table data rows
    d3.selectAll('tbody>tr').remove();

    // prevent the page from refreshing
    d3.event.preventDefault();

    // select the input from each the form and get the raw html nodes
    var inputDate = d3.select('#datetime');
    var inputCity = d3.select('#city');
    var inputState = d3.select('#state');
    var inputCountry = d3.select('#country');
    var inputShape = d3.select('#shape');

    // get the value property of the each input
    var inputDateValue = inputDate.property('value');
    var inputCityValue = (inputCity.property('value')).toLowerCase();
    var inputStateValue = (inputState.property('value')).toLowerCase();
    var inputCountryValue = (inputCountry.property('value')).toLowerCase();
    var inputShapeValue = (inputShape.property('value')).toLowerCase();

    console.log(inputDateValue);
    console.log(inputCityValue);
    console.log(inputStateValue);
    console.log(inputCountryValue);
    console.log(inputShapeValue);

    // filter the data
    var filteredData = tableData.filter(report => report.datetime == inputDateValue ||
                                                 report.city == inputCityValue ||
                                                 report.state == inputStateValue ||
                                                 report.country == inputCountryValue ||
                                                 report.shape == inputShapeValue);

    console.log(filteredData);

    if (filteredData.length > 0){
        filteredData.forEach(report => {
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