// import React, { useRef, useState } from "react";
// import { Order } from "../../server/types.js";
// import {
//   X,
//   Printer,
//   Copy,
//   Check,
//   MessageSquare,
//   Download,
//   FileText,
//   Image as ImageIcon,
//   Loader2,
//   Sparkles,
//   ExternalLink,
//   Share2,
//   CheckCircle2,
//   ClipboardCopy,
// } from "lucide-react";
// import {
//   openWhatsAppShare,
//   generateWhatsAppMessage,
//   downloadReceiptPdf,
//   downloadReceiptImage,
//   shareReceiptDirectly,
//   printReceiptViaIframe,
//   copyCanvasToClipboard,
//   captureReceiptCanvas,
// } from "../services/receipt.js";

// interface PrintInvoiceModalProps {
//   order: Order;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({
//   order,
//   isOpen,
//   onClose,
// }) => {
//   const [copied, setCopied] = useState(false);
//   const [copiedImage, setCopiedImage] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<{
//     text: string;
//     subText?: string;
//     type: "success" | "info" | "error";
//   } | null>(null);

//   const invoiceDomRef = useRef<HTMLDivElement>(null);

//   if (!isOpen) return null;

//   // 1. Direct Hidden Iframe Print (Fixes "print recipt not working")
//   const handlePrint = () => {
//     setStatusMessage({
//       text: "Opening Print dialog...",
//       type: "info",
//     });
//     const success = printReceiptViaIframe(order);
//     if (success) {
//       setTimeout(() => setStatusMessage(null), 2500);
//     } else {
//       setStatusMessage({
//         text: "Print triggered via system fallback.",
//         type: "info",
//       });
//     }
//   };

//   // 2. Download Official PDF Document
//   const handleDownloadPdf = async () => {
//     if (!invoiceDomRef.current) return;
//     setIsProcessing(true);
//     setStatusMessage({
//       text: "Generating High-Resolution PDF Receipt...",
//       type: "info",
//     });
//     try {
//       const res = await downloadReceiptPdf(order, invoiceDomRef.current);
//       setStatusMessage({
//         text: `PDF Downloaded: ${res.filename}`,
//         subText: "Official document saved to your Downloads folder.",
//         type: "success",
//       });
//       setTimeout(() => setStatusMessage(null), 4500);
//     } catch (e: any) {
//       console.error(e);
//       setStatusMessage({
//         text: "Could not generate PDF. Opening print dialog...",
//         type: "error",
//       });
//       handlePrint();
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 3. Download Image (JPG or PNG)
//   const handleDownloadImage = async (format: "png" | "jpeg") => {
//     if (!invoiceDomRef.current) return;
//     setIsProcessing(true);
//     setStatusMessage({
//       text: `Rendering High-Resolution ${format.toUpperCase()} image...`,
//       type: "info",
//     });
//     try {
//       const res = await downloadReceiptImage(
//         order,
//         invoiceDomRef.current,
//         format,
//       );
//       setStatusMessage({
//         text: `${format.toUpperCase()} Receipt Image Saved!`,
//         subText: `${res.filename} saved to your device.`,
//         type: "success",
//       });
//       setTimeout(() => setStatusMessage(null), 4500);
//     } catch (e: any) {
//       console.error(e);
//       setStatusMessage({
//         text: "Error exporting receipt image.",
//         type: "error",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 4. Copy Image directly to Clipboard for instant Ctrl+V into WhatsApp Web
//   const handleCopyImageToClipboard = async () => {
//     if (!invoiceDomRef.current) return;
//     setIsProcessing(true);
//     try {
//       const canvas = await captureReceiptCanvas(invoiceDomRef.current);
//       const copied = await copyCanvasToClipboard(canvas);
//       if (copied) {
//         setCopiedImage(true);
//         setStatusMessage({
//           text: "Receipt Image Copied to Clipboard!",
//           subText:
//             "Now open any chat or WhatsApp Web and press Ctrl+V to paste the image directly!",
//           type: "success",
//         });
//         setTimeout(() => setCopiedImage(false), 3000);
//       } else {
//         setStatusMessage({
//           text: "Clipboard copy not permitted. Downloading image instead...",
//           type: "info",
//         });
//         await handleDownloadImage("jpeg");
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 5. Share directly to WhatsApp as File (JPG, PNG, or PDF)
//   const handleShareToWhatsAppAsFile = async (
//     format: "jpeg" | "png" | "pdf" = "jpeg",
//   ) => {
//     if (!invoiceDomRef.current) return;
//     setIsProcessing(true);
//     setStatusMessage({
//       text: `Preparing ${format.toUpperCase()} receipt for WhatsApp...`,
//       type: "info",
//     });

//     try {
//       const result = await shareReceiptDirectly(
//         order,
//         invoiceDomRef.current,
//         format,
//       );

//       if (result.sharedViaNative) {
//         setStatusMessage({
//           text: "Receipt file shared via native share!",
//           subText: "Direct document attached in WhatsApp.",
//           type: "success",
//         });
//       } else {
//         // Desktop / Web WhatsApp fallback
//         setStatusMessage({
//           text: `✅ ${format.toUpperCase()} receipt downloaded & copied to clipboard!`,
//           subText:
//             "WhatsApp is opened. Press Ctrl+V in the chat or attach the downloaded file!",
//           type: "success",
//         });
//       }
//       setTimeout(() => setStatusMessage(null), 6000);
//     } catch (err: any) {
//       console.error(err);
//       openWhatsAppShare(order);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 6. Copy plain formatted text
//   const handleCopyText = () => {
//     const text = generateWhatsAppMessage(order);
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setStatusMessage({
//       text: "Order summary text copied to clipboard!",
//       type: "success",
//     });
//     setTimeout(() => {
//       setCopied(false);
//       setStatusMessage(null);
//     }, 2500);
//   };

//   const dateStr = new Date(order.createdAt).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
//       <div className="bg-[#FFFDF8] border-2 border-[#C9A227] rounded-sm shadow-2xl w-full max-w-3xl my-6 overflow-hidden flex flex-col max-h-[94vh]">
//         {/* Header Bar */}
//         <div className="p-3.5 sm:p-4 border-b border-[#2C1B16]/10 flex items-center justify-between bg-[#FDF9F2] print:hidden shrink-0">
//           <div className="flex items-center gap-2">
//             <span className="font-serif text-lg font-bold text-[#5A1022]">
//               Tax Invoice & Authenticity Certificate
//             </span>
//             <span className="font-mono text-xs bg-[#5A1022]/10 text-[#5A1022] px-2 py-0.5 rounded font-semibold">
//               #{order.orderNumber || order.id}
//             </span>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-1.5 text-[#2C1B16]/50 hover:text-[#2C1B16] rounded-full hover:bg-black/5 transition-colors"
//             aria-label="Close modal"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Action Toolbar: Multiple direct formats for WhatsApp & Print */}
//         <div className="bg-[#F8F1E5] px-4 py-3 border-b border-[#2C1B16]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs print:hidden shrink-0">
//           <div className="flex items-center gap-1.5 text-[#5A1022] font-semibold text-[11px] uppercase tracking-wider">
//             <Sparkles size={14} className="text-[#C9A227]" />
//             <span>Share & Export Directly:</span>
//           </div>

//           <div className="flex flex-wrap items-center gap-1.5">
//             {/* Share JPG Image on WhatsApp */}
//             <button
//               onClick={() => handleShareToWhatsAppAsFile("jpeg")}
//               disabled={isProcessing}
//               className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
//               title="Share as JPG image file directly to customer on WhatsApp"
//             >
//               <MessageSquare size={13} />
//               <span>Share JPG on WhatsApp</span>
//             </button>

//             {/* Share PDF on WhatsApp */}
//             <button
//               onClick={() => handleShareToWhatsAppAsFile("pdf")}
//               disabled={isProcessing}
//               className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
//               title="Share as PDF document on WhatsApp"
//             >
//               <FileText size={13} />
//               <span>Share PDF</span>
//             </button>

//             {/* Download PDF */}
//             <button
//               onClick={handleDownloadPdf}
//               disabled={isProcessing}
//               className="px-2.5 py-1.5 bg-[#5A1022] hover:bg-[#460b19] disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
//               title="Download official PDF receipt file"
//             >
//               <Download size={13} />
//               <span>PDF</span>
//             </button>

//             {/* Download Image (JPG) */}
//             <button
//               onClick={() => handleDownloadImage("jpeg")}
//               disabled={isProcessing}
//               className="px-2.5 py-1.5 bg-white border border-[#2C1B16]/20 hover:bg-[#FDF9F2] text-[#2C1B16] rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
//               title="Download high-resolution JPG image file"
//             >
//               <ImageIcon size={13} />
//               <span>JPG</span>
//             </button>

//             {/* Copy Image to Clipboard */}
//             <button
//               onClick={handleCopyImageToClipboard}
//               disabled={isProcessing}
//               className="px-2.5 py-1.5 bg-white border border-[#2C1B16]/20 hover:bg-[#FDF9F2] text-[#2C1B16] rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
//               title="Copy receipt image to clipboard to paste directly in WhatsApp (Ctrl+V)"
//             >
//               {copiedImage ? (
//                 <Check size={13} className="text-emerald-700" />
//               ) : (
//                 <ClipboardCopy size={13} />
//               )}
//               <span>{copiedImage ? "Copied!" : "Copy Image"}</span>
//             </button>

//             {/* Print Receipt */}
//             <button
//               onClick={handlePrint}
//               disabled={isProcessing}
//               className="px-3 py-1.5 bg-[#2C1B16] hover:bg-[#1a0f0d] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
//               title="Print receipt directly via print dialog"
//             >
//               <Printer size={13} />
//               <span>Print Receipt</span>
//             </button>
//           </div>
//         </div>

//         {/* Live Status Toast Banner */}
//         {statusMessage && (
//           <div
//             className={`px-4 py-2.5 text-xs flex items-center justify-between border-b transition-all print:hidden ${
//               statusMessage.type === "success"
//                 ? "bg-emerald-50 text-emerald-950 border-emerald-300"
//                 : statusMessage.type === "error"
//                   ? "bg-red-50 text-red-950 border-red-300"
//                   : "bg-[#5A1022] text-[#FFFDF8] border-[#5A1022]"
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               {isProcessing ? (
//                 <Loader2
//                   size={14}
//                   className="animate-spin shrink-0 text-[#C9A227]"
//                 />
//               ) : statusMessage.type === "success" ? (
//                 <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
//               ) : null}
//               <div>
//                 <p className="font-semibold">{statusMessage.text}</p>
//                 {statusMessage.subText && (
//                   <p className="text-[11px] opacity-90">
//                     {statusMessage.subText}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <button
//               onClick={() => setStatusMessage(null)}
//               className="p-1 opacity-70 hover:opacity-100"
//             >
//               <X size={14} />
//             </button>
//           </div>
//         )}

//         {/* Printable/Capturable Invoice Container */}
//         <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F0]/50">
//           <div
//             id="printable-receipt"
//             ref={invoiceDomRef}
//             className="p-6 sm:p-8 bg-[#FFFDF8] border border-[#C9A227]/50 rounded-sm space-y-6 text-xs text-[#2C1B16] shadow-md max-w-2xl mx-auto"
//           >
//             {/* Brand Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start pb-5 border-b-2 border-[#5A1022] gap-4">
//               <div>
//                 <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5A1022]">
//                   Virasat Silk & Sarees
//                 </h2>
//                 <p className="text-[10px] text-[#2C1B16]/60 uppercase tracking-widest mt-0.5">
//                   Certified Handloom & Silk Mark Organization of India
//                 </p>
//                 <p className="text-[11px] text-[#2C1B16]/75 mt-1.5 leading-relaxed">
//                   Showroom No. 12, Mahadwar Road, Rajarampuri, Kolhapur,
//                   Maharashtra 416012
//                   <br />
//                   GSTIN: 27AABCV8912P1Z4 | Contact: +91 93569 51406
//                 </p>
//               </div>

//               <div className="text-left sm:text-right">
//                 <span className="font-serif text-lg font-bold text-[#2C1B16] uppercase block">
//                   Official Tax Invoice
//                 </span>
//                 <p className="font-mono text-xs font-semibold text-[#5A1022] mt-0.5">
//                   #{order.orderNumber || order.id}
//                 </p>
//                 <p className="text-[11px] text-[#2C1B16]/60 mt-0.5">
//                   Date: {dateStr}
//                 </p>
//                 <div className="mt-2">
//                   <span
//                     className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
//                       order.orderStatus === "Delivered"
//                         ? "bg-emerald-800 text-white"
//                         : order.orderStatus === "Shipped"
//                           ? "bg-blue-800 text-white"
//                           : order.orderStatus === "Processing"
//                             ? "bg-amber-800 text-white"
//                             : "bg-[#5A1022] text-[#FFFDF8]"
//                     }`}
//                   >
//                     STATUS: {order.orderStatus}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Customer & Payment Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-[#2C1B16]/10 text-xs">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A1022] mb-1">
//                   Billed & Delivered To:
//                 </p>
//                 <p className="font-bold text-sm text-[#2C1B16]">
//                   {order.shippingAddress.fullName}
//                 </p>
//                 <p className="text-[#2C1B16]/80 mt-0.5">
//                   {order.shippingAddress.addressLine1}
//                 </p>
//                 {order.shippingAddress.addressLine2 && (
//                   <p className="text-[#2C1B16]/80">
//                     {order.shippingAddress.addressLine2}
//                   </p>
//                 )}
//                 <p className="text-[#2C1B16]/80">
//                   {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
//                   {order.shippingAddress.pincode}
//                 </p>
//                 <p className="text-[#2C1B16]/80 mt-1">
//                   Customer Mobile:{" "}
//                   <strong>{order.shippingAddress.phone}</strong>
//                 </p>
//                 <p className="text-[#2C1B16]/80">
//                   Email: {order.shippingAddress.email}
//                 </p>
//               </div>

//               <div className="sm:text-right space-y-1">
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A1022] mb-1">
//                   Payment & Dispatch Details:
//                 </p>
//                 <p>
//                   Payment Method:{" "}
//                   <strong>{order.paymentMethod.toUpperCase()}</strong>
//                 </p>
//                 <p>
//                   Payment Status:{" "}
//                   <strong
//                     className={
//                       order.paymentStatus === "paid"
//                         ? "text-emerald-800"
//                         : "text-amber-800"
//                     }
//                   >
//                     {order.paymentStatus.toUpperCase()}
//                   </strong>
//                 </p>
//                 {order.razorpayPaymentId && (
//                   <p className="font-mono text-[11px] text-[#2C1B16]/70">
//                     Razorpay ID: {order.razorpayPaymentId}
//                   </p>
//                 )}
//                 {order.razorpayOrderId && (
//                   <p className="font-mono text-[11px] text-[#2C1B16]/70">
//                     Order ID: {order.razorpayOrderId}
//                   </p>
//                 )}
//                 <p className="text-[#2C1B16]/60">
//                   Transit: Insured Courier (Complimentary)
//                 </p>
//               </div>
//             </div>

//             {/* Items Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse text-xs">
//                 <thead>
//                   <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5] text-[#5A1022] uppercase font-semibold text-[11px]">
//                     <th className="py-2.5 px-3">Saree & Weave</th>
//                     <th className="py-2.5 px-3 text-center">Qty</th>
//                     <th className="py-2.5 px-3 text-right">Rate</th>
//                     <th className="py-2.5 px-3 text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#2C1B16]/10">
//                   {order.items.map((item, idx) => (
//                     <tr key={idx}>
//                       <td className="py-2.5 px-3">
//                         <div className="font-serif font-medium text-[#2C1B16] text-sm">
//                           {item.name}
//                         </div>
//                         <div className="text-[10px] text-[#2C1B16]/60">
//                           Selected Shade: {item.selectedColor || "Standard"}
//                         </div>
//                       </td>
//                       <td className="py-2.5 px-3 text-center font-semibold">
//                         {item.quantity}
//                       </td>
//                       <td className="py-2.5 px-3 text-right tabular-nums">
//                         ₹{item.price.toLocaleString("en-IN")}
//                       </td>
//                       <td className="py-2.5 px-3 text-right font-semibold tabular-nums">
//                         ₹{(item.price * item.quantity).toLocaleString("en-IN")}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals */}
//             <div className="pt-4 border-t border-[#2C1B16]/10 flex flex-col items-end text-xs space-y-1">
//               <div className="w-64 flex justify-between">
//                 <span>Bag Subtotal:</span>
//                 <span className="font-medium">
//                   ₹{order.subtotal.toLocaleString("en-IN")}
//                 </span>
//               </div>
//               {order.discount > 0 && (
//                 <div className="w-64 flex justify-between text-emerald-800">
//                   <span>Promotional Discount:</span>
//                   <span>-₹{order.discount.toLocaleString("en-IN")}</span>
//                 </div>
//               )}
//               <div className="w-64 flex justify-between">
//                 <span>Insured Handloom Transit:</span>
//                 <span className="text-emerald-800 font-semibold">FREE</span>
//               </div>
//               <div className="w-64 flex justify-between text-[#2C1B16]/60">
//                 <span>GST 5% Included:</span>
//                 <span>
//                   ₹{Math.round(order.total * 0.05).toLocaleString("en-IN")}
//                 </span>
//               </div>
//               <div className="w-64 flex justify-between pt-2 border-t-2 border-[#5A1022] font-serif text-base font-bold text-[#5A1022]">
//                 <span>Total Paid:</span>
//                 <span>₹{order.total.toLocaleString("en-IN")}</span>
//               </div>
//             </div>

//             {/* Silk Mark Promise */}
//             <div className="p-3 bg-[#FDF9F2] border border-[#C9A227]/30 rounded text-[11px] text-[#2C1B16]/75">
//               <p className="font-semibold text-[#5A1022] mb-0.5">
//                 Silk Mark Authenticity Promise:
//               </p>
//               <p>
//                 This saree is hand-inspected for 100% pure silk fiber and tested
//                 gold zari. Dry clean only. Preserve wrapped in breathable pure
//                 cotton muslin.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Toolbar */}
//         <div className="p-3 sm:p-4 bg-[#FDF9F2] border-t border-[#2C1B16]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden shrink-0">
//           <button
//             onClick={handleCopyText}
//             className="text-xs text-[#2C1B16]/70 hover:text-[#5A1022] flex items-center gap-1 font-medium"
//           >
//             {copied ? (
//               <Check size={14} className="text-emerald-700" />
//             ) : (
//               <Copy size={14} />
//             )}
//             <span>{copied ? "Copied Summary!" : "Copy Summary Text"}</span>
//           </button>

//           <div className="flex flex-wrap items-center gap-2">
//             <button
//               onClick={() => handleShareToWhatsAppAsFile("jpeg")}
//               disabled={isProcessing}
//               className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
//             >
//               <MessageSquare size={14} />
//               <span>Share JPG on WhatsApp</span>
//             </button>

//             <button
//               onClick={handleDownloadPdf}
//               disabled={isProcessing}
//               className="px-4 py-2 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
//             >
//               <Download size={14} />
//               <span>Download PDF</span>
//             </button>

//             <button
//               onClick={handlePrint}
//               disabled={isProcessing}
//               className="px-4 py-2 bg-[#2C1B16] hover:bg-[#1a0f0d] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
//             >
//               <Printer size={14} />
//               <span>Print</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { Order } from "../../server/types.js";
import { X, Printer, FileText, CheckCircle } from "lucide-react";
import {
  generateInstantPdf,
  printReceiptViaIframe,
} from "../services/receipt.js";

interface PrintInvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [guideMessage, setGuideMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const openWhatsAppUrl = () => {
    let phone = (order.shippingAddress.phone || "").replace(/[^0-9]/g, "");
    if (phone.length === 10) phone = "91" + phone;
    const url = phone
      ? `https://api.whatsapp.com/send?phone=${phone}`
      : `https://api.whatsapp.com/send`;
    window.open(url, "_blank");
  };

  // Share PDF on WhatsApp (Instant)
  const handleSharePdf = async () => {
    const file = generateInstantPdf(order);

    // On mobile devices, native share sheet opens with the PDF attached directly
    if (
      typeof navigator !== "undefined" &&
      "canShare" in navigator &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: `Invoice #${order.orderNumber || order.id}`,
        });
        return;
      } catch (e) {}
    }

    // On desktop: Opens WhatsApp directly and downloads the PDF
    openWhatsAppUrl();
    setGuideMessage(
      "PDF invoice downloaded! In WhatsApp, click the 📎 attachment icon and select the downloaded PDF to send.",
    );
  };

  const dateStr = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#FFFDF8] border-2 border-[#C9A227] rounded-sm shadow-2xl w-full max-w-3xl my-6 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#2C1B16]/10 flex items-center justify-between bg-[#FDF9F2] print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#5A1022]">
              Tax Invoice & Authenticity Certificate
            </span>
            <span className="font-mono text-xs bg-[#5A1022]/10 text-[#5A1022] px-2 py-0.5 rounded font-semibold">
              #{order.orderNumber || order.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#2C1B16]/50 hover:text-[#2C1B16] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Helpful guide message */}
        {guideMessage && (
          <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 print:hidden shrink-0 animate-in fade-in">
            <CheckCircle
              size={16}
              className="text-emerald-700 shrink-0 mt-0.5"
            />
            <div className="flex-1 font-medium leading-relaxed">
              {guideMessage}
            </div>
          </div>
        )}

        {/* Invoice Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FFFDF8]">
          <div className="bg-[#FFFDF8] border border-[#C9A227]/40 p-5 sm:p-8 space-y-6 text-[#2C1B16] max-w-2xl mx-auto shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 border-b-2 border-[#5A1022]">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#5A1022] leading-none">
                  Virasat Silk & Sarees
                </h1>
                <p className="text-[10px] text-[#C9A227] font-semibold uppercase tracking-widest mt-1">
                  Certified Handloom & Silk Mark Organization of India
                </p>
                <p className="text-[11px] text-[#2C1B16]/70 mt-2 leading-relaxed">
                  Showroom No. 12, Mahadwar Road, Rajarampuri, Kolhapur 416012
                  <br />
                  GSTIN: 27AABCV8912P1Z4 | Contact: +91 93569 51406
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A1022] bg-[#F8F1E5] px-2.5 py-1 rounded">
                  Official Tax Invoice
                </span>
                <p className="font-mono text-xs font-bold text-[#2C1B16] mt-2">
                  #{order.orderNumber || order.id}
                </p>
                <p className="text-[11px] text-[#2C1B16]/70">{dateStr}</p>
                <div className="mt-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#5A1022] text-[#FFFDF8]">
                    STATUS: {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-[#2C1B16]/10 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A1022] mb-1">
                  Billed & Delivered To:
                </p>
                <p className="font-bold text-sm text-[#2C1B16]">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-[#2C1B16]/80">
                  {order.shippingAddress.addressLine1}
                </p>
                <p className="text-[#2C1B16]/80">
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p className="text-[#2C1B16]/80 mt-1">
                  Customer Mobile:{" "}
                  <strong>{order.shippingAddress.phone}</strong>
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A1022] mb-1">
                  Payment Details:
                </p>
                <p>
                  Payment Method:{" "}
                  <strong>{order.paymentMethod.toUpperCase()}</strong>
                </p>
                <p>
                  Payment Status:{" "}
                  <strong>{order.paymentStatus.toUpperCase()}</strong>
                </p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#2C1B16]/10 bg-[#F8F1E5] text-[#5A1022] uppercase font-semibold text-[11px]">
                  <th className="py-2.5 px-3">Saree & Weave</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C1B16]/10">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3">
                      <div className="font-serif font-medium text-[#2C1B16]">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#2C1B16]/60">
                        Shade: {item.selectedColor || "Standard"}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="pt-4 border-t-2 border-[#5A1022] flex justify-between font-serif text-base font-bold text-[#5A1022]">
              <span>Total Paid:</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* 
          CLEAN TOOLBAR: ONLY 2 BUTTONS
          1. Share PDF on WhatsApp
          2. Print
        */}
        <div className="p-4 bg-[#FDF9F2] border-t border-[#2C1B16]/10 flex flex-wrap items-center justify-end gap-3 print:hidden shrink-0">
          {/* Button 1: Share PDF on WhatsApp */}
          <button
            onClick={handleSharePdf}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            title="Download PDF and open WhatsApp"
          >
            <FileText size={16} />
            <span>Share PDF on WhatsApp</span>
          </button>

          {/* Button 2: Print */}
          <button
            onClick={() => printReceiptViaIframe(order)}
            className="px-5 py-2.5 bg-[#5A1022] hover:bg-[#460b19] text-white rounded text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            title="Print Tax Invoice"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
