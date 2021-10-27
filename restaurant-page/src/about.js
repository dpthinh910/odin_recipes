function createAbout() {
  const aboutPage = document.createElement('div');
  aboutPage.classList.add('contact');

  const number = document.createElement('p');
  number.textContent = '01234567899';

  const restaurantLocation = document.createElement('img');
  restaurantLocation.src = 'images/location.jpeg';
  restaurantLocation.alt = 'Restaurant location';

  aboutPage.appendChild(number);
  aboutPage.appendChild(restaurantLocation);
  return aboutPage;
}

function loadAbout() {
  const main = document.getElementById('main');
  main.textContent = "";
  main.appendChild(createAbout());
}

export default loadAbout;