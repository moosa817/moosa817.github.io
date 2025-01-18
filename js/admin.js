let current_url;
if (window.location.pathname.includes("manage")) {
    current_url = "manage";
} else if (window.location.pathname.includes("board")) {
    current_url = "board";
}
else if (window.location.pathname.includes("invite")) {
    current_url = "invite";
}
else if (window.location.pathname.includes("inform")) {
    current_url = "inform";
}
console.log(current_url);


$(`#${current_url}`).addClass('active-link');