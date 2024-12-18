import express from 'express';
import { protectedRoutes } from '../middleware/protectRoutes.js';
import { buyerLogin, BuyerSignup, changeworkingStatus, deletseller, getAllUsers, SellerLogin, SellerSignup, updateSeller } from '../controllers/buyerAndSeller.controller.js';


const router = express.Router();

// router.get('/me',protectedRoutes ,GetMe)
router.post('/buyer/admin/signup', BuyerSignup)
router.post('/seller/update/workig/status/:id', changeworkingStatus)
router.post('/seller/admin/signup/special/adminseller/request', SellerSignup)
router.post('/buyer/admin/login', buyerLogin)
router.post('/seller/admin/login/request', SellerLogin)
router.post('/seller/admin/update/request/:id', updateSeller)

router.delete('/del/:id', deletseller)

router.get('/seller/buyer/admin/users/special', getAllUsers)
// router.post('/logout',Logout )

export default router