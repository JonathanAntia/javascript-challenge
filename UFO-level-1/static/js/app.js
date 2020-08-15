// from data.js
const tableData = data;

// create a tbody variable to get a handle on the html element
const tbody = d3.select('tbody');

// function to add data to the html table
function init(){
    const fullTable = tableData.forEach(report => {
        let row = tbody.append('tr');
        Object.values(report).forEach(info => {
            let cell = row.append('td');
            cell.text(info);
        })
    });
}

// select the button
const button = d3.select('#filter-btn');

// select the form
const form = d3.select('form');

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
    let inputDate = d3.select('#datetime');

    // get the value property of the input date
    let inputValue = inputDate.property('value');

    const dates = tableData.map(date => date.datetime);
    if (dates.includes(inputValue)) {
        // use the form input to filter data by date
        let sighting = tableData.filter(report => report.datetime === inputValue);
        // add the filtered data to a new table
        sighting.forEach(report => {
            let row = tbody.append('tr');
            Object.values(report).forEach(info => {
                let cell = row.append('td');
                cell.text(info);
            })
        });
    }
    else if (inputValue == '') {
        init();
    }
    else{
        // display a warning message
        window.alert(`Sorry there are no report available for the date provided.`);
        init();
    }
}; 

init();