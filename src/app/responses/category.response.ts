import { UUID } from "crypto";

export class CategoryResponse {
    id : UUID;
    name : string;

    constructor(data : any) {
        this.id = data.id;
        this.name = data.name;
    }
}