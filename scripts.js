function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-' + language + ']');
    elements.forEach(element => {
        element.textContent = element.getAttribute('data-' + language);
    });
}
