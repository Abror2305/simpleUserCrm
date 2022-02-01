const spanAll = document.querySelector("#All")
const activeSpan = document.querySelector("#Active")
const selectedSpan = document.querySelector('#Selected')
spanAll.addEventListener("click", (event) => {
    event.preventDefault()
    checked_checkbox = false
    renderUsers(users)
    console.log("abror")
})

activeSpan.addEventListener("click", (event) => {
    event.preventDefault()
    checked_checkbox = false
    let res = users.filter((el)=> el.active===true)
    renderUsers(res)
})

selectedSpan.addEventListener("click",() =>{
    event.preventDefault()
    let res = users.filter((el)=> el.checked===true)
    checked_checkbox = true
    renderUsers(res)
})