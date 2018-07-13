class Log {
    public static info(message?: any, ...optionalParams: any[]): void {
        console.info(message, ...optionalParams);
    }

    public static warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message, ...optionalParams);
    }

    public static error(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
}