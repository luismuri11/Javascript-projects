import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://playground-5ff7c-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')
const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const uListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', ()=>{
    let inputValue = inputFieldEl.value
    if (inputValue != ""){
        push(shoppingListInDB, inputValue) 
        clearInputFieldElement()
    }
})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()){
    let arrValues = Object.entries(snapshot.val())
                                                                                                                 
    clearShoppingList()
    
    for (let i=0; i<arrValues.length; i++){
        let currentItem = arrValues[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        addListItem(currentItem)
    }}
    else{
        uListEl.innerHTML = 'No items here.. yet'
    }
})

function clearShoppingList(){
    uListEl.innerHTML = ""
}

function clearInputFieldElement(){
    inputFieldEl.value = ""
}

function addListItem(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newElement = document.createElement('li')
    newElement.textContent = itemValue

    newElement.addEventListener('dblclick', ()=>{
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    uListEl.append(newElement)
}