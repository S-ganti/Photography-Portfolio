const I=new Proxy({},{get:(_,n)=>'assets/img/'+String(n)+'.jpg'});
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const DV=n=>String(n).padStart(2,'0').replace(/\d/g,d=>'०१२३४५६७८९'[d]);
const DV1=n=>String(n).replace(/\d/g,d=>'०१२३४५६७८९'[d]);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- content ---------- */
const TOD=[{h:0,name:'Late night',imgs:[809,876],c:'#3c5fd6',arc:'#22345f'},{h:3,name:'First light',imgs:[659,424],c:'#c9b8e0',arc:'#8e86a8'},{h:6,name:'Morning',imgs:[518,664],c:'#f2d9a0',arc:'#e7cf96'},{h:9,name:'High sun',imgs:[891,200],c:'#fff4d6',arc:'#f4efe2'},{h:12,name:'Afternoon',imgs:[874,198],c:'#efcf7c',arc:'#e9c46a'},{h:15,name:'Golden hour',imgs:[410,408],c:'#ff8a3d',arc:'#ff7a33'},{h:18,name:'Dusk',imgs:[216,418],c:'#e0552b',arc:'#c4452a'},{h:21,name:'Night',imgs:[865,641],c:'#ff9a3c',arc:'#5a3a1c'}];
const COVERS=[178,162,73,232,234,32,244,476,19,715,167,186,703,720,666,675,165,914];
const MOS=[914,252,254,181,276,246,890,893,665,392,478,670,814,842,847,255];
const BRUSH=[245,508,479,399,775,436,357,65];
const TT={4:['street','light'],5:['night'],84:['motion'],90:['night','light'],131:['sea'],146:['built','colour'],187:['silhouette','light'],213:['motion'],223:['motion','abstract'],235:['built'],242:['night','silhouette'],260:['night'],274:['street'],285:['abstract','light'],288:['built','sea'],292:['night','abstract'],313:['night','motion','colour'],319:['built','silhouette'],333:['sea','motion'],417:['built','colour'],430:['motion','abstract'],454:['motion'],466:['sea','colour'],494:['motion','sea'],504:['silhouette','light'],515:['silhouette','light'],517:['built','light'],527:['abstract','colour'],544:['motion','street'],589:['built'],626:['abstract','built'],645:['motion','night'],660:['motion','abstract'],680:['night','street'],704:['built','night'],729:['light','street'],772:['motion'],779:['motion','colour'],780:['sea','silhouette'],792:['sea'],844:['street','night'],850:['motion'],884:['street'],894:['motion','abstract'],906:['motion','sea'],915:['silhouette']};
const TABLE=Object.keys(TT).map(Number);
const ROLL=[406,770,144,460,427,489,431,790,398,143,238,346],VERBS=['wake','look','climb','walk','rest','swim','drift','scatter','anchor','glow','rush','reflect'];
const SHEET=[482,74,82,194,803,15,10,873,215,266,535,451,193,584,669];
const ST={482:['street'],74:['silhouette','colour'],82:['street'],194:['street'],803:['colour','abstract'],15:['light','colour'],10:['light','colour'],873:['built'],215:['street'],266:['street'],535:['colour','abstract'],451:['abstract','sea'],193:['light','colour'],584:['colour','motion'],669:['silhouette']};
const ARCH={street:[2,253,401,610,668,900,393,500,887,889,781,791],motion:[22,251,658,661,771,846,848,905,908,183,20,849],light:[163,719,640,477,702,777,919,920],sea:[480,425,426,453,491,797,139,485,141,332,43,452,488,794],built:[320,348,351,271,301,312,63],night:[872,810,843,853],silhouette:[715,167,186,703,720,666,675,165,832,813,667,646,519,529],unfaced:[689,672,705,534],colour:[217,474,614,621,172,120,83,684,300,311,524,526,470,471,473],abstract:[495,904]};
const MODE={street:'Street',motion:'Motion',light:'Light',sea:'Sea',built:'Built',night:'Night',silhouette:'Silhouette',unfaced:'Unfaced',colour:'Colour',abstract:'Abstract'};
const AL=(()=>{const ks=Object.keys(ARCH),out=[],mx=Math.max(...ks.map(k=>ARCH[k].length));for(let i=0;i<mx;i++)ks.forEach(k=>{if(ARCH[k][i]!==undefined)out.push({n:ARCH[k][i],k})});return out})();
$('#film').innerHTML=ROLL.map((n,i)=>`<figure data-cur="develop"><figcaption><span class="dv">${DV(i+1)}</span><span class="vb">${VERBS[i]}</span><span>▸ ${n}</span></figcaption><img data-n="${n}" alt="Frame ${n}, ${VERBS[i]}"></figure>`).join('');
$('#mos').innerHTML=MOS.map(n=>`<div class="tl"><img data-n="${n}" alt="Frame ${n}"><span>#${n}</span></div>`).join('');
let SHEETN=SHEET.slice(),tuned=null;
function renderSheet(anim){const cs=$('#cs');cs.classList.remove('recut');cs.innerHTML=SHEETN.map((n,i)=>`<button class="cf" data-i="${i}" data-n2="${n}" data-cur="loupe" aria-label="Open frame ${n} under the loupe"><div class="ph"><img src="${I[n]}" alt=""></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="52" rx="${45+(i%3)}" ry="${44-(i%2)*3}" transform="rotate(${i%2?-4:3} 50 50)"/></svg><span class="x" aria-hidden="true">✕</span><div class="lab"><span class="dv">${DV(i+1)}</span><span>#${n}</span></div></button>`).join('');if(anim){void cs.offsetWidth;cs.classList.add('recut')}}
renderSheet(false);
const mq='<span>Suspended <em>Reverie</em></span><span class="dv">●</span><span>Un<em>faced</em></span><span class="dv">●</span><span>After<em>image</em></span><span class="dv">●</span>';
$('#marq').innerHTML=mq+mq+mq+mq;
$('#arch').innerHTML=AL.map((o,i)=>`<button class="af" data-k="${o.k}" data-n2="${o.n}" data-cur="loupe" aria-label="Open frame ${o.n}"><img data-n="${o.n}" alt="" loading="lazy" width="400" height="300"><span class="cap"><span>${MODE[o.k]}</span><span>#${o.n}</span></span></button>`).join('');
$$('[data-n]').forEach(e=>{e.src=I[e.dataset.n];e.decoding='async';if(e.hasAttribute('width')){e.onload=()=>{e.removeAttribute('width');e.removeAttribute('height')}}});

/* ---------- sound (off by default; WebAudio, no files) ---------- */
let AC=null,soundOn=false;
function noise(t0,dur,gain,hp){const b=AC.createBuffer(1,AC.sampleRate*dur,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
  const s=AC.createBufferSource();s.buffer=b;const f=AC.createBiquadFilter();f.type='highpass';f.frequency.value=hp;const g=AC.createGain();g.gain.value=gain;s.connect(f).connect(g).connect(AC.destination);s.start(t0)}
function shutter(){if(!soundOn||!AC)return;const t=AC.currentTime;noise(t,.05,.5,1800);noise(t+.07,.04,.35,2600)}
function tick(){if(!soundOn||!AC)return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.frequency.value=2200;g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.0001,t+.03);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+.04)}
$('#snd').onclick=()=>{soundOn=!soundOn;$('#snd').setAttribute('aria-pressed',soundOn);if(soundOn){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();AC.resume();shutter()}catch(e){}}};

/* ---------- print mode ---------- */
function setMode(m){document.documentElement.dataset.mode=m;$('#mode').setAttribute('aria-pressed',m==='print');store.set('sg-mode',m)}
setMode(store.get('sg-mode','dark'));
$('#mode').onclick=()=>setMode(document.documentElement.dataset.mode==='print'?'dark':'print');

/* ---------- cursor ---------- */
const cur=$('#cur'),curLab=$('#curLab');let mx=innerWidth/2,my=innerHeight/2,cx_=mx,cy_=my;
const LAB={drag:'Drag',develop:'Develop',loupe:'Loupe',turn:'Turn'};
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;const t=e.target.closest&&e.target.closest('[data-cur]');const k=t?t.dataset.cur:'';
  cur.classList.toggle('lamp',k==='lamp');cur.classList.toggle('torch',k==='torch');cur.classList.toggle('big',!!LAB[k]);curLab.textContent=LAB[k]||''},{passive:true});

/* ---------- developing counter + chapter name ---------- */
const devEl=$('#dev'),devN=$('#devN');let devDone=false;
(function(){const t0=performance.now(),D=RM?1:1400;(function f(t){const p=Math.min(1,(t-t0)/D);devN.textContent=String(Math.round(p*p*100)).padStart(3,'0');if(p<1)requestAnimationFrame(f);else{devDone=true;setTimeout(()=>chapter(),500)}})(t0)})();
const chs=$$('[data-name]');let curCh='c1';
function chapter(){if(!devDone)return;const c=document.getElementById(curCh);const i=['c1','c2','c3','c4','c5','c6','c7'].indexOf(curCh)+1;devEl.innerHTML=`<span class="dv">${DV(i)}</span> &nbsp;${c.dataset.name}`}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){curCh=e.target.id;$$('#rail a').forEach(a=>a.classList.toggle('on',a.dataset.c===curCh));chapter()}})},{rootMargin:'-45% 0px -50% 0px'});
chs.forEach(s=>io.observe(s));

/* ---------- ०१ hero lamp, flash, meter ---------- */
const hero=$('#c1');
let coverN=COVERS[Math.floor(Math.random()*COVERS.length)];
const pickCover=()=>{let n;do{n=COVERS[Math.floor(Math.random()*COVERS.length)]}while(n===coverN&&COVERS.length>1);return n};
function setCover(n){coverN=n;const pre=new Image();pre.onload=()=>{$('#cg').src=pre.src;$('#cl').src=pre.src;$('#cl').alt='Cover, frame '+n;$('#coverN').textContent='#'+n;hero.classList.remove('swap');mdata=null;mimg.src=pre.src};pre.src=I[n]}let tx=.5,ty=.42,lx=.5,ly=.42,lastMove=-1e9;
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;lastMove=performance.now();$('#hint').style.opacity=.0});
function flash(){hero.classList.remove('flash');void hero.offsetWidth;hero.classList.add('flash','swap');shutter();setTimeout(()=>setCover(pickCover()),120);setTimeout(()=>hero.classList.remove('flash'),650)}
hero.addEventListener('click',flash);
const mc=document.createElement('canvas');mc.width=160;mc.height=100;const mctx=mc.getContext('2d',{willReadFrequently:true});let mdata=null;
const mimg=new Image();mimg.onload=()=>{try{mctx.clearRect(0,0,mc.width,mc.height);const r=hero.getBoundingClientRect();mc.height=Math.round(160*r.height/r.width)||100;const s=Math.min(mc.width/mimg.width,mc.height/mimg.height,1e9);mctx.fillStyle='#070708';mctx.fillRect(0,0,mc.width,mc.height);mctx.drawImage(mimg,(mc.width-mimg.width*s)/2,(mc.height-mimg.height*s)/2,mimg.width*s,mimg.height*s);mdata=mctx.getImageData(0,0,mc.width,mc.height).data}catch(_){mdata=null}};
setCover(coverN);
let evS=0;
function meter(){if(!mdata)return;let sum=0,c=0;const px=Math.round(lx*mc.width),py=Math.round(ly*mc.height);
  for(let dy=-6;dy<=6;dy+=2)for(let dx=-6;dx<=6;dx+=2){const X=clamp(px+dx,0,mc.width-1),Y=clamp(py+dy,0,mc.height-1),k=(Y*mc.width+X)*4;sum+=.2126*mdata[k]+.7152*mdata[k+1]+.0722*mdata[k+2];c++}
  const L=sum/c/255,ev=clamp(Math.log2((L+.004)/.18),-3,3);evS+=(ev-evS)*.2;$('#nd').style.left=((evS+3)/6*100).toFixed(1)+'%';$('#ev').textContent=(evS>=0?'+':'−')+Math.abs(evS).toFixed(1)}

/* ---------- ०२ thesis word reveal ---------- */
const th=$('#thesis');
th.innerHTML=th.innerHTML.replace(/<span class="em">(.*?)<\/span>/,(m,a)=>'§'+a+'§').split(/(§[^§]*§)/).map(part=>part.startsWith('§')?part.slice(1,-1).split(' ').map(w=>`<span class="em">${w}</span>`).join(' '):part.trim().split(/\s+/).map(w=>w?`<span>${w}</span>`:'').join(' ')).join(' ');
const words=$$('#thesis span');
function thesis(){const r=th.getBoundingClientRect(),p=clamp((innerHeight*.85-r.top)/(r.height+innerHeight*.35),0,1),n=Math.round(p*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<n||RM))}
/* withheld lamp */
const wh=$('#wh');let wtx=.5,wty=.4,wx=.5,wy=.4,wlast=-1e9;
wh.addEventListener('pointermove',e=>{const r=wh.getBoundingClientRect();wtx=(e.clientX-r.left)/r.width;wty=(e.clientY-r.top)/r.height;wlast=performance.now()});
/* iris */
const iris=$('#iris'),irisF=$('#irisF'),irisPoly=$('#irisS polygon'),irisS=$('#irisS'),tiles=$$('#mos .tl');
const L1=[[24,0,52,100]];for(let c=0;c<2;c++)for(let r=0;r<4;r++)L1.push([c*12,r*25,12,25]);for(let r=0;r<4;r++)L1.push([76,r*25,12,25]);for(let r=0;r<3;r++)L1.push([88,r*100/3,12,100/3]);
const L2=[];{const xs=[0,30,52,80],ws=[30,22,28,20],hs=[[40,20,25,15],[15,35,20,30],[30,15,35,20],[25,30,15,30]];for(let c=0;c<4;c++){let y=0;hs[c].forEach(h=>{L2.push([xs[c],y,ws[c],h]);y+=h})}}
const L3=[...Array(16)].map((_,i)=>[(i%8)*12.5,Math.floor(i/8)*50,12.5,50]),L4=[...Array(16)].map((_,i)=>[(i%4)*25,Math.floor(i/4)*25,25,25]),LS=[L1,L2,L3,L4];
let irisPS=0;
function irisDraw(){const r=iris.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const pt=clamp(-r.top/(r.height-innerHeight),0,1);irisPS+=RM?pt-irisPS:(pt-irisPS)*.075;if(Math.abs(pt-irisPS)<.0005)irisPS=pt;const p=irisPS;
  const w=innerWidth,h=innerHeight,op=clamp(p/.24,0,1),R=10+Math.pow(op,1.3)*Math.hypot(w,h)*.56,rot=op*120*Math.PI/180;
  const pts=[...Array(7)].map((_,i)=>{const a=rot+i*2*Math.PI/7;return[w/2+R*Math.cos(a),h/2+R*Math.sin(a)]});
  irisF.style.clipPath=`polygon(${pts.map(q=>q[0].toFixed(1)+'px '+q[1].toFixed(1)+'px').join(',')})`;
  const m=clamp((p-.24)/.72,0,1)*3;
  tiles.forEach((el,i)=>{const mi=clamp(m*1.25-(i/15)*.75,0,3),sg=Math.min(2,Math.floor(mi)),f0=mi-sg,f=f0*f0*f0*(f0*(f0*6-15)+10),a=LS[sg][i],b=LS[sg+1][i],v=a.map((x,k)=>x+(b[k]-x)*f);
    el.style.left=v[0].toFixed(3)+'%';el.style.top=v[1].toFixed(3)+'%';el.style.width=v[2].toFixed(3)+'%';el.style.height=v[3].toFixed(3)+'%'});
  $('#irisG').textContent=DV(Math.min(4,1+Math.round(m)));
  irisS.setAttribute('viewBox',`0 0 ${w} ${h}`);irisPoly.setAttribute('points',pts.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' '));
  $('#irisP').textContent=Math.round(op*100)+'%';$('#irisBig').style.opacity=(1-op*2.2).toFixed(2)}

/* ---------- ०३ ring: a day of light ---------- */
{let s='';const P=(r,a)=>[(r*Math.sin(a)).toFixed(2),(-r*Math.cos(a)).toFixed(2)];
  s+='<circle r="98" fill="none" stroke="currentColor" stroke-width=".7"/><circle r="79" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width=".3"/>';
  for(let i=0;i<96;i++){const a=i*3.75*Math.PI/180,l=i%4===0?8:(i%2===0?5:2.6),[x1,y1]=P(98,a),[x2,y2]=P(98-l,a);s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${i%4===0?.9:.35}"/>`}
  for(let h=0;h<24;h++){const a=h*15*Math.PI/180,[x,y]=P(85,a);s+=`<text class="hn" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" transform="rotate(${h*15} ${x} ${y})">${DV(h)}</text>`}
  TOD.forEach((d,k)=>{const a0=(k*45+1.5)*Math.PI/180,a1=((k+1)*45-1.5)*Math.PI/180,[x0,y0]=P(73,a0),[x1,y1]=P(73,a1);
    s+=`<path d="M${x0} ${y0} A73 73 0 0 1 ${x1} ${y1}" fill="none" stroke="${d.arc}" stroke-width="5"/>`;
    const am=(k*45+22.5)*Math.PI/180,[tx,ty]=P(64,am);s+=`<text class="sl" x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="central" transform="rotate(${k*45+22.5} ${tx} ${ty})">${d.name}</text>`});
  $('#dialG').innerHTML=s}
let ang=0,hour=-1,curPlate=0,front=$('#pA'),back=$('#pB');
const palCache={};
function palette(n,cb){if(palCache[n])return cb(palCache[n]);const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=40;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0,40,40);let d;try{d=x.getImageData(0,0,40,40).data}catch(_){return}const b={};
  for(let i=0;i<d.length;i+=4){const k=(d[i]>>5)+','+(d[i+1]>>5)+','+(d[i+2]>>5);(b[k]=b[k]||{n:0,r:0,g:0,bl:0}).n++;b[k].r+=d[i];b[k].g+=d[i+1];b[k].bl+=d[i+2]}
  const arr=Object.values(b).sort((a,b)=>b.n-a.n).map(o=>[o.r/o.n|0,o.g/o.n|0,o.bl/o.n|0]),out=[];
  for(const c of arr){if(out.every(o=>Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2])>70))out.push(c);if(out.length===5)break}
  while(out.length<5&&arr.length>out.length)out.push(arr[out.length]);
  out.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));palCache[n]=out.map(c=>'#'+c.map(v=>v.toString(16).padStart(2,'0')).join(''));cb(palCache[n])};im.src=I[n]}
const segName=s=>{const w=s.split(' ');return w.length>1?w.slice(0,-1).join(' ')+' <em>'+w[w.length-1]+'</em>':'<em>'+s+'</em>'};
function showPlate(n){if(n===curPlate)return;curPlate=n;const im=back;im.onload=()=>{im.onload=null;im.classList.remove('out');front.classList.add('out');[front,back]=[back,front]};im.alt='Frame '+n;im.src=I[n];
  palette(n,p=>{$('#sw').innerHTML=p.map(h=>`<button style="background:${h}" data-h="${h}" aria-label="Copy ${h}"><span>${h}</span></button>`).join('')})}
function setRing(a){ang=a;$('#dialG').setAttribute('transform',`rotate(${ang.toFixed(2)})`);
  const h=((Math.round(-ang/15)%24)+24)%24;if(h===hour)return;hour=h;
  const k=Math.floor(h/3),d=TOD[k],n=d.imgs[Math.min(d.imgs.length-1,Math.floor((h-d.h)*d.imgs.length/3))];
  $('#c3').style.setProperty('--glow',d.c);$('#rcT').textContent=DV(h)+':००';$('#rcS').textContent=d.name;$('#rcG').textContent=(h>=6&&h<18)?'☀':'☾';
  $('#lcdD').textContent=DV(h);$('#lcdN').textContent='#'+n;$('#pSeg').innerHTML=segName(d.name);$('#pN').textContent='Plate #'+n;
  $('#dial').setAttribute('aria-valuenow',h);$('#dial').setAttribute('aria-valuetext',`${h}:00, ${d.name}, frame ${n}`);tick();showPlate(n)}
const istHour=()=>+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',hourCycle:'h23'}).format(new Date())%24;
setRing(-istHour()*15);
const dial=$('#dial');let drag=null;
const cen=()=>{const r=dial.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
dial.addEventListener('pointerdown',e=>{const[a,b]=cen();drag={a0:Math.atan2(e.clientY-b,e.clientX-a)*180/Math.PI,s:ang};dial.setPointerCapture(e.pointerId)});
dial.addEventListener('pointermove',e=>{if(!drag)return;const[a,b]=cen();let d=Math.atan2(e.clientY-b,e.clientX-a)*180/Math.PI-drag.a0;if(d>180)d-=360;if(d<-180)d+=360;setRing(drag.s+d)});
const end=()=>{if(!drag)return;drag=null;spin(Math.round(ang/15)*15)};
dial.addEventListener('pointerup',end);dial.addEventListener('pointercancel',end);
function spin(t){if(RM){setRing(t);return}const s=ang,t0=performance.now();(function f(n){const p=Math.min(1,(n-t0)/460),e=1-Math.pow(1-p,3);setRing(s+(t-s)*e);if(p<1)requestAnimationFrame(f)})(t0)}
$('#next').onclick=()=>spin(Math.round(ang/15)*15-15);$('#prev').onclick=()=>spin(Math.round(ang/15)*15+15);
$('#nowB').onclick=()=>{const t=-istHour()*15;let d=((t-ang)%360+540)%360-180;spin(ang+d)};
dial.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();$('#next').click()}if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();$('#prev').click()}});
$('#sw').addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(!b)return;const h=b.dataset.h,done=()=>{$('#copied').textContent='Copied '+h;setTimeout(()=>$('#copied').textContent='',1600)};
  try{navigator.clipboard.writeText(h).then(done,()=>{$('#copied').textContent=h})}catch(_){$('#copied').textContent=h}});

/* ---------- ०४ afterimage: paint with long exposures ---------- */
const cv=$('#cv'),cx=cv.getContext('2d'),aih=$('#aih'),stamp=document.createElement('canvas'),sx=stamp.getContext('2d');
let cw=0,chh=0,dpr=1,bi=0,bimgs=[],bcache={},ppx=null,ppy=null,dist=0,lastIn=-1e9,auto=0,apx=null,apy=null,seeded=false;
BRUSH.forEach((n,i)=>{const im=new Image();im.onload=()=>{bimgs[i]=im;if(i===0&&!seeded)seed()};im.src=I[n]});
$('#brushes').innerHTML=BRUSH.map((n,i)=>`<button data-b="${i}" aria-pressed="${i===0}" aria-label="Paint with frame ${n}" style="background-image:url('${I[n]}')"></button>`).join('');
function brushCanvas(i){const k=i+'_'+cw+'x'+chh;if(!bcache[k]&&bimgs[i]){const c=document.createElement('canvas');c.width=cw;c.height=chh;const im=bimgs[i],s=Math.max(cw/im.width,chh/im.height),w=im.width*s,h=im.height*s;c.getContext('2d').drawImage(im,(cw-w)/2,(chh-h)/2,w,h);bcache[k]=c}return bcache[k]}
function sizeA(){const r=cv.getBoundingClientRect();if(!r.width)return;const nw=Math.round(r.width*Math.min(devicePixelRatio||1,1.5));if(nw===cw)return;dpr=Math.min(devicePixelRatio||1,1.5);cw=cv.width=nw;chh=cv.height=Math.round(r.height*dpr);bcache={};wipe();seeded=false;seed()}
function wipe(){cx.globalCompositeOperation='source-over';cx.globalAlpha=1;cx.fillStyle='#0b0a08';cx.fillRect(0,0,cw,chh)}
function stampAt(x,y,r){const bc=brushCanvas(bi);if(!bc)return;const d=Math.ceil(r*2);if(stamp.width!==d){stamp.width=stamp.height=d}
  sx.globalCompositeOperation='source-over';sx.clearRect(0,0,d,d);sx.drawImage(bc,x-r,y-r,d,d,0,0,d,d);
  sx.globalCompositeOperation='destination-in';const g=sx.createRadialGradient(r,r,0,r,r,r);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.5,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');sx.fillStyle=g;sx.fillRect(0,0,d,d);
  cx.globalCompositeOperation='source-over';cx.globalAlpha=.85;cx.drawImage(stamp,x-r,y-r);cx.globalAlpha=1;cx.globalCompositeOperation='source-over'}
function paintSeg(x0,y0,x1,y1,manual){const L=Math.hypot(x1-x0,y1-y0);if(!L)return;const r=clamp(230-L*1.6,80,230)*dpr,step=Math.max(6,r/dpr*.2),n=Math.min(36,Math.ceil(L/step));
  for(let i=1;i<=n;i++){const k=i/n;stampAt((x0+(x1-x0)*k)*dpr,(y0+(y1-y0)*k)*dpr,r)}
}
function setBrush(i,manual){bi=i;$('#aiN').textContent='#'+BRUSH[bi];$$('#brushes button').forEach((b,k)=>b.setAttribute('aria-pressed',k===bi));if(manual){shutter();tick()}}
function autoStep(){const w=cw/dpr,h=chh/dpr;auto+=.011;const x=w*(.5+.38*Math.sin(auto*1.3)),y=h*(.46+.3*Math.sin(auto*2.1+.6));if(apx!==null)paintSeg(apx,apy,x,y,false);apx=x;apy=y}
function seed(){if(!cw||!bimgs[0]||seeded)return;seeded=true;for(let k=0;k<160;k++)autoStep()}
aih.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(ppx!==null)paintSeg(ppx,ppy,x,y,true);ppx=x;ppy=y;lastIn=performance.now();apx=null});
aih.addEventListener('pointerleave',()=>{ppx=null});
cv.addEventListener('click',()=>setBrush((bi+1)%BRUSH.length,true));
$('#brushes').addEventListener('click',e=>{const b=e.target.closest('[data-b]');if(b)setBrush(+b.dataset.b,true)});
$('#aiNext').onclick=()=>setBrush((bi+1)%BRUSH.length,true);
$('#aiClear').onclick=()=>{wipe();tick()};
/* film */
const strip=$('#strip'),film=$('#film'),figs=$$('#film figure');let extra=0,lastY=scrollY,skew=0,vel=0;
function layout(){sizeA();buildLT()}
const fw=$('#fw');let fwPrev=0,fdrag=null;
fw.addEventListener('wheel',e=>{const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY,max=fw.scrollWidth-fw.clientWidth;
  if((d>0&&fw.scrollLeft<max-1)||(d<0&&fw.scrollLeft>1)){e.preventDefault();fw.scrollLeft+=d}},{passive:false});
fw.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;fdrag={x:e.clientX,s:fw.scrollLeft};fw.setPointerCapture(e.pointerId)});
fw.addEventListener('pointermove',e=>{if(fdrag)fw.scrollLeft=fdrag.s-(e.clientX-fdrag.x)});
fw.addEventListener('pointerup',()=>fdrag=null);fw.addEventListener('pointercancel',()=>fdrag=null);
addEventListener('resize',layout);addEventListener('load',layout);setTimeout(layout,300);
/* ---------- light table ---------- */
const lt=$('#lt'),ltIn=$('#ltIn');let BW=1,BH=1,lox=0,loy=0,lvx=0,lvy=0,ldrag=null,ltScale=0;
function rnd(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function buildLT(){const s=innerWidth<700?.6:1;if(s===ltScale)return;ltScale=s;const cw2=290*s,ch2=270*s,cols=9,rows=Math.ceil(TABLE.length/cols);BW=cols*cw2;BH=rows*ch2;let html='';
  TABLE.forEach((n,i)=>{const r=rnd(i*7+3),c=i%cols,rw=Math.floor(i/cols),x=c*cw2+r()*cw2*.3,y=rw*ch2+r()*ch2*.25,w=(140+r()*90)*s,rot=(r()-.5)*11;
    html+=`<button class="pr" data-t="${i}" data-n2="${n}" style="left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;--w:${w.toFixed(0)}px;--r:${rot.toFixed(1)}deg" aria-label="Open outtake ${n}" tabindex="${i<12?0:-1}"><img data-src="${n}" alt="" draggable="false"><span>#${n}</span></button>`});
  ltIn.innerHTML=[0,1,2,3,4,5,6,7,8].map(k=>`<div class="blk"${k?' aria-hidden="true"':''}>${html}</div>`).join('');$$('#ltIn img').forEach(im=>im.src=I[im.dataset.src]);paintSel()}
lt.addEventListener('pointerdown',e=>{if(e.button>0)return;ldrag={x:e.clientX,y:e.clientY,ox:lox,oy:loy,mv:0,lx:e.clientX,ly:e.clientY,touch:e.pointerType==='touch'};lvx=lvy=0;if(!ldrag.touch)lt.setPointerCapture(e.pointerId)});
lt.addEventListener('pointermove',e=>{if(!ldrag)return;const dx=e.clientX-ldrag.x,dy=ldrag.touch?0:e.clientY-ldrag.y;lox=ldrag.ox+dx/ltZ;loy=ldrag.oy+dy/ltZ;ldrag.mv=Math.max(ldrag.mv,Math.hypot(dx,dy));lvx=e.clientX-ldrag.lx;lvy=ldrag.touch?0:e.clientY-ldrag.ly;ldrag.lx=e.clientX;ldrag.ly=e.clientY});
let ltZ=1,ltZT=1,tapT=null,tapAt=0;
const ltUp=e=>{if(!ldrag)return;const d=ldrag;ldrag=null;if(d.mv<6){const now=performance.now();if(now-tapAt<320){clearTimeout(tapT);tapAt=0;ltZT=ltZT===1?.42:1;tick();return}tapAt=now;const ex=e.clientX,ey=e.clientY;tapT=setTimeout(()=>{const p=document.elementsFromPoint(ex,ey).find(el=>el.classList&&el.classList.contains('pr'));if(p){lastFocus=p;LL=TABLE;markable=true;openL(+p.dataset.t);shutter();$('#lx').focus()}},300)}};
lt.addEventListener('pointerup',ltUp);lt.addEventListener('pointercancel',()=>{ldrag=null});
lt.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const p=e.target.closest('.pr');if(p){e.preventDefault();lastFocus=p;LL=TABLE;markable=false;openL(+p.dataset.t)}}});
lt.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();lox-=e.deltaX}},{passive:false});
function ltFrame(){const r=lt.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  if(!ldrag){lox+=lvx;loy+=lvy;lvx*=.94;lvy*=.94;if(!RM&&Math.abs(lvx)<.3)lox-=.35}
  if(Math.abs(ltZT-ltZ)>.0005){const z0=ltZ;ltZ+=RM?ltZT-ltZ:(ltZT-ltZ)*.12;const cxp=r.width/2,cyp=r.height/2;lox+=cxp/ltZ-cxp/z0;loy+=cyp/ltZ-cyp/z0;ltIn.style.transform=`scale(${ltZ.toFixed(4)})`}
  const x=((lox%BW)+BW)%BW-BW,y=((loy%BH)+BH)%BH-BH;const b=ltIn.children;if(b.length===9){for(let k=0;k<9;k++)b[k].style.transform=`translate(${x+(k%3)*BW}px,${y+Math.floor(k/3)*BH}px)`}}

/* ---------- ०५ contact sheet + loupe ---------- */
let sel=new Set(store.get('sg-sel2',[]));
function paintSel(){$$('.cf,.pr').forEach(b=>b.classList.toggle('sel',sel.has(+b.dataset.n2)));$('#selN').textContent=DV1(sel.size);store.set('sg-sel2',[...sel]);
  const list=[...sel];$('#tray').hidden=!list.length;
  $('#trayT').innerHTML=list.map(n=>`<img src="${I[n]}" alt="Frame ${n}">`).join('');
  const body='Hi Sri,\n\nI marked these frames on your site and would like to ask about prints:\n'+list.map(n=>'  #'+n).join('\n')+'\n\nSize:\nQuantity:\n\nThanks,\n';
  $('#mailSel').href='mailto:gantisriharsh@gmail.com?subject='+encodeURIComponent('Print enquiry, '+list.length+' frame'+(list.length>1?'s':''))+'&body='+encodeURIComponent(body)}
paintSel();
$('#selClear').onclick=()=>{sel.clear();paintSel()};
$('#copySel').onclick=()=>{const s=[...sel].map(n=>'#'+n).join(', '),ok=()=>{$('#trayNote').textContent='Copied: '+s};try{navigator.clipboard.writeText(s).then(ok,()=>{$('#trayNote').textContent=s})}catch(_){$('#trayNote').textContent=s}};
const lp=$('#loupe'),limg=$('#limg'),lensx=$('#lensx');let li=0,lastFocus=null,LL=SHEETN,markable=true;
function openL(i){li=(i+LL.length)%LL.length;const n=LL[li];$('#lmark').hidden=false;limg.src=I[n];limg.alt='Frame '+n;lensx.style.backgroundImage=`url(${I[n]})`;
  $('#lcap').textContent=`${LL===SHEETN?'Plate':LL===TABLE?'Outtake':'Archive'} ${DV(li+1)} / ${DV(LL.length)} · #${n}${FINE?' · move to inspect':''}`;$('#lmark').setAttribute('aria-pressed',sel.has(n));$('#lmark').textContent=sel.has(n)?'Selected ✓':'Mark as select';lp.hidden=false}
$('#cs').addEventListener('click',e=>{const b=e.target.closest('.cf');if(!b)return;lastFocus=b;LL=SHEETN;markable=true;openL(+b.dataset.i);shutter();$('#lx').focus()});
$('#arch').addEventListener('click',e=>{const b=e.target.closest('.af');if(!b)return;lastFocus=b;const vis=$$('#arch .af').filter(x=>!x.hidden);LL=vis.map(x=>+x.dataset.n2);markable=false;openL(vis.indexOf(b));shutter();$('#lx').focus()});
/* archive filter */
let filt='all';
function chips(){const c={all:AL.length};AL.forEach(o=>c[o.k]=(c[o.k]||0)+1);
  $('#chips').innerHTML=[['all','All'],...Object.entries(MODE)].map(([k,l])=>`<button data-f="${k}" aria-pressed="${filt===k}">${l}<span class="dv">${DV1(c[k])}</span></button>`).join('')}
chips();
$('#chips').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;filt=b.dataset.f;chips();tick();
  $$('#arch .af').forEach((a,i)=>{const show=filt==='all'||a.dataset.k===filt;a.hidden=!show;if(show){a.style.animation='none';void a.offsetWidth;a.style.animation=''}})});
const closeL=()=>{lp.hidden=true;lensx.style.display='none';lastFocus&&lastFocus.focus()};
$('#lx').onclick=closeL;$('#lprev').onclick=()=>openL(li-1);$('#lnext').onclick=()=>openL(li+1);
$('#lmark').onclick=()=>{const n=LL[li];sel.has(n)?sel.delete(n):sel.add(n);paintSel();tick();if(LL===TABLE)tuneSheet();openL(li)};
$('#selClear').addEventListener('click',()=>tuneSheet());
/* theme-tuned contact sheet */
const POOL={};Object.entries(ARCH).forEach(([k,v])=>v.forEach(n=>(POOL[n]=POOL[n]||[]).push(k)));Object.entries(ST).forEach(([n,v])=>POOL[n]=[...new Set([...(POOL[n]||[]),...v])]);
function tuneSheet(){const picks=[...sel].filter(n=>TT[n]);
  if(!picks.length){if(tuned){tuned=null;SHEETN.splice(0,SHEETN.length,...SHEET);renderSheet(true);paintSel();$('#tune').hidden=true}return}
  const cnt={};picks.forEach(n=>TT[n].forEach(k=>cnt[k]=(cnt[k]||0)+1));const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);const key=top.join('+');if(key===tuned)return;tuned=key;
  const sc=n=>POOL[n].reduce((s,k)=>s+(k===top[0]?2:k===top[1]?1:0),0),r=rnd(key.length*31+picks.length);
  const ranked=Object.keys(POOL).map(Number).map(n=>({n,s:sc(n),j:r()})).filter(o=>o.s>0).sort((a,b)=>b.s-a.s||a.j-b.j).map(o=>o.n);
  const list=[...ranked,...SHEET.filter(n=>!ranked.includes(n))].slice(0,15);SHEETN.splice(0,SHEETN.length,...list);renderSheet(true);paintSel();
  $('#tune').hidden=false;$('#tune').innerHTML=`Re-cut for your light-table picks · <b>${top.map(k=>MODE[k]).join(' + ')}</b><button id="tuneX">Show the original sheet</button>`;
  $('#tuneX').onclick=()=>{tuned='original';SHEETN.splice(0,SHEETN.length,...SHEET);renderSheet(true);paintSel();$('#tune').hidden=true}}
tuneSheet();
/* enquiry sheet */
const ASK={commissions:{t:'Commissions',l1:'What is it for?',o1:['Portrait','Editorial','Brand or product','Music or event','Something else'],l2:'When?',o2:['This month','In a few months','Just exploring']},
  prints:{t:'Prints',l1:'Size you have in mind',o1:['A4','A3','A2','Not sure yet'],l2:'How many?',o2:['One','Two or three','More'],sel:true},
  exhibitions:{t:'Exhibitions',l1:'What kind?',o1:['Group show','Solo show','Open call','Talk or panel'],l2:'When?',o2:['This year','Next year','Just exploring']}};
let askK=null,a1='',a2='';
function closeAsk(){askK=null;$('#ask').hidden=true;$$('.ask-k').forEach(b=>b.setAttribute('aria-expanded','false'))}
function openAsk(k){if(askK===k){closeAsk();return}askK=k;a1=a2='';const c=ASK[k];$('#askT').textContent='Enquiry · '+c.t;$('#q1l').textContent=c.l1;$('#q2l').textContent=c.l2;
  $('#q1').innerHTML=c.o1.map(o=>`<button aria-pressed="false">${o}</button>`).join('');$('#q2').innerHTML=c.o2.map(o=>`<button aria-pressed="false">${o}</button>`).join('');
  $('#askSel').innerHTML=c.sel?(sel.size?`<p class="lbl" style="margin:6px 0 8px">Your selects</p><div class="tray-t">${[...sel].map(n=>`<img src="${I[n]}" alt="Frame ${n}">`).join('')}</div>`:'<p class="lbl" style="margin:6px 0 0">Tip: mark frames on the contact sheet or the light table and they appear here</p>'):'';
  $$('.ask-k').forEach(b=>b.setAttribute('aria-expanded',b.dataset.ask===k));$('#ask').hidden=false;tick();shutter()}
$$('.ask-k').forEach(b=>b.onclick=()=>openAsk(b.dataset.ask));$('#askX').onclick=closeAsk;
['q1','q2'].forEach(id=>$('#'+id).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#'+id+' button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(id==='q1')a1=b.textContent;else a2=b.textContent;tick()}));
$('#askGo').onclick=()=>{if(!askK)return;const c=ASK[askK];const body='Hi Sri,\n\n'+c.l1+': '+(a1||'-')+'\n'+c.l2+': '+(a2||'-')+'\n'+(c.sel&&sel.size?'Frames: '+[...sel].map(n=>'#'+n).join(', ')+'\n':'')+'\n'+($('#askM').value||'')+'\n\nThanks,\n';
  const a=document.createElement('a');a.href='mailto:gantisriharsh@gmail.com?subject='+encodeURIComponent(c.t+' enquiry')+'&body='+encodeURIComponent(body);document.body.appendChild(a);a.click();a.remove();$('#askGo').textContent='Opening your email…';setTimeout(()=>$('#askGo').textContent='Write the email ↗',2200)};
/* about */
$('#sriImg').src=I['sri'];$('#cImg').src=I[19];$('#portrait').addEventListener('click',()=>$('#portrait').classList.toggle('on'));
$('#notes').addEventListener('click',e=>{const b=e.target.closest('.nc');if(!b)return;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');tick()});
addEventListener('keydown',e=>{if(lp.hidden)return;if(e.key==='Escape')closeL();if(e.key==='ArrowRight')openL(li+1);if(e.key==='ArrowLeft')openL(li-1)});
lp.addEventListener('pointermove',e=>{const r=limg.getBoundingClientRect(),inside=e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom;
  if(!inside||e.pointerType!=='mouse'){lensx.style.display='none';return}const z=2.6;lensx.style.display='block';lensx.style.left=e.clientX-105+'px';lensx.style.top=e.clientY-105+'px';
  lensx.style.backgroundSize=`${r.width*z}px ${r.height*z}px`;lensx.style.backgroundPosition=`${-(e.clientX-r.left)*z+105}px ${-(e.clientY-r.top)*z+105}px`});
lp.addEventListener('click',e=>{if(e.target===lp)closeL()});

/* ---------- ०६ clocks ---------- */
const fmt=tz=>new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
const fI=fmt('Asia/Kolkata'),fE=fmt('Europe/Paris');
function clocks(){const d=new Date();[[fI,'tI','iI'],[fE,'tE','iE']].forEach(([f,t,i])=>{const s=f.format(d),h=+s.slice(0,2);$('#'+t).textContent=s;$('#'+i).textContent=(h>=6&&h<18)?'☀':'☾'})}
clocks();setInterval(clocks,1000);
const keys=$('#keys');
const toggleKeys=v=>{keys.hidden=v===undefined?!keys.hidden:!v;if(!keys.hidden)$('#keysX').focus()};
$('#kbtn').onclick=()=>toggleKeys(true);$('#keysX').onclick=()=>toggleKeys(false);keys.addEventListener('click',e=>{if(e.target===keys)toggleKeys(false)});
addEventListener('keydown',e=>{const tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key==='Escape'&&!keys.hidden){toggleKeys(false);return}
  if(!lp.hidden)return;
  const k=e.key.toLowerCase();
  if(k==='?'){toggleKeys()}
  else if(k==='s')$('#snd').click();else if(k==='p')$('#mode').click();
  else if(k==='f'){scrollTo({top:0,behavior:RM?'auto':'smooth'});setTimeout(flash,RM?0:400)}
  else if(/^[1-7]$/.test(k)){document.getElementById('c'+k).scrollIntoView({behavior:RM?'auto':'smooth'})}});
$('#toTop').onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});

/* ---------- main loop ---------- */
let marqX=0,fadeN=0;const marq=$('#marq');
function loop(t){
  /* cursor */
  cx_+=(mx-cx_)*.22;cy_+=(my-cy_)*.22;cur.style.transform=`translate(${cx_}px,${cy_}px)`;
  /* scroll velocity */
  const sv=scrollY-lastY;lastY=scrollY;vel+=(sv-vel)*.2;
  /* hero */
  const hr=hero.getBoundingClientRect();
  if(hr.bottom>0){if(t-lastMove>2600&&!RM){const s=t/1000;tx=.5+.3*Math.sin(s*.33);ty=.44+.22*Math.sin(s*.51+1.3)}
    lx+=(tx-lx)*.08;ly+=(ty-ly)*.08;hero.style.setProperty('--x',(lx*100).toFixed(2)+'%');hero.style.setProperty('--y',(ly*100).toFixed(2)+'%');{const ci=$('#cl').getBoundingClientRect();if(ci.width){const px=hr.left+lx*hr.width,py=hr.top+ly*hr.height;$('#cl').style.setProperty('--ix',((px-ci.left)/ci.width*100).toFixed(2)+'%');$('#cl').style.setProperty('--iy',((py-ci.top)/ci.height*100).toFixed(2)+'%')}}meter()}
  /* thesis + withheld */
  thesis();
  const wr=wh.getBoundingClientRect();
  if(wr.bottom>0&&wr.top<innerHeight){if(t-wlast>2200&&!RM){const s=t/1000;wtx=.5+.38*Math.sin(s*.27);wty=.5+.38*Math.sin(s*.41+.6)}
    wx+=(wtx-wx)*.08;wy+=(wty-wy)*.08;wh.style.setProperty('--wx',(wx*100).toFixed(2)+'%');wh.style.setProperty('--wy',(wy*100).toFixed(2)+'%')}
  irisDraw();
  /* afterimage */
  const ar=aih.getBoundingClientRect();
  if(cw&&ar.bottom>0&&ar.top<innerHeight){cx.globalCompositeOperation='source-over';if((++fadeN)%3===0){cx.fillStyle='rgba(11,10,8,.012)';cx.fillRect(0,0,cw,chh)}
    if(!RM&&t-lastIn>2500)autoStep()}
  /* film */
  const sr=strip.getBoundingClientRect();
  if(sr.bottom>0&&sr.top<innerHeight){const hv=fw.scrollLeft-fwPrev;fwPrev=fw.scrollLeft;const mxs=Math.max(1,fw.scrollWidth-fw.clientWidth);$('#fbar').style.width=(10+90*fw.scrollLeft/mxs).toFixed(1)+'%';
    skew+=(clamp(hv*.35,-12,12)-skew)*.15;const fr=fw.getBoundingClientRect(),mid=fr.left+fr.width/2;
    figs.forEach(f=>{const r=f.getBoundingClientRect();if(!RM)f.style.transform=`skewX(${(-skew).toFixed(2)}deg)`;const c=r.left+r.width/2;if(Math.abs(c-mid)<r.width*.6)f.classList.add('dev');else if(r.right<fr.left-40||r.left>fr.right+40)f.classList.remove('dev')})}
  ltFrame();
  /* marquee */
  if(!RM){marqX-=1+Math.abs(vel)*.6;const w=marq.scrollWidth/2;if(-marqX>w)marqX+=w;marq.style.transform=`translateX(${marqX.toFixed(1)}px)`}
  requestAnimationFrame(loop)}
requestAnimationFrame(loop);
