import loadAbout from "./about";
import loadHome from "./home";
import loadMenu from "./menu";

function createHeader() {
  const header = document.createElement('div');
  header.classList.add('header');

  const restaurantName = document.createElement('h1');
  restaurantName.textContent = "Phuc Long Bubble Tea";
  restaurantName.classList.add('restaurant-name');

  header.appendChild(restaurantName);
  header.appendChild(createNav());
  return header;
}

function createNav() {
  const nav = document.createElement('nav');

  const homeButton = document.createElement("button");
  homeButton.classList.add('button-nav');
  homeButton.innerText = "Home";
  homeButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) return;
    setActiveButton(homeButton);
    loadHome();
  })

  const menuButton = document.createElement("button");
  menuButton.classList.add('button-nav');
  menuButton.textContent = "Menu";
  menuButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) return;
    setActiveButton(menuButton);
    loadMenu();
  })

  const aboutButton = document.createElement("button");
  aboutButton.classList.add('button-nav');
  aboutButton.textContent = "About";
  aboutButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) return;
    setActiveButton(aboutButton);
    loadAbout();
  })

  nav.appendChild(homeButton);
  nav.appendChild(menuButton);
  nav.appendChild(aboutButton);

  return nav;
}

function setActiveButton(button) {
  const buttons = document.querySelectorAll('.button-nav');

  buttons.forEach(button => {
    if (button !== this) {
      button.classList.remove('active');
    }
  });
  button.classList.add('active');
}

function createMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  main.setAttribute('id', 'main');
  return main;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const copyright = document.createElement("p");
  copyright.textContent = "Copyright © 2021 tinfinity69";

  const githubLink = document.createElement("a");
  githubLink.href = "https://github.com/dpthinh910";

  const githubIcon = document.createElement("i");
  githubIcon.classList.add("fab");
  githubIcon.classList.add("fa-github");

  githubLink.appendChild(githubIcon);
  footer.appendChild(copyright);
  footer.appendChild(githubLink);

  return footer;
}

function initialize() {
  const content = document.getElementById('content');
  content.appendChild(createHeader());
  content.appendChild(createMain());
  content.appendChild(createFooter());

  setActiveButton(document.querySelector('.button-nav'));
  loadHome()
}

export default initialize;