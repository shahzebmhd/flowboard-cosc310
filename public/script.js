const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogListEl = document.getElementById("to-do-list");
const progressListEl = document.getElementById("doing-list");
const completeListEl = document.getElementById("done-list");
const onHoldListEl = document.getElementById("on-hold-list");

const STATUS_MAP = {
	"TODO": 0,
	"DOING": 1,
	"DONE": 2,
	"ON_HOLD": 3
};



// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;
let lastClickedTicketColumn;

async function loadTasksFromJSON() {
	try {
		console.log ("Fetching test.json...");
		const response = await fetch ("/test.json");
		if (!response.ok) throw new Error ("Failed to load test.json");
		console.log("test.json loaded successfully!");
		const data = await response.json();
		console.log("Parsed JSON data:", data);
		const tasks = data?.data?.documents || [];
		
		backlogListArray = [];
		progressListArray = [];
		completeListArray = [];
		onHoldListArray = [];
		listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];


		tasks.forEach ( task => {
			const status = task.status;
			const title = task.title;
			if (STATUS_MAP[status] !== undefined) {
				listArrays[STATUS_MAP[status]].push(title);
			}
		});
		console.log("Final task arrays from test.json:", listArrays);
		updateSavedColumns();
		updateDOM();
	} catch (error) {
		console.log("error");
		console.error("Error loading test.json: ", error);
		getSavedColumns();
        updateDOM();
	}
}
loadTasksFromJSON();

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem("backlogItems")) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {

        backlogListArray = [
            "Write the documentation",
            "Post a technical article",
        ];
        progressListArray = ["Work on project", "Listen to Spotify"];
        completeListArray = ["Submit a PR", "Review my projects code"];
        onHoldListArray = ["Travel"];

    }
}

// Set localStorage Arrays
function updateSavedColumns() {
    listArrays = [
        backlogListArray,
        progressListArray,
        completeListArray,
        onHoldListArray,
    ];
    const arrayNames = ["backlog", "progress", "complete", "onHold"];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(
            `${arrayName}Items`,
            JSON.stringify(listArrays[index])
        );
    });

    // Similar as code above(DRY):

    // localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
    // localStorage.setItem("progressItems", JSON.stringify(progressListArray));
    // localStorage.setItem("completeItems", JSON.stringify(completeListArray));
    // localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
}

// Filter Array to remove empty values
function filterArray(array) {
    const filteredArray = array.filter((item) => item !== null);
    return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    // console.log("columnEl:", columnEl);
    // console.log("column:", column);
    // console.log("item:", item);
    // console.log("index:", index);
    // List Item
    const listEl = document.createElement("li");
    listEl.textContent = item;
    listEl.id = index;
    listEl.classList.add("drag-item");
    listEl.draggable = true;
    listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
    listEl.setAttribute("onmousedown", "hi(event)");
    listEl.setAttribute("ondrag", "drag(event)");
    listEl.contentEditable = true;
    // Append
    columnEl.appendChild(listEl);
}

function hi(event){
    lastClickedTicketColumn = event.target.closest('div').id;
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    if (!updatedOnLoad) {
		loadTasksFromJSON();
        getSavedColumns();
    }
    // Backlog Column
    backlogListEl.textContent = "";
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogListEl, 0, backlogItem, index);
    });
    backlogListArray = filterArray(backlogListArray);
    // Progress Column
    progressListEl.textContent = "";
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressListEl, 1, progressItem, index);
    });
    progressListArray = filterArray(progressListArray);
    // Complete Column
    completeListEl.textContent = "";
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeListEl, 2, completeItem, index);
    });
    completeListArray = filterArray(completeListArray);
    // On Hold Column
    onHoldListEl.textContent = "";
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldListEl, 3, onHoldItem, index);
    });
    onHoldListArray = filterArray(onHoldListArray);
    // Run getSavedColumns only once, Update Local Storage
    updatedOnLoad = true;
    updateSavedColumns();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
    const selectedArray = listArrays[column];
    const selectedColumn = listColumns[column].children;
    if (!dragging) {
        const previousText = selectedArray[id];
        const newText = selectedColumn[id]?.textContent?.trim();
        if (!newText) {
            delete selectedArray[id];
            console.log("Task deleted successfully!");
        } else {
            selectedArray[id] = newText;
            if (previousText && previousText !== newText) {
                console.log("Task updated successfully!");
            }
        }
        updateDOM();
    }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
    const itemText = addItems[column].textContent;
    if (itemText) {
        const selectedArray = listArrays[column];
        selectedArray.push(itemText);
        addItems[column].textContent = "";
        updateDOM(column);
        console.log("Task created successfully!");
    }

}

// Show Add Item Input Box
function showInputBox(column) {
    addBtns[column].style.visibility = "hidden";
    saveItemBtns[column].style.display = "flex";
    addItemContainers[column].style.display = "flex";
}

// Hide Item Input Box
function hideInputBox(column) {
    addBtns[column].style.visibility = "visible";
    saveItemBtns[column].style.display = "none";
    addItemContainers[column].style.display = "none";
    addToColumn(column);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
    backlogListArray = [];
    for (let i = 0; i < backlogListEl.children.length; i++) {
        backlogListArray.push(backlogListEl.children[i].textContent);
    }
    progressListArray = [];
    for (let i = 0; i < progressListEl.children.length; i++) {
        progressListArray.push(progressListEl.children[i].textContent);
    }
    completeListArray = [];
    for (let i = 0; i < completeListEl.children.length; i++) {
        completeListArray.push(completeListEl.children[i].textContent);
    }
    onHoldListArray = [];
    for (let i = 0; i < onHoldListEl.children.length; i++) {
        onHoldListArray.push(onHoldListEl.children[i].textContent);
    }
    updateDOM();
}

// When Item Enters Column Area
function dragEnter(column) {
    listColumns[column].classList.add("over");
    currentColumn = column;
}

// When Item Starts Dragging
function drag(e) {
    draggedItem = e.target;
    dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
    e.preventDefault();
}

// Dropping Item in Column
function drop(e) {
    e.preventDefault();
    const parent = listColumns[currentColumn];
    // Remove Background Color/Padding
    listColumns.forEach((column) => {
        column.classList.remove("over");
    });
    // Add item to Column
    parent.appendChild(draggedItem);

    draggedItem.dataset.column = currentColumn;
    if (lastClickedTicketColumn !== parent.parentNode.id) {
        console.log("moved from ", lastClickedTicketColumn," to ", parent.parentNode.id); //todo better drop logic
    }

    // Dragging complete
    dragging = false;
    rebuildArrays();
}

// On Load
updateDOM();
