package concertmemories2.exceptions;

/**
 * Exception to throw when a given string list of memories fails to be serialized to DDB or deserialized from DDB.
 */
public class MemoriesSerializationException extends RuntimeException {

    private static final long serialVersionUID = -6299311116787620694L;

    /**
     * Exception with no message or cause.
     */
    public MemoriesSerializationException() {
        super();
    }

    /**
     * Exception with a message, but no cause.
     * @param message A descriptive message for this exception.
     */
    public MemoriesSerializationException(String message) {
        super(message);
    }

    /**
     * Exception with no message, but with a cause.
     * @param cause The original throwable resulting in this exception.
     */
    public MemoriesSerializationException(Throwable cause) {
        super(cause);
    }

    /**
     * Exception with message and cause.
     * @param message A descriptive message for this exception.
     * @param cause The original throwable resulting in this exception.
     */
    public MemoriesSerializationException(String message, Throwable cause) {
        super(message, cause);
    }
}
