//функция добавления лоадера и неактивности кнопки "Написать"
export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    const writeButtonElement = document.getElementById("button-write");

    loadingIndicator.style.display = "flex";
    writeButtonElement.disabled = true;
    writeButtonElement.classList.remove("add-form-button");
    writeButtonElement.classList.add("inactive-form-button");
}

//функция отмены лоадера и активности кнопки "Написать"
export function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    const writeButtonElement = document.getElementById("button-write");

    loadingIndicator.style.display = "none";
    writeButtonElement.disabled = false;
    writeButtonElement.classList.remove("inactive-form-button");
    writeButtonElement.classList.add("add-form-button");
}

