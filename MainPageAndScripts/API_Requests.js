
document.getElementById("search_submit").addEventListener("click", newSearch, false); // Bind the AJAX call to button click
document.getElementById("search_next_page").addEventListener("click", nextPage, false); // Bind the AJAX call to button click
document.getElementById("search_previous_page").addEventListener("click", previousPage, false); // Bind the AJAX call to button click

let value = document.getElementById("value_of_questions").value; // Get the value from the form
let date = document.getElementById("date_of_questions").value; // Get the date from the form
let typeOfDate = document.getElementById("type_of_date").value; // Get the type of date from the form
let categoryID = document.getElementById("category_id").value; // Get the category id from the form

//Use for pagination
let offset = 0;

//Check if any search has been made (for when the user selects the next button before there is a search made)
let haveSearched = false;

//Months to adjust the max_date for when searching by month
const monthsNot31 = { "february": 2, "april": 4, "june": 6, "september": 9, "november": 11};

//Columns of the table to insert corresponding cells in each row
const columns = { "answer": 0, "whatIs": 1, "category": 2};


//Eventually change to do on click
function APIAjaxClues() {
    getMostRecentValues();
    let url = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/clues?";

    let valueQuery = "value=";
    if(value != "no_input") {
        valueQuery = valueQuery.concat(value);
    }
    valueQuery = valueQuery.concat("&");

    let dates = getMinAndMaxDates(date);

    let minDate = dates[0];
    let maxDate = dates[1];


    let categoryIDQuery = "category=".concat(categoryID).concat("&");

    const offsetQuery = "offset=".concat(offset);

    //final url to make a call to
    url = url.concat(valueQuery).concat(minDate).concat(maxDate).concat(categoryIDQuery).concat(offsetQuery);
    console.log(url);

    //update table based on url
    updateTable(url);
}

// Get all the most recent values in the fields
function getMostRecentValues() {
    value = document.getElementById("value_of_questions").value;
    date = document.getElementById("date_of_questions").value; 
    typeOfDate = document.getElementById("type_of_date").value; 
    categoryID = document.getElementById("category_id").value;
}

function getMinAndMaxDates(date) {
    let minDate = "min_date=";
    let maxDate = "max_date=";
    //Date always in formate yyyy-mm-dd
    //Create date object for easy retrieval of month and year
    let jsDate = new Date(date);
    //account for 0 based index for months;
    jsDate.setMonth(jsDate.getMonth() + 1);
    if(date != "") {
        if(typeOfDate == "day") {
            minDate = minDate.concat(date);
            maxDate = maxDate.concat(date);
        }
        else if(typeOfDate == "month") {
            //format min as yyyy-mm-01
            //format max as yyyy-mm-dd where dd can be 28, 29, 30, 31 depending on the month
            minDate = minDate.concat(jsDate.getFullYear()).concat("-").concat(jsDate.getMonth()).concat("-01");
            maxDate = maxDate.concat(jsDate.getFullYear()).concat("-").concat(jsDate.getMonth()).concat("-").concat(calculateLastDayInMonth(jsDate));
        }       
        else {
            //format min as yyyy-01-01
            //format max as yyyy-12-31
            minDate = minDate.concat(jsDate.getFullYear()).concat("-01-01");
            maxDate = maxDate.concat(jsDate.getFullYear()).concat("-12-31");
        }
    }
    minDate = minDate.concat("&");
    maxDate = maxDate.concat("&");
    return [minDate, maxDate];
}


//Calculates which is the correct last day for the month being searched
function calculateLastDayInMonth(dateObject) {
    //default to 31 and change if necessary
    let lastDay = 31;
    switch(dateObject.getMonth()) {
        case monthsNot31.april:
        case monthsNot31.june:
        case monthsNot31.september:
        case monthsNot31.november:
            lastDay = 30
            break;
        case monthsNot31.february:
            //leap day
            if(dateObject.getFullYear % 4) {
                lastDay = 29;
            }
            else {
                lastDay = 28;
            }
            break;
    }
    return lastDay;
}


//Updates Table with responses from api url
function updateTable(url) {
    $.get(url, {}, function(response) {
        //only add and delete from the body
        let table = document.getElementById("search_results_table").getElementsByTagName('tbody')[0];
        console.log(response.length);

        //Triggers when no search terms appear.
        //Accounts for next page
        if(response.length < 1) {
            //initial search has nothing returned
            if(offset == 0) {
                alert("There are no questions available for this current search");
            }
            //next page has nothing returned
            else {
                //keep offset at value before next button was clicked. 
                //If offset is just initial value than keep it that way.
                offset = offset == 0 ? offset = 0 : offset -= 100;
                alert("There are no more questions available for this current search");
                //update page with previously loadable values
                APIAjaxClues();
            }
            return;
        }

        //array to store all results so that they can be access later
        let results = [];

        //Remove any existing rows
        //Don't delete 0th because that is the header
        for(i = table.rows.length - 1; i > -1; i = table.rows.length - 1) {
            table.deleteRow(i);
        }

        //Load new rows
        //Account for header (and dummy value) by starting at 1 and going 1 more than length (exclusive bound) 
        for(i = 0; i < response.length; i += 1) {
            currentResult = response[i];
            //add corresponding json to results for future reference
            results.push(currentResult);
            //For questions that have invalid elements (the api says this could be due to audio or video questions)
            if(currentResult.question == "" || value == null) {
                continue;
            }
            insertCorrespondingRow(currentResult, table, i);

            //Make sure all the results are loaded so only one listener is made.
            //Creates the popup for the selected item
            if(i == response.length - 1) {
                addRowEventListener(results);
            }

        }
    })
}


//Inserts a row with the corresponding cells to the current api response
function insertCorrespondingRow(currentResult, table, i) {
    let row = table.insertRow(table.rows.length);
    //store the id as the associated index in the array for access when selected
    row.id = i;
    let cell0 = row.insertCell(columns.answer);
    let cell1 = row.insertCell(columns.whatIs);
    let cell2 = row.insertCell(columns.category);
    cell0.innerHTML = currentResult.question;
    cell1.innerHTML = currentResult.answer;
    //Some values don't have categories stored with them (try searching all year for 2009)
    if(typeof(currentResult.category) != 'undefined' && currentResult.category.title != null) {
        cell2.innerHTML = currentResult.category.title;
    }
    else {
        cell2.innerHTML = "No category title stored with this question";
    }
}


//Adds a listener at the end so clicking on a row will pull up a popup with more details
function addRowEventListener(results) {
    $( "tr" ).click(function() {
        //Use this if statement to exclude the header since it is technically a row
        if( $(this).attr("id")) {
            let currentIndex = $( this ).attr("id");
            detailedViewPopup.style.display = "block";
            document.getElementById("detailed_view_question").innerHTML = results[currentIndex].question;
            document.getElementById("detailed_view_what_is").innerHTML = results[currentIndex].answer;
            document.getElementById("detailed_view_value").innerHTML = results[currentIndex].value;
            if(typeof(results[currentIndex].category) != 'undefined' && results[currentIndex].category.title != null) {
                document.getElementById("detailed_view_category").innerHTML = results[currentIndex].category.title;
            }
            else {
                document.getElementById("detailed_view_category").innerHTML = "No category title stored with this question";
            }
            document.getElementById("detailed_view_category_id").innerHTML = results[currentIndex].category_id;
            //Get substring to cut off weird time related stuff at the end (aka formats to yyyy-mm-dd)
            document.getElementById("detailed_view_airdate").innerHTML = results[currentIndex].airdate.substring(0,10);
        }
    })
}

function nextPage() {
    if(haveSearched) {
        offset = offset + 100;
        APIAjaxClues();
    }
    else {
        alert("Please choose come parameters to search by");
    }
}

function previousPage() {
    if(offset < 100) {
        alert("This is the first page");
    }
    else {
        offset -= 100;
        APIAjaxClues();
    }
}

function newSearch() {
    haveSearched = true;
    offset = 0;
    APIAjaxClues();
}