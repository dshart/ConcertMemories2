package concertmemories2.api.concerts.request;

/**
 * Implementation of GetAllConcertRequest for ConcertMemories' GetAllConcerts API.
 *
 * This API allows the user to get all of their saved concerts.
 */
public class GetAllConcertsRequest {
    private final String emailAddress;

    private GetAllConcertsRequest(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    @Override
    public String toString() {
        return "GetConcertRequest{" +
                "emailAddress='" + getEmailAddress() + '\'' +
                '}';
    }

    /**
     * builder().
     * @return Builder
     */
    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String emailAddress;

        /**
         * withEmailAddress(x).
         * @param emailAddress ConcertDao to access the concert table
         * @return Builder
         */
        public Builder withEmailAddress(String emailAddress) {
            this.emailAddress = emailAddress;
            return this;
        }

        /**
         * build().
         * @return GetAllConcertsRequest
         */
        public GetAllConcertsRequest build() {
            return new GetAllConcertsRequest(emailAddress);
        }
    }
}

