// toggle theme button
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    $('body').toggleClass('light-theme dark-theme');
    // save to local storage
    if ($('body').hasClass('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    }
    else {
        localStorage.setItem('theme', 'light');
    }
})

// check local storage for theme
const theme = localStorage.getItem('theme');
if (theme) {
    if (theme === 'light') {
        $('body').removeClass('dark-theme');
        $('body').addClass('light-theme');
        checkbox.checked = false;
    }
    if (theme === 'dark') {
        $('body').removeClass('light-theme');
        $('body').addClass('dark-theme');
        checkbox.checked = true;
    }
}