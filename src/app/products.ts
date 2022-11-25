export class Products{
    _id;
    Quantity:any;
    about: string;
    name: string;
    Price:number;
    isEditable:boolean;
    imgPath:string;

    constructor(_id,Quantity:any,about:string, name:string,isEditable:boolean,Price:number,imgPath:string){
         
        this.Quantity=Quantity;
        this._id=_id;
        this.about = about;
        this.name = name;
        this.Price = Price;
        this.isEditable=false;
        this.imgPath = imgPath;
    }

}