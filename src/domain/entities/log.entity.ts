
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface logEntityOptions {
    level: LogSeverityLevel,
    message: string,
    origin: string,
    createdAt?: Date
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: logEntityOptions) {
        const { level, message, origin, createdAt } = options
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt ?? new Date();
    }


    static fromJson = (json: string): LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({ message, level, origin });
        log.createdAt = new Date(createdAt);

        return log;
    }

    static fromObject = (obj: Record<string,any>) => {

        const { message, level, createdAt, origin } = obj

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });

        return log
    }
}