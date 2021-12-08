module.exports = (book, knex)=>{

// Add a book
book.post("/add/book", (req, res) =>{
    console.log(req.body);
    var book_name = req.body.book_name;
    var price_in_inr = req.body.price_in_inr;
    if (book_name === undefined || price_in_inr === undefined){
        console.log({"Suggetion": "book name and it's price all are required"});
        res.send({"Suggetion": "book name and it's price all are required"});
    }else{
        knex
        .select('*')
        .from('books')
        .where({"book_name": book_name, "price_in_inr":price_in_inr})
        .then((data) => {
            // console.log(data);
            if (data.length<1){
                knex('books').insert(req.body)
                .then((result) =>{
                    knex
                    .select('*')
                    .from('books')
                    .where('book_name',book_name)
                    .then((user) =>{
                        // console.log(user);
                        userdata = {'books': {'schema': user[0]}}
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
                    "exist": "this book alredy exists.."
                })
            }
        })
    }
})

//get all books with pagination
book.get("/books", (req, res) =>{
    let params = req.query;
    console.log(params)
    knex
    .select('*')
    .from('books')
    .limit(params.pages*params.records)
    .offset(params.offset)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
})
}

