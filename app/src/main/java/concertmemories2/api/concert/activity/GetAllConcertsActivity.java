package concertmemories2.api.concert.activity;

import concertmemories2.api.concert.request.GetAllConcertsRequest;
import concertmemories2.api.concert.result.GetAllConcertsResult;
import concertmemories2.converters.ModelConverter;
import concertmemories2.dynamodb.ConcertDao;
import concertmemories2.dynamodb.models.Concert;
import concertmemories2.models.ConcertModel;

import java.util.List;
import javax.inject.Inject;

/**
 * Implementation of GetAllConcertActivity for ConcertMemories' GetAllConcerts API.
 *
 * This API allows the user to get all of their saved concerts.
 */
public class GetAllConcertsActivity {
    private final ConcertDao concertDao;

    /**
     * Instantiates a new GetAllConcertActivity object.
     *
     * @param concertDao ConcertDao to access the concert table
     */
    @Inject
    public GetAllConcertsActivity(ConcertDao concertDao) {

        this.concertDao = concertDao;
    }

    /**
     * This method handles the incoming request by retrieving all concerts from the database.
     * <p>
     * It then returns the concert in a list.
     * <p>
     * If the concert list does not exist, this should throw a ConcertNotFoundException.
     *
     * @param getAllConcertsRequest request object containing the concert date
     * @return getConcertResult result object containing the API defined {@link ConcertModel}
     */
    public GetAllConcertsResult handleRequest(final GetAllConcertsRequest getAllConcertsRequest) {
        List<Concert> concertList = concertDao.getAllConcerts(getAllConcertsRequest.getEmailAddress());
        List<ConcertModel> concertModels = new ModelConverter().toConcertModelList(concertList);

        return GetAllConcertsResult.builder()
                .withConcertModelList(concertModels)
                .build();
    }
}

