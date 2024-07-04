package concertmemories2.api.concerts.result;

import com.nashss.se.concertmemories.models.ConcertModel;

import java.util.ArrayList;
import java.util.List;


/**
 * Implementation of GetAllConcertsResult for ConcertMemories' GetAllConcerts API.
 *
 * This API allows the user to get all of their saved concerts.
 */

public class GetAllConcertsResult {
    private final List<ConcertModel> concertList;

    private GetAllConcertsResult(List<ConcertModel> concertList) {
        this.concertList = concertList;
    }

    public List<ConcertModel> getAllConcerts() {
        return new ArrayList<>(concertList);
    }

    @Override
    public String toString() {
        return "GetAllConcertsResult{" +
                "concertList=" + concertList +
                '}';
    }

    /**
     * Builder.
     * @return Builder.
     */
    public static Builder builder() {
        return new Builder();
    }

    /**
     * Builder.
     */
    public static class Builder {
        private List<ConcertModel> concertList;


        /**
         * withConcertModelList(x).
         * @param concertList concertList
         *@return Builder
         */
        public Builder withConcertModelList(List<ConcertModel> concertList) {
            this.concertList = new ArrayList<>(concertList);
            return this;
        }
        /**
         * build().
         * @return GetAllConcertsResult
         */
        public GetAllConcertsResult build() {
            return new GetAllConcertsResult(concertList);
        }
    }
}


