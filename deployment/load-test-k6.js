// ==============================================================================
// Farmers Mill - K6 High Concurrency Load Test Script (Target: 10,000 Virtual Users)
// Run via: k6 run --vus 10000 --duration 5m load-test-k6.js
// ==============================================================================

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1000 },  // Warm up to 1,000 VUs
    { duration: '1m', target: 5000 },   // Scale to 5,000 VUs
    { duration: '2m', target: 10000 },  // Peak at 10,000 concurrent clients
    { duration: '1m', target: 10000 },  // Sustain 10,000 concurrent clients
    { duration: '30s', target: 0 },     // Ramp down gracefully
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],     // Less than 1% failure rate
    http_req_duration: ['p(95)<350'],   // 95% of requests must complete under 350ms
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://127.0.0.1:3000';

export default function () {
  const params = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'FarmersMill-LoadTester/1.0',
    },
  };

  // 1. Browse Catalog (Highest frequency user action)
  const productsRes = http.get(`${BASE_URL}/api/products`, params);
  check(productsRes, {
    'products status 200': (r) => r.status === 200,
    'products fast (<300ms)': (r) => r.timings.duration < 300,
  });

  // 2. Check Milling Schedule & Cutoff
  const scheduleRes = http.get(`${BASE_URL}/api/pincodes/schedule`, params);
  check(scheduleRes, {
    'schedule status 200': (r) => r.status === 200,
  });

  // 3. Location & Nearest Outlet Detection
  const locRes = http.get(`${BASE_URL}/api/location/detect`, params);
  check(locRes, {
    'location status 200': (r) => r.status === 200,
  });

  // 4. Check Pincode Logistics (Ghaziabad / Rajnagar / Delhi NCR)
  const pincodePayload = JSON.stringify({ pincode: '201017' });
  const pincodeRes = http.post(`${BASE_URL}/api/pincodes/check`, pincodePayload, {
    headers: { 'Content-Type': 'application/json', ...params.headers },
  });
  check(pincodeRes, {
    'pincode check 200': (r) => r.status === 200,
  });

  // 5. System Health & Performance telemetry
  const perfRes = http.get(`${BASE_URL}/api/health/perf`, params);
  check(perfRes, {
    'perf endpoint 200': (r) => r.status === 200,
  });

  // Think time between user interactions (1 to 2 seconds)
  sleep(Math.random() * 1.5 + 0.5);
}
