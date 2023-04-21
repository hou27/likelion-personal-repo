import { input } from "./input";

type Student = {
  id: number;
  name: string;
  age: number;
};

type StudentInput = Omit<Student, "id">;

const students: Student[] = [];

const createStudent = (studentInput: StudentInput): void => {
  const id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
  const newStudent = {
    id,
    ...studentInput,
  };
  students.push(newStudent);
};

const getAllStudents = (): Student[] => {
  return students;
};

const getStudentById = (id: number) => {
  const student = students.find((student) => student.id === id);
  if (!student) {
    return null;
  }
  return student;
};

const updateStudent = (id: number, student: StudentInput): Student => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return;
  }
  const updateStudent = { id, ...student };
  students[studentIndex] = updateStudent;
  return updateStudent;
};

const deleteStudent = (id: number): void => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return;
  }
  students.splice(studentIndex, 1);
};

const main = async (): Promise<void> => {
  console.log("Welcome to Student Management System");
  console.log(`
  1. Create a student
  2. List all students
  3. Get student by ID
  4. Update student
  5. Delete student
  0. Exit
  `);

  let option = "";

  do {
    option = await input("Select an option: ");
    switch (option) {
      case "1":
        createStudent({
          name: await input("Enter name: "),
          age: +(await input("Enter age: ")),
        });
        break;
      case "2":
        console.log(getAllStudents());
        break;
      case "3":
        console.log(getStudentById(+(await input("Enter ID: "))));
        break;
      case "4":
        console.log(
          updateStudent(+(await input("Enter ID: ")), {
            name: await input("Enter name: "),
            age: +(await input("Enter age: ")),
          })
        );
        break;
      case "5":
        deleteStudent(+(await input("Enter ID: ")));
        break;
      case "0":
        console.log("Program exited");
        break;
      default:
        console.log("Invalid option");
    }
  } while (option !== "0");
};

main();
