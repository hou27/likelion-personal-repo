"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.MaxLength(60)
    ], CreateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    ], CreateUserDto.prototype, "password");
    return CreateUserDto;
}());
function deco(target, propertyKey, descriptor) {
    console.log("데코레이터가 평가됨");
}
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    TestClass.prototype.test = function () {
        console.log("함수 호출됨");
    };
    __decorate([
        deco
    ], TestClass.prototype, "test");
    return TestClass;
}());
var t = new TestClass();
t.test();
