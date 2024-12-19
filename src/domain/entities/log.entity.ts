export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    constructor(
        private readonly message: string,
        private readonly severity: LogSeverityLevel,
        private readonly timestamp: Date,
    ) {}
}