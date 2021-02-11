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

window.addEventListener("DOMContentLoaded", ()=>{

})

// ****** EVENT LISTENERS **********

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearAllItems)
window.addEventListener("DOMContentLoaded", setupItems)

// ****** FUNCTIONS **********

function addItem  (e){
    e.preventDefault()

    let value = grocery.value
    const id = new Date().getTime().toString()
    if(value  && !editFlag){
        createItem(id, value)
        container.classList.add("show-container")
        //display alert
        displayAlert("Added new element", "success")
            // add local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()

    }
    else if(value && editFlag){
       editElement.innerText = value
        displayAlert("item was edited", "success")
        editLocalStorage(editID, value)
        setBackToDefault()
    }
    else {
        displayAlert ("please enter value", "danger")

    }
}

// delete particular item
function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement
    const id = item.dataset.id
    list.removeChild(item)
    if(list.children.length===0){
        container.classList.remove("show-container")
    }

    displayAlert("item removed", "danger")
    setBackToDefault()
     removeFromLocalStorage(id)


}

function editItem(e){
    const item = e.currentTarget.parentElement.parentElement
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    // console.log(editElement.value)
    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editID = item.dataset.id
    submitBtn.textContent = "edit"

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
    localStorage.removeItem("list")

}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    let grocery = {id, value}
    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem("list", JSON.stringify(items))
}

function getLocalStorage(){
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        :
        []
}
function removeFromLocalStorage(id){
  let items = getLocalStorage()
    items = items.filter(i=>i.id!==id)
    localStorage.setItem("list", JSON.stringify(items))
}

function editLocalStorage (id, value){
 let items = getLocalStorage()
    items = items.map(i=>{
        if(i.id === id){
            i.value = value
        }
        return i
    })

    localStorage.setItem("list", JSON.stringify(items))

}
// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage()
    if(items.length>0){
      items.map(i=>createItem(i.id, i.value))
    }
    container.classList.add("show-container")
}

function createItem(id, value){
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
    // show container

}