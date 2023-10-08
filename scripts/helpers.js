import { nameInputElement, commentInputElement } from './listeners.js'
import { addComment } from './api.js';


// изменение формата даты
export function correctDate(date) {
    let currentDate = new Date(date);
    let todayDay = currentDate.getDate();
    let todayMonth = currentDate.getMonth() + 1;
    let todayYear = String(currentDate.getFullYear()).slice(-2);
    let todayHours = currentDate.getHours();
    let todayMinutes = currentDate.getMinutes();

    todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
    todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
    todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
    todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;

    let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
    return formattedDate;
}


// проверяем остались ли комментарии, при отсутствии комментариев делаем кнопку серой и неактивной
export function isCommentEmpty() {
    const deleteButtonElement = document.getElementById("button-delete");
    const listElement = document.getElementById("list");
    const remainingComments = listElement.getElementsByClassName("comment");
    if (remainingComments.length === 0) {
        deleteButtonElement.disabled = true;
        deleteButtonElement.classList.remove("add-form-button");
        deleteButtonElement.classList.add("inactive-form-button");
    } else {
        deleteButtonElement.disabled = false;
        deleteButtonElement.classList.remove("inactive-form-button");
        deleteButtonElement.classList.add("add-form-button");
    }
};

//writeButtonElement.classList.add("add-form-button");
//writeButtonElement.disabled = false;

// Проверка на заполнение полей имени и комментария
export function isInputFieldEmpty() {
    const writeButtonElement = document.getElementById("button-write");

    //устанавливаем начальные свойства полей ввода и кнопки написать
    writeButtonElement.classList.add("add-form-button");
    writeButtonElement.disabled = false;


    // проверка полей ввода на заполнение, если поля не заполнены - подсвечивает красным, кнопку делает неактивной и серой
    if (nameInputElement.value.trim() === "" && commentInputElement.value.trim() === "") {
        nameInputElement.classList.add("error");
        commentInputElement.classList.add("error");
        writeButtonElement.disabled = true;
        writeButtonElement.classList.remove("add-form-button");
        writeButtonElement.classList.add("inactive-form-button");
        return;

    } else if (commentInputElement.value.trim() === "") {
        nameInputElement.classList.remove("error");
        commentInputElement.classList.add("error");
        writeButtonElement.disabled = true;
        writeButtonElement.classList.remove("add-form-button");
        writeButtonElement.classList.add("inactive-form-button");
        return;

    } else if (nameInputElement.value.trim() === "") {
        commentInputElement.classList.remove("error");
        nameInputElement.classList.add("error");
        writeButtonElement.disabled = true;
        writeButtonElement.classList.remove("add-form-button");
        writeButtonElement.classList.add("inactive-form-button");
        return;

        // вывод комментария, если все поля заполнены
    } else {
        commentInputElement.classList.remove("error");
        commentInputElement.classList.add("add-form-text");
        nameInputElement.classList.remove("error");
        nameInputElement.classList.add("add-form-name");
        writeButtonElement.classList.remove("inactive-form-button");
        writeButtonElement.classList.add("add-form-button");
        writeButtonElement.disabled = false;
        addComment();
    }
}

