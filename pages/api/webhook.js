import axios from 'axios';
import { buffer } from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_b2b7d6e38bd8413f2b7d6f63bb9e407114ab2ecd6a89103c76c40b44e699a777";

export default async function handler(req,res) {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
        const data = event.data.object;
        const user_email = data.metadata.user_email;
        const prod = data.metadata.prod_name;
        const paid = data.payment_status === 'paid';
        if (user_email && paid) {
            const info = {user_email, prod};
            // Then define and call a function to handle the event payment_intent.succeeded
            await axios.post("https://the-fit-club-backend.onrender.com/users/update", info);
            break;
        }
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('ok');
}

export const config = {
    api: {bodyParser:false}
}