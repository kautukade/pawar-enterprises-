(function(){
  const KEY='pe_demo_db_v2';
  const seed={
    services:[
      {id:'painting',name:'Interior & Exterior Painting',unit:'sq.ft',price:18,min:3500,active:true,icon:'PA',desc:'Premium wall preparation, primer and finish coats for homes and commercial spaces.'},
      {id:'waterproofing',name:'Waterproofing',unit:'sq.ft',price:55,min:5000,active:true,icon:'WP',desc:'Terrace, bathroom and wall leakage treatment with suitable systems.'},
      {id:'civil',name:'Civil Work & Renovation',unit:'sq.ft',price:450,min:7500,active:true,icon:'CW',desc:'Plaster, tiles, repair, masonry and renovation execution.'},
      {id:'plumbing',name:'Plumbing',unit:'point',price:850,min:1200,active:true,icon:'PL',desc:'Leak repair, fittings, pipelines and plumbing points.'},
      {id:'electrical',name:'Electrical Work',unit:'point',price:650,min:1200,active:true,icon:'EL',desc:'Switches, lights, wiring points and repair work.'},
      {id:'cleaning',name:'Deep Cleaning',unit:'sq.ft',price:6,min:2500,active:true,icon:'DC',desc:'Deep cleaning for homes, kitchens, bathrooms and offices.'}
    ],
    projects:[
      {id:'p1',title:'3BHK Interior Painting',type:'Painting',location:'Ulwe, Navi Mumbai',status:'ongoing',progress:68,start:'2026-10-01',before:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',after:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',note:'Wall repair, primer and premium finish coats in progress.'},
      {id:'p2',title:'Terrace Waterproofing',type:'Waterproofing',location:'Seawoods, Navi Mumbai',status:'ongoing',progress:42,start:'2026-10-03',before:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',after:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',note:'Surface preparation and first waterproofing layer completed.'}
    ],
    leads:[],quotes:[]
  };
  const clone=o=>JSON.parse(JSON.stringify(o));
  function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&x.services)return x;}catch(e){} localStorage.setItem(KEY,JSON.stringify(seed));return clone(seed)}
  function save(db){localStorage.setItem(KEY,JSON.stringify(db));return db}
  function db(){return load()}
  function list(key){return clone(db()[key]||[])}
  function put(key,item){const d=db();const arr=d[key]||[];const i=arr.findIndex(x=>x.id===item.id);if(i>-1)arr[i]={...arr[i],...item};else arr.unshift(item);d[key]=arr;save(d);return clone(item)}
  function remove(key,id){const d=db();d[key]=(d[key]||[]).filter(x=>x.id!==id);save(d)}
  function id(prefix){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6)}
  function quoteNo(){const d=new Date();return 'PEQ-'+d.getFullYear().toString().slice(-2)+(d.getMonth()+1).toString().padStart(2,'0')+'-'+Math.floor(1000+Math.random()*9000)}
  window.PEStore={KEY,seed:clone(seed),db,list,put,remove,id,quoteNo,reset(){localStorage.setItem(KEY,JSON.stringify(seed));return clone(seed)}};
})();