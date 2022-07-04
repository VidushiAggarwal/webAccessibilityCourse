(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}


//For skip to content
function handleBtnClick() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//For aria-live
const PLANETS_INFO = {
  columns: {
    title: 'Columns',
    description: 'The power of Flexbox in a simple interface'
  },
  form: {
    title: "Form",
    description: 'The indispensable form controls, designed for maximum clarity'
  },
  components: {
    title: "Components",
    description: 'Advanced multi-part components with lots of possibilities'
  },
  modifiers: {
    title: "Modifiers",
    description: 'An easy-to-read naming system designed for humans'
  },
  layout: {
    title: "Layout",
    description: 'Design the structure of your webpage with these CSS classes'
  },
  elements: {
    title: "Elements",
    description: 'Essential interface elements that only require a single CSS class'
  }
};

function renderPlanetInfo(planet) {
  const planetTitle = document.querySelector('#planetTitle');
  const planetDescription = document.querySelector('#planetDescription');

  if (planet in PLANETS_INFO) {
    planetTitle.textContent = PLANETS_INFO[planet].title;
    planetDescription.textContent = PLANETS_INFO[planet].description;
  } else {
    planetTitle.textContent = 'No value selected';
    planetDescription.textContent = 'Select a value to view its description';
  }
}

const renderPlanetInfoButton = document.querySelector('#renderPlanetInfoButton');
renderPlanetInfoButton.addEventListener('click', event => {
  const planetsSelect = document.querySelector('#planetsSelect');
  const selectedPlanet = planetsSelect.options[planetsSelect.selectedIndex].value;
  renderPlanetInfo(selectedPlanet);
});