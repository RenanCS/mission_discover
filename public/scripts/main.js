import Modal from './modal.js';

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

const modal = Modal();


const checkButtons = document.querySelectorAll('.actions a.check');

checkButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});


const deleteButtons = document.querySelectorAll('.actions a.delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false));
})

function handleClick(event, check = true) {
    event.preventDefault();

    const rommId = document.querySelector('#room-id').dataset.id;
    const questionId = event.target.dataset.id;
    const slug = check ? 'ckeck' : 'delete';

    const form = document.querySelector('.modal form');

    form.setAttribute('action', `/room/${rommId}/${questionId}/${slug}`)

    if (check) {
        modalTitle.innerHTML = "Marcar como lida esta pergunta";
        modalDescription.innerHTML = "Tem certeza que deseja marcar como lida, esta pergunta?";
        modalButton.innerHTML = "Sim, marcar como lida";
        modalButton.classList.remove("red");
    } else {
        modalTitle.innerHTML = "Excluir esta pergunta";
        modalDescription.innerHTML = "Tem certeza que deseja excluir esta pergunta?";
        modalButton.innerHTML = "Sim, excluir";
        modalButton.classList.add("red");
    }
    modal.open();

}