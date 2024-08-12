function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-' + language + ']');
    elements.forEach(element => {
        element.innerHTML = element.getAttribute('data-' + language);
    });
}

// Set default language to French
switchLanguage('fr');
