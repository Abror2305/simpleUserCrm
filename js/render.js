const all = document.querySelector('#all')
const tbody = document.querySelector('tbody')
const active = document.querySelector('#active')
const selected = document.querySelector('#selected')
const checkbox = document.querySelector('#all-items')
const searchName = document.querySelector('#searchName')

let checked_checkbox = window.localStorage.getItem('all-checked')
checked_checkbox = JSON.parse(checked_checkbox) || false

let selected_for_all = window.localStorage.getItem('selected')
selected_for_all = JSON.parse(selected_for_all)

if(!(selected_for_all && Object.keys(selected_for_all).length)) {
    selected_for_all = {all: users.length, active: 0, selected: 0}
}

renderUsers(users)

function renderUsers(usersList) {
    tbody.innerHTML = null
    let count = 0;
    checkbox.checked = checked_checkbox
    all.textContent = '/' + ' ' + usersList.length
    active.textContent = '/' + ' ' + selected_for_all.active
    selected.textContent = '/' + ' ' + selected_for_all.selected

    for(let user of usersList) {
        const [tr, td1, div, input, label, td2, div2, i1, td3, td4, span1, td5, i2, td6, div3, btn1, btn2, i3] =
            createElements('tr', 'td', 'div', 'input', 'label',
            'td', 'div', 'i', 'td', 'td', 'span', 'td', 'i', 'td', 'div', 'button', 'button', 'i')

        td1.setAttribute('class', 'align-middle')
        div.setAttribute('class', 'custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top')
        input.setAttribute('class', 'custom-control-input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('id', `item-${++count}`)
        input.checked = user.checked
        label.setAttribute('class', 'custom-control-label')
        label.setAttribute('for', `item-${count}`)

        div.append(input, label)
        td1.append(div)

        td2.setAttribute('class', 'align-middle text-center')
        div2.setAttribute('class', 'bg-light d-inline-flex justify-content-center align-items-center align-top')
        div2.setAttribute('style', 'width: 35px; height: 35px; border-radius: 3px;')
        i1.setAttribute('class', 'fa fa-fw fa-photo')
        i1.setAttribute('style', 'opacity: 0.8')

        div2.append(i1)
        td2.append(div2)

        td3.setAttribute('class', 'text-nowrap align-middle')
        td4.setAttribute('class', 'text-nowrap align-middle')
        td5.setAttribute('class', 'text-center align-middle')
        i2.setAttribute('class', 'fa fa-fw text-secondary cursor-pointer')
        if(user.active) i2.classList.add('fa-toggle-on')
        else i2.classList.add('fa-toggle-off')

        td6.setAttribute('class', 'text-center align-middle')
        div3.setAttribute('class', 'btn-group align-top')
        btn1.setAttribute('class', 'btn btn-sm btn-outline-secondary badge')
        btn2.setAttribute('class', 'btn btn-sm btn-outline-secondary badge')
        btn1.setAttribute('type', 'button')
        btn2.setAttribute('type', 'button')
        btn1.setAttribute('data-toggle', 'modal')
        btn1.setAttribute('data-target', '#user-form-modal')
        i3.setAttribute('class', 'fa fa-trash')

        td3.textContent = user.name
        span1.textContent = user.date
        btn1.textContent = 'Edit'

        td4.append(span1)
        td5.append(i2)
        btn2.append(i3)
        div3.append(btn1, btn2)
        td6.append(div3)

        tr.append(td1, td2, td3, td4, td5, td6)
        tbody.append(tr)

        input.addEventListener('change', function () {
            if(this.checked) {
                user.checked = true
                selected_for_all.selected += 1
                if(selected_for_all.selected === usersList.length) checked_checkbox = true
            } else {
                user.checked = false
                selected_for_all.selected -= 1
                checked_checkbox = false
            }


            renderUsers(usersList)
        })

        i2.onclick = function () {
            if(!user.active) {
                i2.setAttribute('class', 'fa fa-fw text-secondary cursor-pointer fa-toggle-on')
                user.active = true
                selected_for_all.active += 1
            } else {
                i2.setAttribute('class', 'fa fa-fw text-secondary cursor-pointer fa-toggle-off')
                user.active = false
                selected_for_all.active -= 1
            }

            renderUsers(usersList)
        }

        btn2.onclick = function () {
            usersList.splice(usersList.indexOf(user), 1)
            this.parentNode.parentNode.parentNode.remove()
            if(user.checked) {
                selected_for_all.selected -= 1;
            }
            if(user.active) {
                selected_for_all.active -= 1;
            }
            renderUsers(usersList)
        }

        btn1.onclick = () => {
            const formFullName = document.querySelector('#formFullName');
            const formUsername = document.querySelector('#formUsername');
            const formEmail = document.querySelector('#formEmail');
            const formAbout = document.querySelector('#formAbout');
            const modalTitle = document.querySelector('h5[class="modal-title"]')
            const modalBtn = document.querySelector('#modalBtn')
            const currentPassword = document.querySelector('#currentPassword')
            const newPassword = document.querySelector('#newPassword')

            modalBtn.textContent = "Save Changes"
            modalTitle.textContent = 'Edit user'
            formUsername.value = user.username
            formFullName.value = user.name
            formAbout.value = user.about
            formEmail.disabled = true
            currentPassword.disabled = false
            newPassword.disabled = true
            formEmail.value = user.email

        }

    }
    window.localStorage.setItem('users', JSON.stringify(users))
    window.localStorage.setItem('all-checked', JSON.stringify(checked_checkbox))
    window.localStorage.setItem('selected', JSON.stringify(selected_for_all))

}

checkbox.addEventListener('change', function() {
    if(this.checked) {
        checked_checkbox = true
        for(let user of users) {
            user.checked = true
        }
        selected.textContent = '/' + ' ' + users.length
        selected_for_all.selected = users.length
    } else {
        for(let user of users) {
            user.checked = false
        }
        selected.textContent = '/' + ' ' + 0
        selected_for_all.selected = 0
        checked_checkbox = false
    }
    window.localStorage.setItem('selected', JSON.stringify(selected_for_all))
    window.localStorage.setItem('all-checked', JSON.stringify(checked_checkbox))
    window.localStorage.setItem('users', JSON.stringify(users))
    renderUsers(users)
})

searchName.addEventListener("input", ()=>{
    const regex = new RegExp(searchName.value, 'gi')
    const res = users.filter((e) => e.name.match(regex))
    selected_for_all.active = 0
    selected_for_all.selected = 0
    if(res.length) {
        for(let user of res) {
            if(user.checked) selected_for_all.selected += 1
            if(user.active) selected_for_all.active += 1
        }
    }
    window.localStorage.setItem('selected', JSON.stringify(selected_for_all))
    renderUsers(res)
})