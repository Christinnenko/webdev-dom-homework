import {
  isCommentEmpty,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./helpers.js";
1;
import { setComments } from "./main.js";
import { renderApp } from "../components/render-component.js";
import { addEditAndSaveEventListeners } from "./listeners.js";
import { format } from "date-fns";

export function getFetchAndRender(token) {
  const host = "https://wedev-api.sky.pro/api/v2/christina-ermolenko/comments";

  let fetchConfig;

  if (token) {
    fetchConfig = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
  } else {
    fetchConfig = {
      method: "GET",
    };
  }

  fetch(host, fetchConfig)
    .then((response) => {
      if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Неполадки в работе сервера");
      } else if (response.status === 400) {
        throw new Error("Нет авторизации");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      const appComment = responseData.comments.map((comment) => {
        const createDate = format(new Date(comment.date), "dd.MM.yyyy hh:mm");
        return {
          id: comment.id,
          authorName: comment.author.name,
          date: createDate,
          text: comment.text,
          like: comment.likes,
          isLiked: comment.isLiked,
        };
      });

      setComments(appComment);
      renderApp();
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет, попробуйте позже");

      //отправка в систему сбора ошибок
      console.warn(error);
    });
}

// функция добавления комментария на сервер
export function addComment(token) {
  const host = "https://wedev-api.sky.pro/api/v2/christina-ermolenko/comments";
  const nameInputElement = document.getElementById("input-name");
  const commentInputElement = document.getElementById("input-comment");
  const writeButtonElement = document.getElementById("button-write");
  // Переменные для хранения введенных данных
  let enteredName = "";
  let enteredComment = "";

  showLoadingIndicator();

  fetch(host, {
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
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        throw new Error("Некорректно введены данные");
      } else if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Неполадки в работе сервера");
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

      alert("Кажется, у вас сломался интернет, попробуйте позже");
      console.warn(error);
    });

  // Проверяем, остались ли комментарии после добавления нового
  isCommentEmpty();
  addEditAndSaveEventListeners();
}

export function delComment(token, id) {
  const host = "https://wedev-api.sky.pro/api/v2/christina-ermolenko/comments";
  return fetch(`${host}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}

export function addLikeComment(token, id) {
  const host = "https://wedev-api.sky.pro/api/v2/christina-ermolenko/comments";
  return fetch(`${host}/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function registerUser({ name, login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}
