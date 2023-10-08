var teeth = localStorage.getItem("teeth") != null? Number(localStorage.getItem("teeth")) : 0;
var tps = localStorage.getItem("tps") != null? Number(localStorage.getItem("tps")) : 0;
var tpc = localStorage.getItem("tpc") != null? Number(localStorage.getItem("tpc")) : 1;

var poofCost = localStorage.getItem("poofCost") != null? Number(localStorage.getItem("poofCost")) : 69;
var poofs = localStorage.getItem("poofs") != null? Number(localStorage.getItem("poofs")) : 0;
var sipCost = localStorage.getItem("sipCost") != null? Number(localStorage.getItem("sipCost")) : 100;
var sips = localStorage.getItem("sips") != null? Number(localStorage.getItem("sips")) : 0;
var lacelessCost = localStorage.getItem("lacelessCost") != null? Number(localStorage.getItem("lacelessCost")) : 1000;
var laceless = localStorage.getItem("laceless") != null? Number(localStorage.getItem("laceless")) : 0;

function count() {
    teeth += tpc;
    updateTeeth();

    if(teeth >= 249600000000) {
        document.getElementById("tooManyTeeth").innerText = "You have collected all the teeth";
    }
}

function buyPoof() {
    if(teeth >= poofCost) {
        poofs++;
        teeth -= poofCost
        poofCost *= 2;
        if(poofs > 5) {
            tps += (poofs - 5);
        } else {
            tps++;
        }
        updateText();
    }
}

function buySip() {
    if(teeth >= sipCost) {
        sips++;
        teeth -= sipCost;
        sipCost *= 2;
        if(sips > 5) {
            tpc += (sips - 5);
        } else {
            tpc++;
        }
        updateText();
    }
}

function buyLaceless() {
    if(teeth >= lacelessCost) {
        tpc += (5+laceless);
        tps += (5+laceless);
        laceless++;
        teeth -= lacelessCost;
        lacelessCost *= 2;
        
        updateText();
    }
}

function saveProgress() {
    localStorage.setItem("teeth", teeth);
    localStorage.setItem("tps", tps);
    localStorage.setItem("tpc", tpc);
    localStorage.setItem("poofCost", poofCost);
    localStorage.setItem("poofs", poofs);
    localStorage.setItem("sipCost", sipCost);
    localStorage.setItem("sips", sips);
    localStorage.setItem("lacelessCost", lacelessCost);
    localStorage.setItem("laceless", laceless);
}

function resetProgress() {
    teeth = 0;
    tps = 0;
    tpc = 1;
    poofCost = 69;
    poofs = 0;
    sipCost = 100;
    sips = 0;
    lacelessCost = 1000;
    laceless = 0;

    saveProgress();
    updateText();

}

function updateText() {
    document.getElementById("teethCountPerSecond").innerText = tps;
    document.getElementById("teethCountPerClick").innerText = tpc;
    document.getElementById("sipCost").innerText = sipCost;
    document.getElementById("sipNum").innerText = sips;
    document.getElementById("poofCost").innerText = poofCost;
    document.getElementById("poofNum").innerText = poofs;
    document.getElementById("lacelessCost").innerText = lacelessCost;
    document.getElementById("lacelessNum").innerText = laceless;
}

function updateTeeth() {
    document.getElementById("teethCount").innerText = teeth;
}

setInterval(function() {
    teeth += tps;
    updateTeeth();
    saveProgress();
}, 1000)