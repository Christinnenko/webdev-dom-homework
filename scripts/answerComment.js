// Функция ответа на комментарий

export function addAnswerEventListeners() {
    // Добавляем обработчики событий для комментариев
    const commentContentElements = document.querySelectorAll(".comment-content");
    const currentCommentAuthor = document.querySelectorAll(".comment-name");
    const commentInputElement = document.getElementById("input-comment");

    commentContentElements.forEach((commentContentElement, index) => {
        commentContentElement.addEventListener("click", (event) => {
            event.stopPropagation();
            // Копируем текст комментария и имя автора в поле ввода для комментария
            const commentTextToCopy = `BEGIN_QUOTE--${currentCommentAuthor[index].textContent}:\n${commentContentElements[index].textContent}--END_QUOTE\n\n`;
            commentInputElement.value = commentTextToCopy;

            // Переводим фокус на поле ввода комментария, чтобы пользователь мог сразу писать ответ
            commentInputElement.focus();
        });
    });
}