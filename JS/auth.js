

////// (4) listen for auth status change \\\\\\ 
auth.onAuthStateChanged(user => {
    
    //(8)
    if (user){  
        db.collection('guides').onSnapshot(snapshot => {
            //console.log(snapshot);
            setUpGuides(snapshot.docs);
            setUpUi(user);
        });
    
    }
    else{
        setUpUi();
        setUpGuides([]);
    }


});

    ////// (11) Crete new guide \\\\\\ 

    const createForm = document.querySelector('#create-form');
    createForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        db.collection('guides').add({
            title : createForm['title'].value,
            content: createForm['content'].value
        }).then(()=>{
            // to close modal and reset form
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
        }).catch(err => {
            console.log(err.message);
        });

    });




    ////// (1) sign up \\\\\\ 
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


   ////// (2) logout \\\\\\ 
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut();

});


    ////// (3) login \\\\\\ 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    // signup the user 
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
            // console.log(cred.user);
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset(); // close form field       
    });

});