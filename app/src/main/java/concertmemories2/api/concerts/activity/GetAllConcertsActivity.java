package concertmemories2.api.concerts.activity;

import com.nashss.se.concertmemories.api.concert.request.GetAllConcertsRequest;
import com.nashss.se.concertmemories.api.concert.result.GetAllConcertsResult;
import com.nashss.se.concertmemories.converters.ModelConverter;
import com.nashss.se.concertmemories.dynamodb.ConcertDao;
import com.nashss.se.concertmemories.dynamodb.models.Concert;
import com.nashss.se.concertmemories.models.ConcertModel;

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

