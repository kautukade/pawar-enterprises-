(function(){
  const cfg = window.PAWAR_CONFIG || {};
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
  }

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll('[data-service-area]').forEach(el=>el.textContent=cfg.serviceArea || 'Mumbai, Maharashtra');

  const params = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(key=>{
    document.querySelectorAll(`input[name="${key}"]`).forEach(input=>input.value=params.get(key)||'');
  });

  const goToQuote = () => {
    const target = document.querySelector('#quote-form') || document.querySelector('#contact') || document.querySelector('.form-card');
    if(target) target.scrollIntoView({behavior:'smooth',block:'center'});
    else window.location.href='contact.html';
  };

  document.querySelectorAll('[data-whatsapp]').forEach(el=>{
    el.addEventListener('click',e=>{
      e.preventDefault();
      const number=(cfg.whatsapp||cfg.phone||'').replace(/\D/g,'');
      if(number){
        const msg=encodeURIComponent(el.dataset.message || cfg.defaultWhatsAppMessage || 'Hello, I need a quote.');
        window.open(`https://wa.me/${number}?text=${msg}`,'_blank','noopener');
      }else{
        goToQuote();
        const note=document.querySelector('.notice');
        if(note){note.style.display='block';note.textContent='WhatsApp number can be added from assets/config.js. For now, please submit the quote form.';}
      }
    });
  });

  document.querySelectorAll('[data-call]').forEach(el=>{
    el.addEventListener('click',e=>{
      const number=(cfg.phone||'').replace(/\D/g,'');
      if(!number){e.preventDefault();window.location.href='contact.html';}
      else el.setAttribute('href',`tel:+${number}`);
    });
  });

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  document.querySelectorAll('form[data-lead-form]').forEach(form=>{
    form.addEventListener('submit',()=>{
      const submitted=form.querySelector('input[name="submitted_at"]');
      if(submitted) submitted.value=new Date().toISOString();
    });
  });
})();
