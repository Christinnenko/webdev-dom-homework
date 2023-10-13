import { correctDate, isCommentEmpty } from './helpers.js';
import { showLoadingIndicator, hideLoadingIndicator } from './loadingIndicator.js';
import { setComments } from './main.js';
import { renderComments } from './renderComments.js';
import { addEditAndSaveEventListeners } from './listeners.js';


export function getFetchAndRender() {

    showLoadingIndicator();

    fetch('https://wedev-api.sky.pro/api/v1/christina-ermolenko/comments', {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 500) {
                alert('Сервер сломался, попробуй позже');
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            const appComment = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: correctDate(comment.date),
                    text: comment.text,
                    like: comment.likes,
                    isLiked: false,
                }
            })

            setComments(appComment);
            renderComments();
            hideLoadingIndicator();
        })
        .catch((error) => {
            alert('Кажется, у вас сломался интернет, попробуйте позже');

            //отправка в систему сбора ошибок
            console.warn(error);
        })

};



// функция добавления комментария на сервер
export function addComment() {
    const nameInputElement = document.getElementById("input-name");
    const commentInputElement = document.getElementById("input-comment");
    const writeButtonElement = document.getElementById("button-write");
    // Переменные для хранения введенных данных
    let enteredName = "";
    let enteredComment = "";

    showLoadingIndicator();

    fetch('https://wedev-api.sky.pro/api/v1/christina-ermolenko/comments', {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            text: commentInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                alert('Имя и комментарий должны быть не короче 3 символов');
            } else if (response.status === 500) {
                alert('Сервер сломался, попробуй позже');
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            hideLoadingIndicator();
            // Очищаем поля ввода только в случае успешной отправки
            if (responseData) {
                nameInputElement.value = "";
                commentInputElement.value = "";
                enteredName = "";
                enteredComment = "";
                getFetchAndRender();
            }
        })
        .catch((error) => {
            hideLoadingIndicator();
            writeButtonElement.disabled = false;
            writeButtonElement.classList.add("add-form-button");

            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.warn(error);
        });

    // Проверяем, остались ли комментарии после добавления нового
    isCommentEmpty();
    addEditAndSaveEventListeners();
}


