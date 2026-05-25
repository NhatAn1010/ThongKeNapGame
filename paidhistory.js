import { getData } from "./storage.js";

const getPaidHistory = getData("game-paid-history").reverse();

const perPage = 5;
let size = Math.ceil(getPaidHistory.length / perPage);
let start;
let end;
let currentPage = 1;

function pagination() {
    function onSlide(page) {
        return page;
    }

    function renderListPaidHistory() {
        start = (currentPage - 1) * perPage;
        end = start + perPage;

        let currentPaidHistory = getPaidHistory.slice(start, end);
        document.querySelector('#paid-history').innerHTML = "";
        currentPaidHistory.forEach(el =>
            renderTablePaidHistory(el)
        )
    }

    document.querySelector('#slidePage').addEventListener('keydown', e => {
        if (e.key === "Enter") {
            const inputValue = document.querySelector('#slidePage');
            const regex = /^\d{1,}$/;
            currentPage = onSlide(Number(inputValue.value));
            if (inputValue.value > size
                || inputValue.value === ""
                || Number(inputValue.value) === 0
                || !regex.test(inputValue.value)) {
                document.querySelector('#chk-quantity')
                    .innerHTML = `Số trang không hợp lệ!, số trang tối đa hiện tại là ${size} trang`;
            }
            else {
                document.querySelector('#slidePage').blur();
                document.querySelector('#chk-quantity')
                    .innerHTML = "";
                document.querySelector('#totalPage').innerHTML = `${currentPage}/${size}`
                renderListPaidHistory();
            }
        }
    })
    document.querySelector('#slidePage').addEventListener('blur', () => {
        const inputValue = document.querySelector('#slidePage');
        const regex = /^\d{1,}$/;
        currentPage = onSlide(Number(inputValue.value));
        if (inputValue.value > size
            || inputValue.value === ""
            || Number(inputValue.value) === 0
            || !regex.test(inputValue.value)) {
            document.querySelector('#chk-quantity')
                .innerHTML = `Số trang không hợp lệ!, số trang tối đa hiện tại là ${size} trang`;
        }
        else {
            document.querySelector('#slidePage').blur();
            document.querySelector('#chk-quantity')
                .innerHTML = "";
            document.querySelector('#totalPage').innerHTML = `${currentPage}/${size}`
            renderListPaidHistory();
        }

    })
    document.querySelector('#totalPage').innerHTML = `${currentPage}/${size}`

    renderListPaidHistory();

    window.onSlide = onSlide;

    document.querySelector('#btn-prev')
        .addEventListener('click', () => {
            currentPage = onSlide(currentPage - 1);
            document.querySelector('#totalPage').innerHTML = `${currentPage}/${size}`
            document.querySelector('#btn-prev').blur();
            renderListPaidHistory();
            if (currentPage <= 1)
                document.querySelector('#btn-prev')
                    .classList.add('disabled')
            else
                document.querySelector('#btn-next')
                    .classList.remove('disabled')
        })

    document.querySelector('#btn-next')
        .addEventListener('click', () => {
            currentPage = onSlide(currentPage + 1);
            document.querySelector('#totalPage').innerHTML = `${currentPage}/${size}`
            document.querySelector('#btn-next').blur();
            renderListPaidHistory();
            document.querySelector('#btn-next')
                .classList.remove('disabled')
            if (currentPage >= size)
                document.querySelector('#btn-next')
                    .classList.add('disabled')
            else
                document.querySelector('#btn-prev')
                    .classList.remove('disabled');
        })
}

pagination();

function renderTablePaidHistory(data) {
    start++;
    let newRow = document.getElementById('paid-history');

    newRow.innerHTML += `
        <tr>
            <td>${start}</td>
            <td>${data.gameName}</td>
            <td>${data.packName}</td>
            <td>${data.packPrice.toLocaleString(0)}đ</td>
            <td>${data.packQuantity}</td>
            <td>${(data.packQuantity * data.packPrice).toLocaleString(0)}đ</td>
            <td>${data.packDate} / ${data.packMonth} / ${data.packYear}</td>
            <td>${data.packHours}:${data.packMin}:${data.packSec}</td>
        </tr>
    `
}