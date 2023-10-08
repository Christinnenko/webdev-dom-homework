import { comments } from './main.js';
import { addLikeEventListeners } from './listeners.js'
import { addEditAndSaveEventListeners } from './listeners.js';
import { addAnswerEventListeners } from './answerComment.js';


// рендер-функция 
export function renderComments() {

  // поиск элемента списка
  const listElement = document.getElementById("list");

  // формирование HTML строки
  const commentsHTML = comments.map((comment, index) => {
    return `
        <li class="comment">
          <div class="comment-header">
            <div class="comment-name">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            <span class="comment-content">${comment.text.replaceAll("BEGIN_QUOTE--", "<div class='quote'>").replaceAll("--END_QUOTE", "</div>")}</span>
            <textarea class="comment-edit" style="display: none;"></textarea>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.like}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
          </div>
          <button data-index="${index}" class="edit-button">Редактировать</button>
          <button data-index="${index}" class="save-button">Сохранить</button>
          </div>
        </li>`
  }).join('');


  // отрисовка HTML строки на экране
  listElement.innerHTML = commentsHTML;


  // добавляем обработчики на полученные комментарии
  addLikeEventListeners();
  addEditAndSaveEventListeners();
  addAnswerEventListeners();
}

