function init() {
  window.addEventListener('DOMContentLoaded', () => {
  })
}

const routeData = '../routes/data.html';

function changeContent(routePath) {
  const content = document.documentElement.innerHTML;
  console.log(content);
}

function test() {
  changeContent(routeData);
}

test()
