window.addEventListener('DOMContentLoaded', () => {

    /**
     * Initialize
     */
    renderUsers(users)

    /**
     * HTML Elements
     */
    const userFormModal = document.querySelector('#user-form-modal')
    const newUserBtn = document.querySelector('#newUserBtn')
    newUserBtn.addEventListener('click', () => {
        const modalTitle = document.querySelector('h5[class="modal-title"]')
        const modalBtn = document.querySelector('#modalBtn')
        const currentPassword = document.querySelector('#currentPassword')
        const newPassword = document.querySelector('#newPassword')
        const confirmPassword = document.querySelector('#confirmPassword')
        const formFullName = document.querySelector('#formFullName');
        const formUsername = document.querySelector('#formUsername');
        const formEmail = document.querySelector('#formEmail');
        const formAbout = document.querySelector('#formAbout');
        currentPassword.disabled = true


        // clear inputs
        formFullName.value = null
        formUsername.value = null
        formEmail.value = null
        formAbout.value = null
        currentPassword.value = null
        newPassword.value = null
        confirmPassword.value = null
        modalTitle.textContent = 'Create user'
        modalBtn.textContent = 'Create'
        formEmail.disabled = false
        newPassword.disabled = false
    })

    /**
     * Input validation
     */
    userFormModal.addEventListener('submit', (event) => {
        // freeze
        event.preventDefault()

        const currentPassword = document.querySelector('#currentPassword')
        const newPassword = document.querySelector('#newPassword')
        const confirmPassword = document.querySelector('#confirmPassword')

        // validation
        const formFullName = document.querySelector('#formFullName');
        const formUsername = document.querySelector('#formUsername');
        const formEmail = document.querySelector('#formEmail');
        const formAbout = document.querySelector('#formAbout');
        const fullName = formFullName.value.trim().split(' ');


        if (fullName.length !== 2 || fullName[0] < 3 || fullName[1] < 3) return alert('Invalid Full Name!');
        if (!(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/).test(formEmail.value.trim())) return alert('Invalid Email!')
        if (newPassword.value.length < 8 && newPassword.value.trim() !== confirmPassword.value.trim()) return alert('Password not same!')

        // get Date
        let date = new Date()


        // add to database
        users.push(
            {
                name: formFullName.value, username: formUsername.value ,
                date: date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear(), checked: false,
                active: false, password: newPassword.value.trim(),
                about: formAbout.value,
                email: formEmail.value
            }
        )

        // update database
        window.localStorage.setItem('users', JSON.stringify(users))

        // render
        renderUsers(users)

        // clear input
        formFullName.value = null
        formUsername.value = null
        formEmail.value = null
        formAbout.value = null
        confirmPassword.value = null
        newPassword.value = null
        confirmPassword.value = null

        // close window
        document.body.lastElementChild.remove()
        userFormModal.classList.remove('show');
        userFormModal.setAttribute('aria-hidden', 'true')
        userFormModal.style.display = 'none';
    })
})