import {
    isCommentEmpty,
    addLike,
    editComment,
    saveComment,
    isInputFieldEmpty,
} from "./helpers.js";
import { addComment, delComment, getFetchAndRender } from "./api.js";
import { token } from "../components/login-component.js";

//слушатель полей ввода
export function listenerInputFields() {
    const commentInputElement = document.getElementById("input-comment");
    const nameInputElement = document.getElementById("input-name");
    nameInputElement.addEventListener("input", isInputFieldEmpty);
    commentInputElement.addEventListener("input", isInputFieldEmpty);
}

// функция добавляющая обработчики клика редактирования и сохранения комментария
export function addEditAndSaveEventListeners() {
    // Получаем все кнопки "Редактировать" и "Сохранить" после рендеринга
    const editButtons = document.querySelectorAll(".edit-button");
    const saveButtons = document.querySelectorAll(".save-button");

    // Добавляем обработчики событий для кнопок "Редактировать"
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener("click", () => {
            editComment(index);
        });
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
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.altKey
        ) {
            addComment(token);
        }
    });
}

export function listenerEnterCommentInput() {
    const commentInputElement = document.getElementById("input-comment");
    // добавление обработчика клика при нажатии на Enter в поле заполнения комментария
    commentInputElement.addEventListener("keyup", (event) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.altKey
        ) {
            addComment(token);
        }
    });
}

export function listenerClickWriteButton() {
    const writeButtonElement = document.getElementById("button-write");
    // добавление обработчика клика при нажатии на кнопку "написать"
    writeButtonElement.addEventListener("click", () => {
        addComment(token);
    });
}

export function listenerClickDeleteButton() {
    const deleteButtonElement = document.getElementById("button-delete");

    // добавляем обработчик клика на кнопку "Удалить последний комментарий"
    deleteButtonElement.addEventListener("click", () => {
        //поиск элементов
        const listElement = document.getElementById("list");
        const commentsElements = listElement.getElementsByClassName("comment");

        if (commentsElements.length > 0) {
            // Получите последний комментарий (последний элемент массива)
            const lastCommentElement =
                commentsElements[commentsElements.length - 1];

            // Получите id комментария из атрибута data-id
            const id = lastCommentElement.dataset.id;

            // Выполните удаление комментария, например, через API
            delComment(token, id).then(() => {
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
            const listElement = document.getElementById("list");
            const commentsElements =
                listElement.getElementsByClassName("comment");
            const id = commentsElements[index].dataset.id;

            addLike(index, id);
            likeButton.classList.add("-loading-like");
        });
    });
}

// Функция ответа на комментарий
export function addAnswerEventListeners() {
    // Добавляем обработчики событий для комментариев
    const commentContentElements =
        document.querySelectorAll(".comment-content");
    const currentCommentAuthor = document.querySelectorAll(".comment-name");
    const commentInputElement = document.getElementById("input-comment");

    commentContentElements.forEach((commentContentElement, index) => {
        commentContentElement.addEventListener("click", (event) => {
            event.stopPropagation();
            // Копируем текст комментария и имя автора в поле ввода для комментария
            const commentTextToCopy = `BEGIN_QUOTE--${currentCommentAuthor[index].textContent}:\n${commentContentElements[index].textContent}--END_QUOTE\n\n`;
            commentInputElement.value = commentTextToCopy;

            // Переводим фокус на поле ввода комментария, чтобы пользователь мог сразу писать ответ
            commentInputElement.focus();
        });
    });
}
