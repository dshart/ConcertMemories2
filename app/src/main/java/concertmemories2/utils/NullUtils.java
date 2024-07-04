package concertmemories2.utils;

import java.util.function.Supplier;

public class NullUtils {
    private NullUtils() { }

    /**
     * GetAllConcertsLambda
     */
    public static <T> T ifNull(T obj, T valIfNull) {
        return obj != null ? obj : valIfNull;
    }

    /**
     * GetAllConcertsLambda.
     */
    public static <T> T ifNull(T obj, Supplier<T> valIfNullSupplier) {
        return obj != null ? obj : valIfNullSupplier.get();
    }

    /**
     * ifNotNull(x).
     * @param obj obj
     * @param valIfNotNull valIfNotNull
     * @return <T>
     */
    public static <T> T ifNotNull(T obj, T valIfNotNull) {
        return obj == null ? null : valIfNotNull;
    }

    /**
     * ifNotNull(x).
     * @param obj obj
     * @param valIfNotNullSupplier valIfNotNullSupplier
     * @return U
     */
    public static <T, U> U ifNotNull(T obj, Supplier<U> valIfNotNullSupplier) {
        return obj == null ? null : valIfNotNullSupplier.get();
    }
}