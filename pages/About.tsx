import React from 'react';
import { Shield, Target, Users, ArrowRight, CheckCircle2, Search, Box, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. CINEMATIC HERO */}
      <div className="relative h-screen w-full overflow-hidden">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
               alt="Sneaker Workshop" 
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
         </div>
         
         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-[1200px] mx-auto pt-20">
            <p className="text-gold-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm mb-6 animate-fade-in-up">The SDG Standard</p>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-white uppercase tracking-tighter mb-8 leading-[0.85] animate-fade-in-up" style={{animationDelay: '100ms'}}>
               Luxury <br/> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Democratized.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
               We exist to disrupt the hype economy. Delivering master-quality sneakers that mirror the original in every stitch, weight, and feel.
            </p>
         </div>
         
         {/* Scroll Indicator */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow text-white/50">
            <span className="text-[10px] uppercase tracking-widest">Discover</span>
            <div className="w-[1px] h-12 bg-white/30"></div>
         </div>
      </div>

      {/* 2. THE MANIFESTO */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white">
         <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-10 leading-none">
                     Not a Replica. <br/> A <span className="text-gold-500">Masterpiece.</span>
                  </h2>
                  <div className="space-y-8 text-lg font-medium text-gray-600 leading-relaxed">
                     <p>
                        The sneaker market is broken. Artificially limited supply and bot-driven resale prices have turned a culture of expression into a playground for the wealthy.
                     </p>
                     <p>
                        <span className="text-black font-bold">SDG Sneakers</span> was born from a simple idea: What if you could get 99% of the quality for 10% of the price? We don't deal in cheap knock-offs. We curate "Master Copy" (7A/10A) sneakers sourced from the same production hubs as the giants.
                     </p>
                     <div className="flex flex-col gap-4 border-l-2 border-black pl-8 mt-8">
                        <blockquote className="text-2xl font-heading font-bold text-black italic">
                           "Style shouldn't be gatekept by a price tag."
                        </blockquote>
                        <cite className="text-sm font-bold uppercase tracking-widest text-gray-400 not-italic">— Founder, SDG</cite>
                     </div>
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=2021&auto=format&fit=crop" 
                        alt="Detailed Shot" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                     />
                  </div>
                  <div className="absolute bottom-8 -left-8 bg-black text-white p-8 rounded-tr-[2rem] rounded-bl-[2rem] max-w-xs shadow-2xl hidden lg:block">
                     <p className="font-heading font-black text-3xl mb-1">98.5%</p>
                     <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Material Match Accuracy</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. THE PROCESS (Dark Mode) */}
      <section className="py-24 lg:py-32 bg-black text-white rounded-[3rem] mx-4 lg:mx-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-20">
               <span className="text-gold-500 font-bold uppercase tracking-[0.2em] text-xs">Behind The Scenes</span>
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mt-4">The Quality Protocol</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Step 1 */}
               <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <Search size={32} className="text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold uppercase mb-4">1. Sourcing</h3>
                  <p className="text-gray-400 leading-relaxed">
                     We partner directly with Tier-1 factories. We select batches that use the original moulds (lasts) and primeknit/leather materials.
                  </p>
               </div>
               
               {/* Step 2 */}
               <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <Target size={32} className="text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold uppercase mb-4">2. Vetting</h3>
                  <p className="text-gray-400 leading-relaxed">
                     Every pair hits our warehouse in Mumbai for a 3-point inspection: Weight check, UV light test for glue marks, and Stitching consistency.
                  </p>
               </div>

               {/* Step 3 */}
               <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                     <Box size={32} className="text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold uppercase mb-4">3. Delivery</h3>
                  <p className="text-gray-400 leading-relaxed">
                     Packaged in the original box with all accessories (laces, tags). Double-boxed for protection. Delivered to your door via BlueDart.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. STATS & VALUES */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
         <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
               <div>
                  <h2 className="text-4xl font-heading font-black uppercase tracking-tight mb-8">Why 10,000+ Indians Trust Us</h2>
                  <div className="space-y-6">
                     {[
                        { title: "No Bait & Switch", desc: "We post real photos. What you see on our Instagram/Site is exactly what arrives." },
                        { title: "Exchange Friendly", desc: "Size didn't fit? We offer a hassle-free 7-day exchange policy." },
                        { title: "Privacy First", desc: "Discreet packaging and secure data handling. Your drip is your business." }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <CheckCircle2 className="text-black shrink-0 mt-1" size={24} />
                           <div>
                              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F6F6F6] rounded-[2rem] p-8 flex flex-col justify-center text-center hover:bg-black hover:text-white transition-colors duration-500">
                     <span className="text-4xl lg:text-5xl font-heading font-black mb-2">3+</span>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-60">Years Active</span>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-[2rem] p-8 flex flex-col justify-center text-center hover:bg-black hover:text-white transition-colors duration-500">
                     <span className="text-4xl lg:text-5xl font-heading font-black mb-2">10k+</span>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-60">Orders Shipped</span>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-[2rem] p-8 flex flex-col justify-center text-center hover:bg-black hover:text-white transition-colors duration-500">
                     <span className="text-4xl lg:text-5xl font-heading font-black mb-2">50+</span>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-60">Cities Covered</span>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-[2rem] p-8 flex flex-col justify-center text-center hover:bg-black hover:text-white transition-colors duration-500">
                     <span className="text-4xl lg:text-5xl font-heading font-black mb-2">4.8</span>
                     <span className="text-xs font-bold uppercase tracking-widest opacity-60">Avg Rating</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. BIG CTA */}
      <section className="pb-12 px-4">
         <div className="bg-black rounded-[3rem] py-32 text-center relative overflow-hidden">
             {/* Abstract Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
             <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
             
             <div className="relative z-10 max-w-2xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter mb-8">
                   Find Your <br/> Grail.
                </h2>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-gold-500 hover:scale-105 transition-all duration-300 shadow-2xl">
                   Start Shopping <ArrowRight size={20} />
                </Link>
             </div>
         </div>
      </section>
    </div>
  );
};

export default About;