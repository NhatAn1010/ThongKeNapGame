import { saveMoney } from "./storage.js";
import { saveData } from "./storage.js";
import { getMoney } from "./storage.js";
import { getData } from "./storage.js";
import { clearForm } from "./storage.js";


function getDataPaidGame(dataGame)
{
    let historyPaid = getData('game-paid-history') || [];

    historyPaid.push(dataGame);
    return saveData('game-paid-history',historyPaid);
}

function showErrQuantity(errId) {
    document.getElementById(errId).innerHTML = "Không được để trống số lượng";
    return false;
}
function clearErrQuantity(errId) {
    document.getElementById(errId).innerHTML = "";
    return true;
}

function getPaidWuwa() {

    // init value

    let originalMoneyWuwa = getMoney("ww");
    
    let outputValue = 0;
    let packPrice;
    let totalMoney;
    let mpPrice = 103e3;
    let bpPrice = 230e3;
    let rollVip = 608e3; // gói 15 roll
    let rollNormal = 230e3; // gói 5 roll
    /*
        dùng để lưu các giá trị sau khi nhập vào 
     */
    
    let dataPayWuwa = {
        "gameName" : "Wuthering Waves",
        "packName" : "",
        "packPrice" : "",
        "packDate": "",
        "packMonth": "",
        "packYear": "",
        "packQuantity": "",
        "packHours" : "",
        "packMin" : "",
        "packSec" : ""
    };


    document.getElementById('quantity-value').addEventListener('blur', validInputQuantity)  
    function validInputQuantity() {
        let inputValue = document.getElementById('quantity-value');
        if(inputValue.value === "") return showErrQuantity('help-text-ww');

        outputValue = inputValue.value;
        dataPayWuwa.packQuantity = outputValue;
        return clearErrQuantity('help-text-ww');
    }

    document.querySelector('#slt-money-ww')
    .addEventListener('change', slGame => {
        switch (slGame.target.value) {
            case "mp-ww":
                packPrice = mpPrice;
                dataPayWuwa.packName = "Thẻ tháng";
                dataPayWuwa.packPrice = mpPrice;
                break;
            case "bp-ww":
                packPrice = bpPrice;
                dataPayWuwa.packName = "BP";
                dataPayWuwa.packPrice = bpPrice;
                break;
            case "15r":
                packPrice = rollVip;
                dataPayWuwa.packName = "Gói 15 roll char";
                dataPayWuwa.packPrice = rollVip;
                break;
            case "5r":
                packPrice = rollNormal;
                dataPayWuwa.packName = "Gói 5 roll char";
                dataPayWuwa.packPrice = rollNormal;
                break;
        }
        
    })

    document.getElementById('btn-save-ww')
    .addEventListener('click', () => {
        let isValid = true;
        if(!validInputQuantity()) isValid = false;

        const today = new Date()
        dataPayWuwa.packDate = today.getDate();
        dataPayWuwa.packMonth = today.getMonth() + 1;
        dataPayWuwa.packYear = today.getFullYear();
        dataPayWuwa.packHours = today.getHours();
        dataPayWuwa.packMin = today.getMinutes();
        dataPayWuwa.packSec = today.getSeconds();
        
        if(!isValid) return;
        getDataPaidGame(dataPayWuwa);
        console.log(isValid);   
        
        totalMoney = originalMoneyWuwa + packPrice * outputValue
        saveMoney('ww', totalMoney); 
        document.getElementById('ww-game').innerHTML = `
            <p>
                Tổng nạp wuwa: ${totalMoney.toLocaleString(0)}
            </p>
        `; 

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalId-ww')
        ).hide();
        clearForm('#form-paid-ww');
    })
    
    document.getElementById('ww-game')
    .innerHTML = `
        <p>
            Tổng nạp wuwa: ${getMoney("ww").toLocaleString(0)} đ
        </p>
    `;

    // saveMoney("ww", 23115000);
    // saveData('game-paid-history', "");
}

getPaidWuwa();

function updatePriceWuwa()
{

    let dataWuwa = {
        priceMP : 103000,
        priceBP : 203000,
        priceVip : 608000,
        priceNormal : 203000,
        day: "15",
        month: "5",
        year: "2026"
    }
    
    drawUIUpdateWuwa(dataWuwa);
    

    const getMpValue = document.getElementById('mp-ww-update');
    const getBpValue = document.getElementById('bp-ww-update');
    const getRollVipValue = document.getElementById('15r');
    const getRollNormalValue = document.getElementById('5r');
    const btnSaveUpdate = document.getElementById('btn-save-update--ww');

    function drawUIUpdateWuwa(data)
    {
        let uiUpdate = "";

        uiUpdate += `
            <tr>
                <td>
                    Thẻ tháng
                </td>
                <td>${data.priceMP.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
            <tr>
                <td>
                    Insider Channel
                </td>
                <td>${data.priceBP.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
            <tr>
                <td>
                    Gói 15 roll char
                </td>
                <td>${data.priceVip.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
            <tr>
                <td>
                    Gói 5 roll char
                </td>
                <td>${data.priceNormal.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
        `

        document.getElementById('ww-price').innerHTML = uiUpdate;
    }


    btnSaveUpdate.addEventListener('click', () => {

        const today = new Date();

        dataWuwa.day = today.getDate();
        dataWuwa.month = today.getMonth() + 1;
        dataWuwa.year = today.getFullYear();
        dataWuwa.priceMP = Number(getMpValue.value);
        dataWuwa.priceBP = Number(getBpValue.value);
        dataWuwa.priceVip = Number(getRollVipValue.value);
        dataWuwa.priceNormal = Number(getRollNormalValue.value);

        
        saveData("updatePriceWuwa", dataWuwa);
        let currentPriceWuwa = getData('updatePriceWuwa') || dataWuwa;
        
        drawUIUpdateWuwa(currentPriceWuwa);

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalIdUpdateWuwa')
        ).hide();
        clearForm('#form-update-ww');
        
    })
    
}   

updatePriceWuwa();

function getPaidNTE() {

    let dataPayNTE = {
        "gameName" : "NTE",
        "packName": "",
        "packPrice": "",
        "packDate": "",
        "packMonth": "",
        "packYear": "",
        "packQuantity" : "",
        "packHours" : "",
        "packMin" : "",
        "packSec" : ""
    }


    saveMoney('nte', 665000);
    let origianlMoneyNTE = getMoney("nte");
    let mpPrice = 110e3;
    let bpPrice = 220e3;
    let rollBannerPrice = 330e3;
    let outputMoney;

    let sltMoneyNTE = document.querySelector('#slt-money-nte');
    sltMoneyNTE.addEventListener('change', slt => {
        switch(slt.target.value)
        {
            case "mp-nte":
                dataPayNTE.packName = "Thẻ tháng"
                dataPayNTE.packPrice = mpPrice;
                break;
            case 'bp-nte':
                dataPayNTE.packName = "Insider Channel"
                dataPayNTE.packPrice = bpPrice;
                break;
            case '10r':
                dataPayNTE.packName = "gói 10 roll banner"
                dataPayNTE.packPrice = rollBannerPrice;
                break;
        } 
    })

    document.getElementById('nte-quantity').addEventListener('blur', validInputQuantity);
    function validInputQuantity() {
        let inputValue = document.getElementById('nte-quantity').value;
        if(inputValue === "") return showErrQuantity('help-text-nte');

        return clearErrQuantity('help-text-nte');
    }

    document.getElementById('btn-update-nte')
    .addEventListener('click', () => {
        let isValid = true;
        if(!validInputQuantity()) isValid = false;
        const today = new Date();
        outputMoney = origianlMoneyNTE + dataPayNTE.packPrice * (parseInt(document.getElementById('nte-quantity').value));
        dataPayNTE.packDate = today.getDate();
        dataPayNTE.packMonth = today.getMonth() + 1;
        dataPayNTE.packYear = today.getFullYear();
        dataPayNTE.packHours = today.getHours();
        dataPayNTE.packMin = today.getMinutes();
        dataPayNTE.packSec = today.getSeconds();
        dataPayNTE.packQuantity = (parseInt(document.getElementById('nte-quantity').value));
        
        if(!isValid) return;
        getDataPaidGame(dataPayNTE);
        
        
        
        saveMoney('nte', outputMoney);
        document.getElementById('nte-game').innerHTML = `
            <p>
                Tổng nạp NTE: ${getMoney('nte').toLocaleString(0)} đ
            </p>
        `;
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalId-nte')
        ).hide();
        clearForm('#form-paid-nte');
    });

    document.getElementById('nte-game').innerHTML = `
        <p>
            Tổng nạp NTE: ${getMoney('nte').toLocaleString(0)} đ
        </p>
    `;
}

getPaidNTE();

function updatePriceNTE()
{
    let dataNTE = {
        priceMP : 110000,
        priceBP : 220000,
        priceVip : 330000,
        day: "15",
        month: "5",
        year: "2026"
    }

    const getMpValue = document.getElementById('mp-nte-update');
    const getBpValue = document.getElementById('bp-nte-update');
    const getRollVip = document.getElementById('10r');
    const btnSaveUpdate = document.getElementById('btn-save-update--nte');

    let currentPriceNTE = getData('updatePriceNTE') || dataNTE;
    drawUIUpdateNTE(currentPriceNTE);

    function drawUIUpdateNTE(data)
    {
        let uiUpdate = "";

        uiUpdate += `
            <tr>
                <td>
                    Thẻ tháng
                </td>
                <td>${data.priceMP.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
            <tr>
                <td>
                    Insider Channel
                </td>
                <td>${data.priceBP.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
            <tr>
                <td>
                    Gói 10 roll char
                </td>
                <td>${data.priceVip.toLocaleString(0)} đ</td>
                <td>${data.day} / ${data.month} / ${data.year}</td>
            </tr>
        `

        document.getElementById('nte-price').innerHTML = uiUpdate;
    }

    btnSaveUpdate.addEventListener('click', () => {
        dataNTE.priceMP = Number(getMpValue.value);
        dataNTE.priceBP = Number(getBpValue.value);
        dataNTE.priceVip = Number(getRollVip.value);
        
        saveData('updatePriceNTE', dataNTE);
        let currentPriceNTE = getData('updatePriceNTE') || dataNTE;
        drawUIUpdateNTE(currentPriceNTE);
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById('modalIdUpdateNTE')
        ).hide();
        clearForm('#form-update-nte');
    })
}
updatePriceNTE();