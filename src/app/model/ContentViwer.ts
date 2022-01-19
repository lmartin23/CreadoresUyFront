import { CreatorContent } from "./CreatorContent";


export class ContentViwer{
    constructor(
        public visible:boolean,
        public authorized: boolean,
        public content:CreatorContent
    ){}
}