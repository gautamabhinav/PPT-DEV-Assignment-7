const searchButton = document.getElementById('search');
const resultContainer = document.getElementById('result-container');
const avatarElement = document.getElementById('avatar');
const usernameElement = document.getElementById('username-result');

searchButton.addEventListener('click', () => {
  const usernameInput = document.getElementById('username').value;
  if (usernameInput.trim() !== '') {
    fetchUser(usernameInput);
  }
});

function fetchUser(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Not Found') {
        displayNotFound();
      } else {
        displayUser(data);
      }
    })
    .catch(error => console.log(error));
}

function displayNotFound() {
  avatarElement.style.backgroundImage = 'none';
  usernameElement.textContent = 'User not found.';
  resultContainer.classList.remove('hide');
}

function displayUser(user) {
  avatarElement.style.backgroundImage = `url(${user.avatar_url})`;
  usernameElement.textContent = user.name;
  resultContainer.classList.remove('hide');
}
