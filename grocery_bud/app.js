// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")

const clearBtn = document.querySelector(".clear-btn")

// edit option
let editElement
let editFlag = false
let editID = ""

// ****** EVENT LISTENERS **********

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearAllItems)

// ****** FUNCTIONS **********

function addItem  (e){
    e.preventDefault()

    let value = grocery.value
    const id = new Date().getTime().toString()
    if(value  && !editFlag){
       let element = document.createElement("article")
        // add class
        element.classList.add("grocery-item")
        // add attr
         let attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`

        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click", editItem)

        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem)

        // append Child
        list.appendChild(element)
        //display alert
        displayAlert("Added new element", "success")
        // show container
        container.classList.add("show-container")
            // add local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()

    }
    else if(value && editFlag){

    }
    else {
        displayAlert ("please enter value", "danger")

    }
}

// delete particular item
function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement
    list.removeChild(item)
    if(list.children.length===0){
        container.classList.remove("show-container")
    }

    displayAlert("item removed", "danger")
    setBackToDefault()

}

function editItem(){
    console.log("item was edited")
}


/* display alert*/
let displayAlert = (text, action)=>{
  alert.textContent = text
    alert.classList.add(`alert-${action}`)

    /*remove alert*/
    setTimeout(function () {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

// set back to default
function setBackToDefault(){
    grocery.value = ""
    editFlag = false
    editID = ""
    submitBtn.textContent = "submit"
}

function clearAllItems (e){
    e.preventDefault()
    const items = document.querySelectorAll(".grocery-item")
    if(items.length>0){
        items.forEach((item)=>{
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container")
    displayAlert("all items deleted", "danger")
    setBackToDefault()
    // localStorage.remove("list")
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    console.log("local")
}
// ****** SETUP ITEMS **********
