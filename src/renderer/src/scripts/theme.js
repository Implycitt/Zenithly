let mode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null);
}

if (mode === 'active') enableDarkmode();

themeSwitch.addEventListener('click', () => {
  mode = localStorage.getItem('darkmode');
  mode !== 'active' ? enableDarkmode() : disableDarkmode();
})

