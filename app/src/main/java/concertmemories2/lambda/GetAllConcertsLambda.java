package concertmemories2.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.nashss.se.concertmemories.api.concert.request.GetAllConcertsRequest;
import com.nashss.se.concertmemories.api.concert.result.GetAllConcertsResult;

/**
 * GetAllConcertsLambda.
 */
public class GetAllConcertsLambda
        extends LambdaActivityRunner<GetAllConcertsRequest, GetAllConcertsResult>
        implements RequestHandler<AuthenticatedLambdaRequest<GetAllConcertsRequest>, LambdaResponse> {

    @Override
    public LambdaResponse handleRequest(AuthenticatedLambdaRequest<GetAllConcertsRequest> input, Context context) {
        return super.runActivity(
                () ->
                {
                    return input.fromUserClaims(claims ->
                        GetAllConcertsRequest.builder()
                            .withEmailAddress(claims.get("email"))
                            .build());
                },
                (request, serviceComponent) ->
                        serviceComponent.provideGetAllConcertsActivity().handleRequest(request)
        );
    }
}

