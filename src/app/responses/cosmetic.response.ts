import { UUID } from "crypto"
import { Origin } from "../enums/origin.enum"
import { CategoryResponse } from "./category.response";
import { BrandResponse } from "./brand.response";
import { ImageResponse } from "./image.response";

export class CosmeticResponse {
    id: UUID;
    name: string;
    price: number;
    description: string;
    origin: Origin;
    category: CategoryResponse;;
    brand: BrandResponse;
    images : ImageResponse[];

    constructor(data : any) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.origin = data.origin;
        this.category = new CategoryResponse(data.category);
        this.brand = new BrandResponse(data.brand);
        this.origin = data.origin;  // Map string to enum value
        this.images = data.images.map((image : any) => new ImageResponse(image));  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array  // Map array to ImageResponse[] array
    }
}