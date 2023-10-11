import { comments } from './main.js';
import { renderApp } from './renderComments.js';

//РЕДАКТИРОВАНИЕ КОММЕНТАРИЕВ

//функция редактирования комментария
export function editComment(index) {
    // Получаем элементы комментария, который нужно отредактировать
    const commentElement = document.querySelector(`.comment:nth-child(${index + 1})`);
    const commentEditElement = commentElement.querySelector(".comment-edit");
    const editButtonElement = commentElement.querySelector(".edit-button");
    const saveButtonElement = commentElement.querySelector(".save-button");
    const commentText = commentElement.querySelector(".comment-content");

    // Скрываем содержимое комментария и отображаем текстовое поле для редактирования
    commentText.style.display = "none";
    commentEditElement.style.display = "block";

    // Скрываем кнопку "Редактировать" и отображаем кнопку "Сохранить"
    editButtonElement.style.display = "none";
    saveButtonElement.style.display = "inline-block";

    // Устанавливаем текст комментария в поле для редактирования
    commentEditElement.value = comments[index].text.replaceAll("&amp;", "&").replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"');
    commentEditElement.value
    comments[index].isEdit = true;
}

//функция сохранения отредактированного комментария
export function saveComment(index) {
    // Получаем элементы комментария, который нужно сохранить
    const commentElement = document.querySelector(`.comment:nth-child(${index + 1})`);
    const commentContentElement = commentElement.querySelector(".comment-content");
    const commentEditElement = commentElement.querySelector(".comment-edit");
    const editButtonElement = commentElement.querySelector(".edit-button");
    const saveButtonElement = commentElement.querySelector(".save-button");

    //проверка на пустую строку
    if (commentEditElement.value.trim() !== "") {
        // Обновляем текст комментария из текстового поля для редактирования
        comments[index].text = commentEditElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");

        // Обновляем содержимое комментария в пользовательском интерфейсе
        commentContentElement.textContent = comments[index].text.replaceAll("BEGIN_QUOTE--", "<div class='quote'>").replaceAll("--END_QUOTE", "</div>");

        // Скрываем текстовое поле для редактирования и отображаем содержимое комментария
        commentEditElement.style.display = "none";
        commentContentElement.style.display = "block";

        // Скрываем кнопку "Сохранить" и отображаем кнопку "Редактировать"
        saveButtonElement.style.display = "none";
        editButtonElement.style.display = "inline-block";

        // Устанавливаем флаг isEdit в значение false
        comments[index].isEdit = false;
    }
    renderApp();
}