document.addEventListener('DOMContentLoaded',()=>{
  if(!window.PEStore)return;
  const form=document.getElementById('estimateForm'); if(!form)return;
  const rows=document.getElementById('quoteRows'), mini=document.getElementById('miniItems'), miniTotal=document.getElementById('miniTotal');
  const money=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:0});
  const services=()=>PEStore.list('services').filter(s=>s.active!==false);
  function addRow(serviceId){
    const all=services(), s=all.find(x=>x.id===serviceId)||all[0]; if(!s)return;
    const row=document.createElement('div'); row.className='quote-row';
    row.innerHTML=`<select class="qs">${all.map(x=>`<option value="${x.id}" ${x.id===s.id?'selected':''}>${x.name}</option>`).join('')}</select><div class="qty-wrap"><input class="qq" type="number" min="1" value="100"><span class="qunit">${s.unit}</span></div><div class="qrate">${money(s.price)}/${s.unit}</div><strong class="qamount">${money(Math.max(s.min||0,s.price*100))}</strong><button class="row-delete" type="button" aria-label="Remove">×</button>`;
    rows.appendChild(row); bindRow(row); recalc();
  }
  function bindRow(row){
    row.querySelector('.qs').addEventListener('change',()=>{const s=services().find(x=>x.id===row.querySelector('.qs').value);row.querySelector('.qunit').textContent=s.unit;row.querySelector('.qrate').textContent=money(s.price)+'/'+s.unit;recalc()});
    row.querySelector('.qq').addEventListener('input',recalc); row.querySelector('.row-delete').addEventListener('click',()=>{row.remove();recalc()});
  }
  function items(){return [...rows.querySelectorAll('.quote-row')].map(row=>{const s=services().find(x=>x.id===row.querySelector('.qs').value);const qty=Math.max(0,Number(row.querySelector('.qq').value||0));const amount=Math.max(Number(s.min||0),Number(s.price||0)*qty);row.querySelector('.qamount').textContent=money(amount);return {serviceId:s.id,name:s.name,unit:s.unit,qty,rate:s.price,amount}})}
  function recalc(){const arr=items();mini.innerHTML=arr.length?arr.map(x=>`<div class="mini-line"><span>${x.name}<small>${x.qty} ${x.unit} × ${money(x.rate)}</small></span><b>${money(x.amount)}</b></div>`).join(''):'<p class="empty-state">Add a service to see the estimate.</p>';miniTotal.textContent=money(arr.reduce((a,b)=>a+b.amount,0))}
  document.getElementById('addService').addEventListener('click',()=>addRow());
  form.addEventListener('submit',e=>{e.preventDefault();const arr=items();if(!arr.length){alert('Please add at least one service.');return}const total=arr.reduce((a,b)=>a+b.amount,0), no=PEStore.quoteNo(), now=new Date();const quote={id:PEStore.id('q'),quoteNo:no,name:document.getElementById('qName').value.trim(),phone:document.getElementById('qPhone').value.trim(),location:document.getElementById('qLocation').value.trim(),email:document.getElementById('qEmail').value.trim(),notes:document.getElementById('qNotes').value.trim(),items:arr,total,status:'new',createdAt:now.toISOString()};PEStore.put('quotes',quote);PEStore.put('leads',{id:PEStore.id('lead'),name:quote.name,phone:quote.phone,location:quote.location,service:arr.map(x=>x.name).join(', '),source:'Quotation Generator',status:'New',createdAt:quote.createdAt,quoteId:quote.id});document.getElementById('outNo').textContent=no;document.getElementById('outName').textContent=quote.name;document.getElementById('outContact').textContent=[quote.phone,quote.email].filter(Boolean).join(' • ');document.getElementById('outDate').textContent=now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});document.getElementById('outLocation').textContent=quote.location;document.getElementById('outItems').innerHTML=arr.map(x=>`<tr><td>${x.name}</td><td>${x.qty} ${x.unit}</td><td>${money(x.rate)}/${x.unit}</td><td>${money(x.amount)}</td></tr>`).join('');document.getElementById('outTotal').textContent=money(total);const out=document.getElementById('quoteOutput');out.classList.remove('hidden');out.scrollIntoView({behavior:'smooth',block:'start'});});
  addRow('painting');
});