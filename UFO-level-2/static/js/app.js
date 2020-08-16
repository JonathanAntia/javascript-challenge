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

    // get the value property of the each input
    const inputDateValue = d3.select('#datetime').property('value');
    const inputCityValue = (d3.select('#city').property('value')).toLowerCase();
    const inputStateValue = (d3.select('#state').property('value')).toLowerCase();
    const inputCountryValue = (d3.select('#country').property('value')).toLowerCase();
    const inputShapeValue = (d3.select('#shape').property('value')).toLowerCase();

    // create an empty object to hold the user input
    var filterCriteriaProvided = {};

    // check if input criteria was provided and add to filteCriteria object
    if (!(inputDateValue == "")){
        filterCriteriaProvided.datetime = inputDateValue;
    }
    
    if (!(inputCityValue == "")){
        filterCriteriaProvided.city = inputCityValue;
    }

    if (!(inputStateValue == "")){
        filterCriteriaProvided.state = inputStateValue;
    }

    if (!(inputCountryValue == "")){
        filterCriteriaProvided.country = inputCountryValue;
    }

    if (!(inputShapeValue == "")){
        filterCriteriaProvided.shape = inputShapeValue;
    }

    console.log(filterCriteriaProvided);

    // create arrays for keys and values of filter criteria provided
    var keys = Object.keys(filterCriteriaProvided);
    var values = Object.values(filterCriteriaProvided);

    console.log(`keys: ${keys}`);
    console.log(`values: ${values}`);
    
    // filter the data by criteria provided
    var result = tableData.filter(function(e) {
      return keys.every(function(a) {
        return values.includes(e[a])
      })
    })
    
    console.log(result);

    // return table with filtered data if new input is available
    if (result.length > 0){
        result.forEach(report => {
            const row = tbody.append('tr');
            Object.values(report).forEach(info => {
                const cell = row.append('td');
                cell.text(info);
            })
        });
    }
    // return original table if input fields return to blanks
    else if (inputDateValue == '' &&
             inputCityValue =='' && 
             inputStateValue =='' &&
             inputCountryValue == '' &&
             inputShapeValue == ''){
        // add original data back to the html table
        init();
    }
    // display a message to the user if criteria input do not match existing data
    else{
        // display a message to the user
        window.alert(`Sorry no reports available for criteria provided.`);
        // add original data back to the html table
        init();
    }
}; 

init();