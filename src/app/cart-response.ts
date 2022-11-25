export class CartResponse {
    _id:string;
    products: [];
    totalPrice:number;

    constructor(_id:string,
    products: [],
    totalPrice:number){
        this._id = _id;
        this.products = products;
        this.totalPrice = totalPrice;
    }
}
