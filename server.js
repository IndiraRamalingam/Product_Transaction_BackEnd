const config = require('./utils/config');
const mongoose = require('mongoose');
const app = require('./app');
const productModel=require('./models/product')
const URLS='https://s3.amazonaws.com/roxiler.com/product_transaction.json';

//connect with DB
mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(config.PORT, () => {
            console.log(`Server running on PORT ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

//Fetching data from API and save it to collection
    fetch(URLS)
    .then(response => response.json())
    .then((data) => data.map((p)=>{
        (async () => { 
            const document = await productModel.findOne({id:p.id}).exec(); 
                 if(!document)
                 {
                    const products_Model=new productModel({
                        id:p.id,
                        title:p.title,
                        price:Math.round(p.price),
                        description:p.description,
                        category:p.category,
                        image:p.image,
                        sold:p.sold,
                        dateOfSale:p.dateOfSale,
                        month:p.dateOfSale.slice(5,7)
                    })
                    products_Model.save();
                 }
        })();
    }))
    .catch(error => console.error(error));

   