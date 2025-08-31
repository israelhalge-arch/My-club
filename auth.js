// auth.js - simple frontend auth using localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}
function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }

function registerUser(evt) {
  evt && evt.preventDefault();
  const name = (document.getElementById('reg-name')||{}).value?.trim();
  const pass = (document.getElementById('reg-pass')||{}).value;
  if(!name || !pass){ alert('Enter username and password'); return; }
  const users = getUsers();
  if(users[name]){ alert('User exists, pick another name'); return; }
  users[name] = pass;
  saveUsers(users);
  alert('Registered ✓ — now login.');
  location.href = 'login.html';
}

function loginUser(evt) {
  evt && evt.preventDefault();
  const name = (document.getElementById('login-name')||{}).value?.trim();
  const pass = (document.getElementById('login-pass')||{}).value;
  if(!name || !pass){ alert('Enter username and password'); return; }
  const users = getUsers();
  if(users[name] && users[name] === pass){
    localStorage.setItem('authUser', name);
    location.href = 'dashboard.html';
  } else {
    alert('Wrong username or password');
  }
}

function checkAuth(redirectIfNot=true){
  const u = localStorage.getItem('authUser');
  if(!u && redirectIfNot){ location.href = 'login.html'; return null; }
  return u;
}

function logoutUser(){
  localStorage.removeItem('authUser');
  location.href = 'index.html';
}
