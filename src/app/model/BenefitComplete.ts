export class BenefitComplete {
    id?: number;
    description: string;

    deleted?: boolean;

    constructor(_description) {
        this.description = _description;

    }
}