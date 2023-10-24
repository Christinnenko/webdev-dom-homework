import { comments } from "../scripts/main.js";
import {
    addLikeEventListeners,
    addEditAndSaveEventListeners,
    listenerEnterNameInput,
    listenerEnterCommentInput,
    listenerClickWriteButton,
    listenerClickDeleteButton,
    addAnswerEventListeners,
    listenerInputFields,
} from "../scripts/listeners.js";
import { token } from "./login-component.js";
import { isCommentEmpty } from "../scripts/helpers.js";
import { renderLoginComponent, userName } from "./login-component.js";
import { getFetchAndRender } from "../scripts/api.js";

//лоадер при загрузке страницы
export function addLoadingIndicator() {
    const appEl = document.getElementById("app");
    const loadingIndicatorHTML = `<div class="container">
  <div class="loading-indicator"></div>
  </div>`;
    appEl.innerHTML = loadingIndicatorHTML;
}
// рендер-функция
export function renderApp() {
    const appEl = document.getElementById("app");

    const commentsHTML = comments
        .map((comment, index) => {
            return `
        <li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div class="comment-name">${comment.authorName}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            <span class="comment-content">${comment.text
                .replaceAll("BEGIN_QUOTE--", "<div class='quote'>")
                .replaceAll("--END_QUOTE", "</div>")}</span>
            <textarea class="comment-edit" style="display: none;"></textarea>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.like}</span>
            <button data-index="${index}" class="like-button ${
                comment.isLiked ? "active-like" : ""
            }"></button>
          </div>
          <button data-index="${index}" class="edit-button">Редактировать</button>
          <button data-index="${index}" class="save-button">Сохранить</button>
          </div>
        </li>`;
        })
        .join("");

    const authorizationRow = `<p>Для добавления комментария, <a id="login-link" class="add-form-link" href='#'>зарегистрируйтесь</а></p>`;

    const deleteButton = `<div>
  <button id="button-delete" class="add-form-button inactive-form-button">Удалить последний комментарий</button>
</div>`;

    const addCommentForm = `<div id="comment-form" class="add-form">
      <input id="input-name" type="text" class="add-form-name" placeholder="Введите ваше имя" value = ${userName} />
      <textarea id="input-comment" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="button-write" class="add-form-button inactive-form-button">Написать</button>
      </div>
    </div>`;

    if (!token) {
        const appHTML = `
    <div class="container">
    <ul id="list" class="comments">
    ${commentsHTML}
    </ul>
    ${authorizationRow}
    </div>`;

        appEl.innerHTML = appHTML;

        const editButtonElements =
            document.getElementsByClassName("edit-button");
        for (const button of editButtonElements) {
            button.style.display = "none";
        }

        document.getElementById("login-link").addEventListener("click", () => {
            renderLoginComponent({
                appEl,
                // setToken: (newToken) => {
                //     token = newToken;
                // },
                getFetchAndRender,
            });
            return;
        });
    } else {
        const appHTML = `
    <div class="container">
    <ul id="list" class="comments">
    ${commentsHTML}
    </ul>
    ${deleteButton}
    <div class="loading-indicator"></div>
    ${addCommentForm}
    </div>`;

        appEl.innerHTML = appHTML;

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
}
