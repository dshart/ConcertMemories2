import ConcertMemoriesClient from '../api/concertMemoriesClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";

const COGNITO_NAME_KEY = 'cognito-name';
const COGNITO_EMAIL_KEY = 'cognito-name-results';
const EMPTY_DATASTORE_STATE = {
    [COGNITO_NAME_KEY]: '',
    [COGNITO_EMAIL_KEY]: ''
};

/**
 * Logic needed for the index page of the website.
 */
class IndexPage extends BindingClass {
    constructor() {
        super();

        this.header = new Header(this.dataStore);
        this.bindClassMethods(['mount', 'startupActivities'], this);
        this.dataStore = new DataStore(EMPTY_DATASTORE_STATE);
    }

    mount() {
        this.header.addHeaderToPage();
        this.client = new ConcertMemoriesClient();
        this.startupActivities();
    }

    async startupActivities() {
        if (await this.client.verifyLogin()) {
            const{email, name} = await this.client.getIdentity().then(result => result);
            this.dataStore.set([COGNITO_EMAIL_KEY], email);
            this.dataStore.set([COGNITO_NAME_KEY], name);
            var enterSiteButton = document.getElementById('enterSiteButtonId');
            enterSiteButton.style.display = "block";
            enterSiteButton.addEventListener(
                 "click", function(event){document.location.href = "concertsAndBands.html";
            });

        }
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const indexPage = new IndexPage();
    console.log();
    indexPage.mount();
};

window.addEventListener('DOMContentLoaded', main);