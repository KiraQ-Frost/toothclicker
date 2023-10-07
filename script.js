var teeth = localStorage.getItem("teeth") | 0;
var tps = localStorage.getItem("tps") | 0;
var tpc = localStorage.getItem("tpc") | 1;

var poofCost = localStorage.getItem("poofCost") | 69;
var poofs = localStorage.getItem("poofs") | 0;
var sipCost = localStorage.getItem("sipCost") | 100;
var sips = localStorage.getItem("sips") | 0;
var lacelessCost = localStorage.getItem("lacelessCost") | 1000;
var laceless = localStorage.getItem("laceless") | 0;

function count() {
    teeth += tpc;
    document.getElementById("teethCount").innerText = teeth;
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

        document.getElementById("teethCountPerSecond").innerText = tps;
        document.getElementById("poofCost").innerText = poofCost;
        document.getElementById("poofNum").innerText = poofs;
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

        document.getElementById("teethCountPerClick").innerText = tpc;
        document.getElementById("sipCost").innerText = sipCost;
        document.getElementById("sipNum").innerText = sips;
    }
}

function buyLaceless() {
    if(teeth >= lacelessCost) {
        tpc += (5+laceless);
        tps += (5+laceless);
        laceless++;
        teeth -= lacelessCost;
        lacelessCost *= 2;
        
        document.getElementById("teethCountPerSecond").innerText = tps;
        document.getElementById("teethCountPerClick").innerText = tpc;
        document.getElementById("lacelessCost").innerText = lacelessCost;
        document.getElementById("lacelessNum").innerText = laceless;
    }
}

setInterval(function() {
    teeth += tps;

    document.getElementById("teethCount").innerText = teeth;

    document.getElementById("teethCountPerSecond").innerText = tps;
    document.getElementById("poofCost").innerText = poofCost;
    document.getElementById("poofNum").innerText = poofs;

    document.getElementById("teethCountPerClick").innerText = tpc;
    document.getElementById("sipCost").innerText = sipCost;
    document.getElementById("sipNum").innerText = sips;

    document.getElementById("lacelessCost").innerText = lacelessCost;
    document.getElementById("lacelessNum").innerText = laceless;

    localStorage.setItem("teeth", teeth);
    localStorage.setItem("tps", tps);
    localStorage.setItem("tpc", tpc);
    localStorage.setItem("poofCost", poofCost);
    localStorage.setItem("poofs", poofs);
    localStorage.setItem("sipCost", sipCost);
    localStorage.setItem("sips", sips);
    localStorage.setItem("lacelessCost", lacelessCost);
    localStorage.setItem("laceless", laceless);
    
}, 1000)