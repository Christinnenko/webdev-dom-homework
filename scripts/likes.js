import { comments } from './main.js';
import { renderComments } from './renderComments.js'

//ДОБАВЛЕНИЕ И СНЯТИЕ ЛАЙКА НА КОММЕНТАРИИ

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для добавления лайка
export function addLike(index) {
    const likeButtons = document.querySelectorAll(".like-button");
    const likeButton = likeButtons[index];
    const comment = comments[index];


    delay(2000).then(() => {
        if (!comment.isLiked) {
            comment.like += 1;
            comment.isLiked = true; // Устанавливаем состояние лайка в "закрашенный"
            renderComments();
        } else {
            comment.like -= 1;
            comment.isLiked = false; // Устанавливаем состояние лайка в "не закрашенный"
            renderComments();
        }
    });
}