

// import express, { Request, Response } from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import crypto from 'crypto';
// import dns from 'dns';
// import dotenv from 'dotenv';
// import { v2 as cloudinary } from 'cloudinary';
// import Razorpay from 'razorpay';
// import nodemailer from 'nodemailer';
// import { db } from './server/db.js';

// dotenv.config();

// // CRITICAL FOR RENDER & CLOUD DEPLOYMENTS:
// // Enforce IPv4 DNS resolution so smtp.gmail.com connects immediately without IPv6 timeout
// if (dns.setDefaultResultOrder) {
//   dns.setDefaultResultOrder('ipv4first');
// }

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// // Cloudinary config
// const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'qudcaa6j';
// const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '158724426326161';
// const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '36jvn8INzW5K8cjxnv4wcWIQeOA';

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET
// });

// // Razorpay config
// const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TgZ0xzl3ZHKHJN';
// const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'xpMZZRpeQekhq8FR7ZhkyQau';

// const razorpay = new Razorpay({
//   key_id: RAZORPAY_KEY_ID,
//   key_secret: RAZORPAY_KEY_SECRET
// });

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // -------------------------------------------------------------
// // NODEMAILER GMAIL TRANSPORTER SERVICE
// // -------------------------------------------------------------
// function getTransporter() {
//   const user = (process.env.SMTP_USER || process.env.EMAIL_USER || 'ankitakhot015@gmail.com').trim();
//   const rawPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || 'btsi wxet zdbh exri').trim();
//   const pass = rawPass.replace(/\s+/g, ''); // Strips spaces -> "btsiwxetzdbhexri"

//   return nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user,
//       pass
//     }
//   });
// }

// // -------------------------------------------------------------
// // 1. SEND AUTOMATIC ORDER CONFIRMATION EMAIL TO CUSTOMER
// // -------------------------------------------------------------
// async function sendBookingConfirmationEmail(order: any) {
//   try {
//     const customerEmail = order.shippingAddress?.email;
//     if (!customerEmail || !customerEmail.includes('@')) {
//       console.warn('[BOOKING EMAIL] No customer email found in order:', order.id);
//       return false;
//     }

//     const cleanEmail = customerEmail.trim().toLowerCase();
//     const customerName = order.shippingAddress?.fullName || 'Valued Patron';
//     const orderRef = order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : `VIR-${Date.now().toString().slice(-5)}`);
//     const baseUrl = process.env.APP_URL || 'https://saree-web-final.onrender.com';
//     const trackingUrl = `${baseUrl}/track-order?query=${encodeURIComponent(orderRef)}`;

//     const itemsHtml = (order.items || [])
//       .map(
//         (item: any) => `
//         <tr style="border-bottom: 1px solid #ECE3D4;">
//           <td style="padding: 12px 8px; vertical-align: middle;">
//             <strong style="color: #2C1B16; font-size: 14px;">${item.name}</strong>
//             ${item.selectedColor ? `<div style="font-size: 11px; color: #777;">Color: ${item.selectedColor}</div>` : ''}
//             <div style="font-size: 11px; color: #5A1022;">Qty: ${item.quantity} · Handloom Silk Mark Verified</div>
//           </td>
//           <td style="padding: 12px 8px; text-align: right; vertical-align: middle; font-weight: bold; color: #5A1022; font-size: 14px;">
//             ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
//           </td>
//         </tr>`
//       )
//       .join('');

//     const transporter = getTransporter();
//     const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

//     await transporter.sendMail({
//       from: `"Virasat Silk & Sarees" <${senderEmail}>`,
//       to: cleanEmail,
//       subject: `👑 Order Confirmed: #${orderRef} - Your Handloom Saree Booking is Successful!`,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 26px; max-width: 600px; margin: auto; border: 2px solid #C9A227; border-radius: 6px;">
//           <div style="text-align: center; border-bottom: 2px solid #5A1022; padding-bottom: 16px; margin-bottom: 20px;">
//             <h1 style="color: #5A1022; margin: 0; font-size: 26px;">Virasat Silk & Sarees</h1>
//             <p style="color: #7A6455; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 4px 0 0 0;">
//               Flagship Handloom Pavilion · Kolhapur, Maharashtra
//             </p>
//           </div>

//           <div style="color: #2C1B16; font-size: 14px; line-height: 1.6;">
//             <p style="font-size: 16px;">Namaste <strong>${customerName}</strong> ji 🙏,</p>
//             <p>Thank you for shopping with <strong>Virasat Silk & Sarees</strong>! Your order <strong>#${orderRef}</strong> has been successfully booked.</p>

//             <div style="background-color: #F8F1E5; border: 1px solid #D6B879; border-radius: 4px; padding: 14px 16px; margin: 18px 0;">
//               <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//                 <tr>
//                   <td style="color: #666; padding-bottom: 4px;">Order Number:</td>
//                   <td style="text-align: right; font-weight: bold; color: #5A1022; font-family: monospace;">#${orderRef}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #666; padding-bottom: 4px;">Payment Method:</td>
//                   <td style="text-align: right; font-weight: bold; color: #2C1B16; text-transform: uppercase;">${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid via Razorpay'}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #666;">Booking Status:</td>
//                   <td style="text-align: right; font-weight: bold; color: #059669;">✓ Confirmed & Loom Reserved</td>
//                 </tr>
//               </table>
//             </div>

//             <h3 style="color: #5A1022; font-size: 16px; margin: 20px 0 8px 0; border-bottom: 1px solid #ECE3D4; padding-bottom: 4px;">
//               Ordered Saree(s)
//             </h3>
//             <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
//               ${itemsHtml}
//               <tr style="border-top: 2px solid #5A1022;">
//                 <td style="padding: 10px 8px; font-weight: bold; color: #2C1B16;">Total Amount:</td>
//                 <td style="padding: 10px 8px; text-align: right; font-weight: bold; color: #5A1022; font-size: 16px;">
//                   ₹${(order.total || 0).toLocaleString('en-IN')}
//                 </td>
//               </tr>
//             </table>

//             <div style="border-left: 3px solid #C9A227; padding-left: 12px; margin: 16px 0; font-size: 13px; color: #4A3B32;">
//               <strong style="color: #5A1022;">Shipping Destination:</strong><br />
//               ${order.shippingAddress?.addressLine1 || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}<br />
//               <strong>Contact:</strong> ${order.shippingAddress?.phone || 'N/A'}
//             </div>

//             <div style="text-align: center; margin: 24px 0;">
//               <a href="${trackingUrl}" style="background-color: #5A1022; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 4px; font-size: 13px; font-weight: bold; display: inline-block;">
//                 Track Your Saree Live
//               </a>
//             </div>

//             <p style="font-size: 12px; color: #777; text-align: center; margin-top: 18px;">
//               Need help? Contact our personal concierge: <strong>+91 93569 51406</strong>
//             </p>
//           </div>
//         </div>
//       `
//     });

//     console.log(`[BOOKING CONFIRMATION EMAIL SENT] To: ${cleanEmail} | Order: #${orderRef}`);
//     return true;
//   } catch (err: any) {
//     console.error('[BOOKING CONFIRMATION EMAIL ERROR]:', err.message);
//     return false;
//   }
// }

// // -------------------------------------------------------------
// // 2. SEND AUTOMATIC ORDER STATUS UPDATE EMAIL TO CUSTOMER
// // -------------------------------------------------------------
// async function sendStatusUpdateEmail(order: any, newStatus: string) {
//   try {
//     const customerEmail = order.shippingAddress?.email;
//     if (!customerEmail || !customerEmail.includes('@')) {
//       console.warn('[STATUS EMAIL] No valid customer email found in order:', order.id);
//       return false;
//     }

//     const cleanEmail = customerEmail.trim().toLowerCase();
//     const customerName = order.shippingAddress?.fullName || 'Valued Patron';
//     const orderRef = order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : 'REF');
//     const baseUrl = process.env.APP_URL || 'https://saree-web-final.onrender.com';
//     const trackingUrl = `${baseUrl}/track-order?query=${encodeURIComponent(orderRef)}`;

//     let subject = `Order Update: #${orderRef} is now ${newStatus} - Virasat Silk & Sarees`;
//     let badgeColor = '#5A1022';
//     let statusHeading = `Order Status: ${newStatus}`;
//     let statusDescription = `Your order <strong>#${orderRef}</strong> status has been updated to <strong>${newStatus}</strong>.`;

//     const lower = newStatus.toLowerCase();
//     if (lower.includes('cancel')) {
//       subject = `⚠️ Order Cancelled: #${orderRef} - Virasat Silk & Sarees`;
//       badgeColor = '#DC2626';
//       statusHeading = 'Order Cancelled';
//       statusDescription = `We regret to inform you that order <strong>#${orderRef}</strong> has been cancelled. Any payments made will be refunded within 3–5 working days.`;
//     } else if (lower.includes('deliver')) {
//       subject = `🎉 Order Delivered: #${orderRef} - Your Saree has arrived!`;
//       badgeColor = '#059669';
//       statusHeading = 'Order Delivered';
//       statusDescription = `Your saree package for order <strong>#${orderRef}</strong> has been safely delivered to your doorstep. We hope you love your authentic handloom saree!`;
//     } else if (lower.includes('ship')) {
//       subject = `🚚 Order Shipped: #${orderRef} - Dispatched & In Transit!`;
//       badgeColor = '#2563EB';
//       statusHeading = 'Shipped / In Transit';
//       statusDescription = `Your handloom parcel has been securely packed in cotton muslin and handed over to our express courier partner.`;
//     } else if (lower.includes('process')) {
//       subject = `🧵 Order In Progress: #${orderRef} - Loom Inspection Underway`;
//       badgeColor = '#D97706';
//       statusHeading = 'Processing & Quality Audit';
//       statusDescription = `Our master weavers in Yeola & Paithan are currently performing the Silk Mark audit and selvedge inspection for order <strong>#${orderRef}</strong>.`;
//     }

//     const itemsHtml = (order.items || [])
//       .map(
//         (item: any) => `
//         <tr style="border-bottom: 1px solid #ECE3D4;">
//           <td style="padding: 10px 8px; vertical-align: middle;">
//             <strong style="color: #2C1B16; font-size: 14px;">${item.name}</strong>
//             ${item.selectedColor ? `<div style="font-size: 11px; color: #777;">Shade: ${item.selectedColor}</div>` : ''}
//             <div style="font-size: 11px; color: #5A1022;">Quantity: ${item.quantity} · Silk Mark Verified</div>
//           </td>
//           <td style="padding: 10px 8px; text-align: right; vertical-align: middle; font-weight: bold; color: #5A1022; font-size: 14px;">
//             ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
//           </td>
//         </tr>`
//       )
//       .join('');

//     const transporter = getTransporter();
//     const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

//     await transporter.sendMail({
//       from: `"Virasat Silk & Sarees" <${senderEmail}>`,
//       to: cleanEmail,
//       subject,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 26px; max-width: 600px; margin: auto; border: 2px solid #C9A227; border-radius: 6px;">
//           <div style="text-align: center; border-bottom: 2px solid #5A1022; padding-bottom: 16px; margin-bottom: 20px;">
//             <h1 style="color: #5A1022; margin: 0; font-size: 24px;">Virasat Silk & Sarees</h1>
//             <p style="color: #7A6455; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 4px 0 0 0;">
//               Flagship Handloom Pavilion · Kolhapur, Maharashtra
//             </p>
//           </div>

//           <div style="color: #2C1B16; font-size: 14px; line-height: 1.6;">
//             <p style="font-size: 15px; margin-bottom: 8px;">Namaste <strong>${customerName}</strong> ji 🙏,</p>
//             <p style="color: #4A3B32; margin-top: 0;">${statusDescription}</p>

//             <div style="background-color: #F8F1E5; border: 1px solid #D6B879; border-radius: 4px; padding: 14px 16px; margin: 18px 0; text-align: center;">
//               <span style="display: inline-block; background-color: ${badgeColor}; color: #ffffff; font-size: 12px; font-weight: bold; padding: 6px 16px; border-radius: 20px; text-transform: uppercase;">
//                 ${statusHeading}
//               </span>
//               <div style="margin-top: 8px; font-size: 12px; color: #666;">
//                 Order Reference: <strong style="color: #5A1022; font-family: monospace;">#${orderRef}</strong>
//               </div>
//             </div>

//             <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
//               ${itemsHtml}
//               <tr style="border-top: 2px solid #5A1022;">
//                 <td style="padding: 10px 8px; font-weight: bold; color: #2C1B16;">Total Order Value:</td>
//                 <td style="padding: 10px 8px; text-align: right; font-weight: bold; color: #5A1022; font-size: 15px;">
//                   ₹${(order.total || 0).toLocaleString('en-IN')}
//                 </td>
//               </tr>
//             </table>

//             <div style="text-align: center; margin: 24px 0;">
//               <a href="${trackingUrl}" style="background-color: #5A1022; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 13px; font-weight: bold; display: inline-block;">
//                 Track Saree Live & View Details
//               </a>
//             </div>

//             <p style="font-size: 12px; color: #777; text-align: center;">
//               Need help? WhatsApp Concierge: <strong>+91 93569 51406</strong>
//             </p>
//           </div>
//         </div>
//       `
//     });

//     console.log(`[STATUS EMAIL SENT] To: ${cleanEmail} | Order: #${orderRef} | Status: ${newStatus}`);
//     return true;
//   } catch (err: any) {
//     console.error('[STATUS EMAIL ERROR]:', err.message);
//     return false;
//   }
// }

// // -------------------------------------------------------------
// // REST API ROUTES
// // -------------------------------------------------------------

// // Products API
// app.get('/api/products', (req: Request, res: Response) => {
//   try {
//     const { category, search, fabric, occasion, color, zariType, minPrice, maxPrice, featured, bestSeller, newArrival, sort } = req.query;
//     const products = db.getProducts({
//       category: category as string,
//       search: search as string,
//       fabric: fabric as string,
//       occasion: occasion as string,
//       color: color as string,
//       zariType: zariType as string,
//       minPrice: minPrice ? Number(minPrice) : undefined,
//       maxPrice: maxPrice ? Number(maxPrice) : undefined,
//       featured: featured === 'true',
//       bestSeller: bestSeller === 'true',
//       newArrival: newArrival === 'true',
//       sort: sort as any
//     });
//     res.json({
//       success: true,
//       data: {
//         products,
//         total: products.length
//       }
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.get('/api/products/:slug', (req: Request, res: Response) => {
//   try {
//     const product = db.getProductBySlugOrId(req.params.slug);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.json({ success: true, data: { product } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.post('/api/products', (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     if (!body.name || !body.price || !body.category) {
//       return res.status(400).json({ success: false, message: 'Name, price and category are required' });
//     }
//     const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
//     const newProduct = db.createProduct({
//       name: body.name,
//       slug,
//       category: body.category,
//       price: Number(body.price),
//       originalPrice: Number(body.originalPrice || body.price),
//       discountPercentage: body.discountPercentage || Math.round(((Number(body.originalPrice || body.price) - Number(body.price)) / Number(body.originalPrice || body.price)) * 100),
//       stock: Number(body.stock || 10),
//       description: body.description || '',
//       fabric: body.fabric || 'Pure Silk',
//       sareeLength: body.sareeLength || '6.3 meters with blouse piece',
//       blouseIncluded: body.blouseIncluded !== false,
//       blouseType: body.blouseType || 'Unstitched matching blouse',
//       careInstructions: body.careInstructions || 'Dry clean only',
//       availability: Number(body.stock || 10) > 4 ? 'In Stock' : (Number(body.stock || 10) > 0 ? 'Low Stock' : 'Out of Stock'),
//       featured: Boolean(body.featured),
//       bestSeller: Boolean(body.bestSeller),
//       newArrival: Boolean(body.newArrival),
//       rating: Number(body.rating || 5.0),
//       reviewsCount: Number(body.reviewsCount || 0),
//       work: body.work || 'Handwoven Zari Motifs',
//       zariType: body.zariType || 'Pure Tested Zari',
//       occasion: body.occasion || 'Festive, Wedding',
//       colors: body.colors || [{ name: 'Default', value: '#5A1022', image: body.images?.[0]?.url || '' }],
//       images: body.images || []
//     });
//     res.status(201).json({ success: true, data: { product: newProduct } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.put('/api/products/:id', (req: Request, res: Response) => {
//   try {
//     const updated = db.updateProduct(req.params.id, req.body);
//     if (!updated) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.json({ success: true, data: { product: updated } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.delete('/api/products/:id', (req: Request, res: Response) => {
//   try {
//     const success = db.deleteProduct(req.params.id);
//     if (!success) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.json({ success: true, message: 'Product deleted successfully' });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Categories API
// app.get('/api/categories', (_req: Request, res: Response) => {
//   try {
//     const categories = db.getCategories();
//     res.json({ success: true, data: { categories } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Orders API
// app.get('/api/orders', (_req: Request, res: Response) => {
//   try {
//     const orders = db.getOrders();
//     res.json({ success: true, data: { orders } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.get('/api/orders/:id', (req: Request, res: Response) => {
//   try {
//     const order = db.getOrderById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }
//     res.json({ success: true, data: { order } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // PATCH Order Status (Admin updates order status -> sends automatic status email to customer)
// app.patch('/api/orders/:id/status', async (req: Request, res: Response) => {
//   try {
//     const { status } = req.body;
//     if (!status) {
//       return res.status(400).json({ success: false, message: 'Status is required' });
//     }

//     const updated = db.updateOrderStatus(req.params.id, status);
//     if (!updated) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     // 📩 Send status update email asynchronously to customer
//     sendStatusUpdateEmail(updated, status).catch((mailErr) => {
//       console.error(`[STATUS EMAIL FAILED for #${updated.orderNumber}]:`, mailErr.message);
//     });

//     res.json({ success: true, data: { order: updated } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // -------------------------------------------------------------
// // NODEMAILER OTP SERVICE FOR BOOKINGS
// // -------------------------------------------------------------
// interface EmailOtpRecord {
//   otp: string;
//   expiresAt: number;
//   verified: boolean;
//   fullName?: string;
// }

// const emailOtpStore = new Map<string, EmailOtpRecord>();

// // Send OTP to Customer Email before booking
// app.post('/api/auth/send-booking-otp', async (req: Request, res: Response) => {
//   try {
//     const { email, fullName } = req.body;
//     if (!email || !email.includes('@')) {
//       return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
//     }

//     const cleanEmail = email.trim().toLowerCase();

//     // 6-digit cryptographic OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

//     emailOtpStore.set(cleanEmail, {
//       otp,
//       expiresAt,
//       verified: false,
//       fullName
//     });

//     const transporter = getTransporter();
//     const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

//     const mailOptions = {
//       from: `"Virasat Silk & Sarees" <${senderEmail}>`,
//       to: cleanEmail,
//       subject: `👑 Virasat Sarees Booking OTP: ${otp} (Valid for 10 mins)`,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 24px; max-width: 580px; margin: auto; border: 2px solid #C9A227; border-radius: 4px;">
//           <h1 style="color: #5A1022; text-align: center; margin: 0 0 16px 0;">Virasat Silk & Sarees</h1>
//           <p>Namaste <strong>${fullName || 'Valued Customer'}</strong> ji,</p>
//           <p>To verify your email address and authorize your authentic handloom saree booking, please enter the verification code below:</p>
//           <div style="text-align: center; margin: 24px 0; background-color: #F8F1E5; padding: 18px; border-radius: 4px; border: 1px dashed #C9A227;">
//             <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #5A1022; font-family: monospace;">${otp}</span>
//             <span style="display: block; font-size: 11px; color: #666; margin-top: 8px;">Valid for 10 minutes. Do not share this code.</span>
//           </div>
//           <p style="font-size: 11px; color: #888; text-align: center;">Virasat Silk & Sarees Flagship Pavilion · Kolhapur</p>
//         </div>
//       `
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       console.log(`[BOOKING OTP SENT] Customer: ${cleanEmail}`);
//     } catch (mailErr: any) {
//       console.error('[NODEMAILER ERROR]:', mailErr.message);
//       return res.status(500).json({
//         success: false,
//         message: `Email dispatch error: ${mailErr.message}`
//       });
//     }

//     res.json({
//       success: true,
//       message: `A 6-digit OTP code has been sent to ${cleanEmail}. Please check your inbox and enter the code below.`
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Diagnostic Route to test SMTP directly in browser
// app.get('/api/smtp-test', async (_req: Request, res: Response) => {
//   try {
//     const transporter = getTransporter();
//     await transporter.verify();
//     res.json({
//       success: true,
//       status: 'CONNECTED',
//       message: 'Gmail SMTP credentials verified successfully on Render!'
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       status: 'AUTH_FAILED',
//       error: err.message
//     });
//   }
// });

// // Verify OTP before placing order
// app.post('/api/auth/verify-booking-otp', (req: Request, res: Response) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ success: false, message: 'Email and OTP are required' });
//     }
//     const cleanEmail = email.trim().toLowerCase();
//     const record = emailOtpStore.get(cleanEmail);
//     if (!record) {
//       return res.status(400).json({ success: false, message: 'No OTP requested for this email. Please request a new code.' });
//     }
//     if (Date.now() > record.expiresAt) {
//       emailOtpStore.delete(cleanEmail);
//       return res.status(400).json({ success: false, message: 'OTP has expired. Please click "Resend Code".' });
//     }
//     if (record.otp !== otp.trim()) {
//       return res.status(400).json({ success: false, message: 'Incorrect OTP entered. Please check your email and try again.' });
//     }

//     record.verified = true;
//     emailOtpStore.set(cleanEmail, record);

//     res.json({
//       success: true,
//       message: 'Email successfully verified! You may now proceed with booking.',
//       verified: true
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Comprehensive Analytics API
// app.get('/api/analytics', (_req: Request, res: Response) => {
//   try {
//     const analytics = db.getAnalytics();
//     res.json({ success: true, data: analytics });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Cloudinary Image Upload API
// app.post('/api/upload', async (req: Request, res: Response) => {
//   try {
//     const { imageBase64, imageUrl } = req.body;
//     if (!imageBase64 && !imageUrl) {
//       return res.status(400).json({ success: false, message: 'Image base64 or URL is required' });
//     }
//     const source = imageBase64 || imageUrl;
//     const uploadRes = await cloudinary.uploader.upload(source, {
//       folder: 'virasat_sarees',
//       resource_type: 'image'
//     });
//     res.json({
//       success: true,
//       data: {
//         url: uploadRes.secure_url,
//         publicId: uploadRes.public_id,
//         format: uploadRes.format,
//         width: uploadRes.width,
//         height: uploadRes.height
//       }
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Razorpay Payment APIs
// app.post('/api/payment/create-order', async (req: Request, res: Response) => {
//   try {
//     const { amount, currency = 'INR', receipt, notes } = req.body;
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ success: false, message: 'Valid amount is required' });
//     }
//     const options = {
//       amount: Math.round(Number(amount) * 100),
//       currency,
//       receipt: receipt || `rcpt_${Date.now()}`,
//       notes: notes || { store: 'Virasat Silk & Sarees' }
//     };
//     const razorpayOrder = await razorpay.orders.create(options);
//     res.json({
//       success: true,
//       data: {
//         orderId: razorpayOrder.id,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         keyId: RAZORPAY_KEY_ID
//       }
//     });
//   } catch (error: any) {
//     console.error('Razorpay order creation error:', error);
//     const mockOrderId = `order_test_${Date.now()}`;
//     res.json({
//       success: true,
//       data: {
//         orderId: mockOrderId,
//         amount: Math.round(Number(req.body.amount || 100) * 100),
//         currency: 'INR',
//         keyId: RAZORPAY_KEY_ID
//       }
//     });
//   }
// });

// // Razorpay Payment Verification & Automatic Customer Email
// app.post('/api/payment/verify', (req: Request, res: Response) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

//     let isSignatureValid = false;
//     if (razorpay_signature && razorpay_order_id && razorpay_payment_id) {
//       const body = razorpay_order_id + '|' + razorpay_payment_id;
//       const expectedSignature = crypto
//         .createHmac('sha256', RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest('hex');
//       isSignatureValid = expectedSignature === razorpay_signature;
//     } else {
//       isSignatureValid = true;
//     }

//     if (!isSignatureValid) {
//       return res.status(400).json({ success: false, message: 'Invalid payment signature' });
//     }

//     const newOrder = db.createOrder({
//       userId: orderDetails?.userId,
//       items: orderDetails.items,
//       shippingAddress: orderDetails.shippingAddress,
//       subtotal: orderDetails.subtotal,
//       discount: orderDetails.discount || 0,
//       shipping: orderDetails.shipping || 0,
//       total: orderDetails.total,
//       paymentMethod: 'razorpay',
//       paymentStatus: 'paid',
//       orderStatus: 'Confirmed',
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id || `pay_${Date.now()}`
//     });

//     // 📩 Automatically send booking confirmation email to customer
//     sendBookingConfirmationEmail(newOrder).catch((mailErr) => {
//       console.error('[BOOKING CONFIRMATION ASYNC ERROR]:', mailErr.message);
//     });

//     res.json({
//       success: true,
//       message: 'Payment verified and order placed successfully',
//       data: {
//         order: newOrder
//       }
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Direct Order Creation (COD) & Automatic Customer Email
// app.post('/api/orders', (req: Request, res: Response) => {
//   try {
//     const orderData = req.body;
//     if (!orderData.items || !orderData.shippingAddress || !orderData.total) {
//       return res.status(400).json({ success: false, message: 'Missing order information' });
//     }

//     const order = db.createOrder({
//       userId: orderData.userId,
//       items: orderData.items,
//       shippingAddress: orderData.shippingAddress,
//       subtotal: orderData.subtotal,
//       discount: orderData.discount || 0,
//       shipping: orderData.shipping || 0,
//       total: orderData.total,
//       paymentMethod: orderData.paymentMethod || 'cod',
//       paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
//       orderStatus: 'Order Placed'
//     });

//     // 📩 Automatically send booking confirmation email to customer
//     sendBookingConfirmationEmail(order).catch((mailErr) => {
//       console.error('[BOOKING CONFIRMATION ASYNC ERROR]:', mailErr.message);
//     });

//     res.status(201).json({ success: true, data: { order } });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // -------------------------------------------------------------
// // VITE DEV SERVER / PRODUCTION STATIC SERVING
// // -------------------------------------------------------------
// async function setupVite() {
//   const isProd = process.env.NODE_ENV === 'production';
//   if (!isProd) {
//     const { createServer } = await import('vite');
//     const vite = await createServer({
//       server: {
//         middlewareMode: true,
//         hmr: process.env.DISABLE_HMR !== 'true',
//         watch: process.env.DISABLE_HMR === 'true' ? null : {}
//       },
//       appType: 'spa'
//     });
//     app.use(vite.middlewares);
//   } else {
//     const distPath = path.resolve(__dirname, 'dist');
//     app.use(express.static(distPath));
//     app.get('*', (_req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//   }

//   app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server listening on http://0.0.0.0:${PORT}`);
//   });
// }

// setupVite().catch(err => {
//   console.error('Failed to start server:', err);
// });

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dns from 'dns';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import { db } from './server/db.js';

dotenv.config();

// CRITICAL FOR RENDER & CLOUD DEPLOYMENTS:
// Enforce IPv4 DNS resolution so smtp.gmail.com connects immediately without IPv6 timeout
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Cloudinary config
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'qudcaa6j';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '158724426326161';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '36jvn8INzW5K8cjxnv4wcWIQeOA';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// Razorpay config
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TgZ0xzl3ZHKHJN';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'xpMZZRpeQekhq8FR7ZhkyQau';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// -------------------------------------------------------------
// NODEMAILER GMAIL TRANSPORTER SERVICE
// -------------------------------------------------------------
function getTransporter() {
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || 'ankitakhot015@gmail.com').trim();
  const rawPass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || 'btsi wxet zdbh exri').trim();
  const pass = rawPass.replace(/\s+/g, ''); // Strips spaces -> "btsiwxetzdbhexri"

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass
    },
    pool: true,
    maxConnections: 3
  });
}

// -------------------------------------------------------------
// 1. SEND AUTOMATIC ORDER CONFIRMATION EMAIL TO CUSTOMER
// -------------------------------------------------------------
async function sendBookingConfirmationEmail(order: any) {
  try {
    const customerEmail = order.shippingAddress?.email;
    if (!customerEmail || !customerEmail.includes('@')) {
      console.warn('[BOOKING EMAIL] No customer email found in order:', order.id);
      return false;
    }

    const cleanEmail = customerEmail.trim().toLowerCase();
    const customerName = order.shippingAddress?.fullName || 'Valued Patron';
    const orderRef = order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : `VIR-${Date.now().toString().slice(-5)}`);
    const baseUrl = process.env.APP_URL || 'https://saree-web-final.onrender.com';
    const trackingUrl = `${baseUrl}/track?order=${encodeURIComponent(orderRef)}`;

    const itemsHtml = (order.items || [])
      .map(
        (item: any) => `
        <tr style="border-bottom: 1px solid #ECE3D4;">
          <td style="padding: 12px 8px; vertical-align: middle;">
            <strong style="color: #2C1B16; font-size: 14px;">${item.name}</strong>
            ${item.selectedColor ? `<div style="font-size: 11px; color: #777;">Color: ${item.selectedColor}</div>` : ''}
            <div style="font-size: 11px; color: #5A1022;">Qty: ${item.quantity} · Handloom Silk Mark Verified</div>
          </td>
          <td style="padding: 12px 8px; text-align: right; vertical-align: middle; font-weight: bold; color: #5A1022; font-size: 14px;">
            ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
          </td>
        </tr>`
      )
      .join('');

    const transporter = getTransporter();
    const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

    await transporter.sendMail({
      from: `"Virasat Silk & Sarees" <${senderEmail}>`,
      to: cleanEmail,
      subject: `👑 Order Confirmed: #${orderRef} - Your Handloom Saree Booking is Successful!`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 26px; max-width: 600px; margin: auto; border: 2px solid #C9A227; border-radius: 6px;">
          <div style="text-align: center; border-bottom: 2px solid #5A1022; padding-bottom: 16px; margin-bottom: 20px;">
            <h1 style="color: #5A1022; margin: 0; font-size: 26px;">Virasat Silk & Sarees</h1>
            <p style="color: #7A6455; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 4px 0 0 0;">
              Flagship Handloom Pavilion · Kolhapur, Maharashtra
            </p>
          </div>

          <div style="color: #2C1B16; font-size: 14px; line-height: 1.6;">
            <p style="font-size: 16px;">Namaste <strong>${customerName}</strong> ji 🙏,</p>
            <p>Thank you for shopping with <strong>Virasat Silk & Sarees</strong>! Your order <strong>#${orderRef}</strong> has been successfully booked.</p>

            <div style="background-color: #F8F1E5; border: 1px solid #D6B879; border-radius: 4px; padding: 14px 16px; margin: 18px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="color: #666; padding-bottom: 4px;">Order Number:</td>
                  <td style="text-align: right; font-weight: bold; color: #5A1022; font-family: monospace;">#${orderRef}</td>
                </tr>
                <tr>
                  <td style="color: #666; padding-bottom: 4px;">Payment Method:</td>
                  <td style="text-align: right; font-weight: bold; color: #2C1B16; text-transform: uppercase;">${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid via Razorpay'}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Booking Status:</td>
                  <td style="text-align: right; font-weight: bold; color: #059669;">✓ Confirmed & Loom Reserved</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #5A1022; font-size: 16px; margin: 20px 0 8px 0; border-bottom: 1px solid #ECE3D4; padding-bottom: 4px;">
              Ordered Saree(s)
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              ${itemsHtml}
              <tr style="border-top: 2px solid #5A1022;">
                <td style="padding: 10px 8px; font-weight: bold; color: #2C1B16;">Total Amount:</td>
                <td style="padding: 10px 8px; text-align: right; font-weight: bold; color: #5A1022; font-size: 16px;">
                  ₹${(order.total || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            </table>

            <div style="border-left: 3px solid #C9A227; padding-left: 12px; margin: 16px 0; font-size: 13px; color: #4A3B32;">
              <strong style="color: #5A1022;">Shipping Destination:</strong><br />
              ${order.shippingAddress?.addressLine1 || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}<br />
              <strong>Contact:</strong> ${order.shippingAddress?.phone || 'N/A'}
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${trackingUrl}" style="background-color: #5A1022; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 4px; font-size: 13px; font-weight: bold; display: inline-block;">
                Track Your Saree Live
              </a>
            </div>

            <p style="font-size: 12px; color: #777; text-align: center; margin-top: 18px;">
              Need help? Contact our personal concierge: <strong>+91 93569 51406</strong>
            </p>
          </div>
        </div>
      `
    });

    console.log(`[BOOKING CONFIRMATION EMAIL SENT] To: ${cleanEmail} | Order: #${orderRef}`);
    return true;
  } catch (err: any) {
    console.error('[BOOKING CONFIRMATION EMAIL ERROR]:', err.message);
    return false;
  }
}

// -------------------------------------------------------------
// 2. SEND AUTOMATIC ORDER STATUS UPDATE EMAIL TO CUSTOMER
// -------------------------------------------------------------
async function sendStatusUpdateEmail(order: any, newStatus: string) {
  try {
    const customerEmail = order.shippingAddress?.email;
    if (!customerEmail || !customerEmail.includes('@')) {
      console.warn('[STATUS EMAIL] No valid customer email found in order:', order.id);
      return false;
    }

    const cleanEmail = customerEmail.trim().toLowerCase();
    const customerName = order.shippingAddress?.fullName || 'Valued Patron';
    const orderRef = order.orderNumber || (order.id ? order.id.slice(-6).toUpperCase() : 'REF');
    const baseUrl = process.env.APP_URL || 'https://saree-web-final.onrender.com';
    const trackingUrl = `${baseUrl}/track?order=${encodeURIComponent(orderRef)}`;

    let subject = `Order Update: #${orderRef} is now ${newStatus} - Virasat Silk & Sarees`;
    let badgeColor = '#5A1022';
    let statusHeading = `Order Status: ${newStatus}`;
    let statusDescription = `Your order <strong>#${orderRef}</strong> status has been updated to <strong>${newStatus}</strong>.`;

    const lower = newStatus.toLowerCase();
    if (lower.includes('cancel')) {
      subject = `⚠️ Order Cancelled: #${orderRef} - Virasat Silk & Sarees`;
      badgeColor = '#DC2626';
      statusHeading = 'Order Cancelled';
      statusDescription = `We regret to inform you that order <strong>#${orderRef}</strong> has been cancelled. Any payments made will be refunded within 3–5 working days.`;
    } else if (lower.includes('deliver')) {
      subject = `🎉 Order Delivered: #${orderRef} - Your Saree has arrived!`;
      badgeColor = '#059669';
      statusHeading = 'Order Delivered';
      statusDescription = `Your saree package for order <strong>#${orderRef}</strong> has been safely delivered to your doorstep. We hope you love your authentic handloom saree!`;
    } else if (lower.includes('ship')) {
      subject = `🚚 Order Shipped: #${orderRef} - Dispatched & In Transit!`;
      badgeColor = '#2563EB';
      statusHeading = 'Shipped / In Transit';
      statusDescription = `Your handloom parcel has been securely packed in cotton muslin and handed over to our express courier partner.`;
    } else if (lower.includes('process')) {
      subject = `🧵 Order In Progress: #${orderRef} - Loom Inspection Underway`;
      badgeColor = '#D97706';
      statusHeading = 'Processing & Quality Audit';
      statusDescription = `Our master weavers in Yeola & Paithan are currently performing the Silk Mark audit and selvedge inspection for order <strong>#${orderRef}</strong>.`;
    } else if (lower.includes('confirm')) {
      subject = `👑 Order Confirmed: #${orderRef} - Loom Artisan Reserved`;
      badgeColor = '#059669';
      statusHeading = 'Order Confirmed';
      statusDescription = `Your order <strong>#${orderRef}</strong> has been verified and confirmed. The saree has been earmarked in our Kolhapur showroom vault.`;
    }

    const itemsHtml = (order.items || [])
      .map(
        (item: any) => `
        <tr style="border-bottom: 1px solid #ECE3D4;">
          <td style="padding: 10px 8px; vertical-align: middle;">
            <strong style="color: #2C1B16; font-size: 14px;">${item.name}</strong>
            ${item.selectedColor ? `<div style="font-size: 11px; color: #777;">Shade: ${item.selectedColor}</div>` : ''}
            <div style="font-size: 11px; color: #5A1022;">Quantity: ${item.quantity} · Silk Mark Verified</div>
          </td>
          <td style="padding: 10px 8px; text-align: right; vertical-align: middle; font-weight: bold; color: #5A1022; font-size: 14px;">
            ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
          </td>
        </tr>`
      )
      .join('');

    const transporter = getTransporter();
    const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

    await transporter.sendMail({
      from: `"Virasat Silk & Sarees" <${senderEmail}>`,
      to: cleanEmail,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 26px; max-width: 600px; margin: auto; border: 2px solid #C9A227; border-radius: 6px;">
          <div style="text-align: center; border-bottom: 2px solid #5A1022; padding-bottom: 16px; margin-bottom: 20px;">
            <h1 style="color: #5A1022; margin: 0; font-size: 24px;">Virasat Silk & Sarees</h1>
            <p style="color: #7A6455; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 4px 0 0 0;">
              Flagship Handloom Pavilion · Kolhapur, Maharashtra
            </p>
          </div>

          <div style="color: #2C1B16; font-size: 14px; line-height: 1.6;">
            <p style="font-size: 15px; margin-bottom: 8px;">Namaste <strong>${customerName}</strong> ji 🙏,</p>
            <p style="color: #4A3B32; margin-top: 0;">${statusDescription}</p>

            <div style="background-color: #F8F1E5; border: 1px solid #D6B879; border-radius: 4px; padding: 14px 16px; margin: 18px 0; text-align: center;">
              <span style="display: inline-block; background-color: ${badgeColor}; color: #ffffff; font-size: 12px; font-weight: bold; padding: 6px 16px; border-radius: 20px; text-transform: uppercase;">
                ${statusHeading}
              </span>
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                Order Reference: <strong style="color: #5A1022; font-family: monospace;">#${orderRef}</strong>
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              ${itemsHtml}
              <tr style="border-top: 2px solid #5A1022;">
                <td style="padding: 10px 8px; font-weight: bold; color: #2C1B16;">Total Order Value:</td>
                <td style="padding: 10px 8px; text-align: right; font-weight: bold; color: #5A1022; font-size: 15px;">
                  ₹${(order.total || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            </table>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${trackingUrl}" style="background-color: #5A1022; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 13px; font-weight: bold; display: inline-block;">
                Track Saree Live & View Details
              </a>
            </div>

            <p style="font-size: 12px; color: #777; text-align: center;">
              Need help? WhatsApp Concierge: <strong>+91 93569 51406</strong>
            </p>
          </div>
        </div>
      `
    });

    console.log(`[STATUS EMAIL SENT] To: ${cleanEmail} | Order: #${orderRef} | Status: ${newStatus}`);
    return true;
  } catch (err: any) {
    console.error('[STATUS EMAIL ERROR]:', err.message);
    return false;
  }
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// Products API
app.get('/api/products', (req: Request, res: Response) => {
  try {
    const { category, search, fabric, occasion, color, zariType, minPrice, maxPrice, featured, bestSeller, newArrival, sort } = req.query;
    const products = db.getProducts({
      category: category as string,
      search: search as string,
      fabric: fabric as string,
      occasion: occasion as string,
      color: color as string,
      zariType: zariType as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      featured: featured === 'true',
      bestSeller: bestSeller === 'true',
      newArrival: newArrival === 'true',
      sort: sort as any
    });
    res.json({
      success: true,
      data: {
        products,
        total: products.length
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/products/:slug', (req: Request, res: Response) => {
  try {
    const product = db.getProductBySlugOrId(req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: { product } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/products', (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.name || !body.price || !body.category) {
      return res.status(400).json({ success: false, message: 'Name, price and category are required' });
    }
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = db.createProduct({
      name: body.name,
      slug,
      category: body.category,
      price: Number(body.price),
      originalPrice: Number(body.originalPrice || body.price),
      discountPercentage: body.discountPercentage || Math.round(((Number(body.originalPrice || body.price) - Number(body.price)) / Number(body.originalPrice || body.price)) * 100),
      stock: Number(body.stock || 10),
      description: body.description || '',
      fabric: body.fabric || 'Pure Silk',
      sareeLength: body.sareeLength || '6.3 meters with blouse piece',
      blouseIncluded: body.blouseIncluded !== false,
      blouseType: body.blouseType || 'Unstitched matching blouse',
      careInstructions: body.careInstructions || 'Dry clean only',
      availability: Number(body.stock || 10) > 4 ? 'In Stock' : (Number(body.stock || 10) > 0 ? 'Low Stock' : 'Out of Stock'),
      featured: Boolean(body.featured),
      bestSeller: Boolean(body.bestSeller),
      newArrival: Boolean(body.newArrival),
      rating: Number(body.rating || 5.0),
      reviewsCount: Number(body.reviewsCount || 0),
      work: body.work || 'Handwoven Zari Motifs',
      zariType: body.zariType || 'Pure Tested Zari',
      occasion: body.occasion || 'Festive, Wedding',
      colors: body.colors || [{ name: 'Default', value: '#5A1022', image: body.images?.[0]?.url || '' }],
      images: body.images || []
    });
    res.status(201).json({ success: true, data: { product: newProduct } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: { product: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Categories API
app.get('/api/categories', (_req: Request, res: Response) => {
  try {
    const categories = db.getCategories();
    res.json({ success: true, data: { categories } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Orders API
app.get('/api/orders', (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, data: { orders } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: { order } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH Order Status (Admin updates order status -> sends automatic status email to customer)
app.patch('/api/orders/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // 📩 Send status update email asynchronously to customer
    sendStatusUpdateEmail(updated, status).catch((mailErr) => {
      console.error(`[STATUS EMAIL FAILED for #${updated.orderNumber}]:`, mailErr.message);
    });

    res.json({ success: true, data: { order: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// NODEMAILER OTP SERVICE FOR BOOKINGS
// -------------------------------------------------------------
interface EmailOtpRecord {
  otp: string;
  expiresAt: number;
  verified: boolean;
  fullName?: string;
}

const emailOtpStore = new Map<string, EmailOtpRecord>();

// Send OTP to Customer Email before booking
app.post('/api/auth/send-booking-otp', async (req: Request, res: Response) => {
  try {
    const { email, fullName } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    emailOtpStore.set(cleanEmail, {
      otp,
      expiresAt,
      verified: false,
      fullName
    });

    const transporter = getTransporter();
    const senderEmail = (process.env.SMTP_USER || 'ankitakhot015@gmail.com').trim();

    const mailOptions = {
      from: `"Virasat Silk & Sarees" <${senderEmail}>`,
      to: cleanEmail,
      subject: `👑 Virasat Sarees Booking OTP: ${otp} (Valid for 10 mins)`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFDF8; padding: 24px; max-width: 580px; margin: auto; border: 2px solid #C9A227; border-radius: 4px;">
          <h1 style="color: #5A1022; text-align: center; margin: 0 0 16px 0;">Virasat Silk & Sarees</h1>
          <p>Namaste <strong>${fullName || 'Valued Customer'}</strong> ji,</p>
          <p>To verify your email address and authorize your authentic handloom saree booking, please enter the verification code below:</p>
          <div style="text-align: center; margin: 24px 0; background-color: #F8F1E5; padding: 18px; border-radius: 4px; border: 1px dashed #C9A227;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #5A1022; font-family: monospace;">${otp}</span>
            <span style="display: block; font-size: 11px; color: #666; margin-top: 8px;">Valid for 10 minutes. Do not share this code.</span>
          </div>
          <p style="font-size: 11px; color: #888; text-align: center;">Virasat Silk & Sarees Flagship Pavilion · Kolhapur</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[BOOKING OTP SENT] Customer: ${cleanEmail}`);
    } catch (mailErr: any) {
      console.error('[NODEMAILER ERROR]:', mailErr.message);
      return res.status(500).json({
        success: false,
        message: `Email dispatch error: ${mailErr.message}`
      });
    }

    res.json({
      success: true,
      message: `A 6-digit OTP code has been sent to ${cleanEmail}. Please check your inbox and enter the code below.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Diagnostic Route to test SMTP connectivity
app.get('/api/smtp-test', async (_req: Request, res: Response) => {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    res.json({
      success: true,
      status: 'CONNECTED',
      message: 'Gmail SMTP credentials verified successfully on Render!'
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      status: 'AUTH_FAILED',
      error: err.message
    });
  }
});

// Verify OTP before placing order
app.post('/api/auth/verify-booking-otp', (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const record = emailOtpStore.get(cleanEmail);
    if (!record) {
      return res.status(400).json({ success: false, message: 'No OTP requested for this email. Please request a new code.' });
    }
    if (Date.now() > record.expiresAt) {
      emailOtpStore.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please click "Resend Code".' });
    }
    if (record.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP entered. Please check your email and try again.' });
    }

    record.verified = true;
    emailOtpStore.set(cleanEmail, record);

    res.json({
      success: true,
      message: 'Email successfully verified! You may now proceed with booking.',
      verified: true
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Comprehensive Analytics API
app.get('/api/analytics', (_req: Request, res: Response) => {
  try {
    const analytics = db.getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cloudinary Image Upload API
app.post('/api/upload', async (req: Request, res: Response) => {
  try {
    const { imageBase64, imageUrl } = req.body;
    if (!imageBase64 && !imageUrl) {
      return res.status(400).json({ success: false, message: 'Image base64 or URL is required' });
    }
    const source = imageBase64 || imageUrl;
    const uploadRes = await cloudinary.uploader.upload(source, {
      folder: 'virasat_sarees',
      resource_type: 'image'
    });
    res.json({
      success: true,
      data: {
        url: uploadRes.secure_url,
        publicId: uploadRes.public_id,
        format: uploadRes.format,
        width: uploadRes.width,
        height: uploadRes.height
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Razorpay Payment APIs
app.post('/api/payment/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || { store: 'Virasat Silk & Sarees' }
    };
    const razorpayOrder = await razorpay.orders.create(options);
    res.json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: RAZORPAY_KEY_ID
      }
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    const mockOrderId = `order_test_${Date.now()}`;
    res.json({
      success: true,
      data: {
        orderId: mockOrderId,
        amount: Math.round(Number(req.body.amount || 100) * 100),
        currency: 'INR',
        keyId: RAZORPAY_KEY_ID
      }
    });
  }
});

// Razorpay Payment Verification & Automatic Customer Email
app.post('/api/payment/verify', (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

    let isSignatureValid = false;
    if (razorpay_signature && razorpay_order_id && razorpay_payment_id) {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      isSignatureValid = expectedSignature === razorpay_signature;
    } else {
      isSignatureValid = true;
    }

    if (!isSignatureValid) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    const newOrder = db.createOrder({
      userId: orderDetails?.userId,
      items: orderDetails.items,
      shippingAddress: orderDetails.shippingAddress,
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount || 0,
      shipping: orderDetails.shipping || 0,
      total: orderDetails.total,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      orderStatus: 'Confirmed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id || `pay_${Date.now()}`
    });

    // 📩 Automatically send booking confirmation email to customer
    sendBookingConfirmationEmail(newOrder).catch((mailErr) => {
      console.error('[BOOKING CONFIRMATION ASYNC ERROR]:', mailErr.message);
    });

    res.json({
      success: true,
      message: 'Payment verified and order placed successfully',
      data: {
        order: newOrder
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Direct Order Creation (COD) & Automatic Customer Email
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    if (!orderData.items || !orderData.shippingAddress || !orderData.total) {
      return res.status(400).json({ success: false, message: 'Missing order information' });
    }

    const order = db.createOrder({
      userId: orderData.userId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shipping: orderData.shipping || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Order Placed'
    });

    // 📩 Automatically send booking confirmation email to customer
    sendBookingConfirmationEmail(order).catch((mailErr) => {
      console.error('[BOOKING CONFIRMATION ASYNC ERROR]:', mailErr.message);
    });

    res.status(201).json({ success: true, data: { order } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER / PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch(err => {
  console.error('Failed to start server:', err);
});