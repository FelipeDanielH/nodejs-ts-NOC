interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallBack: ErrorCallback
    ) {}

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if(!req){
                throw new Error(`Error fetching data from ${url}`);
            }

            this.successCallBack();

            return true
        } catch (error) {
            this.errorCallBack(`${error}`);
            return false;
        }
    }
}