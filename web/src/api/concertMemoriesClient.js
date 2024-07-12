import axios from "axios";
import BindingClass from "../util/bindingClass";
import Authenticator from "./authenticator";

/**
 * Client to call ConcertMemories web application
*/

export default class ConcertMemoriesClient extends BindingClass {
    constructor(props = {}) {
         super();

    const methodsToBind = ['clientLoaded', 'getIdentity', 'verifyLogin', 'login', 'logout', 'getTokenOrThrow',
    'createConcert', 'deleteConcert', 'getConcert', 'getAllConcerts', 'getAllConcertsByBand', 'getAllConcertsByVenue',
    'updateConcert', 'handleError'];

    this.bindClassMethods(methodsToBind, this);
    this.authenticator = new Authenticator();
    this.axiosClient = axios;
    axios.defaults.baseURL = process.env.API_BASE_URL;
    this.props = props;
    this.clientLoaded();
}
    /**
    * Run any functions that are supposed to be called once the client has loaded successfully.
    */
    clientLoaded() {
        if (this.props.hasOwnProperty("onReady")) {
            this.props.onReady(this);
        }
    }

    /**
     * Get the identity of the current user
     * @returns The user information for the current user.
     */
    async getIdentity() {
        try {
            const isLoggedIn = await this.authenticator.isUserLoggedIn();
            if (!isLoggedIn) {
                return undefined;
            }
            return await this.authenticator.getCurrentUserInfo();
        } catch (error) {
            this.handleError(error)
        }
    }

    async verifyLogin() {
        try {
            const isLoggedIn = await this.authenticator.isUserLoggedIn();
                return isLoggedIn;
        } catch (error) {
            this.handleError(error)
        }
    }

    async login() {
        this.authenticator.login();
    }

    async logout() {
        this.authenticator.logout();
    }

    async getTokenOrThrow(unauthenticatedErrorMessage) {
        const isLoggedIn = await this.authenticator.isUserLoggedIn();
        if (!isLoggedIn) {
            throw new Error(unauthenticatedErrorMessage);
        }

        return await this.authenticator.getUserToken();
    }

    async createConcert(dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories) {
            console.log("dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories",
            dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories)
                 try {
                     const token = await this.getTokenOrThrow("Only authenticated users can create a concert");
                     const response = await this.axiosClient.post(`createconcert`, {
                         dateAttended: dateAttended,
                         tourName: tourName,
                         bandName: bandName,
                         venue: venue,
                         openingActs: openingActs,
                         songsPlayed: songsPlayed,
                         memories: memories
                     }, {

                         headers: {
                             Authorization: `Bearer ${token}`
                          }
                     });
                    return response.data.concert;
                 } catch (error) {
                     this.handleError(error)
                }
             }

       /**
        * Deletes single concert in the database by date.
        * @returns A single concert object
        */

       async deleteConcert(dateAttended) {
               try {
                   const token = await this.getTokenOrThrow("Only authenticated users can delete a concert");
                   const response = await this.axiosClient.delete(`deleteconcert/${dateAttended}`, {
                       headers: {
                           Authorization: `Bearer ${token}`
                       }
                   });
                   return await response.data.concert;
               } catch (error) {
                   this.handleError(error)
               }
       }

       async getConcert(dateAttended) {
                   try {
                       const token = await this.getTokenOrThrow("Only authenticated users can get a concert");
                       const response = await this.axiosClient.get(`concerts/${dateAttended}`, {
                           headers: {
                               Authorization: `Bearer ${token}`
                           }

                       });

                       return response.data.concert;
                   } catch (error) {
                       this.handleError(error)
                   }
       }

                /**
                 * Gets all concerts in the database.
                * @returns A list of concerts
                */
       async getAllConcerts() {
                    try {
                        const token = await this.getTokenOrThrow("Encountered token error trying to call Concert endpoint.");
                        const response = await this.axiosClient.get(`concerts`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                       });
                       return response.data.allConcerts;
                    } catch (error) {
                        this.handleError(error)
                   }
       }


                /**
                 * Gets all concerts in the database for a specific band.
                 * @returns A list of concerts seen of a specific band
                */

       async getAllConcertsByBand(bandName) {
                    try {
                        const token = await this.getTokenOrThrow("Only authenticated users can get a concert");
                        const response = await this.axiosClient.get(`concertsbyband/${bandName}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        return response.data.allConcertsByBand;
                    } catch (error) {
                        this.handleError(error)
                    }
       }

                /**
                    * Gets all concerts in the database for a specific venue.
                    * @returns A list of concerts seen at a specific venue
                */

       async getAllConcertsByVenue(venue) {

                    try {
                        const token = await this.getTokenOrThrow("Only authenticated users can get a concert");
                        const response = await this.axiosClient.get(`concertsbyvenue/${venue}`, {
                            headers: {
                                 Authorization: `Bearer ${token}`
                            }
                        });

                        return response.data.allConcertsByVenue;
                    } catch (error) {
                        this.handleError(error)
                   }
       }

      //   /**
       //    * Updates single concert in the database by date.
       //    * @returns A single concert object
       //   */
       //
       async updateConcert(dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories) {
              try {
                  console.log(dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories,
                  "dateAttended, bandName, tourName, venue, openingActs, songsPlayed, memories");
                  const token = await this.getTokenOrThrow("Only authenticated users can create a concert");
                  const response = await this.axiosClient.put(`updateconcert`, {
                       dateAttended: dateAttended,
                       tourName: tourName,
                       bandName: bandName,
                       venue: venue,
                       openingActs: openingActs,
                       songsPlayed: songsPlayed,
                       memories: memories
                  }, {
                       headers: {
                           Authorization: `Bearer ${token}`
                       }
                  });

                  return await response.data.concert;
              } catch (error) {
                   this.handleError(error)
              }
       }

        handleError(error) {
            console.error(error);

            const errorFromApi = error?.response?.data?.error_message;
            if (errorFromApi) {
                console.error(errorFromApi);
                error.message = errorFromApi;
            }
        }
    }
