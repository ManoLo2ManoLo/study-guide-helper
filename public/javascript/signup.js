async function signupFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const verify = document.querySelector('#verify').value.trim();

    let warningEl = document.querySelector('#warningEl');

    if (first_name && last_name && username && email && password && verify && password === verify) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
         });

        if (response.ok) {
            document.location.replace('/login')
        } else {
            alert(response.statusText);
        } 
    } else if (password != verify) {
        warningEl.innerHTML = 'Your password and verify password do not match.';
    } else if (!first_name) {
        warningEl.innerHTML = 'Please enter a first name.';
    } else if (!last_name) {
        warningEl.innerHTML = 'Please enter a last name.';
    } else if (!username) {
        warningEl.innerHTML = 'Please enter a username.';
    } else if (!email) {
        warningEl.innerHTML = 'Please enter a email.';
    } else if (!password) {
        warningEl.innerHTML = 'Please enter a password.';
    } else if (!verify) {
        warningEl.innerHTML = 'Please verify your password.';
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);