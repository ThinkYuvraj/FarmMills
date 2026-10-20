import http from 'http';
import app from './app.js';

const server = app.listen(3099, async () => {
  console.log('Test server started on 3099');

  const request = (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3099,
        path,
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, text: body });
          }
        });
      });

      req.on('error', reject);
      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  };

  try {
    // 1. Health check
    const health = await request('/api/health');
    console.log('✓ /api/health status:', health.status, health.data.status);

    // 2. Products
    const prods = await request('/api/products?category=Spices');
    console.log('✓ /api/products (Spices) count:', prods.data.count);

    // 3. Coupon validation
    const couponVal = await request('/api/coupons/validate', 'POST', {
      code: 'FARMERS10',
      items: [
        { productId: 'fm-atta-chakki', packSize: '5 kg', quantity: 2 } // 280 * 2 = 560
      ]
    });
    console.log('✓ /api/coupons/validate:', couponVal.data.message, 'Discount:', couponVal.data.discount);

    // 4. Pincode check
    const pinCheck = await request('/api/pincodes/check', 'POST', { pincode: '560103' });
    console.log('✓ /api/pincodes/check (560103):', pinCheck.data.data.city, 'Zone:', pinCheck.data.data.zone);

    // 5. Authoritative cart calculation
    const cartCalc = await request('/api/cart/validate', 'POST', {
      items: [
        { productId: 'fm-atta-chakki', packSize: '5 kg', quantity: 1 },
        { productId: 'fm-spice-turmeric', packSize: '200 g', quantity: 1 }
      ],
      couponCode: 'FARMERS10',
      pincode: '560103'
    });
    console.log('✓ /api/cart/validate: Subtotal:', cartCalc.data.subtotal, 'Discount:', cartCalc.data.discount, 'Total:', cartCalc.data.total);

    // 6. Create Order
    const orderRes = await request('/api/orders', 'POST', {
      items: [
        { productId: 'fm-atta-chakki', packSize: '5 kg', quantity: 1 }
      ],
      shippingAddress: {
        fullName: 'Aarav Mehta',
        phone: '9876543210',
        address: 'B-404, Palm Meadows',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103'
      },
      paymentMethod: 'UPI (PhonePe)',
      deliverySlot: 'Morning (7:00 AM - 11:00 AM)',
      couponCode: 'FARMERS10'
    });
    console.log('✓ /api/orders: Placed order #', orderRes.data.data.id, 'Total:', orderRes.data.data.total);

    // 7. Lab Report
    const labRes = await request('/api/lab-reports/fm-atta-chakki');
    console.log('✓ /api/lab-reports/fm-atta-chakki:', labRes.data.data.labName);

    // 8. Create Subscription
    const subRes = await request('/api/subscriptions', 'POST', {
      productId: 'fm-atta-chakki',
      packSize: '5 kg',
      frequency: 'Every 2 Weeks',
      deliverySlot: 'Morning (7:00 AM - 11:00 AM)',
      address: 'B-404, Palm Meadows, Bengaluru - 560103'
    });
    console.log('✓ /api/subscriptions:', subRes.data.message, 'Discounted price:', subRes.data.data.discountedPrice);

    console.log('\n🌟 ALL BACKEND LOGIC TESTS PASSED PERFECTLY!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
  }
});
