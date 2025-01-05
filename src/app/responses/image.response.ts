import { UUID } from "crypto";
import { environment } from "../environments/environment";

export class ImageResponse {
    id : UUID;
    url : string;
    product_id : UUID;

    constructor(data : any) {
        this.id = data.id;
        this.url = `${environment.apiBaseUrl}/${data.url}`;
        this.product_id = data.product_id;
    }

}