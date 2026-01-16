import menuArray from "./data/data.js"

const menuEle = document.getElementById('menu')

document.addEventListener('click', function(e) {

    if(e.target.dataset.item) {
        handleAddItemButton(e.target.dataset.item)
    }

})

const targetItemArr = [] 

function handleAddItemButton(itemId) {
    console.log('1. Item ID clicked:', itemId)
    const clickedItem = menuArray.find( item => item.id == itemId )

    if(clickedItem) {
        targetItemArr.push(clickedItem)
    }

    console.log('2. Found item:', clickedItem)

    console.log('3. Current array:', targetItemArr)
    let itemsHtml = ''
    targetItemArr.forEach( targetItem => {
        itemsHtml += `

            <div class="order-item">
                <div class="item-info">
                    <span class="item-name">${targetItem.name}</span>
                    <button class="remove-btn" onclick="removeItem(this)">remove</button>
                </div>
                <span class="item-price">$${targetItem.price}</span>
            </div>
    `
    })

    const total = targetItemArr.reduce( (sum, item) => {
        return  sum + item.price
    }, 0)

    console.log('4. Total calculated:', total)
    const totalHtml = `
        <div class="order-items">
            ${itemsHtml}
        </div>

        <div class="total-row">
                <p class="total-label">Total price:</p>
                <p class="total-price" aria-label="Total: ">$${total}</p>
        </div>

        <button class="complete-order-btn" 
                type="button"
                aria-label="Complete your order">
            Complete order
        </button>
    `
    const totalEle = document.getElementById('total')

    console.log('5. Total element found:', totalEle)

    if(totalEle) {
        totalEle.innerHTML = totalHtml
    }
}



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