
////// (6) \\\\\\ 
const guideList = document.querySelector('.guides');
////// (9) \\\\\\ 
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
////// (12) \\\\\\ 
const accountDetails = document.querySelector('.account-details');


////// (10) setUpUi to toggel UI elements \\\\\\ 
const setUpUi = (user) => {

    if(user){
      ////// (14) account info\\\\\\ 
      db.collection('users').doc(user.uid).get().then(doc =>{
        const  html = `
          <div>Loggeed in as ${user.email}</div>
          <div>${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html; 
      });

        //toggle
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');

    }
    else{
        // hide account information
        accountDetails.innerHTML = ''; 

        //toggle
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }

}



////// (7) get data from firebase \\\\\\ 
const setUpGuides = (data) =>{
        if (data.length) {
            let html = '';
            data.forEach(doc => {
              const guide = doc.data();
              const li = `
                <li>
                  <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
                  <div class="collapsible-body white"> ${guide.content} </div>
                </li>
              `;
              html += li;
            });
            guideList.innerHTML = html
          } else {
            guideList.innerHTML = '<h5 class="red-text darken-4 center-align bold">Please login to view guides! </h5>';          }
        }


////// setup materilize components \\\\\\ 

document.addEventListener('DOMContentLoaded',function(){
    var modals =document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});