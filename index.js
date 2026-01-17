import menuArray from "./data/data.js"

const menuEle = document.getElementById('menu')

document.addEventListener('click', function(e) {

    if(e.target.dataset.item) {
        handleAddItemButton(e.target.dataset.item)
    } else if (e.target.dataset.index) {
        removeItem(e.target.dataset.index)
    } else if(e.target.id == "orderBtn") {
        const orderForm = document.getElementById("formContent")
        handleOrderButton(orderForm)
    }

})


let targetItemArr = [] 

function handleAddItemButton(itemId) {
    const clickedItem = menuArray.find( item => item.id == itemId )

    if(clickedItem) {
        targetItemArr.push(clickedItem)
    }

    renderOrder(targetItemArr)
}

function renderOrder(targetItemArr) {
    let itemsHtml = ''
    targetItemArr.forEach( (targetItem, index) => {
        itemsHtml += `

            <div class="order-item">
                <div class="item-info">
                    <span class="item-name">${targetItem.name}</span>
                    <button class="remove-btn" data-index=${index}">remove</button>
                </div>
                <span class="item-price">$${targetItem.price}</span>
            </div>
    `
    })

    const total = targetItemArr.reduce( (sum, item) => {
        return  sum + item.price
    }, 0)

    const totalHtml = `
        <div class="order-items">
            <h2>Your order</h2>
            ${itemsHtml}
        </div>

        <div class="total-row">
                <p class="total-label">Total price:</p>
                <p class="total-price" aria-label="Total: ">$${total}</p>
        </div>

        <button id="orderBtn" class="complete-order-btn" 
                type="button"
                aria-label="Complete your order">
            Complete order
        </button>
    `
    const totalEle = document.getElementById('total')


    if(totalEle) {
        totalEle.innerHTML = totalHtml
    }
}

function removeItem(item) {
    targetItemArr.splice(item, 1)
    renderOrder(targetItemArr)
}

function handleOrderButton(order) {
    order.classList.toggle('hidden')
}

const fromEle = document.getElementById("paymentForm")
const success = document.getElementById("successMessage")
fromEle.addEventListener('submit', function(e) {
    e.preventDefault()
    
    success.classList.toggle('hidden')
    
})

function getMenuHtml() {
    let menuHtml = ''

    menuArray.forEach( item => {
        menuHtml += `
            <ul class='menu-list'>
                <li class="menu-item" role="listitem">
                    <span class="item-icon" aria-hidden="true">${item.emoji}</span>
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.ingredients}</p>
                        <p class="item-price" aria-label="Price: in dollars">$${item.price}</p>
                    </div>
                    <button class="add-btn" 
                            aria-label="Add item to cart"
                            type="button">
                        <span aria-hidden="true" data-item=${item.id}>+</span>
                    </button>
                </li>
            </ul>
        `
    })
    menuEle.innerHTML = menuHtml
}

function render() {
    getMenuHtml()
}

render()