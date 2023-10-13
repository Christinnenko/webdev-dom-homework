import { isCommentEmpty } from './helpers.js';
import { comments } from './main.js';
import { editComment, saveComment } from './editComments.js'
import { addLike } from './likes.js';
import { addComment, delComment, getFetchAndRender } from './api.js';
import { token } from '../components/login-component.js';



// функция добавляющая обработчики клика редактирования и сохранения комментария
export function addEditAndSaveEventListeners() {
    // Получаем все кнопки "Редактировать" и "Сохранить" после рендеринга
    const editButtons = document.querySelectorAll(".edit-button");
    const saveButtons = document.querySelectorAll(".save-button");

    // Добавляем обработчики событий для кнопок "Редактировать"
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener("click", () => {
            editComment(index);
        })
    });

    // Добавляем обработчики событий для кнопок "Сохранить"
    saveButtons.forEach((saveButton, index) => {
        saveButton.addEventListener("click", () => {
            saveComment(index);
        });
    });
}

export function listenerEnterNameInput() {
    const nameInputElement = document.getElementById("input-name");
    // добавление обработчика клика при нажатии на Enter в поле заполнения имени
    nameInputElement.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            addComment();
        }
    })
};

export function listenerEnterCommentInput() {
    const commentInputElement = document.getElementById("input-comment");
    // добавление обработчика клика при нажатии на Enter в поле заполнения комментария
    commentInputElement.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            addComment();
        }
    })
};


export function listenerClickWriteButton() {
    const writeButtonElement = document.getElementById("button-write");
    // добавление обработчика клика при нажатии на кнопку "написать"
    writeButtonElement.addEventListener("click", () => {
        addComment();
    })
};

// export function listenerClickDeleteButton() {
//     const deleteButtonElement = document.getElementById("button-delete");

//     // добавляем обработчик клика на кнопку "Удалить последний комментарий"
//     deleteButtonElement.addEventListener("click", () => {

//         //поиск элементов
//         const listElement = document.getElementById("list");
//         const commentsElements = listElement.getElementsByClassName("comment");

//         if (commentsElements.length > 0) {
//             // Получите последний комментарий (последний элемент массива)
//             const lastCommentElement = commentsElements[commentsElements.length - 1];

//             // Получите id комментария из атрибута data-id
//             const id = lastCommentElement.dataset.id;

//             // Выполните удаление комментария, например, через API
//             delComment(token, id)
//                 .then(() => {
//                     // Удалите последний комментарий из DOM
//                     listElement.removeChild(lastCommentElement);
//                     // Обновите отображение
//                     getFetchAndRender();
//                 });
//         }
//     });
//     isCommentEmpty();
// }


export function listenerClickDeleteButton() {
    const deleteButtonElement = document.getElementById("button-delete");

    // добавляем обработчик клика на кнопку "Удалить последний комментарий"
    deleteButtonElement.addEventListener("click", () => {

        //поиск элементов
        const listElement = document.getElementById("list");
        const commentsElements = listElement.getElementsByClassName("comment");

        if (commentsElements.length > 0) {
            // Получите последний комментарий (последний элемент массива)
            const lastCommentElement = commentsElements[commentsElements.length - 1];

            // Получите id комментария из атрибута data-id
            const id = lastCommentElement.dataset.id;

            // Выполните удаление комментария, например, через API
            delComment(token, id)
                .then(() => {
                    // Удалите последний комментарий из DOM
                    listElement.removeChild(lastCommentElement);

                    // Обновите отображение
                    getFetchAndRender();
                });
        }
    });
    isCommentEmpty();
}








// Функция для привязки обработчиков событий к кнопкам "лайк"
export function addLikeEventListeners() {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener("click", () => {

            addLike(index);
            likeButton.classList.add("-loading-like");

        });
    });
}