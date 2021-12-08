var jwt = require("jsonwebtoken");
module.exports = (orders,knex)=>{

// Create an Order
orders.post("/order/create/", (req,res)=>{
    let total_quantity = 0
    let total_amount = 0
    // var token = req.headers.cookie
    // //console.log(token)
    // token = token.slice(4)
    // //console.log(token);
    // var tokendata=jwt.verify(token,"123")
    var order_detail = req.body;
    order_detail.book_details.forEach(element => {
        console.log(element)
        console.log("total_quantity"+ total_quantity)
        total_quantity = total_quantity + element.quantity;
        if(total_quantity>10){
            res.send({"alert":"You can order max 10 books at a time."})
        }
        else{
            console.log(element.quantity, element.price)
            total_amount = total_amount + (element.quantity*element.price);
        }
    });
    // console.log(tokendata);

    // knex
    // .select("*")
    // .from("customers")
    // .where("cart_id",req.body.cart_id)
    // .then((data)=>{
    //     console.log(data);
    // })
    

    // knex
    // .select("*")
    // .from("shopping_cart")
    // .where("cart_id",req.body.cart_id)
    // .join("product",function(){
    //     this.on('shopping_cart.product_id','product.product_id')
    // })
    // .then((data)=>{
        console.log(total_amount)
        knex("orders").insert({
            total_amount:total_amount,
            customer_id:order_detail.customer_id,
            book_details:JSON.stringify(order_detail.book_details)
        })
        .then((result)=>{
            console.log(result)
            res.send({"order Id":result[0]})
            // knex("order_detail").insert({
            //     "unit_cost":data[0].price,
            //     "quantity":data[0].quantity,
            //     "product_name":data[0].name,
            //     "attributes":data[0].attributes,
            //     "product_id":data[0].product_id,
            //     "order_id":result[0]
            }).catch(()=>{
                res.send({"error":"error in insserting data in orders detail."})
            })
        })
    // }).catch((err)=>{
    //     res.send({"error":"cart id not found..."})
    // })

// Get orders by id
orders.get("/order/:id", (req, res) =>{
    let id = req.params.id
    console.log(id)
            knex
            .select('*')
            .from('orders')
            .where('id', id)
            .then((data) =>{
                console.log(data);
                res.send(data);
            }).catch((err) =>{
                console.log(err);
            })
})
}