const d = document.getElementById('display');
const grid = document.querySelector('.grid');

function insert(k){
  if(k==='C') { d.value=''; return; }
  if(k==='=') { calc(); return; }
  d.value += k;
}

function calc(){
  let exp = d.value.replace(/×/g,'*').replace(/÷/g,'/'); // normalize
  try{
    // Safe-ish eval: allow digits, ops, parentheses, dot, percent
    if(!/^[0-9+\-*/().% \t]*$/.test(exp)) return;
    // % as modulo OR percentage (e.g., 50% -> 0.5)
    exp = exp.replace(/(\d+(\.\d+)?)%/g, (_,n)=> String(parseFloat(n)/100));
    const res = Function(`"use strict"; return (${exp})`)();
    if(Number.isFinite(res)) d.value = String(res);
  }catch{}
}

grid.addEventListener('click', (e)=>{
  const k = e.target.dataset.k; if(!k) return;
  insert(k);
});

d.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){ e.preventDefault(); calc(); }
});

document.addEventListener('keydown',(e)=>{
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='l'){ e.preventDefault(); d.select(); }
});
