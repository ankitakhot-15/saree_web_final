// import React, { useState, useEffect } from "react";
// import { api } from "../services/api.js";
// import { Product, Order } from "../../server/types.js";
// import { AdminSidebar } from "../components/AdminSidebar.js";
// import { AdminTable } from "../components/AdminTable.js";
// import { AdminProductForm } from "../components/AdminProductForm.js";
// import { PrintInvoiceModal } from "../components/PrintInvoiceModal.js";
// import {
//   openWhatsAppShare,
//   generateStatusUpdateMessage,
//   getOrderTrackingUrl,
// } from "../services/receipt.js";
// import {
//   TrendingUp,
//   DollarSign,
//   ShoppingBag,
//   Boxes,
//   CheckCircle,
//   AlertTriangle,
//   ArrowUpRight,
//   RefreshCw,
//   Plus,
//   Printer,
//   MessageSquare,
//   ExternalLink,
//   X,
//   Mail,
//   Menu,
// } from "lucide-react";

// export const AdminPage: React.FC = () => {
//   const [currentTab, setCurrentTab] = useState<
//     "analytics" | "products" | "orders" | "inventory"
//   >("analytics");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [analytics, setAnalytics] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
//   const [lastStatusChange, setLastStatusChange] = useState<{
//     order: Order;
//     status: string;
//   } | null>(null);

//   const loadAllData = async () => {
//     setLoading(true);
//     try {
//       const [prodsRes, ordsRes, analyticsRes] = await Promise.all([
//         api.getProducts(),
//         api.getOrders(),
//         api.getAnalytics(),
//       ]);

//       if (prodsRes.success) setProducts(prodsRes.data.products);
//       if (ordsRes.success) setOrders(ordsRes.data.orders);
//       if (analyticsRes.success) setAnalytics(analyticsRes.data);
//     } catch (err) {
//       console.error("Error fetching admin data", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const handleSaveProduct = async (productData: Partial<Product>) => {
//     if (editingProduct) {
//       const res = await api.updateProduct(editingProduct.id, productData);
//       if (res.success && res.data?.product) {
//         setProducts((prev) =>
//           prev.map((p) => (p.id === editingProduct.id ? res.data.product : p)),
//         );
//       }
//     } else {
//       const res = await api.createProduct(productData);
//       if (res.success && res.data?.product) {
//         setProducts((prev) => [res.data.product, ...prev]);
//       }
//     }
//     const aRes = await api.getAnalytics();
//     if (aRes.success) setAnalytics(aRes.data);
//   };

//   const handleDeleteProduct = async (id: string) => {
//     const res = await api.deleteProduct(id);
//     if (res.success) {
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//       const aRes = await api.getAnalytics();
//       if (aRes.success) setAnalytics(aRes.data);
//     }
//   };

//   const handleUpdateOrderStatus = async (orderId: string, status: string) => {
//     const res = await api.updateOrderStatus(orderId, status);
//     if (res.success && res.data?.order) {
//       const updatedOrder = res.data.order;
//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? updatedOrder : o)),
//       );
//       setLastStatusChange({ order: updatedOrder, status });
//       const aRes = await api.getAnalytics();
//       if (aRes.success) setAnalytics(aRes.data);
//     }
//   };

//   const handleRestock = async (productId: string, additionalStock = 10) => {
//     const prod = products.find((p) => p.id === productId);
//     if (!prod) return;
//     const newStock = prod.stock + additionalStock;
//     const res = await api.updateProduct(productId, {
//       stock: newStock,
//       availability: newStock > 4 ? "In Stock" : "Low Stock",
//     });
//     if (res.success && res.data?.product) {
//       setProducts((prev) =>
//         prev.map((p) => (p.id === productId ? res.data.product : p)),
//       );
//       const aRes = await api.getAnalytics();
//       if (aRes.success) setAnalytics(aRes.data);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#FFFDF8] w-full max-w-full overflow-x-hidden">
//       {/* Sidebar with Mobile Support */}
//       <AdminSidebar
//         currentTab={currentTab}
//         onTabChange={setCurrentTab}
//         onOpenNewProductModal={() => {
//           setEditingProduct(null);
//           setIsModalOpen(true);
//         }}
//         isMobileOpen={isMobileSidebarOpen}
//         onMobileClose={() => setIsMobileSidebarOpen(false)}
//       />

//       {/* Main Content Area */}
//       <main className="flex-1 w-full min-w-0 max-w-full p-4 sm:p-6 lg:p-10 overflow-x-hidden">
//         {/* Mobile Header Bar */}
//         <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-[#2C1B16]/10">
//           <button
//             onClick={() => setIsMobileSidebarOpen(true)}
//             className="p-2 border border-[#2C1B16]/20 rounded text-[#2C1B16] bg-white flex items-center gap-1.5 text-xs font-semibold shadow-xs"
//           >
//             <Menu size={16} />
//             <span>Admin Menu</span>
//           </button>

//           <span className="text-xs font-serif font-bold text-[#5A1022] uppercase tracking-wider">
//             {currentTab}
//           </span>

//           <button
//             onClick={() => {
//               setEditingProduct(null);
//               setIsModalOpen(true);
//             }}
//             className="p-2 bg-[#5A1022] text-white rounded text-xs"
//             title="Add Saree"
//           >
//             <Plus size={16} />
//           </button>
//         </div>

//         {/* Top Header (Desktop & Tablet) */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#2C1B16]/10 gap-4">
//           <div>
//             <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#5A1022]">
//               Store Administration
//             </span>
//             <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2C1B16]">
//               {currentTab === "analytics" &&
//                 "Executive Analytics & User Transactions"}
//               {currentTab === "products" && "Saree Catalog Management"}
//               {currentTab === "orders" && "Customer Orders & Fulfillment"}
//               {currentTab === "inventory" &&
//                 "Inventory Health & Stock Management"}
//             </h1>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={loadAllData}
//               className="p-2 border border-[#2C1B16]/20 rounded text-[#2C1B16] hover:bg-[#F8F1E5] transition-colors cursor-pointer"
//               title="Refresh Data"
//             >
//               <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
//             </button>

//             <button
//               onClick={() => {
//                 setEditingProduct(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-3 sm:px-4 py-2 bg-[#5A1022] hover:bg-[#460b19] text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
//             >
//               <Plus size={14} /> Add Saree
//             </button>
//           </div>
//         </div>

//         {/* TAB 1: Analytics */}
//         {currentTab === "analytics" && analytics && (
//           <div className="space-y-6 sm:space-y-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
//               <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
//                 <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
//                   <span className="font-medium uppercase tracking-wider">
//                     Total Sales
//                   </span>
//                   <div className="p-2 bg-[#5A1022]/10 text-[#5A1022] rounded">
//                     <DollarSign size={16} />
//                   </div>
//                 </div>
//                 <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5A1022] tabular-nums">
//                   ₹{analytics.totalRevenue.toLocaleString("en-IN")}
//                 </h3>
//                 <p className="text-[11px] text-emerald-800 font-medium mt-1 flex items-center gap-1">
//                   <TrendingUp size={12} /> 100% Paid Orders
//                 </p>
//               </div>

//               <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
//                 <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
//                   <span className="font-medium uppercase tracking-wider">
//                     Total Orders
//                   </span>
//                   <div className="p-2 bg-[#C9A227]/10 text-[#C9A227] rounded">
//                     <ShoppingBag size={16} />
//                   </div>
//                 </div>
//                 <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
//                   {analytics.totalOrders} Transactions
//                 </h3>
//                 <p className="text-[11px] text-[#2C1B16]/60 mt-1">
//                   {analytics.paidOrders} Completed Orders
//                 </p>
//               </div>

//               <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
//                 <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
//                   <span className="font-medium uppercase tracking-wider">
//                     Average Order (AOV)
//                   </span>
//                   <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
//                     <ArrowUpRight size={16} />
//                   </div>
//                 </div>
//                 <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
//                   ₹{analytics.averageOrderValue.toLocaleString("en-IN")}
//                 </h3>
//                 <p className="text-[11px] text-[#2C1B16]/60 mt-1">
//                   Luxury Handlooms
//                 </p>
//               </div>

//               <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
//                 <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
//                   <span className="font-medium uppercase tracking-wider">
//                     Inventory Health
//                   </span>
//                   <div className="p-2 bg-amber-50 text-amber-700 rounded">
//                     <Boxes size={16} />
//                   </div>
//                 </div>
//                 <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
//                   {analytics.inventory.totalInventoryItems} Units
//                 </h3>
//                 <p className="text-[11px] text-amber-700 font-medium mt-1">
//                   {analytics.inventory.lowStockCount} Low Stock SKUs
//                 </p>
//               </div>
//             </div>

//             {/* Performance charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs">
//                 <h3 className="font-serif text-base sm:text-lg font-medium text-[#2C1B16] pb-3 border-b border-[#2C1B16]/10 mb-4">
//                   Loom Revenue Contribution by Category
//                 </h3>
//                 <div className="space-y-4">
//                   {Object.entries(analytics.categoryRevenue).map(
//                     ([cat, data]: [string, any]) => (
//                       <div key={cat} className="space-y-1 text-xs">
//                         <div className="flex justify-between font-medium">
//                           <span>{cat} Sarees</span>
//                           <span className="tabular-nums font-semibold text-[#5A1022]">
//                             ₹{data.revenue.toLocaleString("en-IN")} (
//                             {data.count} sold)
//                           </span>
//                         </div>
//                         <div className="w-full bg-[#F8F1E5] h-2 rounded-full overflow-hidden">
//                           <div
//                             className="bg-[#5A1022] h-full rounded-full"
//                             style={{
//                               width: `${Math.min(
//                                 100,
//                                 Math.round(
//                                   (data.revenue /
//                                     (analytics.totalRevenue || 1)) *
//                                     100,
//                                 ),
//                               )}%`,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </div>

//               <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs">
//                 <h3 className="font-serif text-base sm:text-lg font-medium text-[#2C1B16] pb-3 border-b border-[#2C1B16]/10 mb-4">
//                   Fulfillment Status Pipeline
//                 </h3>
//                 <div className="grid grid-cols-2 gap-3 sm:gap-4">
//                   {Object.entries(analytics.statusCounts).map(
//                     ([status, count]: [string, any]) => (
//                       <div
//                         key={status}
//                         className="p-3 bg-[#FDF9F2] border border-[#2C1B16]/10 rounded"
//                       >
//                         <span className="text-[11px] text-[#2C1B16]/60 uppercase font-semibold block truncate">
//                           {status}
//                         </span>
//                         <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums mt-1 block">
//                           {count}
//                         </span>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* TAB 2: Products Catalog */}
//         {currentTab === "products" && (
//           <div className="space-y-4 w-full max-w-full overflow-x-hidden">
//             <AdminTable
//               products={products}
//               onEdit={(prod) => {
//                 setEditingProduct(prod);
//                 setIsModalOpen(true);
//               }}
//               onDelete={handleDeleteProduct}
//             />
//           </div>
//         )}

//         {/* TAB 3: Customer Orders Management */}
//         {currentTab === "orders" && (
//           <div className="space-y-4 w-full max-w-full overflow-x-hidden">
//             {lastStatusChange && (
//               <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-sm text-xs text-emerald-950 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm animate-in fade-in">
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle size={16} className="text-emerald-700" />
//                     <span className="font-bold text-sm">
//                       Order #{lastStatusChange.order.orderNumber} status changed
//                       to "{lastStatusChange.status}"!
//                     </span>
//                   </div>
//                   <p className="text-emerald-800 text-[11px] flex items-center gap-1.5">
//                     <Mail size={13} className="text-emerald-700" />
//                     Email automatically dispatched to:{" "}
//                     <strong>
//                       {lastStatusChange.order.shippingAddress.email}
//                     </strong>
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                   <button
//                     onClick={() => {
//                       const msg = generateStatusUpdateMessage(
//                         lastStatusChange.order,
//                         lastStatusChange.status,
//                         getOrderTrackingUrl(lastStatusChange.order),
//                       );
//                       openWhatsAppShare(
//                         lastStatusChange.order,
//                         undefined,
//                         true,
//                         msg,
//                       );
//                     }}
//                     className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
//                   >
//                     <MessageSquare size={13} />
//                     <span>Send WhatsApp to Customer</span>
//                   </button>

//                   <a
//                     href={`/track?order=${encodeURIComponent(lastStatusChange.order.orderNumber || lastStatusChange.order.id)}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-3 py-1.5 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
//                   >
//                     <ExternalLink size={13} />
//                     <span>View Customer Tracking</span>
//                   </a>

//                   <button
//                     onClick={() => setLastStatusChange(null)}
//                     className="p-1.5 text-emerald-800 hover:text-emerald-950 rounded hover:bg-emerald-100"
//                   >
//                     <X size={15} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs w-full max-w-full">
//               <div className="p-4 bg-[#FDF9F2] border-b border-[#2C1B16]/10">
//                 <h3 className="font-serif text-base font-semibold text-[#2C1B16]">
//                   Customer Orders Log ({orders.length})
//                 </h3>
//                 <p className="text-[11px] text-[#2C1B16]/60">
//                   Changing status sends an email to the customer and updates
//                   tracking.
//                 </p>
//               </div>

//               {/* Responsive Table Scroll Container without horizontal page overflow */}
//               <div className="w-full overflow-x-auto">
//                 <table className="w-full min-w-[700px] text-left border-collapse text-xs">
//                   <thead>
//                     <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5]/60 text-[#2C1B16]/70 uppercase font-semibold text-[11px]">
//                       <th className="p-3">Order ID</th>
//                       <th className="p-3">Customer & Email</th>
//                       <th className="p-3">Items</th>
//                       <th className="p-3">Amount</th>
//                       <th className="p-3">Payment</th>
//                       <th className="p-3">Status</th>
//                       <th className="p-3 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#2C1B16]/5 text-[#2C1B16]">
//                     {orders.map((ord) => (
//                       <tr
//                         key={ord.id}
//                         className="hover:bg-[#FDF9F2]/60 transition-colors"
//                       >
//                         <td className="p-3 font-mono font-medium text-[#5A1022] whitespace-nowrap">
//                           <a
//                             href={`/track?order=${encodeURIComponent(ord.orderNumber || ord.id)}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="hover:underline flex items-center gap-1"
//                           >
//                             <span>{ord.orderNumber || ord.id}</span>
//                             <ExternalLink size={10} className="opacity-50" />
//                           </a>
//                         </td>

//                         <td className="p-3">
//                           <div className="font-medium text-[#2C1B16]">
//                             {ord.shippingAddress.fullName}
//                           </div>
//                           <div className="text-[11px] text-[#5A1022] font-mono">
//                             {ord.shippingAddress.email}
//                           </div>
//                           <div className="text-[11px] text-[#2C1B16]/60">
//                             {ord.shippingAddress.phone}
//                           </div>
//                         </td>

//                         <td className="p-3 max-w-[200px] truncate">
//                           {ord.items
//                             .map((i) => `${i.name} (x${i.quantity})`)
//                             .join(", ")}
//                         </td>

//                         <td className="p-3 tabular-nums font-semibold text-[#2C1B16] whitespace-nowrap">
//                           ₹{ord.total.toLocaleString("en-IN")}
//                         </td>

//                         <td className="p-3 whitespace-nowrap">
//                           <span
//                             className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
//                               ord.paymentStatus === "paid"
//                                 ? "bg-emerald-50 text-emerald-800"
//                                 : "bg-amber-50 text-amber-800"
//                             }`}
//                           >
//                             {ord.paymentMethod.toUpperCase()} ·{" "}
//                             {ord.paymentStatus}
//                           </span>
//                         </td>

//                         {/* Status Select */}
//                         <td className="p-3 whitespace-nowrap">
//                           <select
//                             value={ord.orderStatus}
//                             onChange={(e) =>
//                               handleUpdateOrderStatus(ord.id, e.target.value)
//                             }
//                             className={`border rounded px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer ${
//                               ord.orderStatus === "Delivered"
//                                 ? "bg-emerald-50 text-emerald-800 border-emerald-300"
//                                 : ord.orderStatus === "Shipped"
//                                   ? "bg-blue-50 text-blue-800 border-blue-300"
//                                   : ord.orderStatus === "Cancelled"
//                                     ? "bg-red-50 text-red-800 border-red-300"
//                                     : (ord.orderStatus as string) ===
//                                           "Processing" ||
//                                         (ord.orderStatus as string) ===
//                                           "Pending"
//                                       ? "bg-amber-50 text-amber-800 border-amber-300"
//                                       : "bg-white text-[#2C1B16] border-[#2C1B16]/20"
//                             }`}
//                           >
//                             <option value="Pending">⏳ Pending</option>
//                             <option value="Order Placed">
//                               📦 1. Order Placed
//                             </option>
//                             <option value="Confirmed">✓ 2. Confirmed</option>
//                             <option value="Processing">
//                               🧵 3. Processing (Loom Audit)
//                             </option>
//                             <option value="Shipped">
//                               🚚 4. Shipped (In Transit)
//                             </option>
//                             <option value="Delivered">🎉 5. Delivered</option>
//                             <option value="Cancelled">❌ Cancelled</option>
//                           </select>
//                         </td>

//                         <td className="p-3 text-right whitespace-nowrap">
//                           <div className="inline-flex items-center gap-1.5">
//                             <button
//                               onClick={() => {
//                                 const msg = generateStatusUpdateMessage(
//                                   ord,
//                                   ord.orderStatus,
//                                   getOrderTrackingUrl(ord),
//                                 );
//                                 openWhatsAppShare(ord, undefined, true, msg);
//                               }}
//                               className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors shadow-xs"
//                               title="Send WhatsApp update"
//                             >
//                               <MessageSquare size={13} />
//                               <span className="hidden sm:inline">WhatsApp</span>
//                             </button>

//                             <button
//                               onClick={() => setInvoiceOrder(ord)}
//                               className="p-1.5 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors shadow-xs"
//                               title="View Invoice"
//                             >
//                               <Printer size={13} />
//                               <span className="hidden sm:inline">Receipt</span>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* TAB 4: Inventory Health */}
//         {currentTab === "inventory" && (
//           <div className="space-y-6 w-full max-w-full overflow-x-hidden">
//             <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs w-full max-w-full">
//               <h3 className="font-serif text-lg font-semibold text-[#2C1B16] mb-2">
//                 Inventory SKU Stock Control
//               </h3>
//               <p className="text-xs text-[#2C1B16]/60 mb-6">
//                 Adjust stock levels and manage stock thresholds.
//               </p>

//               <div className="w-full overflow-x-auto">
//                 <table className="w-full min-w-[600px] text-left text-xs">
//                   <thead>
//                     <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5]/60 text-[#2C1B16]/70 uppercase font-semibold text-[11px]">
//                       <th className="p-3">Saree Name</th>
//                       <th className="p-3">Category</th>
//                       <th className="p-3">Price</th>
//                       <th className="p-3">Stock</th>
//                       <th className="p-3">Status</th>
//                       <th className="p-3 text-right">Quick Restock</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#2C1B16]/5">
//                     {products.map((prod) => (
//                       <tr key={prod.id} className="hover:bg-[#FDF9F2]/50">
//                         <td className="p-3 font-serif font-medium text-sm text-[#2C1B16]">
//                           {prod.name}
//                         </td>
//                         <td className="p-3">{prod.category}</td>
//                         <td className="p-3 tabular-nums font-medium">
//                           ₹{prod.price.toLocaleString("en-IN")}
//                         </td>
//                         <td className="p-3 font-semibold tabular-nums">
//                           {prod.stock}
//                         </td>
//                         <td className="p-3">
//                           <span
//                             className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
//                               prod.stock === 0
//                                 ? "bg-red-100 text-red-800"
//                                 : prod.stock <= 5
//                                   ? "bg-amber-100 text-amber-800"
//                                   : "bg-emerald-100 text-emerald-800"
//                             }`}
//                           >
//                             {prod.availability}
//                           </span>
//                         </td>
//                         <td className="p-3 text-right whitespace-nowrap">
//                           <div className="inline-flex gap-1.5">
//                             <button
//                               onClick={() => handleRestock(prod.id, 5)}
//                               className="px-2 py-1 bg-white border border-[#2C1B16]/20 rounded text-[11px] hover:bg-[#F8F1E5]"
//                             >
//                               +5
//                             </button>
//                             <button
//                               onClick={() => handleRestock(prod.id, 10)}
//                               className="px-2 py-1 bg-[#5A1022] text-[#FFFDF8] rounded text-[11px] hover:bg-[#460b19]"
//                             >
//                               +10
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Modals */}
//       <AdminProductForm
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingProduct(null);
//         }}
//         onSave={handleSaveProduct}
//         product={editingProduct}
//       />

//       {invoiceOrder && (
//         <PrintInvoiceModal
//           order={invoiceOrder}
//           isOpen={Boolean(invoiceOrder)}
//           onClose={() => setInvoiceOrder(null)}
//         />
//       )}
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { api } from "../services/api.js";
import { Product, Order } from "../../server/types.js";
import { AdminSidebar } from "../components/AdminSidebar.js";
import { AdminTable } from "../components/AdminTable.js";
import { AdminProductForm } from "../components/AdminProductForm.js";
import { PrintInvoiceModal } from "../components/PrintInvoiceModal.js";
import {
  openWhatsAppShare,
  generateStatusUpdateMessage,
  getOrderTrackingUrl,
} from "../services/receipt.js";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Boxes,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Printer,
  MessageSquare,
  ExternalLink,
  X,
  Mail,
  Menu,
} from "lucide-react";

export const AdminPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    "analytics" | "products" | "orders" | "inventory"
  >("analytics");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [lastStatusChange, setLastStatusChange] = useState<{
    order: Order;
    status: string;
  } | null>(null);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prodsRes, ordsRes, analyticsRes] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getAnalytics(),
      ]);

      if (prodsRes.success) setProducts(prodsRes.data.products);
      if (ordsRes.success) setOrders(ordsRes.data.orders);
      if (analyticsRes.success) setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error("Error fetching admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (editingProduct) {
      const res = await api.updateProduct(editingProduct.id, productData);
      if (res.success && res.data?.product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? res.data.product : p)),
        );
      }
    } else {
      const res = await api.createProduct(productData);
      if (res.success && res.data?.product) {
        setProducts((prev) => [res.data.product, ...prev]);
      }
    }
    const aRes = await api.getAnalytics();
    if (aRes.success) setAnalytics(aRes.data);
  };

  const handleDeleteProduct = async (id: string) => {
    const res = await api.deleteProduct(id);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      const aRes = await api.getAnalytics();
      if (aRes.success) setAnalytics(aRes.data);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const res = await api.updateOrderStatus(orderId, status);
    if (res.success && res.data?.order) {
      const updatedOrder = res.data.order;
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updatedOrder : o)),
      );
      setLastStatusChange({ order: updatedOrder, status });
      const aRes = await api.getAnalytics();
      if (aRes.success) setAnalytics(aRes.data);
    }
  };

  const handleRestock = async (productId: string, additionalStock = 10) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const newStock = prod.stock + additionalStock;
    const res = await api.updateProduct(productId, {
      stock: newStock,
      availability: newStock > 4 ? "In Stock" : "Low Stock",
    });
    if (res.success && res.data?.product) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? res.data.product : p)),
      );
      const aRes = await api.getAnalytics();
      if (aRes.success) setAnalytics(aRes.data);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDF8] w-full max-w-full overflow-x-hidden">
      {/* Sidebar with Mobile Support */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenNewProductModal={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 max-w-full p-4 sm:p-6 lg:p-10 overflow-x-hidden">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-[#2C1B16]/10">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 border border-[#2C1B16]/20 rounded text-[#2C1B16] bg-white flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            <Menu size={16} />
            <span>Admin Menu</span>
          </button>

          <span className="text-xs font-serif font-bold text-[#5A1022] uppercase tracking-wider">
            {currentTab}
          </span>

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="p-2 bg-[#5A1022] text-white rounded text-xs"
            title="Add Saree"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Top Header (Desktop & Tablet) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#2C1B16]/10 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#5A1022]">
              Store Administration
            </span>
            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2C1B16]">
              {currentTab === "analytics" &&
                "Executive Analytics & User Transactions"}
              {currentTab === "products" && "Saree Catalog Management"}
              {currentTab === "orders" && "Customer Orders & Fulfillment"}
              {currentTab === "inventory" &&
                "Inventory Health & Stock Management"}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadAllData}
              className="p-2 border border-[#2C1B16]/20 rounded text-[#2C1B16] hover:bg-[#F8F1E5] transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="px-3 sm:px-4 py-2 bg-[#5A1022] hover:bg-[#460b19] text-[#FFFDF8] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={14} /> Add Saree
            </button>
          </div>
        </div>

        {/* TAB 1: Analytics */}
        {currentTab === "analytics" && analytics && (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
                <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
                  <span className="font-medium uppercase tracking-wider">
                    Total Sales
                  </span>
                  <div className="p-2 bg-[#5A1022]/10 text-[#5A1022] rounded">
                    <DollarSign size={16} />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5A1022] tabular-nums">
                  ₹{analytics.totalRevenue.toLocaleString("en-IN")}
                </h3>
                <p className="text-[11px] text-emerald-800 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 100% Paid Orders
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
                <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
                  <span className="font-medium uppercase tracking-wider">
                    Total Orders
                  </span>
                  <div className="p-2 bg-[#C9A227]/10 text-[#C9A227] rounded">
                    <ShoppingBag size={16} />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
                  {analytics.totalOrders} Transactions
                </h3>
                <p className="text-[11px] text-[#2C1B16]/60 mt-1">
                  {analytics.paidOrders} Completed Orders
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
                <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
                  <span className="font-medium uppercase tracking-wider">
                    Average Order (AOV)
                  </span>
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
                  ₹{analytics.averageOrderValue.toLocaleString("en-IN")}
                </h3>
                <p className="text-[11px] text-[#2C1B16]/60 mt-1">
                  Luxury Handlooms
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs">
                <div className="flex items-center justify-between text-[#2C1B16]/60 text-xs mb-2">
                  <span className="font-medium uppercase tracking-wider">
                    Inventory Health
                  </span>
                  <div className="p-2 bg-amber-50 text-amber-700 rounded">
                    <Boxes size={16} />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums">
                  {analytics.inventory.totalInventoryItems} Units
                </h3>
                <p className="text-[11px] text-amber-700 font-medium mt-1">
                  {analytics.inventory.lowStockCount} Low Stock SKUs
                </p>
              </div>
            </div>

            {/* Performance charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs">
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#2C1B16] pb-3 border-b border-[#2C1B16]/10 mb-4">
                  Loom Revenue Contribution by Category
                </h3>
                <div className="space-y-4">
                  {Object.entries(analytics.categoryRevenue).map(
                    ([cat, data]: [string, any]) => (
                      <div key={cat} className="space-y-1 text-xs">
                        <div className="flex justify-between font-medium">
                          <span>{cat} Sarees</span>
                          <span className="tabular-nums font-semibold text-[#5A1022]">
                            ₹{data.revenue.toLocaleString("en-IN")} (
                            {data.count} sold)
                          </span>
                        </div>
                        <div className="w-full bg-[#F8F1E5] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#5A1022] h-full rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round(
                                  (data.revenue /
                                    (analytics.totalRevenue || 1)) *
                                    100,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs">
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#2C1B16] pb-3 border-b border-[#2C1B16]/10 mb-4">
                  Fulfillment Status Pipeline
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(analytics.statusCounts).map(
                    ([status, count]: [string, any]) => (
                      <div
                        key={status}
                        className="p-3 bg-[#FDF9F2] border border-[#2C1B16]/10 rounded"
                      >
                        <span className="text-[11px] text-[#2C1B16]/60 uppercase font-semibold block truncate">
                          {status}
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1B16] tabular-nums mt-1 block">
                          {count}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Products Catalog */}
        {currentTab === "products" && (
          <div className="space-y-4 w-full max-w-full overflow-x-hidden">
            <AdminTable
              products={products}
              onEdit={(prod) => {
                setEditingProduct(prod);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}

        {/* TAB 3: Customer Orders Management */}
        {currentTab === "orders" && (
          <div className="space-y-4 w-full max-w-full overflow-x-hidden">
            {lastStatusChange && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-sm text-xs text-emerald-950 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm animate-in fade-in">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-700" />
                    <span className="font-bold text-sm">
                      Order #{lastStatusChange.order.orderNumber} status changed
                      to "{lastStatusChange.status}"!
                    </span>
                  </div>
                  <p className="text-emerald-800 text-[11px] flex items-center gap-1.5">
                    <Mail size={13} className="text-emerald-700" />
                    Email automatically dispatched to:{" "}
                    <strong>
                      {lastStatusChange.order.shippingAddress.email}
                    </strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      const msg = generateStatusUpdateMessage(
                        lastStatusChange.order,
                        lastStatusChange.status,
                        getOrderTrackingUrl(lastStatusChange.order),
                      );
                      openWhatsAppShare(
                        lastStatusChange.order,
                        undefined,
                        true,
                        msg,
                      );
                    }}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <MessageSquare size={13} />
                    <span>Send WhatsApp to Customer</span>
                  </button>

                  <a
                    href={`/track?order=${encodeURIComponent(lastStatusChange.order.orderNumber || lastStatusChange.order.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>View Customer Tracking</span>
                  </a>

                  <button
                    onClick={() => setLastStatusChange(null)}
                    className="p-1.5 text-emerald-800 hover:text-emerald-950 rounded hover:bg-emerald-100"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white border border-[#2C1B16]/10 rounded-sm shadow-xs w-full max-w-full">
              <div className="p-4 bg-[#FDF9F2] border-b border-[#2C1B16]/10">
                <h3 className="font-serif text-base font-semibold text-[#2C1B16]">
                  Customer Orders Log ({orders.length})
                </h3>
                <p className="text-[11px] text-[#2C1B16]/60">
                  Changing status sends an email to the customer and updates
                  tracking.
                </p>
              </div>

              {/* Responsive Table Scroll Container without horizontal page overflow */}
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5]/60 text-[#2C1B16]/70 uppercase font-semibold text-[11px]">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer & Email</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C1B16]/5 text-[#2C1B16]">
                    {orders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-[#FDF9F2]/60 transition-colors"
                      >
                        <td className="p-3 font-mono font-medium text-[#5A1022] whitespace-nowrap">
                          <a
                            href={`/track?order=${encodeURIComponent(ord.orderNumber || ord.id)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{ord.orderNumber || ord.id}</span>
                            <ExternalLink size={10} className="opacity-50" />
                          </a>
                        </td>

                        <td className="p-3">
                          <div className="font-medium text-[#2C1B16]">
                            {ord.shippingAddress.fullName}
                          </div>
                          <div className="text-[11px] text-[#5A1022] font-mono">
                            {ord.shippingAddress.email}
                          </div>
                          <div className="text-[11px] text-[#2C1B16]/60">
                            {ord.shippingAddress.phone}
                          </div>
                        </td>

                        <td className="p-3 max-w-[200px] truncate">
                          {ord.items
                            .map((i) => `${i.name} (x${i.quantity})`)
                            .join(", ")}
                        </td>

                        <td className="p-3 tabular-nums font-semibold text-[#2C1B16] whitespace-nowrap">
                          ₹{ord.total.toLocaleString("en-IN")}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              ord.paymentStatus === "paid"
                                ? "bg-emerald-50 text-emerald-800"
                                : "bg-amber-50 text-amber-800"
                            }`}
                          >
                            {ord.paymentMethod.toUpperCase()} ·{" "}
                            {ord.paymentStatus}
                          </span>
                        </td>

                        {/* Status Select */}
                        <td className="p-3 whitespace-nowrap">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) =>
                              handleUpdateOrderStatus(ord.id, e.target.value)
                            }
                            className={`border rounded px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer ${
                              ord.orderStatus === "Delivered"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : ord.orderStatus === "Shipped"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : ord.orderStatus === "Cancelled"
                                    ? "bg-red-50 text-red-800 border-red-300"
                                    : (ord.orderStatus as string) ===
                                          "Processing" ||
                                        (ord.orderStatus as string) ===
                                          "Pending"
                                      ? "bg-amber-50 text-amber-800 border-amber-300"
                                      : "bg-white text-[#2C1B16] border-[#2C1B16]/20"
                            }`}
                          >
                            <option value="Pending">⏳ Pending</option>
                            <option value="Order Placed">
                              📦 1. Order Placed
                            </option>
                            <option value="Confirmed">✓ 2. Confirmed</option>
                            <option value="Processing">
                              🧵 3. Processing (Loom Audit)
                            </option>
                            <option value="Shipped">
                              🚚 4. Shipped (In Transit)
                            </option>
                            <option value="Delivered">🎉 5. Delivered</option>
                            <option value="Cancelled">❌ Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                const msg = generateStatusUpdateMessage(
                                  ord,
                                  ord.orderStatus,
                                  getOrderTrackingUrl(ord),
                                );
                                openWhatsAppShare(ord, undefined, true, msg);
                              }}
                              className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors shadow-xs"
                              title="Send WhatsApp update"
                            >
                              <MessageSquare size={13} />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            <button
                              onClick={() => setInvoiceOrder(ord)}
                              className="p-1.5 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors shadow-xs"
                              title="View Invoice"
                            >
                              <Printer size={13} />
                              <span className="hidden sm:inline">Receipt</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Inventory Health */}
        {currentTab === "inventory" && (
          <div className="space-y-6 w-full max-w-full overflow-x-hidden">
            <div className="bg-white border border-[#2C1B16]/10 rounded-sm p-4 sm:p-6 shadow-xs w-full max-w-full">
              <h3 className="font-serif text-lg font-semibold text-[#2C1B16] mb-2">
                Inventory SKU Stock Control
              </h3>
              <p className="text-xs text-[#2C1B16]/60 mb-6">
                Adjust stock levels and manage stock thresholds.
              </p>

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5]/60 text-[#2C1B16]/70 uppercase font-semibold text-[11px]">
                      <th className="p-3">Saree Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C1B16]/5">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FDF9F2]/50">
                        <td className="p-3 font-serif font-medium text-sm text-[#2C1B16]">
                          {prod.name}
                        </td>
                        <td className="p-3">{prod.category}</td>
                        <td className="p-3 tabular-nums font-medium">
                          ₹{prod.price.toLocaleString("en-IN")}
                        </td>
                        <td className="p-3 font-semibold tabular-nums">
                          {prod.stock}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              prod.stock === 0
                                ? "bg-red-100 text-red-800"
                                : prod.stock <= 5
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {prod.availability}
                          </span>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleRestock(prod.id, 5)}
                              className="px-2 py-1 bg-white border border-[#2C1B16]/20 rounded text-[11px] hover:bg-[#F8F1E5]"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => handleRestock(prod.id, 10)}
                              className="px-2 py-1 bg-[#5A1022] text-[#FFFDF8] rounded text-[11px] hover:bg-[#460b19]"
                            >
                              +10
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AdminProductForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {invoiceOrder && (
        <PrintInvoiceModal
          order={invoiceOrder}
          isOpen={Boolean(invoiceOrder)}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
