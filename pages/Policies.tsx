import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PolicySection = ({ id, title, children }: { id: string, title: string, children?: React.ReactNode }) => (
  <div id={id} className="scroll-mt-32 mb-16 border-b border-gray-100 pb-12 last:border-0">
    <h2 className="text-2xl font-heading font-black uppercase tracking-tight mb-6">{title}</h2>
    <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const Policies: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const section = query.get('section');

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
        window.scrollTo(0,0);
    }
  }, [section]);

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4">Legal & Support</h1>
            <p className="text-gray-500">Transparent policies for a premium experience.</p>
        </div>

        <PolicySection id="privacy" title="1. Privacy Policy">
           <p><strong>Last Updated: January 2025</strong></p>
           <p>At SDG Sneakers, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.</p>
           <h4 className="font-bold text-black mt-4">Data Collection</h4>
           <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your Name, Phone Number, Email Address, and Shipping Address.</p>
           <h4 className="font-bold text-black mt-4">Payment Information</h4>
           <p>We do not store your credit card details. All payments are processed through secure third-party gateways (UPI/Razorpay/Stripe).</p>
           <h4 className="font-bold text-black mt-4">Third-Party Services</h4>
           <p>We may share your data with trusted partners solely for the purpose of order fulfillment (e.g., Delivery Partners like BlueDart/Delhivery).</p>
        </PolicySection>

        <PolicySection id="terms" title="2. Terms & Conditions">
           <p>Welcome to SDG Sneakers. By accessing our site, you agree to these terms.</p>
           <ul className="list-disc pl-5 space-y-2">
              <li><strong>Usage:</strong> You must be at least 18 years old or have parental consent to use this site.</li>
              <li><strong>Product Info:</strong> While we aim for accuracy, product images are for representation. Minor color variations may occur due to screen settings.</li>
              <li><strong>Pricing:</strong> Prices are subject to change without notice. We reserve the right to cancel orders due to pricing errors.</li>
              <li><strong>Governing Law:</strong> These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of courts in Mumbai.</li>
           </ul>
        </PolicySection>

        <PolicySection id="returns" title="3. Return & Refund Policy">
           <p>We want you to love your purchase. If you don't, here's how we can help.</p>
           <h4 className="font-bold text-black mt-4">Return Window</h4>
           <p>You may request a return or exchange within <strong>7 days</strong> of delivery.</p>
           <h4 className="font-bold text-black mt-4">Conditions</h4>
           <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unused, unwashed, and in original packaging with all tags intact.</li>
              <li>Footwear must be tried on clean surfaces only.</li>
           </ul>
           <h4 className="font-bold text-black mt-4">Refund Process</h4>
           <p>Once we receive and inspect your return (typically within 48 hours of pickup), refunds will be initiated to your original payment method or as Store Credit within 5-7 business days.</p>
        </PolicySection>

        <PolicySection id="shipping" title="4. Shipping & Delivery">
           <p>We offer <strong>Free Express Shipping</strong> on all prepaid orders across India.</p>
           <ul className="list-disc pl-5 space-y-2">
              <li><strong>Timeline:</strong> Orders are dispatched within 24 hours. Delivery typically takes 3-7 business days depending on your location.</li>
              <li><strong>Carriers:</strong> We use premium partners like BlueDart, Delhivery, and DTDC.</li>
              <li><strong>Delays:</strong> Delivery times may be affected during public holidays, festivals, or extreme weather conditions.</li>
           </ul>
        </PolicySection>

        <PolicySection id="cancellation" title="5. Cancellation Policy">
           <p>You can cancel your order before it has been dispatched from our warehouse.</p>
           <p>Once shipped, an order cannot be cancelled. However, you may choose to return it after delivery according to our Return Policy.</p>
           <p>To cancel, please contact our WhatsApp Concierge immediately with your Order ID.</p>
        </PolicySection>

        <PolicySection id="payment" title="6. Payment Policy">
            <p>We accept the following payment methods:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
                <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                <li>Net Banking</li>
                <li>Cash on Delivery (COD) - Available for select pin codes with a nominal fee of ₹99.</li>
            </ul>
        </PolicySection>

        <PolicySection id="disclaimer" title="7. Disclaimer">
            <p>SDG Sneakers sells high-quality "Master Copy" (7A/10A) replicas. While we strive for 1:1 precision, these are not products manufactured by the original brand owners (e.g., Nike, Adidas). We are not affiliated with these brands.</p>
            <p>We guarantee the quality of materials and craftsmanship as described on our product pages.</p>
        </PolicySection>

        <PolicySection id="grievance" title="8. Grievance Redressal">
            <p>In accordance with the Consumer Protection (E-Commerce) Rules, 2020, the contact details of the Grievance Officer are provided below:</p>
            <div className="bg-gray-50 p-6 rounded-xl mt-4">
                <p><strong>Name:</strong> Goluguri Sasi</p>
                <p><strong>Designation:</strong> Grievance Officer</p>
                <p><strong>Email:</strong> grievance@sdgsneakers.com</p>
                <p><strong>Address:</strong> SDG Sneakers, Waterfield Road, Bandra West, Mumbai, Maharashtra 400050</p>
                <p><strong>Phone:</strong> +91 9963163777 (Mon-Fri, 10 AM - 6 PM)</p>
            </div>
        </PolicySection>

        <PolicySection id="faq" title="9. Frequently Asked Questions">
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-black">Q: Are the shoes authentic?</p>
                    <p>A: We sell premium Master Copy replicas (7A/10A quality), which are nearly indistinguishable from the originals in terms of material and comfort, but they are not original brand manufactured.</p>
                </div>
                <div>
                    <p className="font-bold text-black">Q: How do I choose the right size?</p>
                    <p>A: We recommend ordering your standard UK/India size. If you are unsure, please refer to our Size Guide or contact us via WhatsApp.</p>
                </div>
                <div>
                    <p className="font-bold text-black">Q: Do you ship internationally?</p>
                    <p>A: Currently, we only ship within India.</p>
                </div>
            </div>
        </PolicySection>

      </div>
    </div>
  );
};

export default Policies;