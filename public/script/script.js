const YourBalance = document.getElementById('YourBalance')
const incomeAmt = document.getElementById('incomeAmt')
const expenseAmt = document.getElementById('expenseAmt')
const type = document.getElementById('type')
const text = document.getElementById('text')
const Amt = document.getElementById('Amt')
const Submit = document.getElementById('Submit')
const date = document.getElementById('date')


// Submit.onclick = () =>{

    

//     let a = incomeAmt.innerHTML
//     let b = expenseAmt.innerHTML
//     YourBalance.innerHTML  = a - b

// }



onload = () =>{

    let d = new Date()
    let day = d.getDate()
    let mon = d.getMonth()
    let year = d.getFullYear()

    date.value = day + " "+mon+" "+year 


    let a = incomeAmt.innerHTML
    let b = expenseAmt.innerHTML
    YourBalance.innerHTML  = a - b
}




