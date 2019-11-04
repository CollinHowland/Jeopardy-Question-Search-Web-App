document.getElementById("category_search_submit").addEventListener("click", APIAjaxCategory, false); // Bind the AJAX call to button click


//Use for pagination
let offset = 0;

//Check if any search has been made (for when the user selects the next button before there is a search made)
let haveSearched = false;


//Search for the category by id.
//Would have used the "categories" API but the values returned in a seemingly random ordering,
// so was unable to make use of it.
function APIAjaxCategory () {
    console.log("running APIAjaxCateogory");
    let categoryID = document.getElementById("category_search_id").value; // Get the category id from the form
    if(!categoryID) {
        alert("Please insert a valid ID (the range of 1-11510)");
        return;
    }


    //Table body
    let table = document.getElementById("category_search_results_table").getElementsByTagName('tbody')[0];

    //array to store all results so that they can be access later
    let results = [];

    for(i = table.rows.length - 1; i > -1; i = table.rows.length - 1) {
        table.deleteRow(i);
    }


    for(i = 0; i < 10; i += 1) {
        let categoryIDQuery = "id=".concat(Number(categoryID) + i);
        //Since can only use "category" api (singular), must call it in for loop
        let url = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/category?".concat(categoryIDQuery);
        $.get(url, {}, function(response) {
            if(response) {
                currentResult = response;
                results.push(currentResult);
    
                //only add and delete from the body
                //console.log(response.length);
    
                let row = table.insertRow(table.rows.length);
                //store the id as the associated index in the array for access when selected
                row.id = i;
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                cell0.innerHTML = currentResult.id;
                cell1.innerHTML = currentResult.title;
                console.log(currentResult.id);
                console.log(currentResult.title);
            }
        })
    }
}