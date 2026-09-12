/* 
  Junglee Resort - Interactive JS Logic
  Includes Theme Switcher (Light / Dark Mode, default Light)
*/

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher Logic
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  // Set default theme to 'light' unless user saved 'dark' in localStorage
  const savedTheme = localStorage.getItem('junglee_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Light Mode');
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Mode');
      });
    }
    localStorage.setItem('junglee_theme', theme);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Interactive Package Calculator
  const roomSelect = document.getElementById('calcRoomType');
  const guestsInput = document.getElementById('calcGuests');
  const nightsInput = document.getElementById('calcNights');
  const pickupSelect = document.getElementById('calcPickup');
  const totalPriceElem = document.getElementById('calcTotalPrice');
  const calcBookBtn = document.getElementById('calcBookBtn');

  function calculateTotal() {
    if (!roomSelect || !guestsInput || !nightsInput || !totalPriceElem) return;

    const pricePerPerson = parseInt(roomSelect.value) || 1750;
    const guests = Math.max(1, parseInt(guestsInput.value) || 1);
    const nights = Math.max(1, parseInt(nightsInput.value) || 1);
    const pickupCharge = parseInt(pickupSelect ? pickupSelect.value : 0) || 0;

    const selectedOptionText = roomSelect.options[roomSelect.selectedIndex].text.split('(')[0].trim();
    
    // Calculation: (Price Per Person * Guests * Nights) + Pickup Charge
    const total = (pricePerPerson * guests * nights) + pickupCharge;
    totalPriceElem.textContent = `₹${total.toLocaleString('en-IN')}`;

    // Update WhatsApp link
    if (calcBookBtn) {
      const msg = `Hello Junglee Resort Team! 👋\n\nI want to book my stay at Junglee Resort:\n\n🏡 *Room Type:* ${selectedOptionText}\n👥 *Guests:* ${guests} Person(s)\n🌙 *Nights:* ${nights} Night(s)\n🚕 *Pick-up Service:* ${pickupSelect && pickupSelect.value > 0 ? 'Yes (Rs. 1500 One Way)' : 'No'}\n💰 *Estimated Total:* ₹${total.toLocaleString('en-IN')}\n\nPlease confirm availability and details!`;
      
      const encodedMsg = encodeURIComponent(msg);
      calcBookBtn.href = `https://wa.me/919953423776?text=${encodedMsg}`;
    }
  }

  if (roomSelect && guestsInput && nightsInput && pickupSelect) {
    roomSelect.addEventListener('change', calculateTotal);
    guestsInput.addEventListener('input', calculateTotal);
    nightsInput.addEventListener('input', calculateTotal);
    pickupSelect.addEventListener('change', calculateTotal);
    calculateTotal(); // initial run
  }

  // Food Menu Modal Controls
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuModal = document.getElementById('menuModal');

  if (openMenuBtn && menuModal) {
    openMenuBtn.addEventListener('click', () => {
      menuModal.classList.add('active');
    });
  }

  if (closeMenuBtn && menuModal) {
    closeMenuBtn.addEventListener('click', () => {
      menuModal.classList.remove('active');
    });
  }

  if (menuModal) {
    menuModal.addEventListener('click', (e) => {
      if (e.target === menuModal) {
        menuModal.classList.remove('active');
      }
    });
  }

  // Copy Bank Details Helper
  const copyBankBtn = document.getElementById('copyBankBtn');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', () => {
      const bankInfo = `Bank Account: Jungle Yoga\nCurrent A/C: 6516433866\nINDIAN BANK, Branch Rishikesh\nIFSC CODE: IDIB000R103`;
      navigator.clipboard.writeText(bankInfo).then(() => {
        showToast('Bank details copied to clipboard!');
      }).catch(() => {
        showToast('Account: 6516433866 | IFSC: IDIB000R103');
      });
    });
  }

  // Razorpay Payment Gateway Integration (Test Mode Key)
  const payRazorpayBtn = document.getElementById('payRazorpayBtn');
  const RAZORPAY_KEY_ID = 'rzp_test_Taz3hG6TnU5T7M';

  if (payRazorpayBtn) {
    payRazorpayBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const pricePerPerson = parseInt(roomSelect ? roomSelect.value : 1750) || 1750;
      const guests = Math.max(1, parseInt(guestsInput ? guestsInput.value : 1) || 1);
      const nights = Math.max(1, parseInt(nightsInput ? nightsInput.value : 1) || 1);
      const pickupCharge = parseInt(pickupSelect ? pickupSelect.value : 0) || 0;
      const totalAmount = (pricePerPerson * guests * nights) + pickupCharge;

      const selectedRoomText = roomSelect ? roomSelect.options[roomSelect.selectedIndex].text.split('(')[0].trim() : 'Wood House';
      const guestNameInput = document.getElementById('guestName');
      const guestPhoneInput = document.getElementById('guestPhone');
      const guestEmailInput = document.getElementById('guestEmail');

      const guestName = guestNameInput && guestNameInput.value ? guestNameInput.value : 'Sagar Mishra';
      const guestPhone = guestPhoneInput && guestPhoneInput.value ? guestPhoneInput.value : '9953423776';
      const guestEmail = guestEmailInput && guestEmailInput.value ? guestEmailInput.value : 'guest@jungleresort.com';

      if (typeof Razorpay === 'undefined') {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }

      const options = {
        "key": RAZORPAY_KEY_ID,
        "amount": totalAmount * 100, // paise
        "currency": "INR",
        "name": "Junglee Resort",
        "description": `Stay Booking: ${selectedRoomText} (${nights} Night/s)`,
        "image": "images/logo.jpg",
        "handler": function (response) {
          // Payment Success Callback -> Open Dummy Success Scene Modal!
          const payId = response.razorpay_payment_id || ('pay_test_' + Math.random().toString(36).substring(2, 10));
          
          document.getElementById('receiptPayId').textContent = payId;
          document.getElementById('receiptGuestName').textContent = guestName;
          document.getElementById('receiptRoomType').textContent = selectedRoomText;
          document.getElementById('receiptNights').textContent = `${nights} Night(s) / ${guests} Guests`;
          document.getElementById('receiptAmount').textContent = `₹${totalAmount.toLocaleString('en-IN')}`;

          const waMsg = `Hello Junglee Resort! 👋\n\nI have successfully completed my online payment!\n\n💳 *Payment ID:* ${payId}\n👤 *Guest Name:* ${guestName}\n🏡 *Room Type:* ${selectedRoomText}\n👥 *Guests:* ${guests} Person(s)\n🌙 *Nights:* ${nights}\n💰 *Total Paid:* ₹${totalAmount.toLocaleString('en-IN')}\n\nPlease send booking voucher!`;
          document.getElementById('receiptWaBtn').href = `https://wa.me/919953423776?text=${encodeURIComponent(waMsg)}`;

          // Display Success Modal
          const successModal = document.getElementById('successModal');
          if (successModal) {
            successModal.classList.add('active');
          }
        },
        "prefill": {
          "name": guestName,
          "email": guestEmail,
          "contact": guestPhone
        },
        "notes": {
          "resort": "Junglee Resort Rajaji National Park",
          "room_category": selectedRoomText
        },
        "theme": {
          "color": "#0F3822"
        }
      };

      try {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response) {
          showToast('Payment cancelled or failed');
        });
        rzp.open();
      } catch (err) {
        console.error('Razorpay Error:', err);
        showToast('Opening Razorpay Payment Modal...');
      }
    });
  }

  // Dynamic Inline Video Player Injection (Fixes Error 153 on file:// protocol)
  window.playInlineVideo = function(cardElem, videoId) {
    const posterWrapper = cardElem.querySelector('.video-poster-wrapper');
    if (posterWrapper) {
      posterWrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;"></iframe>`;
      posterWrapper.style.cursor = 'default';
      cardElem.onclick = null;
    }
  };

  // Video Modal Lightbox Handler
  window.openVideoModal = function(videoId, title) {
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoModalIframe');
    const videoTitle = document.getElementById('videoModalTitle');
    const watchOnYtBtn = document.getElementById('watchOnYtBtn');

    if (videoModal && videoIframe) {
      if (videoTitle) videoTitle.textContent = title || 'Official Video Guide';
      if (watchOnYtBtn) watchOnYtBtn.href = `https://www.youtube.com/watch?v=${videoId}`;
      
      // youtube-nocookie.com avoids Error 153 on file:// and cross-origin security blocks
      videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      videoModal.classList.add('active');
    }
  };

  window.closeVideoModal = function() {
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoModalIframe');

    if (videoModal) {
      videoModal.classList.remove('active');
    }
    if (videoIframe) {
      videoIframe.src = '';
    }
  };

  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Toast Notification Helper
  function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  // Floating Language Switcher Logic (English / Hindi)
  const langFloatBtn = document.getElementById('langFloatBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const langCurrentLabel = document.querySelector('.lang-current-label');

  // Multi-language Translations Dictionary
  const translations = {
    en: {
      navHome: "Home",
      navOverview: "Overview",
      navPackages: "Packages",
      navSurvival: "Jungle Survival",
      navRoute: "How To Reach",
      navRules: "Forest Rules",
      navSightseeing: "Sightseeing",
      navContact: "Contact",
      heroBadge: "10 KM Inside Rajaji Tiger Reserve & National Park",
      heroTitle: "Experience True <span>Wilderness & Survival</span> Deep in Himalayas",
      heroSub: "Nestled 10 km inside dense forests of Rajaji Tiger Reserve near Rishikesh (17 km) & Haridwar (25 km). Spot leopards, wild elephants, and rare bird species right from your doorstep.",
      heroBtnBook: "Book Room / Hut Stay",
      heroBtnRoute: "How To Reach (Watch Route)",
      calcTitle: "Instant Price Calculator & Quick Booking",
      survivalBadge: "Signature Wilderness Offer",
      survivalHeading: "Special Exclusive Experience",
      survivalSub: "Feel Of Jungle Survival Package",
      survivalDesc: "An unforgettable raw wilderness experience inside the dense Rajaji Tiger Reserve with woodfire cooking, dome camping, and dedicated forest support staff.",
      survivalInquire: "Inquire Survival Package",
      survivalPriceTitle: "Survival Package Price",
      pricePerson: "Per Person • Includes Delhi Pickup & Drop"
    },
    hi: {
      navHome: "होम",
      navOverview: "विवरण",
      navPackages: "पैकेज",
      navSurvival: "जंगल सर्वाइवल",
      navRoute: "कैसे पहुंचे",
      navRules: "जंगल नियम",
      navSightseeing: "दर्शनीय स्थल",
      navContact: "संपर्क करें",
      heroBadge: "राजाजी टाइगर रिजर्व के 10 किमी अंदर",
      heroTitle: "हिमालय के घने जंगलों में <span>असली वाइल्डरनेस और सर्वाइवल</span> का अनुभव करें",
      heroSub: "ऋषिकेश (17 किमी) और हरिद्वार (25 किमी) के पास राजाजी टाइगर रिजर्व के घने जंगलों में स्थित। अपने कमरे से ही तेंदुए, जंगली हाथी और दुर्लभ पक्षियों का अनुभव करें।",
      heroBtnBook: "कमरा / हट बुक करें",
      heroBtnRoute: "मार्ग निर्देश (वीडियो देखें)",
      calcTitle: "तुरंत मूल्य कैलकुलेटर और क्विक बुकिंग",
      survivalBadge: "विशेष सिग्नेचर ऑफर",
      survivalHeading: "विशेष एक्सक्लूसिव अनुभव",
      survivalSub: "जंगल सर्वाइवल पैकेज का अहसास",
      survivalDesc: "राजाजी टाइगर रिजर्व के घने जंगल में लकड़ी की आग पर खाना, डोम कैंपिंग और समर्पित फॉरेस्ट स्टाफ के साथ अविस्मरणीय सर्वाइवल अनुभव।",
      survivalInquire: "सर्वाइवल पैकेज इन्क्वायरी",
      survivalPriceTitle: "सर्वाइवल पैकेज मूल्य",
      pricePerson: "प्रति व्यक्ति • दिल्ली से पिकअप और ड्रॉप शामिल"
    }
  };

  const savedLang = localStorage.getItem('junglee_lang') || 'en';
  setLanguage(savedLang);

  if (langFloatBtn && langDropdown) {
    langFloatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('active');
    });
  }

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const selectedLang = opt.getAttribute('data-lang');
      setLanguage(selectedLang);
      if (langDropdown) langDropdown.classList.remove('active');
    });
  });

  function setLanguage(lang) {
    localStorage.setItem('junglee_lang', lang);

    if (langCurrentLabel) {
      langCurrentLabel.textContent = lang === 'hi' ? 'HIN' : 'ENG';
    }

    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    const dict = translations[lang] || translations.en;

    // Update Nav links
    const navLinks = document.querySelectorAll('#navMenu .nav-link');
    if (navLinks.length >= 8) {
      navLinks[0].textContent = dict.navHome;
      navLinks[1].textContent = dict.navOverview;
      navLinks[2].textContent = dict.navPackages;
      navLinks[3].textContent = dict.navSurvival;
      navLinks[4].textContent = dict.navRoute;
      navLinks[5].textContent = dict.navRules;
      navLinks[6].textContent = dict.navSightseeing;
      navLinks[7].textContent = dict.navContact;
    }

    // Update Hero text
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = `<i class="fa-solid fa-paw"></i> ${dict.heroBadge}`;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = dict.heroTitle;

    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = dict.heroSub;

    const heroBtnBook = document.querySelector('.hero-ctas .btn-primary');
    if (heroBtnBook) heroBtnBook.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${dict.heroBtnBook}`;

    const heroBtnRoute = document.querySelector('.hero-ctas .btn-secondary');
    if (heroBtnRoute) heroBtnRoute.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${dict.heroBtnRoute}`;

    // Special Exclusive Experience section text
    const survivalBadge = document.querySelector('.survival-badge');
    if (survivalBadge) survivalBadge.innerHTML = `<i class="fa-solid fa-crown" style="color: var(--accent);"></i> ${dict.survivalBadge}`;

    const survivalHeading = document.querySelector('.survival-content h3');
    if (survivalHeading) survivalHeading.textContent = dict.survivalHeading;

    const survivalSub = document.querySelector('.survival-content h2');
    if (survivalSub) survivalSub.textContent = dict.survivalSub;

    const survivalDesc = document.querySelector('.survival-content p');
    if (survivalDesc) survivalDesc.textContent = dict.survivalDesc;

    const survivalInquireBtn = document.querySelector('.btn-survival-cta');
    if (survivalInquireBtn) survivalInquireBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${dict.survivalInquire}`;

    const priceTitle = document.querySelector('.price-card-title');
    if (priceTitle) priceTitle.textContent = dict.survivalPriceTitle;

    const priceDesc = document.querySelector('.price-card-desc');
    if (priceDesc) priceDesc.textContent = dict.pricePerson;

    showToast(lang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है!' : 'Language switched to English!');
  }
});
