const { Trasnsctions } = require("../models/transactionModel");
const catchAsync = require("../utils/catchAsync");

exports.createTransaction = catchAsync(async (req,res,next)=>{
    const newTransaction = await Trasnsctions.create({
        month:req.body.month,
        data:[{
            date:req.body.date
        }],
        userId:req.body.userId,
    })
})