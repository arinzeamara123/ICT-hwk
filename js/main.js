function initialisePage() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html'

    const navLinks = document.querySelectorAll("nav a")

    navLinks.forEach(navLink => {
        if(navLink.getAttribute("href") === currentPage) {
            navLink.style.color = "#3b82f6"
        }
    })
}

initialisePage()