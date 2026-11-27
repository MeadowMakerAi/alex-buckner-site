const viewer = document.querySelector('.viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const plates = Array.from(document.querySelectorAll('.gallery a'));
  const photo = viewer.querySelector('img');
  const caption = viewer.querySelector('figcaption');
  let active = 0;
  function display(index) {
    active = (index + plates.length) % plates.length;
    const plate = plates[active];
    photo.src = plate.href;
    photo.alt = plate.querySelector('img').alt;
    caption.textContent = plate.parentElement.querySelector('figcaption').textContent;
  }
  plates.forEach((plate, index) => plate.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    display(index);
    viewer.showModal();
    viewer.querySelector('[data-close]').focus();
  }));
  viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
  viewer.querySelector('[data-prev]').addEventListener('click', () => display(active - 1));
  viewer.querySelector('[data-next]').addEventListener('click', () => display(active + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') display(active - 1);
    if (event.key === 'ArrowRight') display(active + 1);
  });
}
