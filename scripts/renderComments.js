import { comments } from './main.js';
import { addLikeEventListeners, addEditAndSaveEventListeners, listenerEnterNameInput, listenerEnterCommentInput, listenerClickWriteButton, listenerClickDeleteButton } from './listeners.js';
import { addAnswerEventListeners } from './answerComment.js';
import { isCommentEmpty, listenerInputFields } from './helpers.js';
import { renderLoginComponent, userName, token } from '../components/login-component.js';
import { getFetchAndRender } from './api.js'


//лоадер при загрузке страницы
export function addLoadingIndicator() {
  const appEl = document.getElementById('app');
  const loadingIndicatorHTML = `<div class="container">
  <div class="loading-indicator"></div>
  </div>`
  appEl.innerHTML = loadingIndicatorHTML;
}


// рендер-функция 
export function renderApp() {
  const appEl = document.getElementById('app');

  if (!token) {
    renderLoginComponent({
      appEl, setToken: (newToken) => {
        token = newToken;
      },
      getFetchAndRender,
    });
    return;
  }

  // формирование HTML строки
  const commentsHTML = comments.map((comment, index) => {
    return `
        <li class="comment">
          <div class="comment-header">
            <div class="comment-name">${comment.authorName}</div>
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


  const appHTML = `
  <div class="container">
  <ul id="list" class="comments">
    ${commentsHTML}
  </ul>
  <div>
    <button id="button-delete" class="add-form-button inactive-form-button">Удалить последний комментарий</button>
  </div>
  <div class="loading-indicator"></div>
  <div id="comment-form" class="add-form">
    <input id="input-name" type="text" class="add-form-name" placeholder="Введите ваше имя" value = ${userName} />
    <textarea id="input-comment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="button-write" class="add-form-button inactive-form-button">Написать</button>
    </div>
  </div>
</div>`


  // отрисовка HTML строки на экране
  appEl.innerHTML = appHTML;


  // добавляем обработчики на полученные комментарии
  addLikeEventListeners();
  addEditAndSaveEventListeners();
  addAnswerEventListeners();
  isCommentEmpty();
  listenerInputFields();
  listenerEnterNameInput();
  listenerEnterCommentInput();
  listenerClickWriteButton();
  listenerClickDeleteButton();
}

