interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}


export class CheckService implements CheckServiceUseCase {

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);

            if(req){
                throw new Error(`Error fetching data from ${url}`);
            }

            console.log(`${url} is up and running`);

            return true
        } catch (error) {
            console.log(`${error}`);
            return false;
        }

    }




}