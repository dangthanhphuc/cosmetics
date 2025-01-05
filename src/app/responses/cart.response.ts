import { UUID } from "crypto";
import { CosmeticResponse } from "./cosmetic.response";

export class CartResponse {
    user_id : UUID;
    quantity : number;
    product : CosmeticResponse;

    constructor(data : any){
        this.user_id = data.user_id;
        this.quantity = data.quantity;
        this.product = new CosmeticResponse(data.product);
    }
}