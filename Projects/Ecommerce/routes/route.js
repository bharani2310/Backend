import express from 'express'
import { authenticateUser, registerUser, sendOtp,updateUser, verifyOtp,getUserCount} from '../controller/authController.js';
import { addCategory,getCategories,updateCategory,deleteCategory } from '../controller/categoryController.js';
import { addProduct , getProducts,updateProduct,deleteProduct,getProductsByCategory,getProductById} from '../controller/productController.js';
import { searchItems } from '../controller/searchController.js';
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../controller/cartController.js';


const router=express.Router()

router.get('/user',getUserCount)
router.post('/sendOtp',sendOtp)
router.put("/users/:id", updateUser);
router.post('/verifyOtp',verifyOtp)
router.post('/register',registerUser)
router.post('/login',authenticateUser)

router.get('/categories',getCategories)
router.post('/categories',addCategory)
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

router.get('/products',getProducts)
router.get('/products-by-category',getProductsByCategory)
router.post('/products',addProduct)
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


router.get("/search", searchItems);

router.post("/cart", addToCart);
router.get("/cart/:userId", getCartItems);
router.put("/cart/:userId/:productId", updateCartItem);
router.delete("/cart/:userId/:productId", removeCartItem);


export default router;