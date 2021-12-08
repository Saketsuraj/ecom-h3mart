
module.exports = (customer,jwt,knex) =>{
// Add a customer
customer.post("/add/customer", (req, res) =>{
    console.log(req.body);
    var name = req.body.name;
    var shipping_address = req.body.shipping_address;
    var contact_number = req.body.contact_number;
    var email = req.body.email;
    var password = req.body.password;
    if (name === undefined || email === undefined || password === undefined || shipping_address === undefined || contact_number === undefined){
        console.log({"Suggetion": "name, address, number email and password all are required"});
        res.send({"Suggetion": "name, address, number, email and password all are required"});
    }else{
        var accessToken = jwt.sign(req.body, "123",{expiresIn: "24h"})
        // console.log(accessToken );
        // res.send({"Token": accessToken})
        knex
        .select('*')
        .from('customers')
        .where({"name": name, "shipping_address":shipping_address, "contact_number":contact_number, "email": email, "password": password})
        .then((data) => {
            // console.log(data);
            if (data.length<1){
                knex('customers').insert(req.body)
                .then((result) =>{
                    knex
                    .select('*')
                    .from('customers')
                    .where('email',email)
                    .then((user) =>{
                        // console.log(user);
                        userdata = {'customers': {'schema': user[0]}, accessToken, expires_in: '24h'}
                        res.send(userdata);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }).catch((err) =>{
                    console.log(err);
                })
            }else{
                res.send({
                    "exist": "this user alredy exists.."
                })
            }
        })
    }
})
}
 