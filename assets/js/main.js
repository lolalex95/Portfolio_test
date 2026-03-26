document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle (Desktop & Mobile Sync)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    const html = document.documentElement;

    const updateThemeIcons = () => {
        const isDark = html.classList.contains('dark');
        if (themeIcon) themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
        if (themeIconMobile) themeIconMobile.textContent = isDark ? 'light_mode' : 'dark_mode';
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            updateThemeIcons();
        });
    }

    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            updateThemeIcons();
        });
    }

    // Initialize icons on load
    updateThemeIcons();

    // i18n Translation Logic
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
    let currentLang = localStorage.getItem('siteLang') || 'en';

    const setLanguage = (lang) => {
        if (!window.translations || !window.translations[lang]) return;

        currentLang = lang;
        localStorage.setItem('siteLang', lang);

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[lang][key]) {
                // Use innerHTML if the text suggests HTML entities (like <br />), otherwise textContent
                if (window.translations[lang][key].includes('<')) {
                    el.innerHTML = window.translations[lang][key];
                } else {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = window.translations[lang][key];
                    } else {
                        el.textContent = window.translations[lang][key];
                    }
                }
            }
        });

        // Update active state of buttons
        langToggleBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('text-primary');
                btn.classList.remove('text-slate-400');
            } else {
                btn.classList.remove('text-primary');
                btn.classList.add('text-slate-400');
            }
        });

        // Notify other components
        document.dispatchEvent(new CustomEvent('languageChanged'));
    };

    // Initialize Language
    if (langToggleBtns.length > 0) {
        langToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setLanguage(btn.getAttribute('data-lang'));
            });
        });

        // Initial setup
        setLanguage(currentLang);
    }

    // --- PORTFOLIO LOGIC (NEW DESIGN) ---
    const MOCK_VIDEOS = [
        { id: 'v1', title: 'Luno - Brand Identity', desc: 'A cinematic exploration of Luno\'s digital world and futuristic brand language.', videoSrc: 'assets/img/LUNO.mp4', poster: 'assets/img/AlexCorp.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v2', title: 'AI Mapping Dynamics', desc: 'Visualizing complex data structures through advanced 3D AI mapping techniques.', videoSrc: 'assets/img/AI MAPPING.mp4', poster: 'assets/img/web_dashboard.png', aspectClass: 'aspect-video', maxWidth: 'max-w-full' },
        { id: 'v3', title: 'Razer - Performance', desc: 'High-octane product showcase highlighting Razer\'s gaming DNA and precision.', videoSrc: 'assets/img/RAZER.mp4', poster: 'assets/img/web_ecommerce.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v4', title: 'Guijon Gym Promo', desc: 'Raw energy and intensity captured in a high-impact fitness commercial.', videoSrc: 'assets/img/Guijon gym.mp4', poster: 'assets/img/AlexCorp.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v5', title: 'Wonder Experience', desc: 'A dreamy visual journey through the Wonder ecosystem and its unique aesthetic.', videoSrc: 'assets/img/wonder.mp4', poster: 'assets/img/web_dashboard.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v6', title: 'Reel 1 - Meme', desc: 'Creative social media content focused on engagement and dynamic editing.', videoSrc: 'assets/img/REEL 1 MEME.mp4', poster: 'assets/img/AlexCorp.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v7', title: 'Reel 20', desc: 'Fast-paced motion graphics showreel with tight transitions and rhythmic cuts.', videoSrc: 'assets/img/REEL 20 (2).mp4', poster: 'assets/img/web_ecommerce.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' },
        { id: 'v8', title: 'Reel 23 - Showcase', desc: 'A professional portfolio highlights reel demonstrating technical versatility.', videoSrc: 'assets/img/REEL 23.mp4', poster: 'assets/img/web_dashboard.png', aspectClass: 'aspect-[9/16]', maxWidth: 'max-w-[360px]' }
    ];

    const MOCK_PRESENTATIONS = [
        { id: 'p1', title: 'Series A Pitch Deck', desc: 'High-impact investor deck that secured $15M funding for an AI startup.', images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'] },
        { id: 'p2', title: 'Global Sales Kickoff', desc: 'A 50-slide cinematic journey for an enterprise software sales summit.', images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'] },
        { id: 'p3', title: 'Q3 Board Report', desc: 'Clean, data-driven visualization translating complex metrics into actionable insights.', images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop'] },
        { id: 'p4', title: 'Rebranding Guidelines', desc: 'A visual manifesto documenting the new voice, colors, and typography of a retail brand.', images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop'] },
        { id: 'p5', title: 'Keynote Demo', desc: 'An immersive product launch presentation designed specifically for large arenas.', images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'] }
    ];

    let currentTab = 'videos';
    let currentVideo = MOCK_VIDEOS[0];
    let isVideoMuted = true;
    let currentPres = MOCK_PRESENTATIONS[0];
    let currentPresImageIndex = 0;

    const renderViewer = () => {
        const portfolioViewer = document.getElementById('portfolio-viewer');
        if (!portfolioViewer) return;
        
        let html = '';
        if (currentTab === 'videos') {
            const aspect = currentVideo.aspectClass || 'aspect-[9/16]';
            const maxWidth = currentVideo.maxWidth || 'max-w-[360px]';
            
            html = `
              <div class="relative group w-full ${maxWidth} mx-auto ${aspect} bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 fade-in-section border-[6px] border-slate-900/50 dark:border-slate-800">
                <!-- Loading Animation -->
                <div id="portfolio-loader" class="video-loader">
                    <div class="loader-ripple"><div></div><div></div></div>
                </div>

                <video src="${currentVideo.videoSrc}" poster="${currentVideo.poster}" autoplay loop ${isVideoMuted ? 'muted' : ''} playsinline class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" id="portfolio-video-el"></video>
                <button id="toggle-mute-btn" class="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-primary/80 backdrop-blur-md text-white rounded-full transition-all border border-white/10 group/btn z-20 shadow-lg">
                  <span class="text-xs font-bold tracking-wider opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all absolute right-full mr-2 whitespace-nowrap">
                    ${isVideoMuted ? 'Tap to unmute' : 'Mute'}
                  </span>
                  <div class="rounded-full bg-white/20 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${isVideoMuted 
                            ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
                            : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>'}
                    </svg>
                  </div>
                </button>
                <div class="absolute bottom-0 left-0 w-full p-6 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10 transition-transform duration-300">
                  <h3 class="text-white text-xl md:text-2xl font-bold mb-2 drop-shadow-md leading-tight">${currentVideo.title}</h3>
                  <p class="text-slate-300 text-xs sm:text-sm drop-shadow-sm line-clamp-3">${currentVideo.desc}</p>
                </div>
              </div>
              <div class="mt-6 flex justify-center lg:justify-start ${aspect === 'aspect-video' ? '' : 'hidden'}">
                  <button id="fullscreen-btn" class="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all rounded-2xl font-bold text-sm shadow-sm group">
                      <span class="material-symbols-outlined text-xl transition-transform group-hover:scale-110">fullscreen</span>
                      <span data-i18n="work.btn.fullscreen">Ver en pantalla completa</span>
                  </button>
              </div>
            `;
        } else if (currentTab === 'presentations') {
            let thumbHtml = currentPres.images.slice(1).map((imgUrl, i) => {
                const trueIndex = i + 1;
                const isActive = currentPresImageIndex === trueIndex;
                const ringClass = isActive ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'opacity-60 hover:opacity-100';
                const overlayClass = isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100';
                
                return `
                  <button data-index="${trueIndex}" class="pres-thumb snap-start flex-shrink-0 relative w-32 aspect-video rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none ${ringClass}">
                    <img src="${imgUrl}" alt="Thumbnail ${trueIndex}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-primary/20 transition-opacity duration-300 ${overlayClass}"></div>
                  </button>
                `;
            }).join('');
            
            const isMainActive = currentPresImageIndex === 0;
            const mainRing = isMainActive ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'opacity-60 hover:opacity-100';

            html = `
              <div class="flex flex-col gap-4 fade-in-section w-full h-full">
                <div class="w-full aspect-[16/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <img src="${currentPres.images[currentPresImageIndex]}" alt="${currentPres.title}" class="w-full h-full object-cover transition-opacity duration-500 fade-in-section" id="pres-main-img" />
                  <div class="absolute inset-0 border border-black/5 dark:border-white/5 rounded-3xl pointer-events-none"></div>
                </div>
                <div class="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x pointer-events-auto">
                  <button data-index="0" class="pres-thumb snap-start flex-shrink-0 relative w-32 aspect-video rounded-xl overflow-hidden transition-all duration-300 group focus:outline-none flex items-center justify-center bg-slate-200 dark:bg-slate-800 ${mainRing}">
                     <img src="${currentPres.images[0]}" class="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]" />
                     <span class="relative z-10 text-xs font-bold text-white uppercase tracking-widest drop-shadow-md">Cover</span>
                  </button>
                  ${thumbHtml}
                </div>
              </div>
            `;
        } else if (currentTab === 'webs') {
            const toggleEl = document.querySelector('.lang-toggle-btn[data-lang="es"]');
            const isEs = toggleEl ? toggleEl.classList.contains('text-primary') : false;
            const underDevText = isEs ? 'En Desarrollo' : 'Under Development';
            const underDevSub = isEs ? 'Nuevas experiencias digitales se están horneando. Vuelve pronto.' : 'New digital experiences are being baked. Check back soon.';

            html = `
              <div class="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-slate-800/20 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-[0_0_40px_rgba(13,89,242,0.05)] transition-all fade-in-section duration-700">
                <div class="relative group">
                   <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-1000 pointer-events-none"></div>
                   <div class="relative flex flex-col items-center gap-6 animate-pulse">
                      <div class="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                         <span class="material-symbols-outlined text-4xl text-primary">construction</span>
                      </div>
                      <div class="text-center">
                        <h3 class="text-2xl font-extrabold tracking-widest uppercase text-slate-900 dark:text-white mb-2 drop-shadow-[0_0_15px_rgba(13,89,242,0.3)]">
                          ${underDevText}
                        </h3>
                        <p class="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                          ${underDevSub}
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            `;
        }

        portfolioViewer.innerHTML = html;

        // Attach listeners
        if (currentTab === 'videos') {
            const muteBtn = document.getElementById('toggle-mute-btn');
            const videoEl = document.getElementById('portfolio-video-el');
            if (muteBtn && videoEl) {
                muteBtn.addEventListener('click', () => {
                    isVideoMuted = !isVideoMuted;
                    videoEl.muted = isVideoMuted;
                    renderViewer();
                });
            }

            const fullscreenBtn = document.getElementById('fullscreen-btn');
            if (fullscreenBtn && videoEl) {
                fullscreenBtn.addEventListener('click', () => {
                    if (videoEl.requestFullscreen) {
                        videoEl.requestFullscreen();
                    } else if (videoEl.webkitRequestFullscreen) { /* Safari */
                        videoEl.webkitRequestFullscreen();
                    } else if (videoEl.msRequestFullscreen) { /* IE11 */
                        videoEl.msRequestFullscreen();
                    }
                });
            }

            // Hide loader when video is ready
            if (videoEl) {
                if (videoEl.readyState >= 3) {
                    hideLoader('portfolio-loader');
                } else {
                    videoEl.addEventListener('canplay', () => hideLoader('portfolio-loader'), { once: true });
                }
            }
        } else if (currentTab === 'presentations') {
            const thumbs = document.querySelectorAll('.pres-thumb');
            thumbs.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    currentPresImageIndex = parseInt(e.currentTarget.getAttribute('data-index'));
                    renderViewer();
                });
            });
        }
    };

    const renderList = () => {
        const portfolioList = document.getElementById('portfolio-list');
        if (!portfolioList) return;

        let html = '';
        if (currentTab === 'videos') {
            html = MOCK_VIDEOS.map(video => {
                const isActive = currentVideo.id === video.id;
                const activeClass = isActive 
                    ? 'bg-white dark:bg-slate-800 border-primary shadow-[0_10px_30px_-10px_rgba(13,89,242,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(13,89,242,0.4)] translate-x-1 lg:translate-x-2 z-10' 
                    : 'bg-transparent border-transparent border-b-slate-100 dark:border-b-slate-800/50 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:translate-x-1';
                const textClass = isActive ? 'text-primary' : 'text-slate-900 dark:text-white group-hover:text-primary';
                
                return `
                  <div data-id="${video.id}" class="portfolio-item group cursor-pointer p-3 sm:p-4 rounded-2xl transition-all duration-300 border flex gap-4 items-center ${activeClass} ${isActive ? '' : 'last:border-b-transparent'}">
                    <div class="relative flex-shrink-0 w-16 sm:w-20 aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900/50 shadow-inner group-hover:shadow-md transition-all">
                        <video src="${video.videoSrc}#t=0.1" preload="metadata" muted playsinline class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"></video>
                        <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div class="flex-grow flex flex-col justify-center">
                        <h4 class="text-base sm:text-lg font-bold transition-colors ${textClass} leading-tight line-clamp-2">${video.title}</h4>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 sm:mt-2 line-clamp-2">${video.desc}</p>
                    </div>
                  </div>
                `;
            }).join('');
        } else if (currentTab === 'presentations') {
            html = MOCK_PRESENTATIONS.map(pres => {
                const isActive = currentPres.id === pres.id;
                const activeClass = isActive 
                    ? 'bg-white dark:bg-slate-800 border-primary shadow-[0_10px_30px_-10px_rgba(13,89,242,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(13,89,242,0.4)] translate-x-1 lg:translate-x-2 z-10' 
                    : 'bg-transparent border-transparent border-b-slate-100 dark:border-b-slate-800/50 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:translate-x-1';
                const textClass = isActive ? 'text-primary' : 'text-slate-900 dark:text-white group-hover:text-primary';
                
                return `
                  <div data-id="${pres.id}" class="portfolio-item group cursor-pointer p-3 sm:p-4 rounded-2xl transition-all duration-300 border flex gap-4 items-center ${activeClass} ${isActive ? '' : 'last:border-b-transparent'}">
                    <div class="relative flex-shrink-0 w-16 sm:w-20 aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800/50 shadow-inner group-hover:shadow-md transition-all">
                        <img src="${pres.images[0]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div class="flex-grow flex flex-col justify-center">
                        <h4 class="text-base sm:text-lg font-bold transition-colors ${textClass} leading-tight line-clamp-2">${pres.title}</h4>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 sm:mt-2 line-clamp-2">${pres.desc}</p>
                    </div>
                  </div>
                `;
            }).join('');
        } else if (currentTab === 'webs') {
            html = [1, 2, 3, 4, 5].map(i => `
                <div class="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3 opacity-50 pointer-events-none fade-in-section" style="animation-delay: ${i*100}ms">
                    <div class="w-1/2 h-5 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                    <div class="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                    <div class="w-3/4 h-3 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                </div>
            `).join('');
        }

        portfolioList.innerHTML = html;

        // Attach listeners
        if (currentTab === 'videos' || currentTab === 'presentations') {
            const items = document.querySelectorAll('.portfolio-item');
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    if (currentTab === 'videos') {
                        currentVideo = MOCK_VIDEOS.find(v => v.id === id);
                    } else {
                        currentPres = MOCK_PRESENTATIONS.find(p => p.id === id);
                        currentPresImageIndex = 0;
                    }
                    renderViewer();
                    renderList();
                });
            });
        }
    };

    const updateTabStyling = () => {
        const portfolioTabs = document.querySelectorAll('.portfolio-tab');
        const tabGlow = document.getElementById('tab-glow');
        if (!tabGlow || portfolioTabs.length === 0) return;
        
        portfolioTabs.forEach((tab) => {
            const isTabActive = tab.getAttribute('data-tab') === currentTab;
            if (isTabActive) {
                tab.classList.remove('text-slate-500', 'hover:text-slate-800', 'dark:text-slate-400', 'dark:hover:text-white', 'hover:bg-slate-100', 'dark:hover:bg-slate-700/50');
                tab.classList.add('text-white');
                tabGlow.style.width = `${tab.offsetWidth}px`;
                tabGlow.style.left = `${tab.offsetLeft}px`;
            } else {
                tab.classList.add('text-slate-500', 'hover:text-slate-800', 'dark:text-slate-400', 'dark:hover:text-white', 'hover:bg-slate-100', 'dark:hover:bg-slate-700/50');
                tab.classList.remove('text-white');
            }
        });
    };

    // Auto-init using DOM traversal inside a listener to ensure HTML is ready
    const initPortfolio = () => {
        const portfolioTabs = document.querySelectorAll('.portfolio-tab');
        if (portfolioTabs.length > 0) {
            portfolioTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    currentTab = e.currentTarget.getAttribute('data-tab');
                    updateTabStyling();
                    renderViewer();
                    renderList();
                });
            });
            setTimeout(() => {
                updateTabStyling();
                renderViewer();
                renderList();
            }, 100);
            window.addEventListener('resize', updateTabStyling);
            document.addEventListener('languageChanged', () => {
                setTimeout(() => {
                    updateTabStyling();
                    renderViewer();
                }, 50);
            });
        }
    };
    initPortfolio();

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isClosed = mobileMenu.classList.contains('translate-x-full');
            if (isClosed) {
                // Open Menu
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                // Close Menu
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // Project Details Modal
    const projectModal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const modalSoftware = document.getElementById('modal-software');
    const modalDisciplines = document.getElementById('modal-disciplines');

    if (projectModal) {
        const modalContent = projectModal.querySelector('.max-w-3xl'); // To scale up/down

        const openModal = (card) => {
            // Populate content
            modalTitle.textContent = card.dataset.title || 'Project Details';
            modalDescription.textContent = card.dataset.description || '';
            modalImage.src = card.dataset.image || '';

            // Build tags for software
            const softwareList = (card.dataset.software || '').split(',').map(s => s.trim()).filter(Boolean);
            modalSoftware.innerHTML = softwareList.map(s => `<span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium">${s}</span>`).join('');

            // Build tags for disciplines
            const disciplineList = (card.dataset.disciplines || '').split(',').map(d => d.trim()).filter(Boolean);
            modalDisciplines.innerHTML = disciplineList.map(d => `<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">${d}</span>`).join('');

            // Show modal and animate
            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');

            // Add a micro-delay to trigger Tailwind transition correctly
            requestAnimationFrame(() => {
                projectModal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            });

            document.body.style.overflow = 'hidden'; // Stop background scroll
        };

        const closeModal = () => {
            // Animate out
            projectModal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');

            // Wait for transition to finish before hiding
            setTimeout(() => {
                projectModal.classList.add('hidden');
                projectModal.classList.remove('flex');
                document.body.style.overflow = ''; // Restore background scroll
            }, 300); // 300ms matches Tailwind's duration-300
        };

        const projectCards = document.querySelectorAll('.project-card');

        // Attach clicks to all cards
        if (projectCards.length > 0) {
            projectCards.forEach(card => {
                card.addEventListener('click', () => openModal(card));
            });
        }

        // Close clicks
        closeModalBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Global GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- HERO SECTION ---
        const heroTitle = document.querySelector('h1.text-6xl');
        const heroBadge = document.querySelector('span.bg-primary\\/10');
        const heroDesc = document.querySelector('p.max-w-xl');
        const heroBtns = document.querySelector('.flex.flex-wrap.gap-4');
        const heroVisual = document.querySelector('.lg\\:col-span-5');

        const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
        
        if (heroBadge) heroTl.fromTo(heroBadge, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2);
        if (heroTitle) heroTl.fromTo(heroTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.4);
        if (heroDesc) heroTl.fromTo(heroDesc, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.6);
        if (heroBtns) heroTl.fromTo(heroBtns.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15 }, 0.8);
        if (heroVisual) heroTl.fromTo(heroVisual, { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 1.5 }, 0.6);

        // --- SHOWCASE SECTION ---
        const showcaseSection = document.getElementById('showcase-section');
        if (showcaseSection) {
            const showcaseVideo = showcaseSection.querySelector('.lg\\:col-span-7');
            const showcaseContent = showcaseSection.querySelector('.lg\\:col-span-5');

            const showcaseTl = gsap.timeline({
                scrollTrigger: {
                    trigger: showcaseSection,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (showcaseVideo) {
                showcaseTl.fromTo(showcaseVideo, 
                    { opacity: 0, x: -50 }, 
                    { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, 0
                );
            }

            if (showcaseContent) {
                showcaseTl.fromTo(showcaseContent.children, 
                    { opacity: 0, x: 50, y: 20 }, 
                    { opacity: 1, x: 0, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.2
                );
            }
        }

        // --- ABOUT SECTION ---
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const aboutImage = aboutSection.querySelector('img');
            const aboutTextElements = aboutSection.querySelectorAll('h2, p, .grid > div, .flex.items-center.mt-10');
            
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (aboutImage) {
                aboutTl.fromTo(aboutImage.parentElement, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, 0);
            }
            if (aboutTextElements.length) {
                aboutTl.fromTo(aboutTextElements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3);
            }
        }

        // --- WORK SECTION ---
        const workSection = document.getElementById('work');
        if (workSection) {
            const workHeader = workSection.querySelector('.flex-col.md\\:flex-row');
            const workCards = workSection.querySelectorAll('.project-card');
            
            if (workHeader) {
                gsap.fromTo(workHeader.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: workSection, start: 'top 70%', toggleActions: 'play none none reverse' }
                });
            }

            workCards.forEach((card) => {
                gsap.fromTo(card, { opacity: 0, y: 50 }, {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' }
                });
            });
        }



        // --- CONTACT SECTION ---
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const contactLeft = contactSection.querySelector('.text-center.lg\\:text-left');
            const contactForm = contactSection.querySelector('.bg-white.dark\\:bg-slate-900');

            const contactTl = gsap.timeline({
                scrollTrigger: { trigger: contactSection, start: 'top 70%', toggleActions: 'play none none reverse' }
            });

            if (contactLeft) contactTl.fromTo(contactLeft, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 0);
            if (contactForm) contactTl.fromTo(contactForm, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.2);
        }

        // --- FOOTER ---
        const footer = document.querySelector('footer');
        if (footer) {
            gsap.fromTo(footer.children[0].children, { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: footer, start: 'top 70%', toggleActions: 'play none none reverse' }
            });
        }
        
        // Refresh ScrollTrigger after all images load and on resize
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    // GSAP Animation for Professional Summary (Typing Effect)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof TextPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        const summaryText = document.getElementById('summary-text');
        
        if (summaryText) {
            const summarySection = summaryText.closest('section');
            // Inject blinking cursor styles
            if (!document.getElementById('typing-cursor-style')) {
                const style = document.createElement('style');
                style.id = 'typing-cursor-style';
                style.innerHTML = `
                    .typing-cursor::after {
                        content: '|';
                        display: inline-block;
                        animation: blink 1s step-end infinite;
                        color: #0ea5e9; /* primary color fallback */
                        margin-left: 2px;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }

            // Hide text initially
            gsap.set(summaryText, { opacity: 0 });
            summaryText.textContent = ''; 

            // Trigger typing effect on scroll
            ScrollTrigger.create({
                trigger: summarySection,
                start: 'top 70%',
                onEnter: () => {
                    // Fetch latest translation based on currentLang
                    const textKey = summaryText.getAttribute('data-i18n');
                    const translatedText = (window.translations && window.translations[currentLang] && window.translations[currentLang][textKey]) 
                        ? window.translations[currentLang][textKey] 
                        : summaryText.textContent.trim();

                    // Reset element for typing
                    summaryText.textContent = '';
                    summaryText.classList.add('typing-cursor');
                    gsap.set(summaryText, { opacity: 1, y: 0, rotationX: 0 }); 
                    
                    // Animate typing
                    gsap.to(summaryText, {
                        text: {
                            value: translatedText,
                            delimiter: ""
                        },
                        duration: translatedText.length * 0.05, 
                        ease: "none"
                    });
                },
                onLeaveBack: () => {
                    // Reset when scrolling back up
                    summaryText.textContent = '';
                    summaryText.classList.remove('typing-cursor');
                    gsap.set(summaryText, { opacity: 0 });
                }
            });
        }
    }
    // --- VIDEO LOADING LOGIC ---
    const hideLoader = (id) => {
        const loader = document.getElementById(id);
        if (loader) loader.classList.add('hidden');
    };

    // Showcase Video Loader & Mute Toggle
    const showcaseVideo = document.getElementById('showcase-video');
    const showcaseMuteBtn = document.getElementById('showcase-mute-btn');
    const showcaseMuteIcon = document.getElementById('showcase-mute-icon');

    if (showcaseVideo) {
        // Hide loader when video is ready
        if (showcaseVideo.readyState >= 3) {
            hideLoader('showcase-loader');
        } else {
            showcaseVideo.addEventListener('canplay', () => hideLoader('showcase-loader'), { once: true });
        }

        if (showcaseMuteBtn) {
            showcaseMuteBtn.addEventListener('click', () => {
                showcaseVideo.muted = !showcaseVideo.muted;
                if (showcaseVideo.muted) {
                    showcaseMuteIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
                } else {
                    showcaseMuteIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>';
                }
            });
        }
    }

    // --- TYPEWRITER EFFECT ---
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let phrases = [];

        const updatePhrases = () => {
            const lang = localStorage.getItem('siteLang') || 'en';
            if (window.translations && window.translations[lang]) {
                phrases = [
                    window.translations[lang]["hero.typewriter.1"] || "Make Presentations",
                    window.translations[lang]["hero.typewriter.2"] || "Edit Videos",
                    window.translations[lang]["hero.typewriter.3"] || "Design Websites"
                ];
            } else {
                phrases = ["Make Presentations", "Edit Videos", "Design Websites"];
            }
        };

        document.addEventListener('languageChanged', () => {
            updatePhrases();
            // Adjust bounds gently in case the new word is shorter
            phraseIndex = phraseIndex % phrases.length;
            isDeleting = true; 
        });

        updatePhrases();

        const type = () => {
            if (phrases.length === 0) return;
            const currentPhrase = phrases[phraseIndex];
            
            // Safety cap for charIndex if words changed length
            if (charIndex > currentPhrase.length) charIndex = currentPhrase.length;

            if (isDeleting) {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 25; // Much faster deleting
            } else {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 50; // Quicker, punchier typing
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1200; // Pause at end of completed word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // Small pause before new word
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }
});



