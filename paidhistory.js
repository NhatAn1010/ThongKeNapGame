
import {getData} from "./storage.js";

const getPaidHistory = getData("game-paid-history");

let index = 0

function renderTablePaidHistory(data) {
    index++;
    let newRow = document.getElementById('paid-history');

    newRow.innerHTML += `
        <tr>
            <td>${index}</td>
            <td>${data.gameName}</td>
            <td>${data.packName}</td>
            <td>${data.packPrice.toLocaleString(0)}đ</td>
            <td>${data.packQuantity}</td>
            <td>${data.packDate} / ${data.packMonth} / ${data.packYear}</td>
            <td>${data.packHours}:${data.packMin}:${data.packSec}</td>
        </tr>
        
    `
    console.log(Number(index));
}

// thêm phân trang cho trang lịch sử nạp

// function paginationPaidHistory(params) {
//     const perPage 
// }


// getPaidHistory.slice(0,5).forEach(element => {
//     renderTablePaidHistory(element);
// });


getPaidHistory.reverse().forEach(element => {
    renderTablePaidHistory(element);
});

console.log(getPaidHistory.slice(0,5));