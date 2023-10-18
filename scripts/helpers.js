import { comments } from "./main.js";
import { renderApp } from "../components/render-component.js";

export function showLoadingIndicator() {
  const loadingIndicator = document.querySelector(".loading-indicator");
  loadingIndicator.style.display = "flex";
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
}

// Проверка на заполнение полей имени и комментария
export function isInputFieldEmpty() {
  const commentInputElement = document.getElementById("input-comment");
  const nameInputElement = document.getElementById("input-name");
  const writeButtonElement = document.getElementById("button-write");

  // проверка полей ввода на заполнение, если поля не заполнены - подсвечивает красным, кнопку делает неактивной и серой
  if (
    nameInputElement.value.trim() === "" &&
    commentInputElement.value.trim() === ""
  ) {
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
  }
}

export function inactiveWriteButton() {
  const writeButtonElement = document.getElementById("button-write");
  writeButtonElement.disabled = true;
  writeButtonElement.classList.remove("add-form-button");
  writeButtonElement.classList.add("inactive-form-button");
}

//функция отмены лоадера и активности кнопки "Написать"
export function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector(".loading-indicator");
  loadingIndicator.style.display = "none";
}

export function activeWriteButton() {
  const writeButtonElement = document.getElementById("button-write");
  writeButtonElement.disabled = false;
  writeButtonElement.classList.remove("inactive-form-button");
  writeButtonElement.classList.add("add-form-button");
}

//ДОБАВЛЕНИЕ И СНЯТИЕ ЛАЙКА НА КОММЕНТАРИИ

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Функция для добавления лайка
export function addLike(index) {
  const comment = comments[index];

  delay(2000).then(() => {
    if (!comment.isLiked) {
      comment.like += 1;
      comment.isLiked = true; // Устанавливаем состояние лайка в "закрашенный"
      renderApp();
    } else {
      comment.like -= 1;
      comment.isLiked = false; // Устанавливаем состояние лайка в "не закрашенный"
      renderApp();
    }
  });
}

//РЕДАКТИРОВАНИЕ КОММЕНТАРИЕВ

//функция редактирования комментария
export function editComment(index) {
  // Получаем элементы комментария, который нужно отредактировать
  const commentElement = document.querySelector(
    `.comment:nth-child(${index + 1})`
  );
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
  commentEditElement.value = comments[index].text
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"');
  commentEditElement.value;
  comments[index].isEdit = true;
}

//функция сохранения отредактированного комментария
export function saveComment(index) {
  // Получаем элементы комментария, который нужно сохранить
  const commentElement = document.querySelector(
    `.comment:nth-child(${index + 1})`
  );
  const commentContentElement =
    commentElement.querySelector(".comment-content");
  const commentEditElement = commentElement.querySelector(".comment-edit");
  const editButtonElement = commentElement.querySelector(".edit-button");
  const saveButtonElement = commentElement.querySelector(".save-button");

  //проверка на пустую строку
  if (commentEditElement.value.trim() !== "") {
    // Обновляем текст комментария из текстового поля для редактирования
    comments[index].text = commentEditElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

    // Обновляем содержимое комментария в пользовательском интерфейсе
    commentContentElement.textContent = comments[index].text
      .replaceAll("BEGIN_QUOTE--", "<div class='quote'>")
      .replaceAll("--END_QUOTE", "</div>");

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
