import { BenefitComplete } from "./BenefitComplete";


export class PlanComplet {
    id: number;
    deleted: boolean;
    name: string;
    description: string;
    price: number;
    image: string;
    subscriptionMsg: string;
    welcomeVideoLink: string;
    benefits: Array<BenefitComplete>;
}