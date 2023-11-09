const productModel = require('../models/product.js')

// function getMonthName(monthNumber) {
//     const date = new Date();
//     date.setMonth(monthNumber -1 );
//   
//     return date.toLocaleString('en-US', {
//       month: 'long',
//     });
//   }
//   
// //   console.log(getMonthName(0o2));

const monthsLong = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
};

const productController = {

    //Create an API to list the all transactions based on month selection
    allTransactionsByMonth: async (req, res) => {
        try {
            let req_month = monthsLong[req.body.month];
            const allTransaction = await productModel.find({month:req_month}).exec();

            //To filter data based on month
            // let filtered_month = allTransaction.filter((e) => {
            //     return e.month == req_month;
            // })

            res.status(200).json(allTransaction)
        } catch (err) {
            res.json(err);
        }
    },

    //Create an API to list the all transactions based on search box
    allTransactionsBySearch: async (req, res) => {
        try {
            let req_word = req.body.word;
            const allTransaction = await productModel.find({}).exec();
            console.log(allTransaction)
            let filtered_search = allTransaction.filter((e) => {
                console.log(req_word)
                return e.title.toLowerCase().includes(req_word.toLowerCase());
                // || e.price.startsWith(req_word) || e.description.toLowerCase().includes(req_word.toLowerCase());
            })
            console.log(filtered_search)
            res.status(200).json(filtered_search)
        } catch (err) {
            res.json(err);
        }
    },

    //create an API for statistics
    getStatistics: async (req, res) => {
        try {
            let req_month = monthsLong[req.body.month];
            const allTransaction = await productModel.find({month:req_month}).exec();

            //To filter data based on month
            // let filtered_month = allTransaction.filter((e) => {
            //     return e.month == req_month;
            // })

            //To calculate total no.of.sale & no.of.Notsale
            let Total_Sale_Count = 0; let Total_Not_Sale_Count = 0;
            let Total_Sale = allTransaction.filter((e) => {
                if (e.sold == 'true') {
                    Total_Sale_Count++;
                }
                else {
                    Total_Not_Sale_Count++;
                }
                return e.sold == 'true'
            })
            console.log(Total_Sale_Count, Total_Not_Sale_Count)

            //To Calculate Sales Amount
            let Total_Amount = Total_Sale.reduce((accu, curr) => accu + Number(curr.price), 0)
            let Amount = Total_Amount.toFixed(0)
            console.log(Amount)

            res.status(200).json({Total_Sale_Count, Total_Not_Sale_Count, Amount})

        } catch (err) {
            res.json(err);
        }
    },

    //API for BarChart
    getBarChart:async(req,res)=>{
        try{
            let req_month = monthsLong[req.body.month];
            const b_count0 = await productModel.find({month:req_month, price: { $gte: 0,$lte:100}}).count();
            const b_count1 = await productModel.find({month:req_month, price: { $gte: 101,$lte:200}}).count();
            const b_count2 = await productModel.find({month:req_month, price: { $gte: 201,$lte:300}}).count();
            const b_count3 = await productModel.find({month:req_month, price: { $gte: 301,$lte:400}}).count();
            const b_count4 = await productModel.find({month:req_month, price: { $gte: 401,$lte:500}}).count();
            const b_count5 = await productModel.find({month:req_month, price: { $gte: 501,$lte:600}}).count();
            const b_count6 = await productModel.find({month:req_month, price: { $gte: 601,$lte:700}}).count();
            const b_count7 = await productModel.find({month:req_month, price: { $gte: 701,$lte:800}}).count();
            const b_count8 = await productModel.find({month:req_month, price: { $gte: 801,$lte:900}}).count();
            const b_count9 = await productModel.find({month:req_month, price: { $gte: 901}}).count();
            res.status(200).json({b_count0,b_count1,b_count2,b_count3,b_count4,b_count5,b_count6,b_count7,b_count8,b_count9})
        }catch (err) {
            res.json(err);
        }
    },

    //API to create Pie Chart
    getPieChart:async(req,res)=>{
        try{
            let req_month = monthsLong[req.body.month];

            const allTransaction = await productModel.find().exec();
            let filtered_category=allTransaction.map((c)=>{
                return c.category;
            })

            let unique_category=[...new Set(filtered_category)]
            let count0=await productModel.find({month:req_month,category:unique_category[0]}).count();
            let count1=await productModel.find({month:req_month,category:unique_category[1]}).count();
            let count2=await productModel.find({month:req_month,category:unique_category[2]}).count();
            let count3=await productModel.find({month:req_month,category:unique_category[3]}).count();
            
            res.status(200).json({unique_category,count0,count1,count2,count3});

        }catch(err)
        {
            res.json(err);
        }
    }

}

module.exports = productController;