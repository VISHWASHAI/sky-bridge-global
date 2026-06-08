/* ==========================================================================
   MOBILE MENU HELPERS
   ========================================================================== */
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const btn  = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('mobile-nav-overlay');
    const open = menu.classList.toggle('mobile-open');
    btn.classList.toggle('active', open);
    overlay.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

function closeMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const btn  = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('mobile-nav-overlay');
    menu.classList.remove('mobile-open');
    btn.classList.remove('active');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
}

/* ==========================================================================
   GLOBAL NAVIGATION — defined before DOMContentLoaded so onclick
   attributes always find this function, even if other init code errors
   ========================================================================== */
function navigateToPage(pageId) {
    // Hide all page views
    document.querySelectorAll('.view-container').forEach(v => {
        v.style.display = 'none';
    });

    // Show the target view
    const target = document.getElementById('view-' + pageId);
    if (target) {
        target.style.display = 'block';
    }

    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active state on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        const oc = link.getAttribute('onclick') || '';
        link.classList.toggle('active', oc.includes("'" + pageId + "'"));
    });

    // Page-specific init
    if (pageId === 'tracking' && typeof window.renderTrackingResults === 'function') {
        setTimeout(() => window.renderTrackingResults('SBG-102948-US'), 50);
    }

    // Keep the URL hash in sync for shareable links / browser back-forward
    if (target && ('#' + pageId) !== location.hash) {
        history.replaceState(null, '', '#' + pageId);
    }
}

// Also expose scrollToSection alias used by some buttons
window.scrollToSection = (sectionId) => navigateToPage(sectionId.replace('-section', ''));

// Deep-link support: resolve the initial view from the URL hash (e.g. #contact)
const KNOWN_VIEWS = ['home', 'about', 'services', 'tracking', 'contact', 'careers'];
function viewFromHash() {
    const id = (location.hash || '').replace('#', '');
    return KNOWN_VIEWS.includes(id) ? id : 'home';
}
window.addEventListener('hashchange', () => navigateToPage(viewFromHash()));

/* ==========================================================================
   REST OF APP — runs after DOM is ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // Show the view from the URL hash on first load (defaults to home)
    navigateToPage(viewFromHash());

    // Initialize Interactive Forms
    initForms();

    // Initialize Scroll Animations & Observers
    initScrollAnimations();

    // Start Testimonial AutoPlay
    startTestimonialAutoPlay();

    // Floating nav shrink on scroll
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            siteHeader && siteHeader.classList.add('shrink');
        } else {
            siteHeader && siteHeader.classList.remove('shrink');
        }
    }, { passive: true });

    // Copy to clipboard utility
    window.copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied ${label} to clipboard!`);
        });
    };

    /* ==========================================================================
       TOAST ALERTS
       ========================================================================== */
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /* ==========================================================================
       INTERACTIVE FORMS & CALCULATORS
       ========================================================================== */
    function initForms() {
        // Top contact bar tracker
        const topbarTrackForm = document.getElementById('topbar-track-form');
        const topbarTrackInput = document.getElementById('topbar-track-input');
        if (topbarTrackForm && topbarTrackInput) {
            topbarTrackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const code = topbarTrackInput.value.trim();
                if (code) {
                    navigateToPage('tracking');
                    const trackingInput = document.getElementById('tracking-number-input');
                    if (trackingInput) {
                        trackingInput.value = code;
                        renderTrackingResults(code);
                    }
                } else {
                    showToast('Please enter a tracking number.');
                }
            });
        }

        // Hero search trackers
        const heroTrackBtn = document.getElementById('hero-track-btn');
        const heroTrackInput = document.getElementById('hero-track-input');
        if (heroTrackBtn && heroTrackInput) {
            heroTrackBtn.addEventListener('click', () => {
                const code = heroTrackInput.value.trim();
                if (code) {
                    navigateToPage('tracking');
                    const trackingInput = document.getElementById('tracking-number-input');
                    if (trackingInput) {
                        trackingInput.value = code;
                        renderTrackingResults(code);
                    }
                } else {
                    showToast('Please enter a tracking number.');
                }
            });
        }

        // Tracking page lookup
        const trackSubmit = document.getElementById('btn-submit-tracking');
        const trackInput = document.getElementById('tracking-number-input');
        if (trackSubmit && trackInput) {
            trackSubmit.addEventListener('click', () => {
                renderTrackingResults(trackInput.value.trim());
            });
        }

        // Postal checker
        const postalSubmit = document.getElementById('btn-submit-postal');
        const postalInput = document.getElementById('postal-code-input');
        if (postalSubmit && postalInput) {
            postalSubmit.addEventListener('click', () => {
                const code = postalInput.value.trim().toUpperCase();
                const resultCard = document.getElementById('postal-result-card');
                
                if (!code) {
                    showToast('Please enter a valid postal code.');
                    return;
                }

                resultCard.style.display = 'block';
                resultCard.style.opacity = '0';
                resultCard.style.transform = 'translateY(25px)';
                resultCard.style.transition = 'all 0.5s var(--easing-premium)';
                
                const match = MockDatabase.postalCodes[code];
                if (match) {
                    const tierColor = match.tier === 'Express' ? '#059669' : match.tier === 'Priority' ? '#2970c6' : '#64748b';
                    resultCard.innerHTML = `
                        <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,0.1); border:1px solid #e2e8f0;">
                            <!-- Green success header band -->
                            <div style="background:linear-gradient(135deg,#064e3b 0%,#065f46 100%); padding:20px 24px; display:flex; justify-content:space-between; align-items:center;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <div style="width:36px; height:36px; background:rgba(255,255,255,0.15); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                                        <svg width="18" height="18" fill="none" stroke="#6ee7b7" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                    </div>
                                    <div>
                                        <div style="color:#6ee7b7; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Service Available</div>
                                        <div style="color:#fff; font-size:15px; font-weight:700; margin-top:2px;">${match.city}</div>
                                    </div>
                                </div>
                                <span style="background:rgba(255,255,255,0.15); color:#fff; font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:0.06em;">${match.tier}</span>
                            </div>
                            <!-- PIN code bar -->
                            <div style="background:#f8fafc; padding:12px 24px; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:12px;">
                                <svg width="14" height="14" fill="none" stroke="#94a3b8" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span style="font-size:12px; color:#64748b;">PIN Code</span>
                                <span style="font-family:monospace; font-size:13px; font-weight:700; color:#0f172a; background:#e2e8f0; padding:2px 10px; border-radius:6px;">${code}</span>
                                ${match.state ? `<span style="font-size:11px; color:#94a3b8; margin-left:4px;">${match.state}</span>` : ''}
                            </div>
                            <!-- Details grid -->
                            <div style="padding:20px 24px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                                <div>
                                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; margin-bottom:4px;">Assigned Hub</div>
                                    <div style="font-size:13px; font-weight:600; color:#0f172a;">${match.hubName}</div>
                                </div>
                                <div>
                                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; margin-bottom:4px;">Est. Transit Time</div>
                                    <div style="font-size:13px; font-weight:600; color:#0f172a; display:flex; align-items:center; gap:6px;">
                                        <span style="width:8px; height:8px; background:${tierColor}; border-radius:50%; display:inline-block;"></span>
                                        ${match.transitDays} Business Day${match.transitDays > 1 ? 's' : ''}
                                    </div>
                                </div>
                                <div style="grid-column:span 2;">
                                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; margin-bottom:4px;">Facility Address</div>
                                    <div style="font-size:12px; color:#475569; line-height:1.5;">${match.address}</div>
                                </div>
                            </div>
                            <!-- CTA -->
                            <div style="padding:0 24px 20px; display:flex; gap:10px;">
                                <button class="btn btn-primary btn-sm" onclick="navigateToPage('contact')" style="border-radius:8px;">Book Shipment to This Zone →</button>
                                <button class="btn btn-outline btn-sm" onclick="navigateToPage('tracking')" style="border-radius:8px;">Track Existing Cargo</button>
                            </div>
                        </div>
                    `;
                } else {
                    resultCard.innerHTML = `
                        <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
                            <!-- Red header band -->
                            <div style="background:linear-gradient(135deg,#7f1d1d 0%,#991b1b 100%); padding:20px 24px; display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; background:rgba(255,255,255,0.15); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                                    <svg width="18" height="18" fill="none" stroke="#fca5a5" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                </div>
                                <div>
                                    <div style="color:#fca5a5; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Coverage Unavailable</div>
                                    <div style="color:#fff; font-size:14px; font-weight:600; margin-top:2px;">PIN <span style="font-family:monospace;">${code}</span> is outside our current network</div>
                                </div>
                            </div>
                            <div style="padding:20px 24px;">
                                <p style="font-size:13px; color:#64748b; line-height:1.6; margin-bottom:16px;">We don't currently have a freight route to this PIN code. You can contact us to enquire about coverage expansion, or try one of these serviced areas:</p>
                                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
                                    <button onclick="document.getElementById('postal-code-input').value='563113'; document.getElementById('btn-submit-postal').click();" style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:6px 12px; font-size:12px; font-weight:600; color:#0f172a; cursor:pointer;">563113 — Kolar</button>
                                    <button onclick="document.getElementById('postal-code-input').value='560001'; document.getElementById('btn-submit-postal').click();" style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:6px 12px; font-size:12px; font-weight:600; color:#0f172a; cursor:pointer;">560001 — Bangalore</button>
                                    <button onclick="document.getElementById('postal-code-input').value='600001'; document.getElementById('btn-submit-postal').click();" style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:6px 12px; font-size:12px; font-weight:600; color:#0f172a; cursor:pointer;">600001 — Chennai</button>
                                    <button onclick="document.getElementById('postal-code-input').value='400001'; document.getElementById('btn-submit-postal').click();" style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:6px 12px; font-size:12px; font-weight:600; color:#0f172a; cursor:pointer;">400001 — Mumbai</button>
                                </div>
                                <button class="btn btn-primary btn-sm" onclick="navigateToPage('contact')" style="border-radius:8px;">Request Coverage for This PIN →</button>
                            </div>
                        </div>
                    `;
                }
                requestAnimationFrame(() => {
                    resultCard.style.opacity = '1';
                    resultCard.style.transform = 'translateY(0)';
                });
            });
        }

        // Contact Form
        const contactForm = document.getElementById('contact-form-elt');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('contact-name').value;
                const email = document.getElementById('contact-email').value;
                const company = document.getElementById('contact-company').value;
                const msg = document.getElementById('contact-message').value;

                if (!name || !email || !msg) {
                    showToast('Please fill out required fields.');
                    return;
                }

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;"><circle cx="12" cy="12" r="10" stroke-dasharray="32 10" stroke-linecap="round"></circle></svg>
                    Sending enquiry...
                `;

                setTimeout(() => {
                    // Add to admin enquiry
                    MockDatabase.admin.enquiries.unshift({
                        id: `ENQ-00${MockDatabase.admin.enquiries.length + 1}`,
                        name,
                        email,
                        company: company || 'N/A',
                        msg,
                        date: 'Today'
                    });

                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    showToast('Enquiry received! Our agents will contact you shortly.');
                }, 1200);
            });
        }

        // Careers Apply modal triggers
        window.openApplyModal = (jobTitle) => {
            const modal = document.getElementById('careers-apply-modal');
            const jobTitleElt = document.getElementById('careers-modal-job-title');
            if (modal && jobTitleElt) {
                jobTitleElt.innerText = jobTitle;
                modal.style.display = 'flex';
            }
        };

        window.closeApplyModal = () => {
            const modal = document.getElementById('careers-apply-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        };

        const applyForm = document.getElementById('careers-apply-form-elt');
        if (applyForm) {
            applyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = applyForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;"><circle cx="12" cy="12" r="10" stroke-dasharray="32 10" stroke-linecap="round"></circle></svg>
                    Submitting Application...
                `;

                setTimeout(() => {
                    closeApplyModal();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    applyForm.reset();
                    showToast('Application submitted successfully!');
                }, 1200);
            });
        }
    }

    /* ==========================================================================
       DYNAMIC PAGE RENDERING LOGICS
       ========================================================================== */
    window.renderTrackingResults = function renderTrackingResults(code) {
        const timeline = document.getElementById('tracking-timeline-container');
        const info = document.getElementById('tracking-info-container');
        
        if (!timeline || !info) return;

        // Show scanning loader screen
        info.innerHTML = `
            <div class="card reveal-fade-in active" style="text-align: center; padding: var(--space-2xl); position: relative; overflow: hidden; border-radius: var(--radius-lg); box-shadow: var(--shadow-premium);">
                <div class="scanning-beam" style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--color-primary-blue), transparent); animation: scan 1.8s linear infinite;"></div>
                <div style="font-size: var(--font-size-xl); color: var(--color-primary-blue); margin-bottom: var(--space-xs); font-family: var(--font-header); font-weight: 700; display:flex; align-items:center; justify-content:center; gap: 8px;">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin" viewBox="0 0 24 24" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle;"><circle cx="12" cy="12" r="10" stroke-dasharray="32 10" stroke-linecap="round"></circle></svg>
                    Querying Ledger Database...
                </div>
                <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Accessing secure blockchain dispatch endpoints for ID: <strong>${code}</strong>...</p>
            </div>
        `;
        timeline.innerHTML = '';

        setTimeout(() => {
            const record = MockDatabase.tracking[code];
            if (record) {
                // Render basic details
                info.innerHTML = `
                    <div class="tracking-info-grid reveal-fade-up active">
                        <div class="tracking-info-box">
                            <div class="tracking-info-label">Estimated Arrival</div>
                            <div class="tracking-info-val">${record.estDelivery}</div>
                        </div>
                        <div class="tracking-info-box">
                            <div class="tracking-info-label">Origin / Destination</div>
                            <div class="tracking-info-val" style="font-size: 11px;">${record.origin} â†’ ${record.destination}</div>
                        </div>
                        <div class="tracking-info-box">
                            <div class="tracking-info-label">Shipment Status</div>
                            <div class="tracking-info-val">
                                <span class="badge badge-${record.statusClass}">${record.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card reveal-fade-up active" style="margin-top: var(--space-md); text-align: left; box-shadow: var(--shadow-premium);">
                        <h4 class="heading-4" style="margin-bottom: var(--space-sm); color: var(--color-primary-navy);">Cargo Details</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); font-size: var(--font-size-sm);">
                            <div><strong>Tracking Code:</strong> ${record.number}</div>
                            <div><strong>Total Weight:</strong> ${record.weight}</div>
                            <div><strong>Volume Dims:</strong> ${record.dimensions}</div>
                            <div><strong>Prime Carrier:</strong> ${record.carrier}</div>
                        </div>
                        <div style="margin-top: var(--space-md);">
                            <strong style="font-size: var(--font-size-xs); color: var(--color-text-muted); display: block; margin-bottom: 4px;">LAST REPORTED LOCATION</strong>
                            <div class="map-placeholder" style="border-radius: var(--radius-md); overflow: hidden;">
                                <div class="map-pin" style="top: 45%; left: 60%;"></div>
                                <span style="font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-muted); z-index: 10; margin-top: 130px; background: rgba(255,255,255,0.85); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">${record.currentLocation}</span>
                            </div>
                        </div>
                    </div>
                `;

                // Render timeline nodes
                let timelineHtml = '';
                record.history.forEach((step, i) => {
                    const statusClass = step.status === 'active' ? 'active' : 'completed';
                    timelineHtml += `
                        <div class="timeline-item ${statusClass}" style="opacity: 0; transform: translateY(15px); animation: fadeUpHero 0.5s var(--easing-premium) ${i * 0.15}s forwards;">
                            <div class="timeline-node"></div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <span class="timeline-title">${step.title}</span>
                                    <span class="timeline-date">${step.date} - ${step.time}</span>
                                </div>
                                <div class="timeline-desc"><strong>Location:</strong> ${step.location} â€¢ ${step.desc}</div>
                            </div>
                        </div>
                    `;
                });
                timeline.innerHTML = `<div class="timeline">${timelineHtml}</div>`;
            } else {
                // Error case
                info.innerHTML = `
                    <div class="card reveal-fade-up active" style="border-left: 5px solid var(--color-danger); text-align: left; margin-top: var(--space-md); box-shadow: var(--shadow-premium);">
                        <h4 class="heading-4" style="color: var(--color-danger); margin-bottom: var(--space-2xs);">Invalid Tracking ID</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">The tracking number you searched was not found. Please try with: <strong>SBG-102948-US</strong> or <strong>SBG-584732-EU</strong>.</p>
                    </div>
                `;
                timeline.innerHTML = '';
            }
        }, 1000);
    }


    /* ==========================================================================
       SCROLL OBSERVER & ANIMATIONS
       ========================================================================== */
    function initScrollAnimations() {
        const revealOptions = {
            root: null,           // use the real viewport
            rootMargin: '0px',
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    if (entry.target.querySelector('.stat-count')) {
                        animateCounters(entry.target);
                    }
                    if (entry.target.classList.contains('journey-section')) {
                        animateJourneyPipeline();
                    }
                }
            });
        }, revealOptions);

        const revealElements = document.querySelectorAll(
            '.reveal-fade-up, .reveal-stagger-container, .reveal-fade-in, .text-reveal-ltr, .journey-section, .slide-in-left, .slide-in-right'
        );
        revealElements.forEach(el => observer.observe(el));
    }

    /* ==========================================================================
       STATISTICS COUNTER INCREMENTS
       ========================================================================== */
    function animateCounters(section) {
        const counters = section.querySelectorAll('.stat-count');
        counters.forEach(counter => {
            if (counter.classList.contains('counted')) return;
            counter.classList.add('counted');
            
            const target = parseFloat(counter.dataset.target);
            const suffix = counter.dataset.suffix || '';
            const decimals = parseInt(counter.dataset.decimals) || 0;
            const duration = 2000; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const currentVal = easeProgress * target;
                
                counter.innerText = currentVal.toFixed(decimals) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toFixed(decimals) + suffix;
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    
    /* ==========================================================================
       AUTOMATED JOURNEY PIPELINE ANIMATION
       ========================================================================== */
    
    /* ==========================================================================
       INTERACTIVE COMPANY JOURNEY PIPELINE
       ========================================================================== */
function animateJourneyPipeline() {
        const fill = document.getElementById('journey-progress-fill');
        const carrier = document.getElementById('journey-carrier-icon');
        const nodes = document.querySelectorAll('.journey-node');
        if (!fill || !carrier) return;

        // Reset state first
        fill.style.width = '0%';
        carrier.style.left = 'calc(5% - 15px)';
        nodes.forEach((n, idx) => {
            if (idx === 0) n.classList.add('active');
            else n.classList.remove('active');
        });

        // Trigger animation sequence
        setTimeout(() => {
            fill.style.width = '90%'; // Animate progress fill across the pipeline
            carrier.style.left = 'calc(95% - 15px)'; // Animate carrier icon position
            
            // Stagger node state activations chronologically
            nodes.forEach((node, idx) => {
                const delay = idx * 1000; // Trigger each step at 1s intervals
                setTimeout(() => {
                    node.classList.add('active');
                    const dot = node.querySelector('.node-dot');
                    if (dot) {
                        dot.classList.add('pulse-active');
                        setTimeout(() => dot.classList.remove('pulse-active'), 500);
                    }
                }, delay);
            });
        }, 400);
    }
/* ==========================================================================
       TESTIMONIAL CAROUSEL SLIDER
       ========================================================================== */
    let testimonialTimer = null;
    let currentTestimonialIndex = 0;

    window.setTestimonialSlide = (index) => {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        if (slides.length === 0) return;

        currentTestimonialIndex = index;

        slides.forEach((s, idx) => {
            if (idx === index) {
                s.style.display = 'block';
                s.classList.add('active');
            } else {
                s.style.display = 'none';
                s.classList.remove('active');
            }
        });

        dots.forEach((d, idx) => {
            if (idx === index) {
                d.classList.add('active');
                d.style.opacity = '1';
                d.style.width = '16px'; // Stretch active dot
            } else {
                d.classList.remove('active');
                d.style.opacity = '0.3';
                d.style.width = '8px';
            }
        });

        resetTestimonialAutoPlay();
    };

    function startTestimonialAutoPlay() {
        testimonialTimer = setInterval(() => {
            const slides = document.querySelectorAll('.testimonial-slide');
            if (slides.length === 0) return;
            let nextIndex = (currentTestimonialIndex + 1) % slides.length;
            setTestimonialSlide(nextIndex);
        }, 5000);
    }

    function resetTestimonialAutoPlay() {
        if (testimonialTimer) {
            clearInterval(testimonialTimer);
        }
        startTestimonialAutoPlay();
    }
    
    // Export helper to global scope for dot clicks
    window.startTestimonialAutoPlay = startTestimonialAutoPlay;
});
