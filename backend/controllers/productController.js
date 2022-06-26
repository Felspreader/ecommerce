const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create Product - admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
});

// GET ALL PRODUCT details

exports.getProductDetails = catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new  ErrorHandler("Product not found", 404));    
    }
    
    res.status(200).json({
      success: true,
      product
    });
});
//  product update -- admin
exports.updateProduct= catchAsyncErrors( async (req, res,next)=>{
    let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
     product = await Product.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true,
         useFindAndModify:false
     });

     res.status(200).json({
         success:true,
     })
});

// Delete Products

exports.deleteProduct =catchAsyncErrors(async(req,res,next)=>{
const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
await product.remove();
res.status(200).json({
    success:true,
    message:"Product Delete Succesfully"
})

});