import { comments } from './main.js';
import { addLikeEventListeners, addEditAndSaveEventListeners } from './listeners.js';
import { addAnswerEventListeners } from './answerComment.js';
import { isCommentEmpty } from './helpers.js'



// рендер-функция 
export function renderApp() {
  const appEl = document.getElementById('app');

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

  const appHTML = `<div class="container">
    <div id="entrance-form" class="add-form">
        <p class="add-form-title">Форма входа</p>
        <input id="login" type="text" class="add-form-entrance" placeholder="Введите логин" />
        <input id="password" type="password" class="add-form-entrance" placeholder="Введите пароль" />
        <button id="entrance-button" class="add-form-button-entrance">Войти</button>
        <div class="add-form-center">
            <a class="add-form-link" href="#">Зарегистрироваться</a>
        </div>
    </div>
    <div class="container">
    <ul id="list" class="comments">
      <!--Cписок рендерится из JS-->
      ${commentsHTML}
    </ul>
    <div>
      <button id="button-delete" class="add-form-button inactive-form-button">Удалить последний комментарий</button>
    </div>
    <div class="loading-indicator"></div>
    <div id="comment-form" class="add-form">
      <input id="input-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="input-comment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="button-write" class="add-form-button inactive-form-button">Написать</button>
      </div>
    </div>
  </div>`

  // поиск элемента списка
  //const appEl = document.getElementById("list");

  // отрисовка HTML строки на экране
  appEl.innerHTML = appHTML;


  // добавляем обработчики на полученные комментарии
  addLikeEventListeners();
  addEditAndSaveEventListeners();
  addAnswerEventListeners();
  isCommentEmpty();
}

