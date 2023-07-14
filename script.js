const divElement = document.createElement("div");
const itemsPlace = document.getElementById("itemsPlace");
itemsPlace.appendChild(divElement);
const prefix = "task-manager-";
let counter = 1;
let items = [];
const quantity = document.getElementById("quantity-input");

const storedItems = localStorage.getItem(`${prefix}items`);
if (storedItems) {
    items = JSON.parse(storedItems);
}

showItems();

function addItemToYourList(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const textBox = document.getElementById("txtItem");


    if (textBox.value && quantity.value) {
        items.push({ task: textBox.value, quantity: quantity.value, completed: false });
        showItems();
        textBox.value = "";
        quantity.value = "";
    }
}

function clearAllItems() {
    items = [];
    showItems();
}
function editItem(index) {
    const itemElement = document.getElementById(`item-${index}`);
    const itemText = itemElement.querySelector(".item-text");
    const editInput = document.createElement("input");
    const currentItem = items[index];
    editInput.value = currentItem.task;
    quantity.value = currentItem.quantity; // Update the quantity input field value
    itemElement.replaceChild(editInput, itemText);
    editInput.focus();
    editInput.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) { // Enter key
            currentItem.task = editInput.value;
            showItems();
        }
    });
}

function deleteItem(index) {
    items.splice(index, 1);
    showItems();
}

function showItems() {
    divElement.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const completedClass = item.completed ? "completed" : "";
        divElement.innerHTML += `
       
      <div id="item-${i}" class="${completedClass} itemsDiv">
       <input type="checkbox" onclick="toggleCompleted(${i})" ${item.completed ? 'checked' : ''}>
        - <span class="item-text">${item.task} (${item.quantity})</span> 
        <button title="Delete Item" onclick="deleteItem(${i})">❌</button>
        <button title="Edit Item" onclick="editItem(${i})">🔨</button> 
        <br>
      </div>`;
    }

}
function saveItems() {
    localStorage.setItem(`${prefix}items`, JSON.stringify(items));
}
function toggleCompleted(index) {
    items[index].completed = !items[index].completed; //שינוי הסטטוס
    showItems();
}


for (let i = 0; i < items.length; i++) {
    if (items[i].completed) {
        const itemElement = document.getElementById(`item-${i}`);
        itemElement.classList.add("completed");
    }
}