var teeth = localStorage.getItem("teeth") != null ? Number(localStorage.getItem("teeth")) : 0;
var teethAllTime = localStorage.getItem("teethAllTime") != null ? Number(localStorage.getItem("teethAllTime")) : 0

var tps = localStorage.getItem("tps") != null ? Number(localStorage.getItem("tps")) : 0;
var tpc = localStorage.getItem("tpc") != null ? Number(localStorage.getItem("tpc")) : 1;
var teethClicked = localStorage.getItem("teethClicked") != null ? Number(localStorage.getItem("teethClicked")) : 0
var teethPried = localStorage.getItem("teethPried") != null ? Number(localStorage.getItem("teethPried")) : 0

var cavitiesCost = localStorage.getItem("cavitiesCost") != null ? Number(localStorage.getItem("cavitiesCost")) : 69;
var cavities = localStorage.getItem("cavities") != null ? Number(localStorage.getItem("cavities")) : 0;
var pliersCost = localStorage.getItem("pliersCost") != null ? Number(localStorage.getItem("pliersCost")) : 100;
var pliers = localStorage.getItem("pliers") != null ? Number(localStorage.getItem("pliers")) : 0;
var teeththiefCost = localStorage.getItem("teeththiefCost") != null ? Number(localStorage.getItem("teeththiefCost")) : 1000;
var teeththief = localStorage.getItem("teeththief") != null ? Number(localStorage.getItem("teeththief")) : 0;

function count() {
    teeth += tpc;
    teethAllTime += tpc;
    teethPried += tpc;
    teethClicked++;

    updateTeeth();
}

function buyCavities() {
    if (teeth >= cavitiesCost) {
        cavities++;
        teeth -= cavitiesCost
        cavitiesCost *= 2;
        if (cavities > 5) {
            tps += (cavities - 5);
        } else {
            tps++;
        }
        updateText();
        updateTeeth();
    }
}

function buyPliers() {
    if (teeth >= pliersCost) {
        pliers++;
        teeth -= pliersCost;
        pliersCost *= 2;
        if (pliers > 5) {
            tpc += (pliers - 5);
        } else {
            tpc++;
        }
        updateText();
        updateTeeth();
    }
}

function buyTeeththief() {
    if (teeth >= teeththiefCost) {
        tpc += (5 + teeththief);
        tps += (5 + teeththief);
        teeththief++;
        teeth -= teeththiefCost;
        teeththiefCost *= 2;

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

    localStorage.setItem("cavitiesCost", cavitiesCost);
    localStorage.setItem("cavities", cavities);
    localStorage.setItem("pliersCost", pliersCost);
    localStorage.setItem("pliers", pliers);
    localStorage.setItem("teeththiefCost", teeththiefCost);
    localStorage.setItem("teeththief", teeththief);

    popup("Progress Saved");
    
}

function popup(message) {
    var x = document.getElementById("popup");
    x.innerText = message;
    if (x.className == "") {
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    }
}

function resetProgress() {
    teeth = 0;
    teethAllTime = 0;

    tps = 0;
    tpc = 1;
    teethClicked = 0;
    teethPried = 0;

    cavitiesCost = 69;
    cavities = 0;
    pliersCost = 100;
    pliers = 0;
    teeththiefCost = 1000;
    teeththief = 0;

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
    document.getElementById("pliersCost").innerText = formatNumbers(pliersCost);
    document.getElementById("pliersNum").innerText = formatNumbers(pliers);
    document.getElementById("cavitiesCost").innerText = formatNumbers(cavitiesCost);
    document.getElementById("cavitiesNum").innerText = formatNumbers(cavities);
    document.getElementById("teeththiefCost").innerText = formatNumbers(teeththiefCost);
    document.getElementById("teeththiefNum").innerText = formatNumbers(teeththief);
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
    var textarea = document.getElementById("saveString");
    textarea.value = "";
    textarea.readOnly = false;
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
    var tteeth, tteethAllTime, ttps, ttpc, tteethClicked, tteethPried, tcavitiesCost, tcavities, tpliersCost, tpliers, tteeththiefCost, tteeththief;
    stringSaved = decrypt(stringSaved, 4);
    if (stringSaved.substring(0, 4) == "SAVE") {
        tteeth = stringSaved.substring(stringSaved.indexOf('t') + 1, stringSaved.indexOf('T'));
        tteethAllTime = stringSaved.substring(stringSaved.indexOf('T') + 1, stringSaved.indexOf('s'));
        ttps = stringSaved.substring(stringSaved.indexOf('s') + 1, stringSaved.indexOf('c'));
        ttpc = stringSaved.substring(stringSaved.indexOf('c') + 1, stringSaved.indexOf('C'));
        tteethClicked = stringSaved.substring(stringSaved.indexOf('C') + 1, stringSaved.indexOf('P'));
        tteethPried = stringSaved.substring(stringSaved.indexOf('P') + 1, stringSaved.indexOf('g'));
        tcavitiesCost = stringSaved.substring(stringSaved.indexOf('g') + 1, stringSaved.indexOf('p'));
        tcavities = stringSaved.substring(stringSaved.indexOf('p') + 1, stringSaved.indexOf('v'));
        tpliersCost = stringSaved.substring(stringSaved.indexOf('v') + 1, stringSaved.indexOf('n'));
        tpliers = stringSaved.substring(stringSaved.indexOf('n') + 1, stringSaved.indexOf('z'));
        tteeththiefCost = stringSaved.substring(stringSaved.indexOf('z') + 1, stringSaved.indexOf('l'));
        tteeththief = stringSaved.substring(stringSaved.indexOf('l') + 1);
        if (tteeth && tteethAllTime && ttps && ttpc && tteethClicked && tteethPried && tcavitiesCost && tcavities && tpliersCost && tpliers && tteeththiefCost && tteeththief) {
            teeth = Number(tteeth);
            teethAllTime = Number(tteethAllTime);
            tps = Number(ttps);
            tpc = Number(ttpc);
            teethClicked = Number(tteethClicked);
            teethPried = Number(tteethPried);
            cavitiesCost = Number(tcavitiesCost);
            cavities = Number(tcavities);
            pliersCost = Number(tpliersCost);
            pliers = Number(tpliers);
            teeththiefCost = Number(tteeththiefCost);
            teeththief = Number(tteeththief);
            removeDisplayWindow("saveArea");
            document.getElementById("saveArea").classList.add('inactive');
            updateTeeth();
            updateText();
            displayShop();
            popup("Progress Imported");
        }

    }
}

//remove savestring text when clearbutton pressed
function exportSave() {
    displaySaveArea();
    var textarea = document.getElementById("saveString");
    var save = "SAVE";
    save += "t" + teeth + "T" + teethAllTime + "s" + tps + "c" + tpc + "C" + teethClicked;
    save += "P" + teethPried + "g" + cavitiesCost + "p" + cavities + "v" + pliersCost + "n" + pliers;
    save += "z" + teeththiefCost + "l" + teeththief;
    save = encrypt(save, 4);

    textarea.value = save;
    textarea.focus();
    textarea.select();
    textarea.readOnly = true;

    var newButton = document.createElement('button');
    newButton.innerHTML = "Copy";
    newButton.id = "dummyButton";
    newButton.onclick = function () {
        navigator.clipboard.writeText(save);
        popup("Copied to Clipboard");
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
    var toReturn = number;
    if (number >= 1000 && number < 1000000) {
        toReturn = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    } else if (number >= 1000000 && number < 1000000000) {
        toReturn = number / 1000000
        toReturn = toReturn.toString().substring(0, 4) + "\xa0million";
    }
    return toReturn;
}

//every second
setInterval(function () {
    teeth += tps;
    teethAllTime += tps;
    updateTeeth();
}, 1000)

//every 60 seconds
setInterval(function () {
    saveProgress();
    updateStatisticsText();
}, 60000)

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