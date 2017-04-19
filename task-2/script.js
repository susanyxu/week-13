// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [{
        name: "Books to Read",
        items: ["Hitchhiker's Guide to Galaxy", "Walden", "The Elephant, the Tiger, and the Cell Phone"]
    },
    {
        name: "Groceries to Buy",
        items: ["Milk", "Eggs", "Butter"]
    }
];
var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

// ------------------------------------------------------
// GET AND SET DATA FROM LOCAL STORAGE
// ------------------------------------------------------


// ------------------------------------------------------
// LIST SELECTION
// ------------------------------------------------------
// 1. Listen to click
// 2. Get the list that was clicked on
// 3. Remove "active" from classList
// 4. add "active" to selected list
// 5. update items for selected div
listDiv.addEventListener("click", function(e) {
    // console.log(e.target);
    var clickedListElement = e.target;
    console.log(clickedListElement.dataset);
    selectedList = clickedListElement.dataset.index;
    console.log("selectedList", selectedList);

    updateLists();
    updateItemsForSelectedList();
});

// ------------------------------------------------------
// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
// ------------------------------------------------------
function updateLists() {
    while (listDiv.hasChildNodes()) {
        listDiv.removeChild(listDiv.lastChild);
    }

    listArray.forEach(function(list, i) {
        // Create an 'a' element
        var aElement = document.createElement("a");
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        aElement.classList.add("list");
        if (selectedList == i) {
            aElement.classList.add("active");
        }
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

    var listItemArray = listArray[selectedList].items;
    listItemArray.forEach(function(item, i) {
        // Populate the list-items div (the right div) wit respective list items
        // - make a new 'a' element
        var aElement = document.createElement("a");
        // - add classes to its classList
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        // - set value of 'data-index' attribute to i
        // - Create a textNode with item name
        var textNode = document.createTextNode(item);
        // - append textNode to the 'a' element
        aElement.appendChild(textNode);
        // console.log(aElement);
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
        listArray.push(newList);
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
    var currentList = listArray[selectedList];
    var itemArray = listArray[selectedList].items;

    // - get the input value in a variable
    var inputValue = document["add-item-form"]["item-name-input"].value;
    // - check if the input value is more than 2 characters
    // - add it into itemArray
    itemArray.push(inputValue);
    // - update listItem div
    updateItemsForSelectedList();
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
