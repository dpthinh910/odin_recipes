function createMenu() {
  const menu = document.createElement('div');
  menu.classList.add("menu");

  menu.appendChild(createMenuItem("drink1", "A delicious drink for summer day"));
  menu.appendChild(createMenuItem("drink2", "A delicious drink for summer day"));
  menu.appendChild(createMenuItem("drink3", "A delicious drink for summer day"));
  menu.appendChild(createMenuItem("drink4", "A delicious drink for summer day"));
  menu.appendChild(createMenuItem("drink5", "A delicious drink for summer day"));
  menu.appendChild(createMenuItem("drink6", "A delicious drink for summer day"));

  return menu;

}

function createMenuItem(name, des) {
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");

  const foodName = document.createElement("h2");
  foodName.textContent = name;

  const foodDescription = document.createElement("p");
  foodDescription.textContent = des;

  const foodImage = document.createElement("img");
  foodImage.src = `images/${name}.jpeg`;
  foodImage.alt = `${name}`;

  menuItem.appendChild(foodImage);
  menuItem.appendChild(foodName);
  menuItem.appendChild(foodDescription);

  return menuItem;
}

function loadMenu() {
  const main = document.getElementById('main');
  main.textContent = "";
  main.appendChild(createMenu());
}

export default loadMenu;