// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES

var listArray = [
  { name: "Books to Read",
    items: [
      "Hitchhiker's Guide to Galaxy",
      "Walden",
      "The Elephant, the Tiger, and the Cell Phone"
    ]
    },
    { name: "Groceries to Buy",
      items: [
        "Milk",
        "Eggs",
        "Butter"
      ]
    }
];
var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");


// check if data exists in localStorage
if (!localStorage.getItem("listkeeper-data")) {
    // if not then set the data
    localStorage.setItem("listkeeper-data", JSON.stringify(listArray));
}
// ------------------------------------------------------
// GET AND SET DATA FROM LOCAL STORAGE
// ------------------------------------------------------
function getData() {
    var dataString = localStorage.getItem("listkeeper-data");
    var data = JSON.parse(dataString);
    return data;
}
function setData(data) {
    var dataString = JSON.stringify(data);
    localStorage.setItem("listkeeper-data", dataString);
}

// ------------------------------------------------------
// LIST SELECTION
// ------------------------------------------------------
listDiv.addEventListener("click", function(e){
    selectedList = e.target.dataset.index;

    var listHTMLElements = listDiv.querySelectorAll("a");
    listHTMLElements.forEach(function(list, i) {
        list.classList.remove("active");
        if (selectedList == i) {
            list.classList.add("active");
        }
    });
    updateItemsForSelectedList();
});

// ------------------------------------------------------
// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
// ------------------------------------------------------
function updateLists() {
  while (listDiv.hasChildNodes()) {
    listDiv.removeChild(listDiv.lastChild);
  }

  getData().forEach(function(list, i) {
    // Create an 'a' element
    var aElement = document.createElement("a");
    aElement.classList.add("list-group-item");
    aElement.classList.add("list-group-item-action");
    aElement.classList.add("list");

    aElement.setAttribute("data-index", i);

    var textNode = document.createTextNode(list.name);
    aElement.appendChild(textNode);

    listDiv.appendChild(aElement);
  });
}

function updateItemsForSelectedList() {
  while (itemDiv.hasChildNodes()) {
    itemDiv.removeChild(itemDiv.lastChild);
  }

  var listItemArray = getData()[selectedList].items;
  listItemArray.forEach(function(item, i) {
    // Populate the list-items div (the right div) wit respective list items
    // - make a new 'a' element
    var aElement = document.createElement("a");
    // - add classes to its classList
    aElement.classList.add("list-group-item");
    aElement.classList.add("list-group-item-action");
    aElement.classList.add("list");
    // - set value of 'data-index' attribute to i
    aElement.setAttribute("data-index", i);
    // - Create a textNode with item name
    var textNode = document.createTextNode(item);
    // - append textNode to the 'a' element
    aElement.appendChild(textNode);
    // - append 'a' element to the itemDiv
    itemDiv.appendChild(aElement);
  });
}

updateLists();
updateItemsForSelectedList();

// ------------------------------------------------------
// ADDING TO LIST
// ------------------------------------------------------
addListButton.addEventListener("click", function(e) {
  e.preventDefault();
  var listName = document["add-list-form"]["list-name-input"].value;
  if (listName.length >= 3) {
    var newList = {
        name: listName,
        items: []
      };
    var data = getData();
    data.push(newList);
    setData(data);
    updateLists();
  } else {
    alert("Please enter a valid list name: Atleast 3 characters");
  }
});

// ------------------------------------------------------
// ADDING TO LIST ITEMS
// ------------------------------------------------------
addItemButton.addEventListener("click", function(e) {
  e.preventDefault();
  var data = getData();
  var currentList = data[selectedList];
  var itemArray = currentList.items;

  // - get the input value in a variable
  var itemName = document["add-item-form"]["item-name-input"].value;
  // - check if the input value is more than 2 characters
  if (itemName.length >= 3) {
    var newItem = itemName;
    // - add it into itemArray
    itemArray.push(newItem);
    setData(data);
    // - update listItem div
    updateItemsForSelectedList();
  } else {
    alert("Please enter a valid list name: Atleast 3 characters");
  }
});

// ------------------------------------------------------
// POP-UP HANDLING CODE
// ------------------------------------------------------
var buttonsArray = document.querySelectorAll(".popup-button");
// querySelectorAll returns a DOMTokenList and not an Array (which includes methods like forEach)
buttonsArray = Array.from(buttonsArray); // Conevrting DOMTokenList to an Array

buttonsArray.forEach(function(button) {
  button.addEventListener("click", function() {
    var popup = document.getElementById(this.dataset.popupid);
    // The data attributes can be accessed by .dataset variable which is part of the DOMElement (check HTML for buttonsArray)
    popup.style.display = "flex";
  });
});

var closeButton = document.querySelectorAll(".close");
closeButton.forEach(function(button, i) {
  button.addEventListener("click", closePopups);
});

function closePopups() {
  var popupsArray = Array.from(document.querySelectorAll(".popup"));
  popupsArray.forEach(function(popup) {
    popup.style.display = "none";
  });
}
