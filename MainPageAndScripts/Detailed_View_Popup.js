// used the following link as inspiration for a popup
// https://www.codexworld.com/simple-modal-popup-javascript-css/

// get the detailed view popup
let detailedViewPopup = document.getElementById('detailed_view_popup');

// get the button that opens the detailed view popup
let detailedViewSelect = document.getElementById("");

// get the close action element
let detailedViewClose = document.getElementsByClassName("close")[0];


// close the login popup once close element is clicked
detailedViewClose.onclick = function() {
    detailedViewPopup.style.display = "none";
}