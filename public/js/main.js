// modal
// modal trigger is the launch modal class
// onclick get the target modal
// if it exist launch modal
// else do nothing
class Modal {
    constructor(modalElement){
        this.modalElement = modalElement
    }
    // this initializes the modal by setting it display and it 
    // children components to "none"
    init(){
        this.modalElement.style.display = "none";
        let modalChildren = Array(...this.modalElement.children);
        modalChildren.forEach(m => {
            m.style.display = 'none';
        });
    }
    // launchModal gets the modalElements children 
    // converts it to an array 
    // then checks if there is a modal with the id
    launchModal(target){
        let modalChildren = Array(...this.modalElement.children);
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

let modal = new Modal(modalElement);
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



// The search part //////////////////////////////
let search = document.querySelector('#search');
let searchBtn = document.querySelector('#search-btn');
let searchList = document.querySelector('#search-list');
let searchListLoader = document.querySelectorAll('#search-list .loader')[0];
searchListLoader.style.display = 'none';
searchList.style.display = 'none'; // turn searchlist display off

// clearing the search field
// let clearSearchBtn = 
document.querySelector('#clear-search-btn').addEventListener('click', () => {
    search.value = '';
    // then set the searchlist display to none
    searchList.style.display = "none";
});
// searching 
searchBtn.addEventListener('click', () => {
    if (search.value !== '') {
        searchList.style.display = 'block';
        searchList.focus();
        searchListLoader.style.display = 'block';
        searchPosts(search.value);
    }
});
searchList.addEventListener('blur', () => {
    searchList.innerHTML = 'none';
    console.log('working');
});
function searchPosts(searchText) {
    let posts;
    fetch(`/api/posts/s?${searchText}`)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(err => console.error(err));
}




