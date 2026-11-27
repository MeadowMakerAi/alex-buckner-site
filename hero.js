// Home page opening sequence. Rules: see DESIGN.md (motion section).
(function () {
  var shots = document.querySelectorAll('[data-shot]');
  var words = document.querySelectorAll('h1 [data-pick]');
  var tabs = document.querySelectorAll('button[data-pick]');
  var num = document.querySelector('[data-cap-num]');
  var name = document.querySelector('[data-cap-name]');
  var names = ['Products', 'Factory', 'AI systems', 'Film'];
  var timer = null;

  function show(i) {
    shots.forEach(function (el) { el.style.opacity = el.dataset.shot == i ? '1' : '0'; });
    words.forEach(function (el) {
      el.style.backgroundSize = '100% ' + (el.dataset.pick == i ? '.2em' : '.11em');
    });
    tabs.forEach(function (el) {
      var on = el.dataset.pick == i;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.style.borderBottomColor = on ? '#000' : 'transparent';
    });
    if (num) num.textContent = '0' + (Number(i) + 1) + ' / 04';
    if (name) name.textContent = names[i];
  }

  function pick(i) {
    if (timer) { clearInterval(timer); timer = null; }
    show(i);
  }

  words.forEach(function (el) { el.addEventListener('mouseenter', function () { pick(el.dataset.pick); }); });
  tabs.forEach(function (el) { el.addEventListener('click', function () { pick(el.dataset.pick); }); });

  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) return;
  var step = 0;
  timer = setInterval(function () {
    step += 1;
    if (step > 3) { clearInterval(timer); timer = null; return; }
    show(step);
  }, 4000);
})();
