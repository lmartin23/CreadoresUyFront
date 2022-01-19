import { infoPago } from "./infoPago";

export class CreatorDto {
    idUser: number;
    category1: string;
    category2: string;
    creatorName: string;
    nickName: string;
    contentDescription: string;
    biography: string;
    youtubeLink: string;
    creatorImage: string;
    coverImage: string;
    infoPago: infoPago;
}