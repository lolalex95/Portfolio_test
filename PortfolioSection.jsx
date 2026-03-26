import React, { useState } from 'react';

// --- MOCK DATA --- //

const MOCK_VIDEOS = [
  {
    id: 'v1',
    title: 'Aura - Brand Anthem',
    desc: 'Cinematic brand film exploring the intersection of AI and human creativity.',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
  },
  {
    id: 'v2',
    title: 'Nexus UI Overview',
    desc: 'SaaS product walkthrough highlighting dynamic motion graphics and core features.',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
    poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'v3',
    title: 'Fintech Launch Trailer',
    desc: 'High-energy promotional video designed to maximize conversions on social media.',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    poster: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'v4',
    title: 'Cybersecurity Explainer',
    desc: 'Simplifying complex security concepts through engaging 3D animations.',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'v5',
    title: 'Echo - Product Teaser',
    desc: 'A mysterious, sleek teaser campaign for a new hardware product release.',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    poster: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop'
  }
];

const MOCK_PRESENTATIONS = [
  {
    id: 'p1',
    title: 'Series A Pitch Deck',
    desc: 'High-impact investor deck that secured $15M funding for an AI startup.',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop', // Main
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'p2',
    title: 'Global Sales Kickoff',
    desc: 'A 50-slide cinematic journey for an enterprise software sales summit.',
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop', // Main
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'p3',
    title: 'Q3 Board Report',
    desc: 'Clean, data-driven visualization translating complex metrics into actionable insights.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', // Main
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop'
    ]
  },
  {
    id: 'p4',
    title: 'Rebranding Guidelines',
    desc: 'A visual manifesto documenting the new voice, colors, and typography of a retail brand.',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop', // Main
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop'
    ]
  },
  {
    id: 'p5',
    title: 'Keynote Demo',
    desc: 'An immersive product launch presentation designed specifically for large arenas.',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', // Main
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'
    ]
  }
];

// --- ICONS --- //

const VolumeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const VolumeOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);


// --- MAIN COMPONENT --- //

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'presentations' | 'webs'

  // Video Tab State
  const [activeVideo, setActiveVideo] = useState(MOCK_VIDEOS[0]);
  const [isMuted, setIsMuted] = useState(true);

  // Presentations Tab State
  const [activePresentation, setActivePresentation] = useState(MOCK_PRESENTATIONS[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleVideoSelect = (video) => {
    setActiveVideo(video);
  };

  const handlePresentationSelect = (pres) => {
    setActivePresentation(pres);
    setActiveImageIndex(0); // Reset to main image on change
  };

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Selected <span className="text-primary">Work.</span>
            </h2>
          </div>

          {/* Futuristic Tab Bar */}
          <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-sm">
            {['videos', 'presentations', 'webs'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`
                  relative px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide capitalize transition-all duration-300
                  ${activeTab === tab 
                    ? 'text-white' 
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }
                `}
              >
                {/* Glow Effect for active tab */}
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-primary rounded-xl shadow-[0_0_20px_rgba(13,89,242,0.4)] transition-all duration-300 pointer-events-none"></div>
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout (Left: Viewer, Right: List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: VISUAL VIEWER */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center h-full">
            
            {/* === VIDEOS VIEW === */}
            {activeTab === 'videos' && (
              <div className="relative group w-full aspect-video md:aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-500">
                <video
                  key={activeVideo.id} // forces re-render on video change
                  src={activeVideo.videoSrc}
                  poster={activeVideo.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Mute Overlay Button */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-primary/80 backdrop-blur-md text-white rounded-full transition-all border border-white/10 group/btn"
                >
                  <span className="text-xs font-bold tracking-wider opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all absolute right-full mr-2 whitespace-nowrap">
                    {isMuted ? 'Tap to unmute' : 'Mute'}
                  </span>
                  <div className="rounded-full bg-white/20 p-1">
                    {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                  </div>
                </button>

                {/* Video Info Overlay (Bottom Left) */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <h3 className="text-white text-2xl font-bold mb-2">{activeVideo.title}</h3>
                  <p className="text-slate-300 text-sm max-w-md">{activeVideo.desc}</p>
                </div>
              </div>
            )}

            {/* === PRESENTATIONS VIEW === */}
            {activeTab === 'presentations' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                
                {/* Main Image */}
                <div className="w-full aspect-[16/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <img 
                    key={activeImageIndex} // Force animation trigger
                    src={activePresentation.images[activeImageIndex]} 
                    alt={activePresentation.title} 
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                  />
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-3xl pointer-events-none"></div>
                </div>

                {/* Thumbnails Row */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x pointer-events-auto">
                  {activePresentation.images.slice(1).map((imgUrl, i) => {
                    // Actual index in the images array
                    const trueIndex = i + 1;
                    const isActive = activeImageIndex === trueIndex;
                    
                    return (
                      <button 
                        key={trueIndex}
                        onClick={() => setActiveImageIndex(trueIndex)}
                        className={`
                          snap-start flex-shrink-0 relative w-32 aspect-video rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none
                          ${isActive ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'opacity-60 hover:opacity-100'}
                        `}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${trueIndex}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      </button>
                    );
                  })}
                  {/* Option to view first image again */}
                  <button 
                        onClick={() => setActiveImageIndex(0)}
                        className={`
                          snap-start flex-shrink-0 relative w-32 aspect-video rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none flex items-center justify-center bg-slate-100 dark:bg-slate-800
                          ${activeImageIndex === 0 ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'opacity-60 hover:opacity-100'}
                        `}
                      >
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Cover</span>
                  </button>
                </div>
              </div>
            )}

            {/* === WEBS VIEW (Under construction) === */}
            {activeTab === 'webs' && (
              <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-slate-800/20 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-[0_0_40px_rgba(13,89,242,0.05)] transition-all animate-in fade-in duration-700">
                <div className="relative group">
                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-1000"></div>
                   
                   <div className="relative flex flex-col items-center gap-6 animate-pulse">
                      <div className="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                         </svg>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-extrabold tracking-widest uppercase text-slate-900 dark:text-white mb-2 drop-shadow-[0_0_15px_rgba(13,89,242,0.3)]">
                          Under Development
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                          New digital experiences are being baked. Check back soon.
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>


          {/* RIGHT COLUMN: PROJECT LIST */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
            
            {/* List for Videos */}
            {activeTab === 'videos' && MOCK_VIDEOS.map((video) => {
              const isActive = activeVideo.id === video.id;
              return (
                <div 
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`
                    group cursor-pointer p-5 rounded-2xl transition-all duration-300 border
                    ${isActive 
                      ? 'bg-white dark:bg-slate-800 border-primary shadow-[0_10px_30px_-10px_rgba(13,89,242,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(13,89,242,0.4)] translate-x-1 lg:translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 hover:translate-x-1'
                    }
                  `}
                >
                  <h4 className={`text-lg font-bold transition-colors ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                    {video.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {video.desc}
                  </p>
                </div>
              );
            })}

            {/* List for Presentations */}
            {activeTab === 'presentations' && MOCK_PRESENTATIONS.map((pres) => {
              const isActive = activePresentation.id === pres.id;
              return (
                <div 
                  key={pres.id}
                  onClick={() => handlePresentationSelect(pres)}
                  className={`
                    group cursor-pointer p-5 rounded-2xl transition-all duration-300 border
                    ${isActive 
                      ? 'bg-white dark:bg-slate-800 border-primary shadow-[0_10px_30px_-10px_rgba(13,89,242,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(13,89,242,0.4)] translate-x-1 lg:translate-x-2' 
                      : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 hover:translate-x-1'
                    }
                  `}
                >
                  <h4 className={`text-lg font-bold transition-colors ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                    {pres.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {pres.desc}
                  </p>
                </div>
              );
            })}

            {/* List for Webs (Empty slate) */}
            {activeTab === 'webs' && (
               <div className="h-full w-full flex flex-col gap-3">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3 opacity-50 pointer-events-none">
                     <div className="w-1/2 h-5 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                     <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                     <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                   </div>
                 ))}
               </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
