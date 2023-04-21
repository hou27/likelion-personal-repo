import { input } from "./input";

/**
 * 필요한 타입 정의
 */

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type Post = {
  id: number;
  writerId: number;
  content: string;
  createdAt: Date;
};

type UserInput = Omit<User, "id">;
type SignUpInput = UserInput;
type SignIninput = Omit<UserInput, "name">;

/**
 * 필요한 데이터를 저장할 변수들
 */

const users: User[] = [];
let currentUser: User = null;
const posts: Post[] = [];

const signUp = (signUpInput: SignUpInput): void => {
  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = {
    id,
    ...signUpInput,
  };
  users.push(newUser);
  console.log("회원가입 성공!");
};

const signIn = (signInInput: SignIninput) => {
  const user = users.find((user) => user.email === signInInput.email);
  if (!user || user.password !== signInInput.password) {
    console.log("로그인 실패!");
    return;
  }

  currentUser = user;
};

const getPosts = (): Post[] => {
  return posts;
};

const createPost = (content: string) => {
  const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
  const newPost = {
    id,
    writerId: currentUser.id,
    content,
    createdAt: new Date(),
  };
  posts.push(newPost);
  console.log("게시물 작성 완완");
};

const deletePost = (id: number) => {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    console.log("해당 id를 가진 게시물이 없습니다.");
    return;
  }
  posts.splice(postIndex, 1);
};

const logout = () => {
  currentUser = null;
};

const page1 = async () => {
  console.log(`
  1. 로그인
  2. 회원가입
  0. 그냥 나가기
  `);

  switch (await input("뭐하실?: ")) {
    case "1":
      signIn({
        email: await input("이메일 : "),
        password: await input("비밀번호 : "),
      });
      console.log(`${currentUser.name}님 하이.`);
      break;
    case "2":
      signUp({
        name: await input("이름 : "),
        email: await input("이메일 : "),
        password: await input("비밀번호 : "),
      });
      break;
    case "0":
      console.log("Saving session...completed.");
      process.exit(0);
    default:
      console.log("Invalid option");
  }
};

const page2 = async () => {
  console.log(`
  1. 피드 보기
  2. 게시물 작성
  3. 게시물 삭제
  0. 로그아웃
  `);
  switch (await input("뭐하실?: ")) {
    case "1":
      console.log(getPosts());
      break;
    case "2":
      createPost(await input("내용 : "));
      break;
    case "3":
      deletePost(+(await input("삭제할 게시물의 id: ")));
      break;
    case "0":
      logout();
      console.log("로그아웃");
      break;
    default:
      console.log("Invalid option");
  }
};

const main = async (): Promise<void> => {
  console.log(
    "CLI 버전 인스타그램에 오신 여러분을 환영합니다.\n로그인 안하시면 아무것도 못하심 ㅋ"
  );

  while (true) {
    currentUser ? await page2() : await page1();
  }
};

main();
