const express = require('express');
var mongojs=require('mongojs');
const router = express.Router();
var bodyParser =require('body-parser');

var db=mongojs('mongodb://localhost:27017/test',['login','product','cart','contact']);

router.post('/check-login',(req,res)=>{
    var username= req.body.username;
    var password=req.body.password;

    console.log("req received");
    console.log(username);
   
    db.login.findOne({username: req.body.username, password: req.body.password},(err, user) =>{
        if(err || !user){            
             res.send("fail"); 
        }
        else{            
              res.send(user);
        }
    })
})
router.post('/register',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;

    db.login.save({username:req.body.username,password:req.body.password},(err,result)=>{
        if(err)
        res.send(err);
        else{
            console.log(result);
            res.send("success");
        }
    })
});
router.get('/getProduct', (req, res,next)=> {
    console.log('request received');

  db.product.find(function(err,product){
      if(err){
          res.send(err);
      }
      else{
          res.send(product);
          console.log(product);
      }
  })

});
router.get('/getProductsData', (req,res) =>{
    db.product.find((err, product) =>{
        if(err)
            res.send(err);
        else
            res.send(product);
    })

});

router.put('/updateProducts/:id', (req,res) =>{
    console.log(req.body.newproduct);
    var updtObj = req.body.newproduct;

    var newvalues = {
   $set: updtObj
}
    db.product.updateOne({_id:mongojs.ObjectId(req.params.id)}, newvalues, (err, result) =>{
        if(err){
            res.send(err);
        }
        else{
             db.product.find((err, product) =>{
             if(err)
                 res.send(err);
            else
                res.send(product)
            })
        }
    })
})

router.post('/createProduct', (req,res)=>{
    db.product.save(req.body.product, (err, result)=>{
        if(err)
            res.send(err);
        else{
            db.product.find((err, product) =>{
             if(err)
                 res.send(err);
            else
                res.send(product)
            })
            
        }
    })

})
router.get('/getProductDataById/:_id',(req,res)=>{
    db.product.findOne({_id:mongojs.ObjectId(req.params._id)}, (err, result)=>{
        if(err || !result){
            res.status(404).send("Product Data not found");
        }
        else{
            res.send(result);
            console.log(result);
        }

    })
})
router.post('/add-items-to-cart', (req,res) =>{
    //console.log(req.body.addedProduct);
    //console.log(req.body.customerId);

    let cartPrice = 0;

    db.cart.findOne({_id:mongojs.ObjectId(req.body.customerId)},(err, cartData) =>{
        if(err || !cartData){
            console.log("not found")
            cartPrice = 0;

    db.cart.update(
    { _id: mongojs.ObjectId(req.body.customerId)}
  , {
      $set: { totalPrice: cartPrice + req.body.addedProduct.Price }
    , $push: { products: req.body.addedProduct        
    }
  }, {upsert:true, new:true}, function(err, success){
       if (err) {
        console.log(err)
        } else {
            //console.log(success)
        }
  });

        }
        else{          
            console.log("found"); 
            cartPrice = cartData.totalPrice;     


var newQuantity = 0;
var updateFlag=false;
for(var i = 0; i < cartData.products.length; i++) {
  if(cartData.products[i]._id == req.body.addedProduct._id) {
    newQuantity = cartData.products[i].quantity + 1;
    console.log("req.body.addedProduct.quantity" + newQuantity)
updateFlag = true;
    break;

  }
  else{
      continue;
  }}
  
if(updateFlag == true){
    console.log("inside update");
  db.cart.update( { _id: mongojs.ObjectId(req.body.customerId),
 "products._id": req.body.addedProduct._id},
{$set:{totalPrice: cartPrice + req.body.addedProduct.Price,
 "products.$.quantity":  newQuantity}
})
}
else if(updateFlag == false){
      console.log("inside new");
    db.cart.update(
    { _id: mongojs.ObjectId(req.body.customerId),
    }
  , {
      $set: { totalPrice: cartPrice + req.body.addedProduct.Price }
    , $push: { products: req.body.addedProduct        
    }
  }, {}, function(err, success){
       if (err) {
        console.log(err)
        } else {
            //console.log(success)
        }
  });
}
   }
    })
}
)
router.get('/get-cart-details/:customerId' , (req,res)=>{
    db.cart.find({_id:mongojs.ObjectId(req.params.customerId)}, (err,result) =>{
        if(err || !result){
            res.status(404).send("Cart data not found");
        }
        else{
            res.send(result);
        }

    })
})

router.delete('/clearCart/:customerId', (req,res) =>{
    console.log("clear cart called");
     db.cart.remove({
        _id:mongojs.ObjectId(req.params.customerId)
    },'',function(err,result){
        if(err){
            res.send(err);
            res.status(500).send("Error");
        }
        else{
           res.status(200).send("Cart Data Deleted");
        }
    });

});

router.post('/delete-item' ,(req,res) =>{
     let cartPrice = 0;

    db.cart.findOne({_id:mongojs.ObjectId(req.body.customerId)},(err, cartData) =>{
        if(err){

        }

        else{
             cartPrice = cartData.totalPrice;    
             let oldQuantity = 0;

             for(var i = 0; i < cartData.products.length; i++) {
  if(cartData.products[i]._id == req.body.productToDel._id) {
    oldQuantity = cartData.products[i].quantity;
  }
}


             db.cart.update(
    { _id: mongojs.ObjectId(req.body.customerId),
    }
  , {
      $set: { totalPrice: cartPrice - (req.body.productToDel.price * oldQuantity) }
    , $pull: { "products": { _id:req.body.productToDel._id}
    }
  }, {}, function(err, success){
       if (err) {
        console.log(err);
         res.status(500).send("Error");

    } else {
         res.status(200).send("cart item removed");
        console.log("success");
            //console.log(success)
        }
  }); 
        }



    })


})

router.post('/decrease-item', (req,res) =>{

     let cartPrice = 0;

    db.cart.findOne({_id:mongojs.ObjectId(req.body.customerId)},(err, cartData) =>{
        if(err || !cartData){

        }
        else{          
            console.log("found"); 
            cartPrice = cartData.totalPrice;     


let newQuantity = 0;
var updateFlag=false;
for(var i = 0; i < cartData.products.length; i++) {
  if(cartData.products[i]._id == req.body.productToDecrement._id) {
    newQuantity = cartData.products[i].quantity - 1;
    console.log("req.body.productToDecrement.quantity" + newQuantity)
updateFlag = true;
    break;

  }
  else{
      continue;
  }}
  
if(updateFlag == true){
    console.log("inside update");
  db.cart.update( { _id: mongojs.ObjectId(req.body.customerId),
 "products._id": req.body.productToDecrement._id},
{$set:{totalPrice: cartPrice - req.body.productToDecrement.Price,
 "products.$.quantity":  newQuantity}
}, (err,result) =>{
    if(err){
        console.log(err);
        res.status(500).send("Error");
    }

    else{
        res.status(200).send("cart updated");
        console.log(result);
    }
})
}
        }
    })

})

router.delete('/deleteProduct/:id', (req,res) =>{
    db.product.remove({
       _id:mongojs.ObjectId(req.params.id)
   },'',function(err,result){
       if(err){
           res.send(err)
       }
       else{            
           db.product.find((err, products) =>{
            if(err || !products)
                res.send(err);
           else
               res.send(products)
           })
       }
   });
   

})
router.post('/feedback',(req,res)=>{
    var email=req.body.email;
    var name=req.body.name;
    var feed=req.body.feed;

    db.contact.save({email:req.body.email,name:req.body.name,feed:req.body.feed},(err,result)=>{
        if(err)
        res.send(err);
        else{
            console.log(result);
           
        
        }
    })
});






module.exports = router;