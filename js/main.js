/**
 * PIXEL & CODE PY - Core Application Logic
 * Modern Corporate Software House Website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de WhatsApp (Número receptor de la empresa)
  const WHATSAPP_PHONE = '595992178480'; // Formato internacional sin +
  
  // Elementos DOM
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const contactForm = document.getElementById('contact-form');

  /* ==========================================
     1. Header Scroll & Mobile Nav Toggle
     ========================================== */
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Chequeo inicial

  if (mobileToggle && navMenu) {
    const closeMobileMenu = () => {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera del header
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !header.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================
     2. Currency Switcher (Gs. / USD)
     ========================================== */
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const currency = btn.getAttribute('data-currency');

      // Actualizar visibilidad de precios en las tarjetas
      document.querySelectorAll('.price-val-gs').forEach(el => {
        el.style.display = currency === 'GS' ? 'inline' : 'none';
      });
      document.querySelectorAll('.price-val-usd').forEach(el => {
        el.style.display = currency === 'USD' ? 'inline' : 'none';
      });
    });
  });

  /* ==========================================
     3. Scroll Reveal Animations (Observer)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: unobserve si solo queremos que anime una vez
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================
     4. Dynamic Code Typing in Hero Window
     ========================================== */
  const codeTypedTarget = document.getElementById('code-typing');
  if (codeTypedTarget) {
    const codeLines = [
      '<span class="kw">const</span> company = <span class="str">"Pixel & Code PY"</span>;',
      '<span class="kw">const</span> location = <span class="str">"Itauguá, Paraguay"</span>;',
      '<span class="kw">function</span> <span class="fn">buildDigitalSolution</span>(idea) {',
      '  <span class="kw">return</span> <span class="kw">new</span> <span class="fn">Solution</span>({',
      '    design: <span class="str">"100% Modern & Responsive"</span>,',
      '    code: <span class="str">"High Performance & Scalable"</span>,',
      '    result: <span class="str">"Ideas convertidas en realidad"</span>',
      '  });',
      '}'
    ];

    let lineIndex = 0;
    codeTypedTarget.innerHTML = '';

    const renderLines = () => {
      if (lineIndex < codeLines.length) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        lineDiv.innerHTML = `
          <span class="code-num">${lineIndex + 1}</span>
          <span class="code-text">${codeLines[lineIndex]}</span>
        `;
        codeTypedTarget.appendChild(lineDiv);
        lineIndex++;
        setTimeout(renderLines, 250);
      }
    };

    setTimeout(renderLines, 600);
  }

  /* ==========================================
     5. WhatsApp Link Generators
     ========================================== */
  window.openWhatsAppQuote = (serviceName = '') => {
    let text = 'Hola Pixel & Code PY! Me gustaría solicitar una cotización.';
    if (serviceName) {
      text = `Hola Pixel & Code PY! Estoy interesado en cotizar el servicio: *${serviceName}*. ¿Podrían brindarme más información?`;
    }
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  /* ==========================================
     6. Contact Form Submission handling
     ========================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        alert('Por favor completa tu nombre y teléfono / WhatsApp.');
        return;
      }

      const waMsg = `*Nueva Consulta desde la Web Pixel & Code PY*\n\n` +
        `👤 *Nombre:* ${name}\n` +
        `📞 *Teléfono:* ${phone}\n` +
        `💼 *Servicio de Interés:* ${service || 'General'}\n` +
        `💬 *Mensaje:* ${message || 'Sin mensaje adicional.'}`;

      const encoded = encodeURIComponent(waMsg);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
      
      window.open(waUrl, '_blank');
    });
  }
});
