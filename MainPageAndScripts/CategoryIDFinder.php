<!Doctype HTML>
<html lang="en">


<head>
<link rel="stylesheet" type="text/css" href="./JeopardySearchCSS.css">
<title>Category ID Search</title>
</head>

<body>

<!-- <form id="search_form"> -->
    <label>Category:</label>
    <input type="number" name="category_id" id="category_search_id" min="1" max="11510" step="1">
    <input type="submit" name="category_search_submit" id="category_search_submit" value="Search"/>
<!-- </form> -->

<button id="category_search_previous_page">Previous Page</button>
<button id="category_search_next_page">Next Page</button>

<div id="category_search_results">
    <table class="search_results_table" id="category_search_results_table">
        <thead>
            <th class="category_id_col">ID</th>
            <th class="category_category_col">Category</th>
        </thead>
        <tbody>

        </tbody>


    </table>

</div>


</body>



<footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src='./API_Requests_Category_ID_Finder.js'></script>


</footer>

</html>