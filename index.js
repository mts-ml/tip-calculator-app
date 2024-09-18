const tipAmount = document.querySelector('div.amount-total p.value')

const totalPerson = document.querySelector('div.price p.value')

const resetButton = document.querySelector('div.tip button')

const inputBill = document.getElementById('bill')

const numberOfPeople = document.getElementById('inputPeople')

const tipsPercentage = document.querySelectorAll('ul > li')

const tipsCustom = document.querySelector('li#custom > input')

let selectedTipPercentage = 0


// Verifies if cusinsert value if a valid number
function handleTipCustomInput(customInput) {
   if (isNaN(customInput) || customInput < 0) {
      totalPerson.textContent = `$0.00`
      tipAmount.textContent = "$0.00"

      tipsCustom.classList.add('input-custom')
   } else {
      tipsCustom.classList.remove('input-custom')
      updateDisplay()
   }
}


tipsPercentage.forEach((liPercentage) => {
   if (liPercentage.id === 'custom') {
      const inputCustomPercentage = liPercentage.querySelector('#custom > input')

      // Cleans tip input when focused
      inputCustomPercentage.addEventListener('focus', () => inputCustomPercentage.value = '')

      inputCustomPercentage.addEventListener('input', () => {
         selectedTipPercentage = Number(inputCustomPercentage.value)

         handleTipCustomInput(selectedTipPercentage)
      })
   } else {
      // Select the other percentages
      liPercentage.addEventListener('click', () => {
         selectedTipPercentage = Number(liPercentage.textContent.replace('%', ''))

         updateDisplay()
      })
   }
})

function tipCalculation() {
   const billValue = Number(inputBill.value)
   const peopleCount = Number(numberOfPeople.value)

   return billValue * (selectedTipPercentage / 100) / peopleCount
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

   if (!peopleCount || peopleCount <= 0) {
      ErrorMessage(true)

      totalPerson.textContent = `$0.00`
      tipAmount.textContent = "$0.00"
      return true
   }

   ErrorMessage(false)
   return false
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
