// define the middleware and services here
const express = require("express");
const bodyParser = require("body-parser");// to parse the request and create req.body
const cookieParser = require("cookie-parser");// A.T. 27.10 import cookie
//const methodOverride = require("method-override");
const db = require('./db/connection');

const PORT = 3000;


// const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const { render } = require("ejs"); 

const app = express();
app.use( express.static('public'))

// app.set('views',path.join(__dirname, 'views'))
// app.set('view engine', 'ejs');

// setting up the MW
//app.use(express.static("public")); // added A.T. making these files accessible to clients via URLs
app.use(bodyParser.json({ limit: "200mb" })); //looks at any requests that comes in that has json in it and parses it into a JS object that you can access the keys and use like a regular object so that my app can manipulate it.
app.use(express.urlencoded({ limit: "200mb", extended: false }));// added A.T.
//app.use(methodOverride("_method"));// added A.T.

app.use(cookieParser());// A.T. 27.10 use before routes??




app.use('/home',(req,res)=>{
  res.render('./about.ejs');
})

app.use('/dishes',(req,res)=>{
  res.render('./dishes.ejs');
})

app.use('/users', userRouter);


app.use('/dishes', productRouter);



// function to calculate total price
// used .reduce to get the sum of the item
// const calculateOrderAmount = (orderItems) => {
//     const initialValue = 0;
//     const itemsPrice = orderItems.reduce(
//         (previousValue, currentValue) =>
//         previousValue + currentValue.price * currentValue.amount, initialValue
//     );
//     return itemsPrice * 100; // strip accepts smallest currency like cents
// }

// app.use(bodyParser.json());
//parse the body that passed to the API
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.json({
//     // We need the raw body to verify webhook signatures.
//     // Let's compute it only when hitting the Stripe webhook endpoint.
//     verify: function (req, res, buf) {
//       if (req.originalUrl.startsWith('/webhook')) {
//         req.rawBody = buf.toString();
//       }
//     },
//   })
// );



// // Expose a endpoint as a webhook handler for asynchronous events.
// // Configure your webhook in the stripe developer dashboard
// // https://dashboard.stripe.com/test/webhooks
// app.post('/webhook', async (req, res) => {
//     let data, eventType;
  
//     // Check if webhook signing is configured.
//     if (process.env.STRIPE_WEBHOOK_SECRET) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let event;
//       let signature = req.headers['stripe-signature'];
//       try {
//         event = stripe.webhooks.constructEvent(
//           req.rawBody,
//           signature,
//           process.env.STRIPE_WEBHOOK_SECRET
//         );
//       } catch (err) {
//         console.log(`signature verification failed.`);
//         return res.sendStatus(400);
//       }
//       data = event.data;
//       eventType = event.type;
//     } else {
//       // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//       // we can retrieve the event data directly from the request body.
//       data = req.body.data;
//       eventType = req.body.type;
//     }
  
//     if (eventType === 'payment_intent.succeeded') {
//       // Funds have been captured
//       // Fulfill any orders, e-mail receipts, etc
//       // To cancel the payment after capture you will need to issue a Refund 
//       console.log('💰 Payment captured!');
//     } else if (eventType === 'payment_intent.payment_failed') {
//       console.log('❌ Payment failed.');
//     }
//     res.sendStatus(200);
//   });

  // make connection to db
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// defining our first path to show welcome message
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to DeliciousDash"});
// });

//getting the views from the view folder
app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/users/newuser', (req, res) => {
  res.render('newuser')
})






// // to post the payment
// app.post('/create-payment-intent', async(req, res) => {
//     try {
//         const { orderItems, shippingAddress, userId } = req.body; // user id to be set when creat auth file
//         console.log(shippingAddress);

//         const totalPrice = calculateOrderAmount(orderItems);

//         const taxPrice = 0;
//         const shippingPrice = 0;

//         const order = new Order({
//             orderItems,
//             shippingAddress,
//             paymentMethod: 'stripe',
//             totalPrice,
//             taxPrice,
//             shippingPrice,
//             user: ''
//         })

    

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: totalPrice,
//             currency: 'usd'
//         })


//         res.send({
//             clientSecret: paymentIntent.client_secret
//         })
//     } catch(e) {
//         res.status(400).json({
//             error: {
//                 message: e.message
//             }
//         })
//     }
// })

