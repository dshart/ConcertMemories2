package concertmemories2.dependency;

import com.nashss.se.concertmemories.api.concert.activity.*;
import com.nashss.se.concertmemories.dynamodb.ConcertDao;
import dagger.Component;

import javax.inject.Singleton;

/**
 * Dagger component for providing dependency injection in the Concert Memories Web App.
 */
@Singleton
@Component(modules = concertmemories2.dependency.DaoModule.class)
public interface ServiceComponent {

    /**
     * Provides the relevant activity.
     * @return ConcertDao
     */
    ConcertDao provideConcertDao();

    /**
     * Provides the relevant activity.
     * @return GetConcertActivity
     */
//    GetConcertActivity provideGetConcertActivity();

    /**
     * Provides the relevant activity.
     * @return GetAllConcertsActivity
     */
    GetAllConcertsActivity provideGetAllConcertsActivity();

    /**
     * Provides the relevant activity.
     * @return GetAllConcertsByBandActivity
     */
//    GetAllConcertsByBandActivity provideGetAllConcertsByBandActivity();

    /**
     * Provides the relevant activity.
     * @return GetAllConcertsByVenueActivity
     */
//    GetAllConcertsByVenueActivity provideGetAllConcertsByVenueActivity();

    /**
     * Provides the relevant activity.
     * @return CreateConcertActivity
     */
//    CreateConcertActivity provideCreateConcertActivity();


    /**
     * Provides the relevant activity.
     * @return DeleteConcertActivity
     */
//    DeleteConcertActivity provideDeleteConcertActivity();

    /**
     * Provides the relevant activity.
     * @return UpdateConcertActivity
     */
//    UpdateConcertActivity provideUpdateConcertActivity();


}
