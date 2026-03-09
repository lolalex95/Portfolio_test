document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            themeIcon.textContent = html.classList.contains('dark') ? 'light_mode' : 'dark_mode';
        });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('border-primary', 'text-primary', 'active');
                    b.classList.add('border-transparent', 'text-slate-400');
                });

                // Add active class to clicked button
                btn.classList.add('border-primary', 'text-primary', 'active');
                btn.classList.remove('border-transparent', 'text-slate-400');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add a small delay for smooth entry animation if desired
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        // Wait for transition before hiding completely
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

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

        // Attach clicks to all cards
        if (projectCards) {
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
});
