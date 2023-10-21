import { loginUser, registerUser } from "../scripts/api.js";
import { getFetchAndRender } from "../scripts/api.js";

export let userName = localStorage.getItem("userName");
export let token = localStorage.getItem("token");

export function renderLoginComponent({ appEl }) {
  let isLoginMode = false;
  if (token == null || token == undefined) {
    isLoginMode = true;
  }

  const renderForm = () => {
    const appHTML = `<div class="container">
        <div id="entrance-form" class="add-form">
            <p class="add-form-title">Форма ${
              isLoginMode ? "входа" : "регистрации"
            }</p>
            ${
              isLoginMode
                ? ""
                : `<input id="name" type="text" class="add-form-entrance" placeholder="Введите имя" />`
            }
            <input id="login" type="text" class="add-form-entrance" placeholder="Введите логин" />
            <input id="password" type="password" class="add-form-entrance" placeholder="Введите пароль" />
            <button id="entrance-button" class="add-form-button-entrance">${
              isLoginMode ? "Войти" : "Зарегистрироваться"
            }</button>
            <div class="add-form-center">
                <a id="toggle-entrance-link" class="add-form-link" href="#">Перейти ${
                  isLoginMode ? "к регистрации" : "ко входу"
                }</a>
            </div>
        </div > `;
    // отрисовка HTML строки на экране
    appEl.innerHTML = appHTML;

    document.getElementById("entrance-button").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        loginUser({
          login: login,
          password: password,
        })
          .then((response) => {
            token = `Bearer ${response.user.token}`;
            localStorage.token = token;
            userName = response.user.name;
            localStorage.userName = userName;
            getFetchAndRender(localStorage.token);
          })
          .catch((error) => {
            //TODO: выводить alert красиво
            alert(error.message);
          });
      } else {
        const name = document.getElementById("name").value;
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;

        if (!name) {
          alert("Введите имя");
          return;
        }

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        registerUser({
          name: name,
          login: login,
          password: password,
        })
          .then((response) => {
            token = `Bearer ${response.user.token}`;
            localStorage.token = token;
            userName = response.user.name;
            localStorage.userName = userName;
            getFetchAndRender(localStorage.token);
          })
          .catch((error) => {
            //TODO: выводить alert красиво
            alert(error.message);
          });
      }
    });

    document
      .getElementById("toggle-entrance-link")
      .addEventListener("click", () => {
        isLoginMode = !isLoginMode;
        renderForm();
      });
  };

  renderForm();
}
