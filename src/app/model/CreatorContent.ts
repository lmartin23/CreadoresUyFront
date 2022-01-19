import { name } from "./name";

export class CreatorContent {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public idCreator: number,
        public nickName: string,
        public addedDate: Date,
        public draft: boolean,
        public publishDate: Date,
        public Public: boolean,
        public compositor: string,
        public link: string,
        public img: string,
        public type: number,
    ){}

    public plans: number[];
    public tags: name[];
    public dato:string;
}