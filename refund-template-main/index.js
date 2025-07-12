const amount = document.querySelector("#amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

amount.oninput = () => {

    let value =  amount.value.replace(/\D/g, "")
    value = Number(value) / 100
    amount.value = formatCurrencyBRL(value)

}

function formatCurrencyBRL(value){
value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
})
return value
}

form.onsubmit = (event) =>{
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

expenseAdd(newExpense)

}

function expenseAdd(newExpense){
    try {
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const remover = document.createElement("img")
        remover.classList.add("remove-icon")
        remover.setAttribute("src", "img/remove.svg")
        remover.setAttribute("alt", "remover")

        expenseInfo.append(expenseName, expenseCategory)
 
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, remover)
        expenseList.append(expenseItem)
    } catch (error) {
        alert("Error. ")
    }

    updatesTotal(newExpense)
    clear()
}

function updatesTotal(){
    try {
        const items = expenseList.children
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        let total = 0
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
            value = parseFloat(value)

           if(isNaN(value)) {
                return alert("Não é um número válido")
            }
        total += value 
        }    
          
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$" 

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        expenseTotal.innerHTML = ""
        expenseTotal.append(symbolBRL, total)
       

    } catch (error) {
        alert("Não foi possível atualizar a lista.")
    }
}

expenseList.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove-icon")){
       const item = e.target.closest(".expense")
       item.remove()
    }
    updatesTotal()
    
   
})
function clear(){
    amount.value = ""
    expense.value = ""
    category.value = ""
    expense.focus()
}
 