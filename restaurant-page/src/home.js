function createHomePage() {
  const home = document.createElement('div');
  home.classList.add('home');

  const personImage = document.createElement('img');
  personImage.src = "images/person.jpeg";
  personImage.alt = 'Person is drinking';

  home.appendChild(createParagraph("The best beverages served since 1999"));
  home.appendChild(createParagraph('Enjoy and Live your life'));
  home.appendChild(personImage);
  home.appendChild(createParagraph('Quick tour with us'));
  return home;
}

function createParagraph(input) {
  const para = document.createElement('p');
  para.textContent = input;
  return para;
}

function loadHome() {
  const main = document.getElementById('main')
  main.textContent = "";
  main.appendChild(createHomePage());
}

export default loadHome;