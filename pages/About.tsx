import React from 'react';
import { Shield, Target, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <div className="relative bg-black text-white py-32 lg:py-48 rounded-b-[3rem] overflow-hidden mb-24">
         <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center bg-fixed"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
         
         <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 animate-fade-in-up">
            <span className="block text-gold-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">Est. 2023</span>
            <h1 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
              Beyond <br/> The Hype.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed drop-shadow-md">
              We don't just sell replicas. We curate experiences. Bridging the gap between aspiration and reality with uncompromising quality.
            </p>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* 2. MANIFESTO / MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
           <div className="relative">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2212&auto=format&fit=crop" alt="Craftsmanship" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl hidden md:block max-w-xs border border-gray-100">
                 <p className="font-heading font-black text-4xl mb-2">100%</p>
                 <p className="text-gray-500 text-sm font-medium">Every pair undergoes a rigorous 3-point quality check before dispatch.</p>
              </div>
           </div>
           
           <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight mb-8">The Philosophy</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                <p>
                  Luxury shouldn't be a gatekept privilege. At <span className="text-black font-bold">SDG Sneakers</span>, we believe that style is a form of self-expression that belongs to everyone.
                </p>
                <p>
                  We started with a simple observation: the sneaker market is broken. Resale prices are artificially inflated, and accessibility is at an all-time low. We offer the solution — Master Copy (7A/10A) sneakers that are virtually indistinguishable from the originals, at a fraction of the cost.
                </p>
                <div className="flex flex-col gap-4 mt-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                   {[
                     "Sourced from Tier-1 Factories",
                     "Original Materials & Weight",
                     "Box, Laces & Accessories Included"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <CheckCircle2 className="text-gold-500 shrink-0" size={24} />
                        <span className="text-black font-bold">{item}</span>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* 3. VALUES GRID */}
        <div className="mb-32">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-4">Why Choose Us?</h2>
              <p className="text-gray-500 font-medium">We operate with the transparency of a boutique and the efficiency of an enterprise.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F5F5F7] p-10 rounded-[2.5rem] hover:bg-black hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl">
                 <Target size={40} className="mb-6 text-black group-hover:text-gold-500 transition-colors" />
                 <h3 className="text-xl font-heading font-black uppercase mb-4 tracking-wide">Precision</h3>
                 <p className="text-gray-500 group-hover:text-gray-300 font-medium leading-relaxed">
                    We obsess over details. Stitching, glue marks, color accuracy—nothing escapes our vetting process.
                 </p>
              </div>
              <div className="bg-[#F5F5F7] p-10 rounded-[2.5rem] hover:bg-black hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl">
                 <Shield size={40} className="mb-6 text-black group-hover:text-gold-500 transition-colors" />
                 <h3 className="text-xl font-heading font-black uppercase mb-4 tracking-wide">Integrity</h3>
                 <p className="text-gray-500 group-hover:text-gray-300 font-medium leading-relaxed">
                    What you see is what you get. We provide real photos and videos upon request before you buy.
                 </p>
              </div>
              <div className="bg-[#F5F5F7] p-10 rounded-[2.5rem] hover:bg-black hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl">
                 <Users size={40} className="mb-6 text-black group-hover:text-gold-500 transition-colors" />
                 <h3 className="text-xl font-heading font-black uppercase mb-4 tracking-wide">Community</h3>
                 <p className="text-gray-500 group-hover:text-gray-300 font-medium leading-relaxed">
                    Join thousands of satisfied sneakerheads across India. We are building a culture, not just a store.
                 </p>
              </div>
           </div>
        </div>

        {/* 4. FOUNDER NOTE / BOTTOM CTA */}
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
           
           <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-8">Ready to Upgrade?</h2>
              <p className="text-gray-400 text-lg mb-10 font-medium">Explore the vault and find your next grail.</p>
              <Link to="/shop" className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-xl hover:scale-105">
                 Shop Now <ArrowRight size={20} />
              </Link>
           </div>
        </div>
        
        <div className="h-24"></div> 
      </div>
    </div>
  );
};

export default About;