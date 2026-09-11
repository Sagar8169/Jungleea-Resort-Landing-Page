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
});
