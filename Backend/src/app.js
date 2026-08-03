const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('../routes/auth.routes');
const testRoutes = require('../routes/test.routes');
const productRoutes = require('../routes/product.routes');
const cartRoutes = require('../routes/cart.routes');
const orderRoutes = require('../routes/order.routes');
const analyticsRoutes = require('../routes/analytics.routes');
const recentRoutes = require("../routes/recent.routes");

const recommendationRoutes = require('../routes/recommendation.routes');

const wishlist = require('../routes/wishlist.routes')

const userRoutes = require("../routes/user.routes");
const couponRoutes = require("../routes/coupon.routes");


app.use('/api/wishlist',wishlist)

app.use('/api/recommendations', recommendationRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/products', productRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/recent', recentRoutes);
app.use( "/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);


app.get('/',(req,res)=>{
    res.send("Smart minimart API running");
})




module.exports = app;