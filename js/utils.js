const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function createElements(...tagNames){
    return tagNames.map(tag => document.createElement(tag))
}

const spanAll = document.querySelector("#All")
const activeSpan = document.querySelector("#Active")
const selectedSpan = document.querySelector('#Selected')
spanAll.addEventListener("click", (event) => {
    event.preventDefault()
    checked_checkbox = false
    renderUsers(users)
})

activeSpan.addEventListener("click", (event) => {
    event.preventDefault()
    checked_checkbox = false
    let res = users.filter((el)=> el.active===true)
    renderUsers(res)
})

selectedSpan.addEventListener("click",(event) =>{
    event.preventDefault()
    let res = users.filter((el)=> el.checked===true)
    checked_checkbox = true
    renderUsers(res)
})