export function saveMoney(param, money) {
    localStorage.setItem(param, money);
}

export function getMoney(param) {
    return Number(localStorage.getItem(param));
}

export function saveData(nameData ,params) {
    localStorage.setItem(nameData, JSON.stringify(params))
}

export function getData(nameData) {
    return JSON.parse(localStorage.getItem(nameData));
}

export function clearForm(formId) {
    return document.querySelector(formId).reset();
}