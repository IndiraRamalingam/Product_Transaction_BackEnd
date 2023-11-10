const express=require('express')
const router=express.Router();
const productController = require('../controllers/productController')

//Create an API to list the all transactions
router.get('/by_month/:month',productController.allTransactionsByMonth)
router.get('/by_search/:word/:month',productController.allTransactionsBySearch)

//Create an API for statistics
router.get('/statistics/:month',productController.getStatistics)

//Create an API for bar chart ( the response should contain price range and the number of items in that range for the selected month regardless of the year )
router.get('/barChart/:month',productController.getBarChart)

// Create an API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year.
router.get('/pieChart/:month',productController.getPieChart)


module.exports=router;