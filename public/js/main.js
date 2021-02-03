// modal
// modal trigger is the launch modal class
// onclick get the target modal
// if it exist launch modal
// else do nothing

class Modal {
    constructor(modalElement){
        this.modalElement = modalElement
    }
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
                this.modalElement.style.display = "block";
                m.style.display = 'block';
            }
        });
        console.log(target);
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
    });
});
