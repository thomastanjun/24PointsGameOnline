package src;

public class ErrorResponse {
    private String message;
    private String code;
    private long timestamp;

    public ErrorResponse(String message, String code) {
        this.message = message;
        this.code = code;
        this.timestamp = System.currentTimeMillis();
    }
}