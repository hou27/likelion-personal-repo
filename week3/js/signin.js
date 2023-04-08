const formEl = document.querySelector("#loginForm");
const idEl = document.querySelector("#idInput");
const passwordEl = document.querySelector("#passwordInput");

const checkLogin = (id, password) => {
  const userList = localStorage.getItem("userList");
  if (!userList) return false;

  const convertedToJson = JSON.parse(userList);

  // const coinciedUser = convertedToJson.includes(
  //   (user) => user.id === id && user.password === password
  // );
  const coinciedUser = convertedToJson.find(
    (user) => user.id === id && user.password === password
  );
  return coinciedUser ? true : false;
};

const isLogined = () => {
  return localStorage.getItem("login") ? true : false;
};

const init = () => {
  // 로그인되어있는 상태일 경우
  if (isLogined()) {
    alert("이미 로그인된 상태입니다.");
    location.href = "./index.html";

    return;
  }

  // 로그인
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const isSuccess = checkLogin(idEl.value, passwordEl.value);

    if (isSuccess) {
      alert("로그인 성공");
      localStorage.setItem("login", idEl.value);
      location.href = "./index.html";
    } else {
      alert("로그인 실패");
      idEl.value = "";
      passwordEl.value = "";
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
