# Jeopardy-Question-Search-Web-App
This is a project that was made in response to Capital One's MindSumo challenge

The challenge can be found here:
https://www.mindsumo.com/contests/jeopardy-api

Working copy at:
http://ec2-18-219-218-157.us-east-2.compute.amazonaws.com/~collinH/jeopardy/JeopardySearch.php

This project uses HTML, CSS, JavaScript, and PHP. It mostly uses JavaScript to allow for updates to be made to the page asynchronously so that the user does not have to refresh the page or have the interface lock up.

The user can search for different jeopardy questions and answers by date (day, month, year), category (using an id), and/or value. Additionally they can cycle through pages of results to see as many results that apply to their search criteria (100 results per page). They can also click on any item in the results table and a popup containing more details about the question they selected will appear.

The main files to look at are the JeopardySearch.php (main page), JeopardySearchCSS.css (looks and visuals of main page and popups), API_Requests.js (the meat of the project where JavaScripts runs a lot of its calls and updates), and Detailed_View_Popup.js (some details about the popup and tiny bit of functionality). It should be with the rest of JS, but I ran out of time to movie it over. Unfortunately, the other files were just works in progress by the time the deadline for this challenge came around, so they are not functional (I'm actually going to disable them, but will leave the code up to amuse the reader if they desire).

Comments in code go much more into detail about how each part works and I found code that worked well for the popup that I wanted so I used some of it and modified parts of it. The code has comments above it designating that I got it from a site, and I will also link the site below.

https://www.codexworld.com/simple-modal-popup-javascript-css/










