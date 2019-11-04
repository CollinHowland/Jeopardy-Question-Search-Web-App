document.getElementById("date_of_questions").addEventListener("change", unhideTypeOfDate, false); // Bind the hiding call to data change


//Hide or unhide the type_of_date field depending on whether the user has a date selected or not
function unhideTypeOfDate() {
    const date = document.getElementById("date_of_questions").value;
    if(date == "") {
        document.getElementById("type_of_date").style.display = 'none';
    }
    else {
        document.getElementById("type_of_date").style.display = 'inline-block';
    }
}