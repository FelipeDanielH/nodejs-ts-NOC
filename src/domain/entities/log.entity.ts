export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    constructor(
        public readonly message: string,
        public readonly level: LogSeverityLevel,
        public readonly createdAt: Date,
    ) {}
}