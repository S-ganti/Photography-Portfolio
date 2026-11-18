const I=new Proxy({},{get:(_,n)=>'assets/img/'+String(n)+'.jpg'});
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const DV=n=>String(n).padStart(2,'0').replace(/\d/g,d=>'०१२३४५६७८९'[d]);
const DV1=n=>String(n).replace(/\d/g,d=>'०१२३४५६७८९'[d]);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- content ---------- */
const RING=[252,891,200,198,232,874,875,664,191,195,241,540];
const ROLL=[522,224,711,609,648,808,806,176,236,238,228,196,784,789];
const TRIP=[217,524,526,222,218,220,523,525];
const SHEET=[482,74,82,194,244,15,10,873,215,266,535,534,193,584,669];
const ARCH={street:[2,253,401,610,668,900,393,500,813,887,889,32,781],motion:[22,251,658,661,771,846,848,905,908,183],light:[162,163,719,640,477,479,702,777,919,920],sea:[480,425,426,453,491,797,139],built:[320,348,351,271,301,312]};
const MODE={street:'Street',motion:'Motion',light:'Light',sea:'Sea',built:'Built'};
const AL=(()=>{const ks=Object.keys(ARCH),out=[],mx=Math.max(...ks.map(k=>ARCH[k].length));for(let i=0;i<mx;i++)ks.forEach(k=>{if(ARCH[k][i]!==undefined)out.push({n:ARCH[k][i],k})});return out})();
$('#film').innerHTML=ROLL.map((n,i)=>`<figure data-cur="develop"><figcaption><span class="dv">${DV(i+1)}</span><span>▸ ${n}</span></figcaption><img data-n="${n}" alt="Frame ${n}"></figure>`).join('');
$('#trip').innerHTML=TRIP.map(n=>`<figure>${Array.from({length:6},(_,k)=>`<img data-n="${n}" ${k?'alt="" aria-hidden="true"':`alt="Frame ${n}"`}>`).join('')}<figcaption>#${n}</figcaption></figure>`).join('');
$('#cs').innerHTML=SHEET.map((n,i)=>`<button class="cf" data-i="${i}" data-cur="loupe" aria-label="Open frame ${n} under the loupe"><div class="ph"><img data-n="${n}" alt=""></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="52" rx="${45+(i%3)}" ry="${44-(i%2)*3}" transform="rotate(${i%2?-4:3} 50 50)"/></svg><span class="x" aria-hidden="true">✕</span><div class="lab"><span class="dv">${DV(i+1)}</span><span>#${n}</span></div></button>`).join('');
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
const LAB={drag:'Drag',develop:'Develop',loupe:'Loupe',hold:'Hold'};
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
const COVER=715;
function setCover(n){$('#cg').src=I[n];$('#cl').src=I[n];$('#cl').alt='Frame '+n+', a woman in profile, in silhouette against a poster';mdata=null;mimg.src=I[n]}let tx=.5,ty=.42,lx=.5,ly=.42,lastMove=-1e9;
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;lastMove=performance.now();$('#hint').style.opacity=.0});
function flash(){hero.classList.remove('flash');void hero.offsetWidth;hero.classList.add('flash');shutter();setTimeout(()=>hero.classList.remove('flash'),650)}
hero.addEventListener('click',flash);
const mc=document.createElement('canvas');mc.width=160;mc.height=100;const mctx=mc.getContext('2d',{willReadFrequently:true});let mdata=null;
const mimg=new Image();mimg.onload=()=>{try{mctx.clearRect(0,0,mc.width,mc.height);const r=hero.getBoundingClientRect();mc.height=Math.round(160*r.height/r.width)||100;const s=Math.max(mc.width/mimg.width,mc.height/mimg.height);mctx.drawImage(mimg,(mc.width-mimg.width*s)/2,(mc.height-mimg.height*s)/2,mimg.width*s,mimg.height*s);mdata=mctx.getImageData(0,0,mc.width,mc.height).data}catch(_){mdata=null}};
setCover(COVER);
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
const iris=$('#iris'),irisF=$('#irisF'),irisPoly=$('#irisS polygon'),irisS=$('#irisS');
function irisDraw(){const r=iris.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=clamp(-r.top/(r.height-innerHeight),0,1);
  const w=innerWidth,h=innerHeight,R=10+Math.pow(p,1.3)*Math.hypot(w,h)*.56,rot=p*120*Math.PI/180;
  const pts=[...Array(7)].map((_,i)=>{const a=rot+i*2*Math.PI/7;return[w/2+R*Math.cos(a),h/2+R*Math.sin(a)]});
  irisF.style.clipPath=`polygon(${pts.map(q=>q[0].toFixed(1)+'px '+q[1].toFixed(1)+'px').join(',')})`;
  irisS.setAttribute('viewBox',`0 0 ${w} ${h}`);irisPoly.setAttribute('points',pts.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' '));
  $('#irisP').textContent=Math.round(p*100)+'%';$('#irisBig').style.opacity=(1-p*2.2).toFixed(2)}

/* ---------- ०३ ring ---------- */
let tk='';for(let i=0;i<120;i++){const a=i*3*Math.PI/180,l=i%10===0?10:(i%5===0?6:3);tk+=`<line x1="${(97*Math.sin(a)).toFixed(2)}" y1="${(-97*Math.cos(a)).toFixed(2)}" x2="${((97-l)*Math.sin(a)).toFixed(2)}" y2="${(-(97-l)*Math.cos(a)).toFixed(2)}" stroke-width="${i%10===0?.9:.4}"/>`}
$('#ticks').innerHTML=tk;
$('#nums').innerHTML=RING.map((_,i)=>{const a=i*30*Math.PI/180,x=(80*Math.sin(a)).toFixed(2),y=(-80*Math.cos(a)).toFixed(2);return `<text x="${x}" y="${y}" transform="rotate(${i*30} ${x} ${y})">${DV(i+1)}</text>`}).join('');
let ang=0,idx=-1,front=$('#rA'),back=$('#rB');
const palCache={};
function palette(n,cb){if(palCache[n])return cb(palCache[n]);const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=40;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0,40,40);let d;try{d=x.getImageData(0,0,40,40).data}catch(_){return}const b={};
  for(let i=0;i<d.length;i+=4){const k=(d[i]>>5)+','+(d[i+1]>>5)+','+(d[i+2]>>5);(b[k]=b[k]||{n:0,r:0,g:0,bl:0}).n++;b[k].r+=d[i];b[k].g+=d[i+1];b[k].bl+=d[i+2]}
  const arr=Object.values(b).sort((a,b)=>b.n-a.n).map(o=>[o.r/o.n|0,o.g/o.n|0,o.bl/o.n|0]),out=[];
  for(const c of arr){if(out.every(o=>Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2])>70))out.push(c);if(out.length===5)break}
  while(out.length<5&&arr.length>out.length)out.push(arr[out.length]);
  out.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));palCache[n]=out.map(c=>'#'+c.map(v=>v.toString(16).padStart(2,'0')).join(''));cb(palCache[n])};im.src=I[n]}
function setRing(a){ang=a;$('#dialG').setAttribute('transform',`rotate(${ang.toFixed(2)})`);
  const k=((Math.round(-ang/30)%12)+12)%12;if(k===idx)return;idx=k;const n=RING[k];
  back.src=I[n];back.alt='Frame '+n;back.classList.remove('out');front.classList.add('out');[front,back]=[back,front];
  $('#lcdD').textContent=DV(k+1);$('#lcdN').textContent='#'+n;$('#nowN').textContent='#'+n;$('#nowD').textContent=DV(k+1);$('#dial').setAttribute('aria-valuenow',k+1);tick();
  palette(n,p=>{$('#sw').innerHTML=p.map(h=>`<button style="background:${h}" data-h="${h}" aria-label="Copy ${h}"><span>${h}</span></button>`).join('')})}
setRing(0);
const dial=$('#dial');let drag=null;
const cen=()=>{const r=dial.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
dial.addEventListener('pointerdown',e=>{const[a,b]=cen();drag={a0:Math.atan2(e.clientY-b,e.clientX-a)*180/Math.PI,s:ang};dial.setPointerCapture(e.pointerId)});
dial.addEventListener('pointermove',e=>{if(!drag)return;const[a,b]=cen();let d=Math.atan2(e.clientY-b,e.clientX-a)*180/Math.PI-drag.a0;if(d>180)d-=360;if(d<-180)d+=360;setRing(drag.s+d)});
const end=()=>{if(!drag)return;drag=null;spin(Math.round(ang/30)*30)};
dial.addEventListener('pointerup',end);dial.addEventListener('pointercancel',end);
function spin(t){if(RM){setRing(t);return}const s=ang,t0=performance.now();(function f(n){const p=Math.min(1,(n-t0)/460),e=1-Math.pow(1-p,3);setRing(s+(t-s)*e);if(p<1)requestAnimationFrame(f)})(t0)}
$('#next').onclick=()=>spin(Math.round(ang/30)*30-30);$('#prev').onclick=()=>spin(Math.round(ang/30)*30+30);
dial.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();$('#next').click()}if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();$('#prev').click()}});
$('#sw').addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(!b)return;const h=b.dataset.h,done=()=>{$('#copied').textContent='Copied '+h;setTimeout(()=>$('#copied').textContent='',1600)};
  try{navigator.clipboard.writeText(h).then(done,()=>{$('#copied').textContent=h})}catch(_){$('#copied').textContent=h}});

/* ---------- ०४ afterimage canvas ---------- */
const cv=$('#cv'),cx=cv.getContext('2d'),aimg=new Image(),aih=$('#aih');let cw=0,chh=0,vx=0,vy=0,ppx=null,ppy=null,holding=false;
aimg.onload=sizeC;aimg.src=I[217];
function sizeC(){const r=cv.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);cw=cv.width=r.width*d;chh=cv.height=r.height*d;cx.globalAlpha=1;draw(0,0)}
function draw(dx,dy){if(!aimg.complete||!cw)return;const s=Math.max(cw/aimg.width,chh/aimg.height)*1.1,w=aimg.width*s,h=aimg.height*s;cx.drawImage(aimg,(cw-w)/2+dx,(chh-h)/2+dy,w,h)}
aih.addEventListener('pointermove',e=>{if(ppx!==null){vx+=(e.clientX-ppx)*.5;vy+=(e.clientY-ppy)*.5}ppx=e.clientX;ppy=e.clientY});
aih.addEventListener('pointerleave',()=>{ppx=null});
const hold=v=>{holding=v;$('#shb').classList.toggle('on',v);$('#shb').setAttribute('aria-pressed',v);$('#sh').textContent=v?'shutter open':'shutter closed';if(v)shutter()};
aih.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;hold(true)});addEventListener('pointerup',()=>holding&&hold(false));
$('#shb').addEventListener('pointerdown',e=>{e.stopPropagation();hold(true)});
$('#shb').addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();hold(true)}});$('#shb').addEventListener('keyup',()=>hold(false));
/* film */
const strip=$('#strip'),film=$('#film'),figs=$$('#film figure');let extra=0,lastY=scrollY,skew=0,vel=0;
function layout(){extra=Math.max(0,film.scrollWidth-innerWidth+80);strip.style.height=(innerHeight+extra)+'px';sizeC()}
addEventListener('resize',layout);addEventListener('load',layout);setTimeout(layout,300);
/* triptych */
const SPEEDS=['1/1000','1/500','1/125','1/30','1/8','1/2','2″','8″'],SPOKEN=['1/1000 second','1/500 second','1/125 second','1/30 second','1/8 second','half a second','2 seconds','8 seconds'];
const DIRS=[0,90,30,-60,0,90,135,45];
$('#ssticks').innerHTML=SPEEDS.map(s=>`<span>${s}</span>`).join('');
let lastSS=-1;
function exp(){const i=+$('#exp').value,v=i/7;$('#ssv').value=SPEEDS[i];$('#ssv').textContent=SPEEDS[i];$('#exp').setAttribute('aria-valuetext',SPOKEN[i]);
  $$('#ssticks span').forEach((s,k)=>s.classList.toggle('on',k===i));
  if(lastSS!==-1&&lastSS!==i){tick();if(i>=5)shutter()}lastSS=i;
  $$('#trip figure').forEach((f,j)=>{const a=DIRS[j]*Math.PI/180;[...f.querySelectorAll('img')].forEach((im,k)=>{if(!k){im.style.filter=`brightness(${(1+v*.08).toFixed(2)})`;return}
    const d=k*Math.pow(v,1.4)*16;im.style.transform=`translate(${(Math.cos(a)*d).toFixed(1)}px,${(Math.sin(a)*d).toFixed(1)}px)`;im.style.opacity=(v*.42/(k*.8)).toFixed(3)})})}
$('#exp').addEventListener('input',exp);exp();

/* ---------- ०५ contact sheet + loupe ---------- */
let sel=new Set(store.get('sg-sel',[]));
function paintSel(){$$('.cf').forEach(b=>b.classList.toggle('sel',sel.has(+b.dataset.i)));$('#selN').textContent=DV1(sel.size);store.set('sg-sel',[...sel])}
paintSel();
$('#selClear').onclick=()=>{sel.clear();paintSel()};
const lp=$('#loupe'),limg=$('#limg'),lensx=$('#lensx');let li=0,lastFocus=null,LL=SHEET,markable=true;
function openL(i){li=(i+LL.length)%LL.length;const n=LL[li];$('#lmark').hidden=!markable;limg.src=I[n];limg.alt='Frame '+n;lensx.style.backgroundImage=`url(${I[n]})`;
  $('#lcap').textContent=`${markable?'Plate':'Archive'} ${DV(li+1)} / ${DV(LL.length)} · #${n}${FINE?' · move to inspect':''}`;$('#lmark').setAttribute('aria-pressed',sel.has(li));$('#lmark').textContent=sel.has(li)?'Selected ✓':'Mark as select';lp.hidden=false}
$('#cs').addEventListener('click',e=>{const b=e.target.closest('.cf');if(!b)return;lastFocus=b;LL=SHEET;markable=true;openL(+b.dataset.i);shutter();$('#lx').focus()});
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
$('#lmark').onclick=()=>{sel.has(li)?sel.delete(li):sel.add(li);paintSel();openL(li)};
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
let marqX=0;const marq=$('#marq');
function loop(t){
  /* cursor */
  cx_+=(mx-cx_)*.22;cy_+=(my-cy_)*.22;cur.style.transform=`translate(${cx_}px,${cy_}px)`;
  /* scroll velocity */
  const sv=scrollY-lastY;lastY=scrollY;vel+=(sv-vel)*.2;
  /* hero */
  const hr=hero.getBoundingClientRect();
  if(hr.bottom>0){if(t-lastMove>2600&&!RM){const s=t/1000;tx=.5+.3*Math.sin(s*.33);ty=.44+.22*Math.sin(s*.51+1.3)}
    lx+=(tx-lx)*.08;ly+=(ty-ly)*.08;hero.style.setProperty('--x',(lx*100).toFixed(2)+'%');hero.style.setProperty('--y',(ly*100).toFixed(2)+'%');meter()}
  /* thesis + withheld */
  thesis();
  const wr=wh.getBoundingClientRect();
  if(wr.bottom>0&&wr.top<innerHeight){if(t-wlast>2200&&!RM){const s=t/1000;wtx=.5+.38*Math.sin(s*.27);wty=.5+.38*Math.sin(s*.41+.6)}
    wx+=(wtx-wx)*.08;wy+=(wty-wy)*.08;wh.style.setProperty('--wx',(wx*100).toFixed(2)+'%');wh.style.setProperty('--wy',(wy*100).toFixed(2)+'%')}
  irisDraw();
  /* afterimage */
  const ar=aih.getBoundingClientRect();
  if(cw&&ar.bottom>0&&ar.top<innerHeight){vx*=.9;vy*=.9;vy+=sv*.2;
    if(!RM){const s=t/1000,ox=vx*3+Math.sin(s*.7)*1.2,oy=vy*3+Math.cos(s*.5)*.6;cx.globalAlpha=holding?.06:.15;draw(ox,oy);cx.globalAlpha=holding?.004:.04;draw(0,0)}}
  /* film */
  const sr=strip.getBoundingClientRect();
  if(sr.bottom>0&&sr.top<innerHeight){const p=clamp(-sr.top/Math.max(1,sr.height-innerHeight),0,1);film.style.transform=`translateX(${(-p*extra).toFixed(1)}px)`;
    skew+=(clamp(vel*.4,-14,14)-skew)*.15;const mid=innerWidth/2;
    figs.forEach(f=>{const r=f.getBoundingClientRect();if(!RM)f.style.transform=`skewX(${(-skew).toFixed(2)}deg)`;if(Math.abs(r.left+r.width/2-mid)<r.width*.6)f.classList.add('dev')})}
  /* marquee */
  if(!RM){marqX-=1+Math.abs(vel)*.6;const w=marq.scrollWidth/2;if(-marqX>w)marqX+=w;marq.style.transform=`translateX(${marqX.toFixed(1)}px)`}
  requestAnimationFrame(loop)}
requestAnimationFrame(loop);
