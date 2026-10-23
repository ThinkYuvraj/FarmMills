# Farmers Mill – Pending & Undone Tasks Tracker (Not done.md)

This document tracks all external, infrastructure, credential, and environmental tasks that remain pending and require user action, external cloud console provisioning, or third-party API configurations to go live with 10,000+ concurrent clients.

---

## 📋 Infrastructure & Server Deployment (Hostinger)

- [ ] **Hostinger VPS Hardware Provisioning**
  - **Requirement**: Provision a Hostinger VPS with minimum 8 GB RAM, 4–8 vCPUs, and NVMe SSD storage to sustain 10,000 concurrent sockets.
  - **Action**: Run the system tuning script `deployment/linux-sysctl-10k-tuning.sh` on the server as `root` to raise the socket backlog (`somaxconn=65535`) and file descriptor limits (`ulimit -n 65535`).

- [ ] **Hostinger MySQL Production Database Credentials**
  - **Requirement**: Create a dedicated MySQL database on Hostinger with user privileges for Farmers Mill.
  - **Action**: Set the following in `/app/applet/.env` or server environment:
    ```env
    DB_HOST=srvXXX.hstgr.io (or localhost if on same VPS)
    DB_USER=uXXXXXX_farmers
    DB_PASSWORD=your_strong_password
    DB_NAME=uXXXXXX_farmers_mill
    DB_PORT=3306
    DB_CONNECTION_LIMIT=50
    ```
  - **Action**: Run `npm run db:seed` to seed products, categories, lab reports, and outlets into the Hostinger SQL tables.

- [ ] **Hostinger MySQL Configuration Tuning**
  - **Requirement**: Default MySQL allows only 151 connections, which will drop traffic under 10k load.
  - **Action**: Copy `deployment/hostinger-mysql-10k-tuning.cnf` to `/etc/mysql/mysql.conf.d/mysqld.cnf` and restart MySQL (`systemctl restart mysql`). This sets `max_connections = 2000` and `innodb_buffer_pool_size = 4G`.

- [ ] **Nginx Reverse Proxy & SSL Setup**
  - **Requirement**: Point DNS A records for `farmersmill.in` and `www.farmersmill.in` to the server IP.
  - **Action**: Install Nginx and Let's Encrypt Certbot:
    ```bash
    sudo certbot certonly --nginx -d farmersmill.in -d www.farmersmill.in
    ```
  - **Action**: Link `deployment/nginx-10k-concurrency.conf` to `/etc/nginx/sites-enabled/farmersmill.conf` and reload Nginx (`sudo nginx -t && sudo systemctl reload nginx`).

- [ ] **PM2 Node.js Multi-Core Process Scaling**
  - **Requirement**: Run Express in cluster mode across all available CPU cores.
  - **Action**: Start application with `pm2 start deployment/ecosystem.config.cjs --env production` and enable startup persistence (`pm2 save && pm2 startup`).

---

## 💳 Payment Gateway & Merchant Setup (Razorpay)

- [ ] **Razorpay Live API Credentials**
  - **Status**: The application currently has dynamic credential support in the Admin Console and fallback sandbox simulator mode.
  - **Action**: Obtain production live keys (`rzp_live_...` and secret) from [Razorpay Dashboard](https://dashboard.razorpay.com/) and update via the Admin Console (`/admin` -> Payments) or in `.env`.

- [ ] **Razorpay Webhooks Configuration**
  - **Requirement**: Receive real-time server-to-server payment verification events for orders.
  - **Action**: In the Razorpay Dashboard -> Settings -> Webhooks, add endpoint `https://farmersmill.in/api/payments/razorpay/webhook` with the secret configured in `RAZORPAY_WEBHOOK_SECRET`.

---

## 📍 Location & Google Maps Geocoding (Optional Enhancement)

- [ ] **Google Maps Geocoding API Key (Optional)**
  - **Current State**: GPS auto-detection, server IP geolocation (`/api/location/detect`), 6-digit Indian Pincode lookup, and nearest outlet calculations are fully functional and self-contained without needing third-party API keys.
  - **Action**: If exact street address pin-dropping is desired in checkout, add a restricted Google Maps JavaScript API key in `.env` (`VITE_GOOGLE_MAPS_API_KEY`).

---

## 📱 SMS & Notification Gateways (Post-Launch Phase)

- [ ] **Transactional SMS / WhatsApp Gateway Integration**
  - **Requirement**: Send automated WhatsApp / SMS dispatch alerts ("Your Sharbati Atta has been slow-stone ground and packed at MCC Signature Heights").
  - **Action**: Integrate SMS gateway (e.g. MSG91, Fast2SMS, or Gupshup WhatsApp API) once registered with DLT compliance in India.

---

## 📈 Verification Checklist Before Launch

- [ ] Run K6 concurrency benchmark: `k6 run --vus 10000 --duration 5m deployment/load-test-k6.js`
- [ ] Confirm `/api/health/perf` returns `heapUsedMb < 500` under load
- [ ] Verify SSL Grade A+ on Qualys SSL Labs
- [ ] Test mobile checkout flow end-to-end on real iOS & Android devices
