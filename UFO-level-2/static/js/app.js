// from data.js
const tableData = data;

// create a tbody variable to get a handle on the html element
const tbody = d3.select('tbody');

// function to add data to the html table
const fullTable = tableData.forEach(report => {
    const row = tbody.append('tr');
    Object.values(report).forEach(info => {
        const cell = row.append('td');
        cell.text(info);
    })
});

// select the button
const button = d3.select('#filter-btn');

// create an event handler for clicking the button or pressing the enter key
button.on('click', runEnter);

window.addEventListener('keyup', function (event){
    if (event.defaultPrevented){
        return;
    }
    if (event.keyCode === 13){
        runEnter();
    }
})


/// create a function to run for both events
function runEnter () {

    // delete the existing table data rows
    d3.selectAll('tbody>tr').remove();

    // select the input from each the form and get the raw html nodes
    const inputDate = d3.select('#datetime');
    const inputCity = d3.select('#city');
    const inputState = d3.select('#state');
    const inputCountry = d3.select('#country');
    const inputShape = d3.select('#shape');

    // get the value property of the each input
    const inputDateValue = inputDate.property('value');
    const inputCityValue = (inputCity.property('value')).toLowerCase();
    const inputStateValue = (inputState.property('value')).toLowerCase();
    const inputCountryValue = (inputCountry.property('value')).toLowerCase();
    const inputShapeValue = (inputShape.property('value')).toLowerCase();

    console.log(inputDateValue);
    console.log(inputCityValue);
    console.log(inputStateValue);
    console.log(inputCountryValue);
    console.log(inputShapeValue);

    // filter the data
    const filteredData = tableData.filter(report => report.datetime == inputDateValue ||
                                                 report.city == inputCityValue ||
                                                 report.state == inputStateValue ||
                                                 report.country == inputCountryValue ||
                                                 report.shape == inputShapeValue);

    console.log(filteredData);

    if (filteredData.length > 0){
        filteredData.forEach(report => {
            const row = tbody.append('tr');
            Object.values(report).forEach(info => {
                const cell = row.append('td');
                cell.text(info);
            })
        });
    }
    else if (inputDateValue == '' &&
             inputCityValue =='' && 
             inputStateValue =='' &&
             inputCountryValue == '' &&
             inputShapeValue == ''){
        // function to add data to the html table
        const fullTable = tableData.forEach(report => {
            const row = tbody.append('tr');
            Object.values(report).forEach(info => {
                const cell = row.append('td');
                cell.text(info);
        })
    });
             }
    else{
        // display a warning message
        window.alert(`Sorry no reports available for criteria provided.`);
        // function to add data to the html table
        const fullTable = tableData.forEach(report => {
            const row = tbody.append('tr');
        Object.values(report).forEach(info => {
            const cell = row.append('td');
            cell.text(info);
        })
    });
    }
}; 