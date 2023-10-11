const pinkBox = document.querySelector('.pink-box');

const greyBoxNodes = document.querySelectorAll('.grey-box');
greyBoxNodes.forEach((node) => {
  const box = node.getBoundingClientRect();
  node.addEventListener('click', (e) => {
    const moveTo = e.target.classList[1];
    let direction;
    let coord;

    switch (moveTo) {
      case 'top': {
        direction = 'top';
        coord = box.height;
        break;
      }
      case 'bottom': {
        direction = 'top';
        coord = -box.height;
        break;
      }
      case 'left': {
        direction = 'left';
        coord = box.width;
        break;
      }
      case 'right': {
        direction = 'left';
        coord = -box.width;
        break;
      }
    }

    pinkBox.style[direction] = box[direction] + coord + 'px';
    pinkBox.style.transition = 'all 1.5s';
  });
});
