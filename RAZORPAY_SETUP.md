# Razorpay Integration Setup Guide

This guide explains how to set up and use the Razorpay payment gateway integration in BitBloom.

## Prerequisites

1. Razorpay account (sign up at https://razorpay.com)
2. Node.js and npm installed
3. MongoDB database running

## Environment Variables

Add the following environment variables to your `.env` file in the backend directory:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Other existing variables...
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Getting Razorpay Credentials

1. Log in to your Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate a new API key pair
4. Copy the Key ID and Key Secret to your `.env` file

## Features Implemented

### Backend

1. **Purchase Model** (`backend/src/models/Purchase.ts`)
   - Tracks user purchases
   - Stores Razorpay order and payment IDs
   - Prevents duplicate purchases

2. **Payment Controller** (`backend/src/controller/paymentController.ts`)
   - `POST /api/payment/create-order` - Creates Razorpay orders
   - `POST /api/payment/verify` - Verifies payment signatures
   - `userHasPurchased()` - Helper function to check purchase status

3. **Updated Resource Controller**
   - Modified download logic to check purchase status
   - Free resources remain freely accessible
   - Paid resources require purchase verification

### Frontend

1. **Payment Page** (`client/src/page/payment.tsx`)
   - Displays resource details and price
   - Integrates Razorpay Checkout
   - Handles payment verification
   - Redirects after successful payment

2. **Updated Resource Card**
   - "Buy Now" button for paid resources
   - Direct download for free resources
   - Navigation to payment page

## API Endpoints

### Create Order
```
POST /api/payment/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "resourceId": "resource_id_here"
}
```

### Verify Payment
```
POST /api/payment/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature",
  "resourceId": "resource_id"
}
```

## Testing

### Using Bruno API Tests

1. Open Bruno and load the BitBloom API collection
2. Set up environment variables:
   - `baseUrl`: Your backend URL (e.g., http://localhost:5000)
   - `resourceId`: ID of a paid resource
   - `token`: JWT token from login

3. Test the payment flow:
   - Run "Create Order" test
   - Use the returned order ID in Razorpay test mode
   - Run "Verify Payment" test with test payment details

### Test Mode

For development, use Razorpay's test mode:
- Test Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

## Security Features

1. **Payment Signature Verification**: All payments are verified using Razorpay's signature
2. **Purchase Tracking**: Prevents duplicate purchases
3. **Authentication Required**: All payment endpoints require valid JWT tokens
4. **Resource Validation**: Ensures resources exist before creating orders

## Database Schema

### Purchase Collection
```javascript
{
  user: ObjectId,           // Reference to User
  resource: ObjectId,       // Reference to Resource
  razorpayOrderId: String,  // Razorpay order ID
  razorpayPaymentId: String, // Razorpay payment ID
  amount: Number,           // Amount in INR
  status: String,           // 'pending', 'completed', 'failed'
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The integration handles various error scenarios:
- Invalid resource IDs
- Free resource purchase attempts
- Duplicate purchase attempts
- Invalid payment signatures
- Missing authentication
- Network errors

## Production Considerations

1. **Webhook Integration**: For production, implement Razorpay webhooks for better payment tracking
2. **Error Logging**: Add comprehensive error logging
3. **Rate Limiting**: Implement rate limiting on payment endpoints
4. **SSL**: Ensure HTTPS is enabled in production
5. **Environment**: Use Razorpay live keys in production

## Troubleshooting

### Common Issues

1. **"Invalid payment signature"**
   - Check if RAZORPAY_KEY_SECRET is correct
   - Ensure you're using the right key (test vs live)

2. **"Resource not found"**
   - Verify the resourceId exists in the database
   - Check if the resource is marked as paid (isFree: false)

3. **"You have already purchased this resource"**
   - Check the Purchase collection for existing records
   - Clear test data if needed

4. **Razorpay checkout not loading**
   - Check browser console for JavaScript errors
   - Ensure Razorpay script is loading correctly
   - Verify keyId is being passed correctly

### Debug Mode

Enable debug logging by adding to your backend:
```javascript
console.log('Razorpay Order:', orderData);
console.log('Payment Verification:', verificationData);
``` 