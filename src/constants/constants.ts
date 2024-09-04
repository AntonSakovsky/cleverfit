export const LS_TOKEN = '__Cleverfit_user_token__';
export const baseURL = 'https://marathon-api.clevertec.ru/';
export const basePhotoUrl = 'https://training-api.clevertec.ru';

export const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,}$/;

export const enum routes {
    MAIN = '/main',
    AUTH = '/auth',
    REGISTRATION = 'registration',
    CONFIRM_EMAIL = 'confirm-email',
    CHANGE_PASSWORD = 'change-password',
    RESULT = '/result',
    ERROR_LOGIN = 'error-login',
    ERROR_USER_EXIST = 'error-user-exist',
    RESULT_SUCCESS = 'success',
    ERROR_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    ERROR_CHECK_EMAIL = 'error-check-email',
    ERROR_CHANGE_PASSWORD = 'error-change-password',
    SUCCESS_CHANGE_PASSWORD = 'success-change-password',
    RESULT_ERROR = 'error',
    FEEDBACKS = '/feedbacks',
    CALENDAR = '/calendar',
    PROFILE = '/profile',
    SETTINGS = '/settings',
    TRAINING = '/training',
    ACHIEVEMENTS = '/achievements',
    NOT_FOUND = '/*',
}

export const indicatorColors: Record<string, string> = {
    Ноги: '#FF4D4F',
    Силовая: '#FADB14',
    Руки: '#13C2C2',
    Грудь: '#52C41A',
    Спина: '#FA8C16',
    Кардио: '#EB2F96',
};

export const AdvatageList = [
    {
        name: 'Статистика за месяц',
        hasAdvatage: [true, true],
    },
    {
        name: 'Статистика за всё время',
        hasAdvatage: [false, true],
    },
    {
        name: 'Совместные тренировки',
        hasAdvatage: [true, true],
    },
    {
        name: 'Участие в марафонах',
        hasAdvatage: [false, true],
    },
    {
        name: 'Приложение iOS',
        hasAdvatage: [false, true],
    },
    {
        name: 'Приложение Android',
        hasAdvatage: [false, true],
    },
    {
        name: 'Индивидуальный Chat GPT',
        hasAdvatage: [false, true],
    },
];

export const periodSelectOptions = [
    {
        label: 'Через 1 день',
        value: '1',
    },
    {
        label: 'Через 2 день',
        value: '2',
    },
    {
        label: 'Через 3 день',
        value: '3',
    },
    {
        label: 'Через 4 день',
        value: '4',
    },
    {
        label: 'Через 5 день',
        value: '5',
    },
    {
        label: 'Через 6 день',
        value: '6',
    },
    {
        label: '1 раз в неделю',
        value: '7',
    },
];

export const weekDaysSelectOptions = [
    {
        label: 'Понедельник',
        value: 'Понедельник',
    },
    {
        label: 'Вторник',
        value: 'Вторник',
    },
    {
        label: 'Среда',
        value: 'Среда',
    },
    {
        label: 'Четверг',
        value: 'Четверг',
    },
    {
        label: 'Пятница',
        value: 'Пятница',
    },
    {
        label: 'Суббота',
        value: 'Суббота',
    },
    {
        label: 'Воскресенье',
        value: 'Воскресенье',
    },
]

export const namesOfDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

export const enum drawerPlacement {
    RIGHT = 'right',
    BOTTOM = 'bottom',
}
