import { name } from "./name";

export class CreatorContentString {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public idCreator: number,
        public nickName: string,
        public addedDate: Date,
        public draft: boolean,
        public publishDate: string,
        public Ispublic: boolean,
        public type: number,
    ){}

    public plans: number[];
    public tags: name[];
    public dato:string;
    public creatorImage:string;
}