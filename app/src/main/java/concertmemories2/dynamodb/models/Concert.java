package concertmemories2.dynamodb.models;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.List;
import java.util.Objects;

/**
 * Represents a record in the playlists table.
 */
@DynamoDBTable(tableName = "Concerts")
public class Concert {
    public static final String BAND_INDEX = "ConcertsByBandIndex2";
    public static final String VENUE_INDEX = "ConcertsByVenueIndex2";
    private String emailAddress;
    private String bandName;
    private String tourName;
    private String dateAttended;
    private String venue;
    private List<String> openingActs;
    private List<String> songsPlayed;
    private List<String> memories;

    public Concert() {
    }

    @DynamoDBHashKey(attributeName = "emailAddress")
    @DynamoDBIndexHashKey(globalSecondaryIndexNames = {BAND_INDEX, VENUE_INDEX},
            attributeName = "emailAddress")
    public String getEmailAddress() {
        return emailAddress;
    }
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @DynamoDBIndexRangeKey(globalSecondaryIndexName = BAND_INDEX, attributeName = "bandName")
    public String getBandName() {
        return bandName;
    }

    public void setBandName(String bandName) {
        this.bandName = bandName;
    }

    @DynamoDBAttribute(attributeName = "tourName")
    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

    @DynamoDBRangeKey(attributeName = "dateAttended")
    public String getDateAttended() { return dateAttended; }

    public void setDateAttended(String dateAttended) {
        this.dateAttended = dateAttended;
    }

    @DynamoDBIndexRangeKey(globalSecondaryIndexName = VENUE_INDEX, attributeName = "venue")
    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    /**
     * Returns the list of opening acts for this concert, null if there are none.
     *
     * @return List of opening acts for this concert
     */

    @DynamoDBAttribute(attributeName = "openingActs")
    public List<String> getOpeningActs() {
        return openingActs;
    }

    public void setOpeningActs(List<String> openingActs) {
        this.openingActs = openingActs;
    }

    @DynamoDBAttribute(attributeName = "songsPlayed")
    public List<String> getSongsPlayed() {
       return songsPlayed;
    }

    public void setSongsPlayed(List<String> songsPlayed) {
        this.songsPlayed = songsPlayed;
    }

    @DynamoDBAttribute(attributeName = "memories")
    public List<String> getMemories() {
        return memories;
    }

    public void setMemories(List<String> memories) {this.memories = memories;

    }

    @Override
    public String toString() {
        return "Concert{" +
                "emailAddress='" + emailAddress + '\'' +
                ", bandName='" + bandName + '\'' +
                ", tourName='" + tourName + '\'' +
                ", dateAttended='" + dateAttended + '\'' +
                ", venue='" + venue + '\'' +
                ", openingActs=" + openingActs +
                ", songsPlayed=" + songsPlayed +
                ", memories=" + memories +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Concert)) return false;
        Concert concert = (Concert) o;
        return Objects.equals(emailAddress, concert.emailAddress) && Objects.equals(dateAttended, concert.dateAttended);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emailAddress, dateAttended);
    }
}