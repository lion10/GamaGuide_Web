    ////// sign up \\\\\\ 
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit',(e) => {
    
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    

    // signup the user 
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
            //console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset(); // close form field       
    });

});


   ////// logout \\\\\\ 
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        console.log('user sign out');
    })

});


    ////// login \\\\\\ 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    // signup the user 
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
            console.log(cred.user);
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset(); // close form field       
    });

});