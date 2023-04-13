import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

class CreateUserDto {
  @IsEmail()
  @MaxLength(60)
  readonly email!: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password!: string;
}

function deco(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("데코레이터가 평가됨");
}

class TestClass {
  @deco
  test() {
    console.log("함수 호출됨");
  }
}

const t = new TestClass();
t.test();
