import { isInputFieldEmpty } from './helpers.js';
import { comments } from './main.js';
import { isCommentEmpty } from './helpers.js';
import { editComment, saveComment } from './editComments.js'
import { addLike } from './likes.js';

export const writeButtonElement = document.getElementById("button-write");
export const nameInputElement = document.getElementById("input-name");
export const commentInputElement = document.getElementById("input-comment");
export const deleteButtonElement = document.getElementById("button-delete");


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


// добавление обработчика клика при нажатии на Enter в поле заполнения имени
nameInputElement.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        isInputFieldEmpty(event);
    }
});

// добавление обработчика клика при нажатии на Enter в поле заполнения комментария
commentInputElement.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        isInputFieldEmpty(event);
    }
});

// добавление обработчика клика при нажатии на кнопку "написать"
writeButtonElement.addEventListener("click", (event) => {
    isInputFieldEmpty(event);
});


// добавляем обработчик клика на кнопку "Удалить последний комментарий"
deleteButtonElement.addEventListener("click", () => {

    //поиск элементов
    const listElement = document.getElementById("list");
    const commentsElements = listElement.getElementsByClassName("comment");


    // проверка на наличие комментариев
    if (commentsElements.length > 0) {
        // Находим индекс последнего комментария 
        const lastIndex = commentsElements.length - 1;
        // удаляем последний дочерний элемент списка DOM
        listElement.removeChild(commentsElements[lastIndex]);

        // обновляем массив comments, удалив последний комментарий из этого массива
        comments.pop();

        // Проверяем наличие комментариев после удаления последнего комментария
        isCommentEmpty();
    }
});


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