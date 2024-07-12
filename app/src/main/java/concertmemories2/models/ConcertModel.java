package concertmemories2.models;

import java.util.List;
import java.util.Objects;

import static concertmemories2.utils.CollectionUtils.copyToList;

public class ConcertModel {
    private final String emailAddress;
    private final String bandName;
    private final String tourName;
    private final String dateAttended;
    private final String venue;
    private final List<String> openingActs;
    private final List<String> songsPlayed;
    private final List<String> memories;

    private ConcertModel(String emailAddress, String bandName, String tourName, String dateAttended, String venue,
                         List<String> openingActs, List<String> songsPlayed, List<String> memories) {
        this.emailAddress = emailAddress;
        this.bandName = bandName;
        this.tourName = tourName;
        this.dateAttended = dateAttended;
        this.venue = venue;
        this.openingActs = openingActs;
        this.songsPlayed= songsPlayed;
        this.memories = memories;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getBandName() {
        return bandName;
    }

    public String getTourName() {
        return tourName;
    }

    public String getDateAttended() {
        return dateAttended;
    }

    public String getVenue() {
        return venue;
    }

    public List<String> getOpeningActs() {

        return copyToList(openingActs);
    }

    public List<String> getSongsPlayed() {

        return copyToList(songsPlayed);
    }

    public List<String> getMemories() {

        return copyToList(memories);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConcertModel that = (ConcertModel) o;
        return emailAddress.equals(that.emailAddress) && dateAttended.equals(that.dateAttended);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emailAddress, dateAttended);
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String emailAddress;
        private String bandName;
        private String tourName;
        private String dateAttended;
        private String venue;
        private List<String> openingActs;
        private List<String> songsPlayed;
        private List<String> memories;

        public Builder withEmailAddress(String emailAddress) {
            this.emailAddress = emailAddress;
            return this;
        }

        public Builder withBandName(String bandName) {
            this.bandName = bandName;
            return this;
        }

        public Builder withTourName(String tourName) {
            this.tourName = tourName;
            return this;
        }

        public Builder withDateAttended(String dateAttended) {
            this.dateAttended = dateAttended;
            return this;
        }

        public Builder withVenue(String venue) {
            this.venue = venue;
            return this;
        }

        public Builder withOpeningActs(List<String> openingActs) {
            this.openingActs = copyToList(openingActs);
            return this;
        }

        public Builder withSongsPlayed(List<String> songsPlayed) {
            this.songsPlayed = copyToList(songsPlayed);
            return this;
        }

        public Builder withMemories(List<String> memories) {
            this.memories = copyToList(memories);
            return this;
        }

        public ConcertModel build() {
            return new ConcertModel(emailAddress, bandName, tourName, dateAttended, venue, openingActs, songsPlayed, memories);
        }
    }
}