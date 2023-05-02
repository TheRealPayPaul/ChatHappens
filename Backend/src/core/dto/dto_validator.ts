export default class DTOValidator {
    private errors?: string[];

    protected clearErrors(): void {
        this.errors = undefined;
    }

    protected addError(msg: string): void {
        if (!this.errors)
            this.errors = [];
        
        this.errors.push(msg);
    }

    protected hasNoErrors(): boolean {
        if (!this.errors)
            return true;

        return this.errors.length <= 0;
    }

    public getErrors(): string[] {
        if (!this.errors)
            this.errors = [];
        
        return this.errors;
    }
}