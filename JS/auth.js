////// (15) add admin cloud function\\\\\\

const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then( result => {
        console.log(result);
    })

});





////// (4) listen for auth status change \\\\\\ 
// let unsubscribe = () => {};
auth.onAuthStateChanged(user => {    
    //(8)
    if (user){  
        user.getIdTokenResult().then( idTokenResult=>{
            user.admin = idTokenResult.claims.admin;
            setUpUi(user);
        });
        db.collection('guides').onSnapshot(snapshot => {
            //console.log(snapshot);
            setUpGuides(snapshot.docs);
        }, err => {
            console.log(err.message);
        });
    }
    else{
        setUpUi();
        setUpGuides([]);
    }
  
    //   if(user){
    //     // get data
    //         unsubscribe = db.collection('guides').onSnapshot(snapshot => {
    //         setUpGuides(snapshot.docs);
    //         setUpUi(user);
    //     });    
    //   } else {
    //         setUpGuides([]);
    //         setUpUi();
    //         unsubscribe();
    //   }
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




    ////// (1) sign up  =>  (13) firestore user collection get uid for firbase auth section \\\\\\ 
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit',(e) => {
    
    e.preventDefault(); // prevent refresh the form aften submit info

    // get user info 
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    
    

    // signup the user 
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio: signUpForm['signup-bio'].value
        });
    }).then(()=>{
        //console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signUpForm.reset(); // close form field  
        signUpForm.querySelector('.error').innerHTML ='';
           
    }).catch(err =>{
        signUpForm.querySelector('.error').innerHTML = err.message;
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
            loginForm.querySelector('.error').innerHTML = '';
      
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});