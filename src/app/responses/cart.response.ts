import { UUID } from "crypto";
import { CosmeticResponse } from "./cosmetic.response";

export class CartResponse {
    id : UUID;
    quantity : number;
    product : CosmeticResponse;

    constructor(data : any){
        this.id = data.id;
        this.quantity = data.quantity;
        this.product = new CosmeticResponse(data.product);
    }
}