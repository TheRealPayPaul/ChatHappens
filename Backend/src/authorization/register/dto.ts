export default class DTO {
    private errors?: string[];

    protected clearErrors() {
        this.errors = undefined;
    }

    protected addError(msg: string) {
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