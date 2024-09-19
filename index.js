const inputBill = document.getElementById('bill')

const tipsPercentage = document.querySelectorAll('ul > li')

const tipsCustom = document.querySelector('li#custom > input')

const numberOfPeople = document.getElementById('inputPeople')

const tipAmount = document.querySelector('div.amount-total p.value')

const totalPerson = document.querySelector('div.price p.value')

const resetButton = document.querySelector('div.tip button')

let selectedTipPercentage = 15

// Function to set initial % 15
function setInitialPercentage() {
   tipsPercentage.forEach(li => {
      if (Number(li.textContent.replace('%', '')) === 15) {
         li.classList.add('active')
      }
   })
   updateDisplay()
}


function handleBillValue() {
   inputBill.addEventListener('input', () => {
      const billValue = Number(inputBill.value)

      if (billValue <= 0) {
         inputBill.classList.add('input-custom')
         console.log(billValue)
         totalPerson.textContent = `$0.00`
         tipAmount.textContent = "$0.00"
      } else {
         inputBill.classList.remove('input-custom')
         updateDisplay()
      }
   })
}

// Verifies if custom input value is valid
function handleTipCustomInput(customInput) {
   if (isNaN(customInput) || customInput < 0) {
      totalPerson.textContent = `$0.00`
      tipAmount.textContent = "$0.00"
      tipsCustom.classList.add('input-custom')
   } else {
      updateDisplay()
   }
}

tipsCustom.addEventListener('input', () => {
   selectedTipPercentage = Number(tipsCustom.value)
   handleTipCustomInput(selectedTipPercentage)
})

tipsCustom.addEventListener('focus', () => {
   removeActiveClass()
})


tipsPercentage.forEach((liPercentage) => {
   // Select the other percentages
   liPercentage.addEventListener('click', () => {
      removeActiveClass()

      selectedTipPercentage = Number(liPercentage.textContent.replace('%', ''))

      liPercentage.classList.add('active')

      tipsCustom.value = ''
      tipsCustom.classList.remove('input-custom')
      updateDisplay()
   })
})

// Remove the active class list from percentages buttons
const removeActiveClass = () => {
   tipsPercentage.forEach(li => li.classList.remove('active'))
}


function ErrorMessage(showError) {
   const span = document.querySelector('span#error')

   if (showError) {
      span.innerHTML = "Only numbers (can't be zero)"
      numberOfPeople.classList.add('span-error')
   } else {
      span.innerHTML = ''
      numberOfPeople.classList.remove('span-error')
   }
}

function errors() {
   const peopleCount = Number(numberOfPeople.value)

   if (!peopleCount || peopleCount <= 0 || handleBillValue()) {
      ErrorMessage(true)

      totalPerson.textContent = `$0.00`
      tipAmount.textContent = "$0.00"
      return true
   }

   ErrorMessage(false)
   return false
}

function tipCalculation() {
   const billValue = Number(inputBill.value) || 0
   const peopleCount = Number(numberOfPeople.value) || 0

   return billValue * (selectedTipPercentage / 100) / peopleCount
}


function updateDisplay() {
   if (errors()) {
      return
   }

   const tipPerPerson = tipCalculation()
   tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`

   const totalPerPerson = (tipPerPerson + (Number(inputBill.value) / (parseInt(numberOfPeople.value)))).toFixed(2)
   totalPerson.textContent = `$${totalPerPerson}`
}


function resetValues() {
   tipAmount.textContent = `$0.00`;
   totalPerson.textContent = `$0.00`;
   numberOfPeople.value = 1;
   inputBill.value = '';
   inputBill.focus();
}
resetButton.addEventListener('click', resetValues);

inputBill.addEventListener('input', updateDisplay)
numberOfPeople.addEventListener('input', updateDisplay)

setInitialPercentage()
