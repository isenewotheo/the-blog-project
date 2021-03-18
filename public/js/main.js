// modal
// modal trigger is the launch modal class
// onclick get the target modal
// if it exist launch modal
// else do nothing
let base = 'http://localhost:8080';
class Modal {
    constructor(modalElement, targetElements){
        this.modalElement = modalElement
        this.targetElements = targetElements;
    }
    // this initializes the modal by setting it display and it 
    // children components to "none"
    init(){
        this.modalElement.style.display = "none";
        let modalChildren = Array(...this.targetElements.children);
        modalChildren.forEach(m => {
            m.style.display = 'none';
        });
    }
    // launchModal gets the modalElements children 
    // converts it to an array 
    // then checks if there is a modal with the id
    launchModal(target){
        let modalChildren = Array(...this.targetElements.children);
        modalChildren.forEach((m, i) => {
            if(m.id == target){
                // window.history.pushState({login: 1}, '', window.location + '/#login');
                this.modalElement.style.display = "block";
                m.style.display = 'block';
            }
        });
    }
}


let modalElement = document.getElementsByClassName('modal')[0];
let modalTargetElement = document.getElementsByClassName('modal-content-wrapper')[0];
let modal = new Modal(modalElement, modalTargetElement);
modal.init();


// listen for click to launch modal
document.querySelectorAll('.launch-modal').forEach(ele => {
    ele.addEventListener('click', e => {
        let targetModal = ele.getAttribute('data-targetModal');
        modal.launchModal(targetModal);
    });
});

// listens for closing of modal 
document.querySelectorAll('.close-modal').forEach(ele => {
    ele.addEventListener('click', e => {
        modal.init();
        // window.history.go(-1);
    });
});
// OR /////
modalElement.addEventListener('click', e => {
    if (!e.target.closest('.modal-content')) {
        modal.init();
    }
})




// The search part //////////////////////////////
let searchPanel = document.querySelector('#search-panel');

let searchInput = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search-btn');
let searchList = document.querySelector('#search-list');
let searchListLoader = document.querySelectorAll('#search-list .loader')[0];
searchListLoader.style.display = 'none';
searchList.style.display = 'none'; // turn searchlist display off


// launch search panel 
document.querySelectorAll('.launch-search-panel')[0].addEventListener('click', () => {
    searchPanel.style.top = '0px';
});

document.querySelectorAll('#close-search-panel')[0].addEventListener('click', () => {
    searchPanel.style.top = '-80px';
});


// clearing the search field
// let clearSearchBtn = 
document.querySelector('#clear-search-btn').addEventListener('click', () => {
    searchInput.value = '';
    // then set the searchlist display to none
    searchList.style.display = "none";
});
// searching 
searchBtn.addEventListener('click', () => {
    if (searchInput.value !== '') {
        searchList.style.display = 'block';
        searchList.focus();
        searchListLoader.style.display = 'block';
        searchPosts(searchInput.value);
    }
});
searchList.addEventListener('blur', () => {
    searchList.innerHTML = 'none';
    console.log('working');
});
function searchPosts(searchText) {
    let posts;
    fetch(`/api/posts/search?q=${searchText}`)
        .then(response => console.log(response))
        .then(result => console.log(result))
        .catch(err => console.error(err));
}


// launch side nav 
let sideNav = document.getElementsByClassName('side-nav')[0];
let launchSideNav = document.getElementsByClassName('launch-side-nav')[0];
let closeSideNav = document.getElementsByClassName('close-side-nav')[0];

launchSideNav.addEventListener('click', e => {
    sideNav.style.left = '0px';
});

closeSideNav.addEventListener('click', e => {
    sideNav.style.left = '-100%';
});


// document events /////////////////////////////
document.addEventListener('scroll', e => {
    // this is for the searchpanel to disappear on scroll
    if (searchPanel.style.top === '0px'){
        searchPanel.style.top = '-80px';
        searchList.style.display = 'none';
    }
})




// window events //////////////////////////////////////

// am adding this event because if the side nav is closed on the
// small screen and the screen is later changed to large screen 
// the side nav will still be hidden on the left
window.addEventListener('resize', e => {
    if(window.innerWidth >= 700 ){
        if (sideNav.style.left !== '0px') {
            sideNav.style.left = '0px';
        }
    }else {
        sideNav.style.left = '-100%';
    }
})
