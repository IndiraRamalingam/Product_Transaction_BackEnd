const express=require('express')
const router=express.Router();
const productController = require('../controllers/productController')

//Create an API to list the all transactions
router.get('/by_month',productController.allTransactionsByMonth)
router.get('/by_search',productController.allTransactionsBySearch)

//Create an API for statistics
router.get('/statistics',productController.getStatistics)

//Create an API for bar chart ( the response should contain price range and the number of items in that range for the selected month regardless of the year )
router.get('/barChart',productController.getBarChart)

// Create an API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year.
router.get('/pieChart',productController.getPieChart)

// Create an API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year.

module.exports=router;