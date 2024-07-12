//import UpdateConcertClient from '../api/updateConcertClient';
import ConcertMemoriesClient from '../api/concertMemoriesClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";
import Authenticator from '../api/authenticator';

const SEARCH_RESULTS_KEY = 'search-results';
const EMPTY_DATASTORE_STATE = {
  [SEARCH_RESULTS_KEY]: ''
};

/**
 * Logic needed for the updateConcertInfo page of the website.
 */
class UpdateConcert extends BindingClass {
    constructor() {
        super();

        this.header = new Header(this.dataStore);
        this.bindClassMethods(['convertToList', 'handleError', 'mount', 'startupActivities', 'submit'], this);
        this.dataStore = new DataStore(EMPTY_DATASTORE_STATE);
    }

    mount() {
        this.header.addHeaderToPage();
        this.client = new ConcertMemoriesClient();
        this.startupActivities();
    }

    async startupActivities() {
        let updateConcertForm = document.getElementById('updateConcertButtonId');
         updateConcertForm.addEventListener("click", this.submit);

//        updateConcertForm.addEventListener("submit", (e) => {
//            e.preventDefault();
//            this.submitForm();
//        });

       //want to grab textbox fields when user enters date and not have them have to click button but not working yet
       //concertDate.addEventListener("change",  async function() {
      // submitDateButton.addEventListener("click", () => this.submitDateViewButton(date, selectedValue) {
       //concertDate.addEventListener("change",  async function() {
       //have send date button appear - now button is always on just to get things working
       // concertDate.addEventListener('datetimepicker-changed', async function(){

       //var updateConcertFormButton = document.getElementById("updateConcertButtonId");
       var concertDate = document.getElementById("updateDateInput");
       concertDate.addEventListener("change",  function() {
            var success = document.getElementById('successMessageId');
            success.style.display = "none";
            var failed = document.getElementById('updateFailedMessageId');
            failed.style.display = "none";
       });

       var submitDateButton = document.getElementById("submitDateToFillTextBoxesId");
       submitDateButton.addEventListener('click',  async (e) => {
           e.preventDefault();
           var date = concertDate.value;
           const results = await this.client.getConcert(date);
           this.dataStore.set([SEARCH_RESULTS_KEY], results);
                                       //now take results object and fill in text boxes that were just unrgreyed
           if (results != null && results.length != 0) {
               //ungrey all input text boxes only if concert found
               var bandNameInput = document.getElementById('updateBandNameInput');
               bandNameInput.classList.remove('disabled');
               var tourNameInput = document.getElementById('updateTourNameInput');
               tourNameInput.classList.remove('disabled');
               var venueInput = document.getElementById('updateVenueInput');
               venueInput.classList.remove('disabled');
               var openingActsInput = document.getElementById('updateOpeningActsInput');
               openingActsInput.classList.remove('disabled');
               var songsPlayedInput = document.getElementById('updateSongsPlayedInput');
               songsPlayedInput.classList.remove('disabled');
               var memoriesInput = document.getElementById('updateMemoriesInput');
               memoriesInput.classList.remove('disabled');

               //fill textboxes with DynamoDB data
               bandNameInput.value = results.bandName;
               tourNameInput.value = results.tourName;
               venueInput.value = results.venue;
               openingActsInput.value = results.openingActs;
               songsPlayedInput.value = results.songsPlayed;
               memoriesInput.value = results.memories;

               var updateConcertButton = document.getElementById('updateConcertButtonId');
               updateConcertButton.style.display = "block";
               //var updateForm = document.getElementById('updateConcertFormId');
             //  updateConcertButton.addEventListener("click", function() {
             //      updateForm.submit();
             //  });





              // var success = document.getElementById('successMessageId');
             //  success.style.display = "block";
        //  } else {
        //       var failed = document.getElementById('updateFailedMessageId');
        //        failed.style.display = "block";
       }


//                    updateConcertFormButton.style.display = "block";
//
//                    //set up listener for pressing Enter key only after date is entered
//                    window.addEventListener('keydown', (event) => {
//                        if (event.key == 'Enter') {
//                            updateConcertFormButton.style.display = "none";
//                            updateConcertFormId.submit();
//                        }
//                    });
//
//                    updateConcertFormButton.addEventListener("click", function() {
//                        updateConcertForm.submit();
//                    });
//                } else {
//                    document.getElementById("updateFailedMessageId").classList.remove('hidden');
              //  }
           });
        }

    convertToList(stringToConvert) {
         var arr = [];
         if (stringToConvert != null) {
             arr = stringToConvert.split(",");
         }
         return arr;
     }

     async submit(evt) {
        evt.preventDefault();
        var oa = document.getElementById('updateOpeningActsInput').value;
        var sp = document.getElementById('updateSongsPlayedInput').value;
        var m = document.getElementById('updateMemoriesInput').value;
        var oaList = this.convertToList(oa);
        var spList = this.convertToList(sp);
        var mList = this.convertToList(m);


        //const{email, name} = await this.client.getIdentity().then(result => result);
        await this.client.updateConcert(
            //email,
            document.getElementById('updateDateInput').value,
            document.getElementById('updateBandNameInput').value,
            document.getElementById('updateTourNameInput').value,
            document.getElementById('updateVenueInput').value,
            oaList,
            spList,
            mList
        ).then(results => {
            // const searchCriteria = this.taskDataStore.get(TASK_SEARCH_CRITERIA_KEY);
             var searchResults = this.dataStore.get(SEARCH_RESULTS_KEY);
             searchResults.push(results);
             this.dataStore.setState({
               // [TASK_SEARCH_CRITERIA_KEY]: searchCriteria,
                [TASK_SEARCH_RESULTS_KEY]: searchResults,
             });
             return results;
        }).catch(e => {
            console.log(e);
        });

        document.getElementById('updateDateInput').value = "";
        document.getElementById('updateBandNameInput').value = "";
        document.getElementById('updateTourNameInput').value = "";
        document.getElementById('updateVenueInput').value = "";
        document.getElementById('updateOpeningActsInput').value = "";
        document.getElementById('updateSongsPlayedInput').value = "";
        document.getElementById('updateMemoriesInput').value = "";



       // document.getElementById("successMessageId").disabled = "false";
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
    const updateConcert = new UpdateConcert();
    updateConcert.mount();
};

window.addEventListener('DOMContentLoaded', main);