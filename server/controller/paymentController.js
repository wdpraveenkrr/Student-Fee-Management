import paymentModel from '../model/paymentModel.js';
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51OpOgHHXSkVF9oSi03GlFCtLRWxzD33BKX8KTGA0sj5r21w2vDOAgqI5flu2WHMaxwnQWxpOh5Uvck7UjVCth5MD00Z1UQQRef")

const addPayment = async (req, res) => {
   
    try {
           const newPayments = new paymentModel({
            studentId : req.body.studid ,
            stdId : req.body.sid ,
            items:req.body.items,
            studentname : req.body.sname ,
            courseId : req.body.cid ,
            courseName : req.body.cname ,
            paidAmount : req.body.price ,
        })

        await newPayments.save()      

        const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,

                    },
                    unit_amount: (item.price) * 100
                },
                quantity: item.quantity
            }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: line_items,            
            success_url: `http://localhost:5173/success?success=true&order=${newPayments._id}`,            
            cancel_url: `http://localhost:5173/success/verify?success=false&order=${newPayments._id}`,         
        })           
        
        res.json({ sucess : true,  url: session.url })                 
             
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }   
}

export { addPayment }


// get list of payment (GET Method)

const listPayment = async (req, res) => {
    try {
        const payment = await paymentModel.find({});
        res.json({ success: true, data: payment })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { listPayment }


// getParticular payment

const getPayment = async (req, res) => {

    try {
        const { id } = req.params; // Get ID from URL
        const payment = await paymentModel.findById(id); // Find user

        if (!payment) {
            return res.json({ success: false, message: "Course not found" });
        }

        res.json({ success: true, data: payment });
    } catch (err) {
        res.json({ success: false, message: "Invalid ID format", error: err.message });
    }
}

export { getPayment }




// remove list of course (DELETE METHOD)

const removePayment = async (req, res) => {
    try {
        const payment = await paymentModel.findById(req.params.id);
        await paymentModel.findByIdAndDelete(payment);
        res.json({ success: true, message: "Payment Deleted" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

export { removePayment }


