document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const userInfo = document.getElementById('user-info');
    const playButton = document.getElementById('play-button');

    if (loggedInUser) {
        userInfo.innerHTML = `Logged in as: <a href="#">${loggedInUser}</a>`;
    } else {
        userInfo.innerHTML = 'Not logged in';
    }

    playButton.addEventListener('click', function () {
        window.location.href = '/scramble.html';
    });
});
