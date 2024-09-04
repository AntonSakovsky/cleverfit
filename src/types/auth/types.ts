export type LoginBodyType = {
    email: string,
    password: string
}

export type RegistrationBodyType = LoginBodyType;

export type CheckEmailBodyType = {
    email: string,
}
export type ConfirmEmailBodyType = CheckEmailBodyType & {code: string}

export type ChangePasswordBodyType = {
    password: string,
    confirmPassword: string
}