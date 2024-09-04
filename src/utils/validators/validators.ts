import { EMAIL_REGEXP } from "@constants/constants"


//Для redux-form изначально предназначалось эти все валидаторы
export const required = (value: string)=>{
    if(!value){
        return 'Обязательне поле'
    }
}

export const emailValidator = (value: string) => {
    if(!EMAIL_REGEXP.test(value)){
        return 'Неверная почта'
    }
}

export const passwordValidator = (value: string)=>{

    if(minLengthValidator(8)(value) || containNumValidator(value) || containCapitalLetterValidator(value)){
        return 'Неверный пароль';
    }
}
export const minLengthValidator = (minLen: number) => (value: string) => {
    if(value.length < minLen){
        return 'Пароль должен быть не меньше 8 символов'
    }
}

export const containNumValidator = (value: string)=>{
    if(!/\d/.test(value)){
        return 'Пароль должен содержать хотя бы одну цифру'
    }
}

export const containCapitalLetterValidator = (value: string)=>{
    if(!/[A-Z]/.test(value)){
        return 'Пароль должен содержать хотя бы одну заглавную букву'
    }
}

export const equalsPasswordValidator = (value: string, allValues: any)=>{
    if(value !== allValues.password){
        return 'Пароли не совпадают'
    }
}