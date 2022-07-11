(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav button").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav button");

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


//For menu
function adminBtnClick() {
  document.getElementById("adminDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showAdmin')) {
        openDropdown.classList.remove('showAdmin');
      }
    }
  }
}


// For skip to content
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

//Update tab index dynamically
// var $tabs = $('.tabs');
// var $panels = $('.tab-pane');

// $tabs.on('click', 'li', function (e) {
// e.preventDefault();
//  var id = $(this).attr('id');

// $tabs.find('[aria-selected="true"]').attr({
//            'aria-selected': false,
//            'tabindex': -1
//        });
//   $(this).attr({
//            'aria-selected': true,
//            'tabindex': 0
//        });
// });

// $(document).keydown(
//   function(e)
//   {    
//       if (e.keyCode == 39) {      
//           $(".move:focus").next().focus();
 
//       }
//       if (e.keyCode == 37) {      
//           $(".move:focus").prev().focus();
 
//       }
//   }
// );


class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab);
  }

  setSelectedTab(currentTab) {
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

// Initialize tablist

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].tabs');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});


