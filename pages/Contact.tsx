import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, Clock, Send, ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero / Header */}
      <div className="relative bg-black text-white py-24 lg:py-32 rounded-b-[3rem] overflow-hidden">
         {/* Background elements */}
         <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
         
         <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-6 drop-shadow-2xl">Client Services</h1>
            <p className="text-gray-300 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Experience our dedicated concierge service. Whether you have a question about sizing, availability, or shipping, our team is ready to assist you.
            </p>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-16 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: WhatsApp (Priority) */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
               <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-200/50 group-hover:scale-110 transition-transform">
                  <MessageCircle size={36} fill="white" className="text-white" />
               </div>
               <h3 className="font-heading font-black text-xl uppercase mb-2 tracking-tight">WhatsApp Concierge</h3>
               <p className="text-gray-500 text-sm mb-6 font-medium">Instant replies for sizing & orders.</p>
               <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-green-600 hover:border-green-600 transition-colors">
                  Chat Now
               </a>
            </div>

            {/* Card 2: Email */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
               <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-gray-200 group-hover:scale-110 transition-transform">
                  <Mail size={36} />
               </div>
               <h3 className="font-heading font-black text-xl uppercase mb-2 tracking-tight">Email Support</h3>
               <p className="text-gray-500 text-sm mb-6 font-medium">For collaborations & inquiries.</p>
               <a href="mailto:support@sdgsneakers.com" className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                  Send Email
               </a>
            </div>

            {/* Card 3: HQ */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
               <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-gold-200/50 group-hover:scale-110 transition-transform">
                  <MapPin size={36} />
               </div>
               <h3 className="font-heading font-black text-xl uppercase mb-2 tracking-tight">Visit HQ</h3>
               <p className="text-gray-500 text-sm mb-6 font-medium">Bandra West, Mumbai.</p>
               <button onClick={() => document.getElementById('map-section')?.scrollIntoView({behavior: 'smooth'})} className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                  View Map
               </button>
            </div>

         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
         <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Form Section */}
            <div className="lg:w-1/2">
               <h2 className="text-3xl font-heading font-black uppercase tracking-tight mb-2">Send a Message</h2>
               <p className="text-gray-500 mb-10 font-medium">We typically reply within 2 hours during business hours.</p>

               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Name</label>
                        <input type="text" className="w-full bg-[#F5F5F7] border-2 border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 font-bold transition-all outline-none text-sm placeholder-gray-400" placeholder="John Doe" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Phone</label>
                        <input type="tel" className="w-full bg-[#F5F5F7] border-2 border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 font-bold transition-all outline-none text-sm placeholder-gray-400" placeholder="+91..." />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email</label>
                     <input type="email" className="w-full bg-[#F5F5F7] border-2 border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 font-bold transition-all outline-none text-sm placeholder-gray-400" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Message</label>
                     <textarea rows={5} className="w-full bg-[#F5F5F7] border-2 border-transparent focus:bg-white focus:border-black rounded-2xl px-6 py-4 font-bold transition-all outline-none resize-none text-sm placeholder-gray-400" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gold-500 transition-all flex items-center gap-3 group shadow-lg text-sm">
                     Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </form>
            </div>

            {/* Map & Info Section */}
            <div className="lg:w-1/2" id="map-section">
               <div className="bg-[#F5F5F7] p-2 rounded-[2.5rem] h-full flex flex-col shadow-inner">
                  <div className="bg-white rounded-[2rem] overflow-hidden h-[400px] w-full mb-6 relative border border-gray-100 shadow-sm">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30164.55848773998!2d72.81846536968748!3d19.058359734139634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714574925066!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                        title="Location Map"
                     ></iframe>
                     
                     <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-lg pointer-events-none">
                        Bandra West, Mumbai
                     </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                     <h3 className="font-heading font-black text-xl mb-6">Headquarters</h3>
                     <div className="space-y-6 text-gray-600 font-medium text-sm">
                        <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-black transition-colors">
                           <MapPin className="shrink-0 mt-1 text-black" size={20} />
                           <p>SDG Sneakers, Waterfield Road,<br/> Bandra West, Mumbai, Maharashtra 400050</p>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-black transition-colors">
                           <Clock className="shrink-0 text-black" size={20} />
                           <p>Monday - Saturday: 11:00 AM - 9:00 PM</p>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-black transition-colors">
                           <Phone className="shrink-0 text-black" size={20} />
                           <p>+91 {WHATSAPP_NUMBER}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>

         {/* FAQ Section */}
         <div className="mt-32 pt-24 border-t border-gray-100">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-4">Common Questions</h2>
               <p className="text-gray-400 font-medium">Everything you need to know.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                   {q: "Is shipping free?", a: "Yes, we offer free express shipping on all orders across India. Orders are typically processed within 24 hours."},
                   {q: "What is the return policy?", a: "We have a 7-day return policy for size exchanges. The product must be unused and in original packaging."},
                   {q: "Are these 7A quality?", a: "Yes, we deal exclusively in 7A and 10A Master Copy quality. Indistinguishable from the original in comfort and weight."},
                   {q: "How do I track my order?", a: "Once dispatched, you will receive a tracking link via WhatsApp and Email. You can also contact our concierge for live updates."},
                ].map((item, i) => (
                   <div key={i} className="bg-[#F5F5F7] p-8 rounded-[2rem] hover:bg-black hover:text-white group transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-heading font-black text-lg uppercase tracking-wide group-hover:text-white transition-colors">{item.q}</h4>
                        <ChevronDown size={20} className="text-gray-400 group-hover:text-gold-500 transition-colors opacity-50" />
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{item.a}</p>
                   </div>
                ))}
             </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;