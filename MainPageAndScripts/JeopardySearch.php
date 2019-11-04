<!Doctype HTML>
<html lang="en">


<head>
<link rel="stylesheet" type="text/css" href="./JeopardySearchCSS.css">
<title>Jeopardy Search</title>
</head>

<body>

<h1 class="main_title">Search for Jeopardy Questions!</h1>

<!-- Search-related fields -->
<div class="search_fields">
    <div class="search_field_group">
        <label>Value:</label>
        <select name="value_of_questions" id="value_of_questions">
            <option value="no_input" selected></option>
            <option value="200">200</option>
            <option value="400">400</option>
            <option value="600">600</option>
            <option value="800">800</option>
            <option value="1000">1000</option>
        </select>
    </div>
    <div class="search_field_group">
        <label>Date:</label>
        <input type="date" name="date_of_questions" id="date_of_questions"/>
        <select name="type_of_date" id="type_of_date" hidden>
            <option value="day">day</option>
            <option value="month">month</option>
            <option value="year">year</option>
        </select>
    </div>
    <div class="search_field_group">
        <label>Category:</label>
        <input type="number" name="category_id" id="category_id" min="1" max="11510" step="1">
    </div>
    <input type="submit" name="search_submit" id="search_submit" value="Search"/>
</div>

<!-- Buttons to cycle between pages of loaded results-->
<div class="next_and_previous_buttons">
    <button id="search_previous_page">Previous Page</button>
    <button id="search_next_page">Next Page</button>
</div>

<!--Table that will display results -->
<div id="search_results">
    <table class="search_results_table" id="search_results_table">
        <thead>
            <th class="answer">Answer</th>
            <th class="what_is">What is...</th>
            <th class="category">Category</th>
        </thead>
        <tbody>

        </tbody>


    </table>

</div>


<!-- used the following link as inspiration for a popup -->
<!-- https://www.codexworld.com/simple-modal-popup-javascript-css/ -->
<div id="detailed_view_popup" class="popup">
    <!-- mPopup content -->
    <div class="popup_content">
        <div class="popup_head">
            <span class="close">×</span>
            <h2 id = "detailed_view_title">Detailed View</h2>
        </div>
        <div class="popup_main">
            <label class="generic_label">Question: </label>
            <p class="detailed_view_data" id="detailed_view_question"></p><br>
            <label class="generic_label">What is...: </label>
            <p class="detailed_view_data" id="detailed_view_what_is"></p><br>
            <label class="generic_label">Value: </label>
            <p class="detailed_view_data" id="detailed_view_value"></p><br>
            <label class="generic_label">Category: </label>
            <p class="detailed_view_data" id="detailed_view_category"></p><br>
            <label class="generic_label">Category_ID: </label>
            <p class="detailed_view_data" id="detailed_view_category_id"></p><br>
            <label class="generic_label">Airdate: </label>
            <p class="detailed_view_data" id="detailed_view_airdate"></p><br>
        </div>
        <div class="popup_foot">
            <p>Select a "Search This" button to restrict the results to that category</p>
        </div>
    </div>
</div>


</body>



<footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src='./API_Requests.js'></script>
<script src='./Detailed_View_Popup'></script>
<script>

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

</script>


</footer>

</html>