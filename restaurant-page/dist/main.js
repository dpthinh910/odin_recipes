(()=>{"use strict";function e(e){const t=document.createElement("p");return t.textContent=e,t}const t=function(){const t=document.getElementById("main");t.textContent="",t.appendChild(function(){const t=document.createElement("div");t.classList.add("home");const n=document.createElement("img");return n.src="images/person.jpeg",n.alt="Person is drinking",t.appendChild(e("The best beverages served since 1999")),t.appendChild(e("Enjoy and Live your life")),t.appendChild(n),t.appendChild(e("Quick tour with us")),t}())};function n(e,t){const n=document.createElement("div");n.classList.add("menu-item");const d=document.createElement("h2");d.textContent=e;const c=document.createElement("p");c.textContent=t;const i=document.createElement("img");return i.src=`images/${e}.jpeg`,i.alt=`${e}`,n.appendChild(i),n.appendChild(d),n.appendChild(c),n}function d(){const e=document.createElement("div");e.classList.add("header");const d=document.createElement("h1");return d.textContent="Phuc Long Bubble Tea",d.classList.add("restaurant-name"),e.appendChild(d),e.appendChild(function(){const e=document.createElement("nav"),d=document.createElement("button");d.classList.add("button-nav"),d.innerText="Home",d.addEventListener("click",(e=>{e.target.classList.contains("active")||(c(d),t())}));const i=document.createElement("button");i.classList.add("button-nav"),i.textContent="Menu",i.addEventListener("click",(e=>{e.target.classList.contains("active")||(c(i),function(){const e=document.getElementById("main");e.textContent="",e.appendChild(function(){const e=document.createElement("div");return e.classList.add("menu"),e.appendChild(n("drink1","A delicious drink for summer day")),e.appendChild(n("drink2","A delicious drink for summer day")),e.appendChild(n("drink3","A delicious drink for summer day")),e.appendChild(n("drink4","A delicious drink for summer day")),e.appendChild(n("drink5","A delicious drink for summer day")),e.appendChild(n("drink6","A delicious drink for summer day")),e}())}())}));const a=document.createElement("button");return a.classList.add("button-nav"),a.textContent="About",a.addEventListener("click",(e=>{e.target.classList.contains("active")||(c(a),function(){const e=document.getElementById("main");e.textContent="",e.appendChild(function(){const e=document.createElement("div");e.classList.add("contact");const t=document.createElement("p");t.textContent="01234567899";const n=document.createElement("img");return n.src="images/location.jpeg",n.alt="Restaurant location",e.appendChild(t),e.appendChild(n),e}())}())})),e.appendChild(d),e.appendChild(i),e.appendChild(a),e}()),e}function c(e){document.querySelectorAll(".button-nav").forEach((e=>{e!==this&&e.classList.remove("active")})),e.classList.add("active")}!function(){const e=document.getElementById("content");e.appendChild(d()),e.appendChild(function(){const e=document.createElement("main");return e.classList.add("main"),e.setAttribute("id","main"),e}()),e.appendChild(function(){const e=document.createElement("footer");e.classList.add("footer");const t=document.createElement("p");t.textContent="Copyright © 2021 tinfinity69";const n=document.createElement("a");n.href="https://github.com/dpthinh910";const d=document.createElement("i");return d.classList.add("fab"),d.classList.add("fa-github"),n.appendChild(d),e.appendChild(t),e.appendChild(n),e}()),c(document.querySelector(".button-nav")),t()}()})();