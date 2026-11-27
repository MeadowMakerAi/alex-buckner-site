/* Playback uses one continuous drawing surface. The print layers come from the original Peach proof. */
(() => {
  const canvas = document.querySelector('#process-screen');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const poster = document.querySelector('#poster');
  const sceneName = document.querySelector('#scene-name');
  const note = document.querySelector('#scene-note');
  const play = document.querySelector('#play-study');
  const back = document.querySelector('#back-study');
  const next = document.querySelector('#next-study');
  const range = document.querySelector('#scene-position');
  const tabs = [...document.querySelectorAll('[data-track]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const tracks = {
    art: [
      ['Through the Mamiya 7', 'A viewfinder study using the crowd image from my pouch artwork.'],
      ['From film to file', 'A scan turns the frame into an image I can crop for print.'],
      ['The blank Mylar pouch', 'The seams and closure leave a smaller area for the artwork.'],
      ['Place the photograph', 'I crop the crowd into the left side of the front panel.'],
      ['Set the type', 'The wordmark goes on first, followed by the product and flavor.'],
      ['The finished artwork', 'The original Peach layout, assembled here on a pouch outline.']
    ],
    gummy: [
      ['Cook the base', 'Planned gummy process. The pectin base starts in the cooker.'],
      ['Deposit into molds', 'The depositor portions the cooked base into silicone cavities.'],
      ['Set and release', 'The pieces hold their shape before they leave the mold.'],
      ['Move to curing trays', 'The pieces occupy the trays while the mold returns for cleaning.'],
      ['Count and fill', 'The cured pieces are counted into the waiting pouch.'],
      ['Close the pack', 'The planned run ends with a seal and a count check.']
    ]
  };
  const photo = new Image();
  photo.src = 'assets/meadow-maker-crowd-detail.webp';
  let track = 'art', position = 0, playing = false, frame = 0, last = 0, lastScene = '';
  const beat = 3100;
  const clamp = n => Math.max(0, Math.min(1,n));
  const ease = n => { n = clamp(n); return n*n*(3-2*n); };
  const mix = (a,b,t) => a+(b-a)*t;
  function rect(x,y,w,h,fill,stroke) {
    if (fill) { ctx.fillStyle=fill; ctx.fillRect(x,y,w,h); }
    if (stroke) { ctx.strokeStyle=stroke; ctx.strokeRect(x,y,w,h); }
  }
  function line(points,color='#151515',width=2) {
    ctx.beginPath(); ctx.moveTo(...points[0]); points.slice(1).forEach(p=>ctx.lineTo(...p));
    ctx.strokeStyle=color; ctx.lineWidth=width; ctx.stroke(); ctx.lineWidth=1;
  }
  function label(text,x,y,color='#37373c') {
    ctx.fillStyle=color;ctx.font='15px "Geist Mono", monospace';ctx.fillText(text,x,y);
  }
  function crop(img,x,y,w,h) {
    const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);
    const sw=w/scale, sh=h/scale;
    ctx.drawImage(img,(img.naturalWidth-sw)/2,(img.naturalHeight-sh)*.48,sw,sh,x,y,w,h);
  }
  function brackets(x,y,w,h,color) {
    for(const [px,py,dx,dy] of [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]])
      line([[px+dx*24,py],[px,py],[px,py+dy*24]],color,2);
  }
  function finder(t) {
    crop(photo,0,0,800,480);
    rect(0,0,800,480,'rgba(0,0,0,.11)');
    brackets(111,40,578,400,'white');
    ctx.save();ctx.beginPath();ctx.rect(345,205,110,67);ctx.clip();ctx.globalAlpha=.53;
    crop(photo,12*(1-ease(t*1.5)),0,800,480);ctx.restore();
    rect(345,205,110,67,null,'#fff');
    rect(16,432,118,32,'#111');label('Mamiya 7',28,454,'white');
    if(t>.88){const close=Math.sin((t-.88)/.12*Math.PI);rect(0,0,800,480,'rgba(0,0,0,'+(.83*close)+')');}
  }
  function scan(t) {
    const e=ease(t*2.2),x=mix(0,240,e),y=mix(0,43,e),w=mix(800,320,e),h=mix(480,380,e);
    rect(x-10,y-10,w+20,h+20,'#202022');crop(photo,x,y,w,h);
    if(t<.78){const scanY=y+h*ease(t/.78);line([[x,scanY],[x+w,scanY]],'#fff',2);}
    if(e>.9)label('Film scan / crop',x,463);
  }
  function pouch() {
    ctx.save();ctx.beginPath();ctx.moveTo(135,86);ctx.quadraticCurveTo(135,79,144,79);
    ctx.lineTo(657,79);ctx.quadraticCurveTo(665,79,665,86);
    ctx.lineTo(665,108);ctx.lineTo(659,111);ctx.lineTo(665,114);
    ctx.lineTo(665,392);ctx.quadraticCurveTo(665,400,656,400);ctx.lineTo(144,400);
    ctx.quadraticCurveTo(135,400,135,392);ctx.lineTo(135,114);ctx.lineTo(141,111);ctx.lineTo(135,108);ctx.closePath();
    ctx.fillStyle='#fdfcf8';ctx.fill();ctx.strokeStyle='#686866';ctx.stroke();
    line([[147,99],[653,99]],'#c6c5bd',1);line([[146,386],[654,386]],'#cbcac4',1);
    for(let x=146;x<655;x+=5)line([[x,83],[x,92]],'#d1cfc7',1);
    ctx.restore();
  }
  function artwork(part,t) {
    pouch();
    const x=161,y=130,w=478,h=226,iw=poster.naturalWidth,ih=poster.naturalHeight;
    const split=500/850;
    if(part===2){if(t>.28)brackets(x,y,w,h,'#aaa9a2');return;}
    if(part===3){
      const e=ease(t*1.65);
      const pw=w*split;
      ctx.drawImage(poster,0,0,iw*split,ih,mix(235,x,e),mix(47,y,e),mix(330,pw,e),mix(335,h,e));
      return;
    }
    ctx.drawImage(poster,0,0,iw*split,ih,x,y,w*split,h);
    const right=iw*(1-split), rw=w*(1-split);
    for(const [top,bottom,delay] of [[0,.57,0],[.57,.80,.22],[.80,1,.45]]){
      const reveal=part===5?1:ease((t-delay)*3.2);
      if(reveal>0)ctx.drawImage(poster,iw*split,ih*top,right*reveal,(bottom-top)*ih,x+w*split,y+h*top,rw*reveal,(bottom-top)*h);
    }
  }
  function sweet(x,y,r,fill='#ecab52') {
    ctx.beginPath();ctx.roundRect(x-r,y-r*.68,r*2,r*1.36,r*.46);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='#242421';ctx.lineWidth=1.5;ctx.stroke();ctx.lineWidth=1;
  }
  function tray(x,y,filled) {
    rect(x,y,416,178,'#efefea','#393934');
    for(let row=0;row<3;row++)for(let col=0;col<7;col++){
      const i=row*7+col; sweet(x+34+col*57,y+34+row*55,17,i<filled?'#ecab52':'#fff');
    }
  }
  function gummy(s,t) {
    const ink='#282825', base='#ecab52';
    if(s===0){
      ctx.save();ctx.beginPath();ctx.moveTo(235,155);ctx.lineTo(565,155);ctx.lineTo(550,280);ctx.quadraticCurveTo(535,348,400,348);ctx.quadraticCurveTo(265,348,250,280);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();ctx.stroke();ctx.clip();
      ctx.beginPath();ctx.moveTo(230,205);ctx.bezierCurveTo(300,175+18*Math.sin(t*7),430,244,575,200);ctx.lineTo(575,360);ctx.lineTo(230,360);ctx.closePath();ctx.fillStyle=base;ctx.fill();line([[410,102],[397,270],[368+22*Math.sin(t*6),280]],ink,4);ctx.restore();line([[235,155],[565,155]],ink,4);
      label('Cooker / section',235,401);return;
    }
    if(s===1){
      tray(192,207,Math.min(21,Math.floor(t*23)+1));
      rect(204,84,392,53,'#fff',ink);
      for(let i=0;i<7;i++){const x=226+i*57;line([[x-10,137],[x-4,168],[x+4,168],[x+10,137]],ink);
        if(t<.90)line([[x,169],[x,176+39*(.5+.5*Math.sin(t*14))]],base,4);}
      return;
    }
    if(s===2||s===3){
      const e=s===2?ease(t):1;
      const originX=124, originY=198;
      const targetX=267, targetY=116;
      rect(targetX-8,targetY-8,432,197,'#fff',ink);
      rect(targetX,targetY,416,180,null,'#96968f');
      tray(originX,originY,0);
      for(let i=0;i<21;i++){
        const col=i%7, row=Math.floor(i/7);
        const x=34+col*57,y=34+row*55;
        const lift=s===2?ease((t-row*.11)*1.65):e;
        sweet(mix(originX,targetX,lift)+x,mix(originY,targetY,lift)+y-36*Math.sin(lift*Math.PI),17);
      }
      if(s===3){
        const slide=ease(t*1.7);
        rect(originX-2,originY+92,418,90,'#f4f4f3');
        rect(targetX-8,targetY-8,432,197,'#fff',ink);
        rect(targetX,targetY,416,180,null,'#96968f');
        for(let i=0;i<21;i++)sweet(targetX+34+i%7*57,targetY+34+Math.floor(i/7)*55,17);
        line([[targetX-10,333],[targetX+426,333]],ink,3);
        line([[targetX-10,342],[targetX+426,342]],'#747470');
        line([[targetX,342],[targetX,360+17*slide]],ink);
        line([[targetX+416,342],[targetX+416,360+17*slide]],ink);
      }
      label(s===2?'Release from the mold':'Curing tray / planned route',124,422);return;
    }
    ctx.save();ctx.translate(96,110);ctx.scale(.76,.70);pouch();ctx.restore();
    if(s===4){
      line([[270,65],[358,65],[396,113],[316,113],[270,65]],ink);
      for(let i=0;i<6;i++){const u=(t*1.55+i/6)%1;sweet(354+u*55,115+u*u*124,11);}
      line([[225,169],[584,169]],ink,3);
    }else{
      ctx.save();ctx.translate(96,110);ctx.scale(.76,.70);artwork(5,1);ctx.restore();
      line([[213,169],[mix(213,590,ease(t*1.9)),169]],ink,4);
    }
  }
  function draw() {
    const n=tracks[track].length;
    const index=Math.min(n-1,Math.floor(position));
    const phase=Math.min(1,position-index);
    const scale=canvas.width/800;
    ctx.setTransform(scale,0,0,scale,0,0);ctx.lineWidth=1;
    rect(0,0,800,480,'#f4f4f3');
    if(track==='gummy')gummy(index,phase);
    else if(index===0)finder(phase);
    else if(index===1)scan(phase);
    else artwork(index,phase);
    const key=track+index;
    if(lastScene!==key){lastScene=key;const [title,caption]=tracks[track][index];
      sceneName.textContent=title;note.textContent=caption;}
    range.value=Math.round(position/n*1000);
    range.setAttribute('aria-valuetext',sceneName.textContent);
    back.disabled=index===0;next.disabled=index===n-1;
  }
  function stop() {
    cancelAnimationFrame(frame);playing=false;
    play.textContent=position>=tracks[track].length?'Replay':'Play';
  }
  function tick(now) {
    if(!playing)return;
    position=Math.min(tracks[track].length,position+Math.min(now-last,100)/beat);
    last=now;draw();
    if(position>=tracks[track].length)stop();else frame=requestAnimationFrame(tick);
  }
  function seek(value) {
    position=Math.max(0,Math.min(tracks[track].length,value));stop();draw();
  }
  function ready(){
    if(!poster.naturalWidth||!photo.naturalWidth||!canvas.hidden)return;
    poster.hidden=true;canvas.hidden=false;
    document.querySelector('.process-head').hidden=false;document.querySelector('.transport').hidden=false;
    function resize(){canvas.width=Math.max(800,Math.min(1600,Math.round(canvas.clientWidth*devicePixelRatio)));canvas.height=Math.round(canvas.width*.6);draw();}
    resize();new ResizeObserver(resize).observe(canvas.parentElement);
    play.addEventListener('click',()=>{
      if(motion.matches)return;
      if(playing){stop();return;}
      if(position>=tracks[track].length)position=0;
      playing=true;play.textContent='Pause';last=performance.now();frame=requestAnimationFrame(tick);
    });
    back.onclick=()=>seek(Math.max(0,Math.min(tracks[track].length-1,Math.floor(position))-1)+.99);
    next.onclick=()=>seek(Math.min(tracks[track].length-1,Math.floor(position)+1)+.99);
    range.oninput=()=>seek(Number(range.value)/1000*tracks[track].length);
    for(const tab of tabs)tab.onclick=()=>{
      track=tab.dataset.track;tabs.forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));seek(0);
    };
    function preference(){stop();play.hidden=motion.matches;}
    preference();motion.addEventListener('change',preference);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  }
  poster.addEventListener('load',ready);photo.addEventListener('load',ready);ready();
})();
