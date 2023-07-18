const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const livePreviewElement = document.getElementById('live-preview');

nameInput.addEventListener('input', updateLivePreview);
emailInput.addEventListener('input', updateLivePreview);
messageInput.addEventListener('input', updateLivePreview);

function updateLivePreview() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const html = `
    <h3>${name}</h3>
    <p>Email: ${email}</p>
    <p>${message}</p>
  `;

  livePreviewElement.innerHTML = html;
}
