var teeth = localStorage.getItem("teeth") != null ? Number(localStorage.getItem("teeth")) : 0;
var teethAllTime = localStorage.getItem("teethAllTime") != null ? Number(localStorage.getItem("teethAllTime")) : 0

var tps = localStorage.getItem("tps") != null ? Number(localStorage.getItem("tps")) : 0;
var tpc = localStorage.getItem("tpc") != null ? Number(localStorage.getItem("tpc")) : 1;
var teethClicked = localStorage.getItem("teethClicked") != null ? Number(localStorage.getItem("teethClicked")) : 0
var teethPried = localStorage.getItem("teethPried") != null ? Number(localStorage.getItem("teethPried")) : 0

var poofCost = localStorage.getItem("poofCost") != null ? Number(localStorage.getItem("poofCost")) : 69;
var poofs = localStorage.getItem("poofs") != null ? Number(localStorage.getItem("poofs")) : 0;
var sipCost = localStorage.getItem("sipCost") != null ? Number(localStorage.getItem("sipCost")) : 100;
var sips = localStorage.getItem("sips") != null ? Number(localStorage.getItem("sips")) : 0;
var lacelessCost = localStorage.getItem("lacelessCost") != null ? Number(localStorage.getItem("lacelessCost")) : 1000;
var laceless = localStorage.getItem("laceless") != null ? Number(localStorage.getItem("laceless")) : 0;

function count() {
    teeth += tpc;
    teethAllTime += tpc;
    teethPried += tpc;
    teethClicked++;

    updateTeeth();
}

function buyPoof() {
    if (teeth >= poofCost) {
        poofs++;
        teeth -= poofCost
        poofCost *= 2;
        if (poofs > 5) {
            tps += (poofs - 5);
        } else {
            tps++;
        }
        updateText();
        updateTeeth();
    }
}

function buySip() {
    if (teeth >= sipCost) {
        sips++;
        teeth -= sipCost;
        sipCost *= 2;
        if (sips > 5) {
            tpc += (sips - 5);
        } else {
            tpc++;
        }
        updateText();
        updateTeeth();
    }
}

function buyLaceless() {
    if (teeth >= lacelessCost) {
        tpc += (5 + laceless);
        tps += (5 + laceless);
        laceless++;
        teeth -= lacelessCost;
        lacelessCost *= 2;

        updateText();
        updateTeeth();
    }
}

function saveProgress() {
    localStorage.setItem("teeth", teeth);
    localStorage.setItem("teethAllTime", teethAllTime);

    localStorage.setItem("tps", tps);
    localStorage.setItem("tpc", tpc);
    localStorage.setItem("teethClicked", teethClicked);
    localStorage.setItem("teethPried", teethPried);

    localStorage.setItem("poofCost", poofCost);
    localStorage.setItem("poofs", poofs);
    localStorage.setItem("sipCost", sipCost);
    localStorage.setItem("sips", sips);
    localStorage.setItem("lacelessCost", lacelessCost);
    localStorage.setItem("laceless", laceless);
}

function resetProgress() {
    teeth = 0;
    teethAllTime = 0;

    tps = 0;
    tpc = 1;
    teethClicked = 0;
    teethPried = 0;

    poofCost = 69;
    poofs = 0;
    sipCost = 100;
    sips = 0;
    lacelessCost = 1000;
    laceless = 0;

    saveProgress();
    updateText();
    updateTeeth();
    resetButtons();
    displayShop();
    if (!document.getElementById("saveArea").classList.contains('inactive')) {
        removeDisplayWindow("saveArea");
        document.getElementById("saveArea").classList.add('inactive');
    }
}

function updateText() {
    document.getElementById("teethCountPerSecond").innerText = formatNumbers(tps);
    document.getElementById("teethCountPerClick").innerText = formatNumbers(tpc);
    document.getElementById("sipCost").innerText = formatNumbers(sipCost);
    document.getElementById("sipNum").innerText = formatNumbers(sips);
    document.getElementById("poofCost").innerText = formatNumbers(poofCost);
    document.getElementById("poofNum").innerText = formatNumbers(poofs);
    document.getElementById("lacelessCost").innerText = formatNumbers(lacelessCost);
    document.getElementById("lacelessNum").innerText = formatNumbers(laceless);
}

function updateStatisticsText() {
    document.getElementById("statsTeethCount").innerText = formatNumbers(teeth);
    document.getElementById("teethAllTime").innerText = formatNumbers(teethAllTime);
    document.getElementById("statsTps").innerText = formatNumbers(tps);
    document.getElementById("statsTpc").innerText = formatNumbers(tpc);
    document.getElementById("teethClicked").innerText = formatNumbers(teethClicked);
    document.getElementById("teethPried").innerText = formatNumbers(teethPried);
}

function updateTeeth() {
    document.getElementById("teethCount").innerText = formatNumbers(teeth);
}

function showConfirm() {
    document.getElementById("resetTeeth").style.display = "none";
    document.getElementById("resetConfirm").style.display = "block";

    setTimeout(resetButtons, 3000);
}

function resetButtons() {
    document.getElementById("resetTeeth").style.display = "block";
    document.getElementById("resetConfirm").style.display = "none";
}


function importSave() {
    document.getElementById("saveString").value = "";
    displaySaveArea();
    var newButton = document.createElement('button');
    newButton.innerHTML = "Submit";
    newButton.id = "dummyButton";
    newButton.onclick = decryptString;
    var oldButton = document.getElementById("dummyButton");
    oldButton.replaceWith(newButton);
}

//fix for file importing
function decryptString() {
    var stringSaved = document.getElementById("saveString").value;
    var tteeth, tteethAllTime, ttps, ttpc, tteethClicked, tteethPried, tpoofCost, tpoofs, tsipCost, tsips, tlacelessCost, tlaceless;
    stringSaved = decrypt(stringSaved, 4);
    if (stringSaved.substring(0, 4) == "SAVE") {
        tteeth = stringSaved.substring(stringSaved.indexOf('t') + 1, stringSaved.indexOf('T'));
        tteethAllTime = stringSaved.substring(stringSaved.indexOf('T') + 1, stringSaved.indexOf('s'));
        ttps = stringSaved.substring(stringSaved.indexOf('s') + 1, stringSaved.indexOf('c'));
        ttpc = stringSaved.substring(stringSaved.indexOf('c') + 1, stringSaved.indexOf('C'));
        tteethClicked = stringSaved.substring(stringSaved.indexOf('C') + 1, stringSaved.indexOf('P'));
        tteethPried = stringSaved.substring(stringSaved.indexOf('P') + 1, stringSaved.indexOf('g'));
        tpoofCost = stringSaved.substring(stringSaved.indexOf('g') + 1, stringSaved.indexOf('p'));
        tpoofs = stringSaved.substring(stringSaved.indexOf('p') + 1, stringSaved.indexOf('v'));
        tsipCost = stringSaved.substring(stringSaved.indexOf('v') + 1, stringSaved.indexOf('n'));
        tsips = stringSaved.substring(stringSaved.indexOf('n') + 1, stringSaved.indexOf('z'));
        tlacelessCost = stringSaved.substring(stringSaved.indexOf('z') + 1, stringSaved.indexOf('l'));
        tlaceless = stringSaved.substring(stringSaved.indexOf('l') + 1);
        if (tteeth && tteethAllTime && ttps && ttpc && tteethClicked && tteethPried && tpoofCost && tpoofs && tsipCost && tsips && tlacelessCost && tlaceless) {
            teeth = Number(tteeth);
            teethAllTime = Number(tteethAllTime);
            tps = Number(ttps);
            tpc = Number(ttpc);
            teethClicked = Number(tteethClicked);
            teethPried = Number(tteethPried);
            poofCost = Number(tpoofCost);
            poofs = Number(tpoofs);
            sipCost = Number(tsipCost);
            sips = Number(tsips);
            lacelessCost = Number(tlacelessCost);
            laceless = Number(tlaceless);
            removeDisplayWindow("saveArea");
            document.getElementById("saveArea").classList.add('inactive');
            updateTeeth();
            updateText();
            displayShop();
        }

    }
}

//remove savestring text when clearbutton pressed
function exportSave() {
    displaySaveArea();
    var textarea = document.getElementById("saveString");
    var save = "SAVE";
    save += "t" + teeth + "T" + teethAllTime + "s" + tps + "c" + tpc + "C" + teethClicked;
    save += "P" + teethPried + "g" + poofCost + "p" + poofs + "v" + sipCost + "n" + sips;
    save += "z" + lacelessCost + "l" + laceless;
    save = encrypt(save, 4);

    textarea.value = save;
    textarea.focus();
    textarea.select();

    var newButton = document.createElement('button');
    newButton.innerHTML = "Copy";
    newButton.id = "dummyButton";
    newButton.onclick = function () {
        navigator.clipboard.writeText(save);
    }
    var oldButton = document.getElementById("dummyButton");
    oldButton.replaceWith(newButton);
}


function encrypt(str, key) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var charCode = (str.charCodeAt(i) + key) % 256;
        result += String.fromCharCode(charCode);
    }
    return result;
}

function decrypt(str, key) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var charCode = (str.charCodeAt(i) - key + 256) % 256;
        result += String.fromCharCode(charCode);
    }
    return result;
}

function cancelSaveString() {
    removeDisplayWindow("saveArea");
    document.getElementById("saveArea").classList.add('inactive');
}

function formatNumbers(number) {
    if (number >= 1000 && number < 1000000) {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    else return number;
}

//every second
setInterval(function () {
    teeth += tps;
    teethAllTime += tps;
    updateTeeth();
    saveProgress();
}, 1000)

//------FOR DISPLAYING EACH WINDOW----//
function displaySaveArea() {
    var savearea = document.getElementById("saveArea");
    if (savearea.classList.contains('inactive')) {
        displayWindow("saveArea");
        savearea.classList.remove('inactive');
    }
}

function displayShop() {
    switchActive("shop");
    document.getElementById("upgrades").style.display = "block";
    removeDisplayWindow("statistics");
    removeDisplayWindow("preferences");
}

function displayStats() {
    switchActive("stats");
    displayWindow("statistics");
    removeDisplayWindow("preferences");
    document.getElementById("upgrades").style.display = "none";
    updateStatisticsText();

}

function displaySettings() {
    switchActive("settings");
    displayWindow("preferences");
    document.getElementById("upgrades").style.display = "none";
    removeDisplayWindow("statistics");
}

function displayWindow(display) {
    var page = document.getElementById(display);
    page.style.height = "auto";
    page.style.width = "auto";
    page.style.overflow = "auto";
    page.style.transform = "scale(1)";
}

function removeDisplayWindow(display) {
    var page = document.getElementById(display);
    page.style.height = "0";
    page.style.width = "0";
    page.style.overflow = "hidden";
    page.style.transform = "scale(0)";
}

function switchActive(window) {
    document.getElementById(window).classList.add('active');

    if (window == "shop") {
        removeActiveFromStats();
        removeActiveFromSettings();

    } else if (window == "stats") {
        removeActiveFromShop();
        removeActiveFromSettings();

    } else if (window == "settings") {
        removeActiveFromShop();
        removeActiveFromStats();
    }
}

function removeActiveFromShop() {
    if (document.getElementById("shop").classList.contains('active')) {
        document.getElementById("shop").classList.remove('active');
    }
}

function removeActiveFromStats() {
    if (document.getElementById("stats").classList.contains('active')) {
        document.getElementById("stats").classList.remove('active');
    }
}

function removeActiveFromSettings() {
    if (document.getElementById("settings").classList.contains('active')) {
        document.getElementById("settings").classList.remove('active');
    }
}