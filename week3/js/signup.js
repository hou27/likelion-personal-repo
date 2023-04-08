const formEl = document.querySelector("#signupForm");
const idEl = document.querySelector("#signupId");
const passwordEl = document.querySelector("#signupPassword");

const isUserExist = (newUserId) => {
  const users = localStorage.getItem("userList");
  if (!users) return false;

  const convertedUsers = JSON.parse(users);
  const getExistUser = convertedUsers.find((user) => user.id === newUserId);
  return getExistUser ? true : false;
};

const registerUser = (userInfo) => {
  const currentUsers = JSON.parse(localStorage.getItem("userList"));
  if (!currentUsers) {
    // const newUserList = [{ id: userInfo.id, password: userInfo.password }];
    const newUserList = [userInfo];
    localStorage.setItem("userList", JSON.stringify(newUserList));
  } else {
    // const updatedUsers = currentUsers.concat({
    //   id: userInfo.id,
    //   password: userInfo.password,
    // });
    const updatedUsers = currentUsers.concat(userInfo);
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
  }
};

const init = () => {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const idValue = idEl.value;
    const passwordValue = passwordEl.value;

    // 해당 id의 유저가 이미 존재하는 경우
    if (isUserExist(idValue)) {
      alert(`${idValue} 유저는 이미 존재합니다.`);
      // input 태그의 value를 초기화
      idEl.value = "";
      passwordEl.value = "";

      return;
    }

    // 회원가입
    registerUser({ id: idValue, password: passwordValue });
    alert("회원가입 완료!");
    location.href = "./signin.html";
  });
};

document.addEventListener("DOMContentLoaded", init);
