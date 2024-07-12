//import GetConcertClient from '../api/getConcertClient';
import ConcertMemoriesClient from '../api/concertMemoriesClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";
import Authenticator from '../api/authenticator';

const SEARCH_RESULTS_KEY = 'search-results';
const EMPTY_DATASTORE_STATE = {
    [SEARCH_RESULTS_KEY]: ''
};

class GetConcert extends BindingClass {
    constructor() {
        super();

        this.header = new Header(this.dataStore);
        this.bindClassMethods(['concertViewButtonClick', 'displayAllConcertsHTML', 'displayAllConcertsByBandHTML', 'displaySingleConcertHTML',
        'displayAllConcertsByVenueHTML', 'dropDownChange', 'getHTMLForAllConcertsView', 'handleError',
        'getHTMLForAllConcertsByBandView', 'getHTMLForSingleConcertView', 'getHTMLForAllConcertsByVenueView',
        'mount', 'startupActivities', 'submitBandViewButton', 'submitDateViewButton',
        'submitVenueViewButton'], this);
         this.dataStore = new DataStore(EMPTY_DATASTORE_STATE);
    }

   /**
    * Add the header to the page and load the GetConcertClient.
    */
    mount() {
        this.header.addHeaderToPage();
        this.client = new ConcertMemoriesClient();
        //this.client = new GetConcertClient();
        this.startupActivities();
    }

    async startupActivities() {
        const concertView = document.getElementById('concertViewOptions');
        concertView.addEventListener("change", this.dropDownChange);
    }

    async dropDownChange() {
        var dropDown = document.getElementById('concertViewOptions');
        var selectedValue = dropDown.options[dropDown.selectedIndex].value;
        var concertDisplayArea = document.getElementById('submitConcertArea');

        if (selectedValue == 0) {
            const searchResultsDisplay = document.getElementById('searchResultsDisplay');
            searchResultsDisplay.innerHTML = "";
        }

        else if (selectedValue == 1) {
            var html = "";
            html += '<br><label>Enter Concert Date<br><input type="date" id="concertDateId" /><br><input type="button" value="Submit" id="submitDateButtonId" />'
            //concertDisplayArea.innerHTML = "";
            concertDisplayArea.innerHTML = html;

            var dateSelected = document.getElementById('concertDateId');
            var submitDateButton = document.getElementById('submitDateButtonId');
            var date;

            dateSelected.addEventListener("change",  function() {
                date = dateSelected.value;
                submitDateButton.style.display = "block";
                var failedMsg = document.getElementById("displayConcertFailedMessageId");
                failedMsg.classList.add('hidden');
            });
            submitDateButton.addEventListener("click", () => this.submitDateViewButton(date, selectedValue));
        } else if (selectedValue == 5) {
            var html = "";
            html += '<br><label>Enter Band Name<br><input type="text" autocomplete="off", id="bandNameInput" /><br><input type="button" value="Submit" id="submitBandNameButtonId" />'
            concertDisplayArea.innerHTML = "";
            concertDisplayArea.innerHTML = html;

            var bandName = "";
            var bandNameInput = document.getElementById('bandNameInput');
            bandNameInput.value == "";
            bandNameInput.focus();
            var submitBandNameButton = document.getElementById('submitBandNameButtonId');

            bandNameInput.addEventListener("keyup", function() {
                bandName = bandNameInput.value;
                submitBandNameButton.style.display = "block";
            });

            submitBandNameButton.addEventListener("click", () => {
                submitBandNameButton.style.display = "none";
                bandNameInput.value = "";
                bandNameInput.focus();
                this.submitBandViewButton(bandName);
            });
            bandNameInput.addEventListener('keydown', (event) => {
                if (event.key == 'Enter') {
                    bandNameInput.value = "";
                    bandNameInput.focus();
                    this.submitBandViewButton(bandName);
                    submitBandNameButtonId.style.display = "none";
                }
            });
        } else if (selectedValue == 6) {
            var html = "";
            html += '<br><label>Enter Venue Name<br><input type="text" autocomplete="off", id="venueInput" /><br><input type="button" value="Submit" id="submitVenueButtonId" />'
            concertDisplayArea.innerHTML = "";
            concertDisplayArea.innerHTML = html;

            var venue = "";
            var venueInput = document.getElementById('venueInput');
            venueInput.value == "";
            venueInput.focus();
            var submitVenueButton = document.getElementById('submitVenueButtonId');

            venueInput.addEventListener("keyup", function() {
                venue = venueInput.value;
                submitVenueButton.style.display = "block";
            });

            submitVenueButton.addEventListener("click", () => {
                submitVenueButton.style.display = "none";
                venueInput.value = "";
                venueInput.focus();
                this.submitVenueViewButton(venue);
            });
            venueInput.addEventListener('keydown', (event) => {
               if (event.key == 'Enter') {
                    venueInput.value = "";
                    venueInput.focus();
                    this.submitVenueViewButton(venue);
                    submitVenueButton.style.display = "none";
                }
            });
        } else if (selectedValue == 2 || selectedValue == 3 || selectedValue == 4) {
            var html = "";
            html += '<br><label for="submitViewButton"></label><input type ="button" value="Submit" id="concertViewButtonId" />';
            concertDisplayArea.innerHTML = html;
            var concertViewButton = document.getElementById('concertViewButtonId');
            concertViewButton.addEventListener("click", () => this.concertViewButtonClick(selectedValue, concertViewButton));
            concertViewButton.style.display = "block";
        }
    }

    async concertViewButtonClick(selectedValue, concertViewButton){
        concertViewButton.style.display = 'none';

//        if (selectedValue == 0) {
//            alert("setting display area to blank;");
//            searchResultsDisplay.innerHTML = "";
//            alert("zero");

        //} else {
            const results = await this.client.getAllConcerts();
            this.dataStore.set([SEARCH_RESULTS_KEY], results);
            this.displayAllConcertsHTML(selectedValue, concertViewButton);
        //}
    }

    async submitBandViewButton(bandName){
        var submitBandNameButton = document.getElementById('submitBandNameButtonId');
        submitBandNameButton.style.display = "none";
        const results = await this.client.getAllConcertsByBand(bandName);
        this.dataStore.set([SEARCH_RESULTS_KEY], results);
        this.displayAllConcertsByBandHTML(bandName, submitBandNameButton);
    }

    async submitVenueViewButton(venue){
        var submitVenueButton = document.getElementById('submitVenueButtonId');
        submitVenueButton.style.display='none';
        const results = await this.client.getAllConcertsByVenue(venue);
        this.dataStore.set([SEARCH_RESULTS_KEY], results);
        this.displayAllConcertsByVenueHTML(venue, submitVenueButton);
    }

    async submitDateViewButton(date){
        var submitDateButton = document.getElementById('submitDateButtonId');
        submitDateButton.style.display='none';
        const results = await this.client.getConcert(date);
        this.dataStore.set([SEARCH_RESULTS_KEY], results);
        this.displaySingleConcertHTML(date, submitDateButton);
    }

    /**
     * Pulls search results from the datastore and displays them on the html page.
    */

    //All concerts sorted by either date, band, or venue
    displayAllConcertsHTML(selectedValue, submitViewButton) {
        const searchResults = this.dataStore.get(SEARCH_RESULTS_KEY);
        const searchResultsDisplay = document.getElementById('searchResultsDisplay');

        if (selectedValue == 2) {
            var viewType = "Date";
            searchResultsDisplay.innerHTML = "";
        } else if (selectedValue == 3) {
            var viewType = "Band";
            searchResultsDisplay.innerHTML = '';
            searchResults.sort((a,b) => {
                if (a.bandName && b.bandName) {
                    const band1 = a.bandName.trim().toLowerCase(), band2 = b.bandName.trim().toLowerCase();
                        return band1 === band2 ? 0 : band1 < band2 ? -1 : 1;
                }
            });
        } else if (selectedValue == 4) {
            var viewType = "Venue";
            searchResultsDisplay.innerHTML == '';
            searchResults.sort((a,b) => {
                if (a.venue && b.venue) {
                    const venue1 = a.venue.trim().toLowerCase(), venue2 = b.venue.trim().toLowerCase();
                        return venue1 === venue2 ? 0 : venue1 < venue2 ? -1 : 1;
                }
            });
        }

        searchResultsDisplay.innerHTML = "";
        searchResultsDisplay.innerHTML += this.getHTMLForAllConcertsView(searchResults, viewType);
        submitViewButton.style.display='none';
    }

    //Single Concert by Date
    displaySingleConcertHTML(date, submitDateViewButton) {
        const searchResults = this.dataStore.get(SEARCH_RESULTS_KEY);
        const searchResultsDisplay = document.getElementById('searchResultsDisplay');
        searchResultsDisplay.innerHTML = "";
        searchResultsDisplay.innerHTML = this.getHTMLForSingleConcertView(searchResults, date);
        submitDateViewButton.style.display = 'none';
   }

    //All Concerts by band
    displayAllConcertsByBandHTML(bandName, submitBandNameButton) {
        const searchResults = this.dataStore.get(SEARCH_RESULTS_KEY);
        const searchResultsDisplay = document.getElementById('searchResultsDisplay');
        searchResultsDisplay.innerHTML = "";
        searchResultsDisplay.innerHTML = this.getHTMLForAllConcertsByBandView(searchResults, bandName);
        submitBandNameButton.style.display='none';
    }

    //All Concerts by venue
    displayAllConcertsByVenueHTML(venue, submitVenueButton) {
        const searchResults = this.dataStore.get(SEARCH_RESULTS_KEY);
        const searchResultsDisplay = document.getElementById('searchResultsDisplay');
        searchResultsDisplay.innerHTML = "";
        searchResultsDisplay.innerHTML = this.getHTMLForAllConcertsByVenueView(searchResults, venue);
        submitVenueButton.style.display = 'none';
    }

    getHTMLForAllConcertsView(searchResults, viewType) {
        if (searchResults == null || searchResults.length == 0) {
            let html = '<h3>No Concerts found</h3>';

            return html;
        }

        let html = '<div id="cut-top-margin"><h3>Concerts Attended sorted by ' + viewType + '</h3><br></div>'

        html+= '<br><table><tr><th>Date Attended</th><th>Band Name</th> <th>Tour Name</th><th>Venue</th><th>Opening Act(s)</tr>';
        for (const res of searchResults) {
            html += `
                <tr>
                    <td>${res.dateAttended}</td>
                    <td>${res.bandName}</td>
                    <td>${res.tourName}</td>
                    <td>${res.venue}</td>
                    <td>${res.openingActs}</td>
                </tr>`;
        }

      html += '</table><br><br><br><br>';
      return html;
    }

    getHTMLForSingleConcertView(searchResults, date) {

        if (searchResults == null || searchResults.length == 0) {
            var failedMessageHTML = document.getElementById('displayConcertFailedMessageId');
            failedMessageHTML.classList.remove('hidden');
            return "";
        }

        var openingActsLength = Object.keys(searchResults.openingActs).length;
        if (openingActsLength > 1) {
            var openingActsList = '<ol>';
            for (let openingAct of searchResults.openingActs) {
                openingActsList += '<li>' + openingAct + '</li>'
            }
            openingActsList += '</ol>'
            searchResults.openingActs = openingActsList;
        }

        var songsPlayedLength = Object.keys(searchResults.songsPlayed).length;
        if (songsPlayedLength > 1) {
            var songsPlayedList = '<ol>';
            for (let song of searchResults.songsPlayed) {
                songsPlayedList += '<li>' + song + '</li>'
            }
            songsPlayedList += '</ol>'
            searchResults.songsPlayed = songsPlayedList;
        }

        var memoriesLength = Object.keys(searchResults.memories).length;
        if (memoriesLength > 1) {
            var memoriesList = '<ol>';
            for (let memory of searchResults.memories) {
                memoriesList += '<li>' + memory + '</li>'
            }
            memoriesList += '</ol>'
            searchResults.memories = memoriesList;
        }

        //needed otherwise date is one day off
        var dateWithZeroTime = date + "T00:00:00";
        let html = '<h3>Concert Attended on  ' + dateWithZeroTime + '</h3><br>';
        html+= '<br><table><tr><th>Date Attended</th><th>Band Name</th><th>Tour Name</th><th>Venue</th><th>Opening Act(s)</th><th>Set List</th><th>Memories</th></tr>';

        html += `
            <tr>
                <td>${searchResults.dateAttended}</td>
                <td>${searchResults.bandName}</td>
                <td>${searchResults.tourName}</td>
                <td>${searchResults.venue}</td>
                <td>${searchResults.openingActs}</td>
                <td>${searchResults.songsPlayed}</td>
                <td>${searchResults.memories}</td>
            </tr>`;

        html += '</table>'

        return html;
    }

    getHTMLForAllConcertsByBandView(searchResults, bandName) {
            var bandNameInput = document.getElementById('bandNameInput');
            var submitBandNameButton = document.getElementById('submitBandNameButtonId');
            if (searchResults == null || searchResults.length == 0) {
                 let html = '<h3>No Concerts found for ' + bandName + '</h3>';
                  bandNameInput.value = "";
                  bandNameInput.focus();
                  submitBandNameButton.style.display='block';
                  return html;
             }

            let html = '<h3>' + bandName + ' Concerts' + '</h3><br>';
            html += '<br><table><tr><th>Date Attended</th><th>Band Name</th> <th>Tour Name</th><th>Venue</th><th>Opening Act(s)</tr>';

            for (const res of searchResults) {
                html += `
                     <tr>
                        <td>${res.dateAttended}</td>
                        <td>${res.bandName}</td>
                        <td>${res.tourName}</td>
                        <td>${res.venue}</td>
                        <td>${res.openingActs}</td>
                    </tr>`;
            }

             html += '</table>';
             return html;
         }

    getHTMLForAllConcertsByVenueView(searchResults, venue) {
        var venueInput = document.getElementById('venueInput');
        var submitVenueButton = document.getElementById('submitVenueButtonId');
         if (searchResults == null || searchResults.length == 0) {
             let html = '<h3>No Concerts found at ' + venue + '</h3>';
                  venueInput.value = "";
                  venueInput.focus();
                  submitVenueButton.style.display='block';
                  return html;
              }

            let html = '<h3>Concerts at ' + venue + '</h3><br>';
            html += '<br><table><tr><th>Date Attended</th><th>Band Name</th> <th>Tour Name</th><th>Venue</th><th>Opening Act(s)</tr>';

            for (const res of searchResults) {
               html += `
                    <tr>
                       <td>${res.dateAttended}</td>
                       <td>${res.bandName}</td>
                       <td>${res.tourName}</td>
                       <td>${res.venue}</td>
                       <td>${res.openingActs}</td>
                </tr>`;
            }

            html += '</table>';
            return html;
    }

    /**
     * Helper method to log the error and run any error functions.
     * @param error The error received from the server.
     */
     handleError(error) {
         console.error(error);

         const errorFromApi = error?.response?.data?.error_message;
         if (errorFromApi) {
             console.error(errorFromApi)
             error.message = errorFromApi;
         }
     }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const getConcert = new GetConcert();
    getConcert.mount();
};

window.addEventListener('DOMContentLoaded', main);
