import { UUID } from "crypto";

export class CartDTO {
    user_id: UUID;
    product_id: UUID;
    quantity : number;

    constructor(data : any) {
        this.user_id = data.user_id;
        this.product_id = data.product_id;
        this.quantity = data.quantity;
    }
}