const loginForm = document.querySelector("#logout")
loginForm.addEventListener('click', (e) => {
    e.preventDefault();
  localStorage.setItem('status', 'logout');
    localStorage.setItem('token', 'logout');
    goToTheLogin();
  }
)
let state = localStorage.getItem('status');
if (state == 'logout'){
    goToTheLogin();
}

function goToTheLogin(){
    window.location.href="../../Finished Files/Log-In/login.html";
  }

// function startAdminPage() {
//   window.location.href = '../../admin/posts/index.html';
//   window.location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload')
// }