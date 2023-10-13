//функция добавления лоадера и неактивности кнопки "Написать"
export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    loadingIndicator.style.display = "flex";
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

