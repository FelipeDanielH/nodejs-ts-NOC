export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class Log {
    constructor(
        private readonly message: string,
        private readonly severity: LogSeverityLevel,
        private readonly timestamp: Date,
    ) {}
}