var teeth = 99999;
var tps = 0;
var tpc = 1;

var poofCost = 69;
var poofs = 0;
var sipCost = 100;
var sips = 0;
var lacelessCost = 1000;
var laceless = 0;

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
        lacelessCost *= 3;
        document.getElementById("teethCountPerSecond").innerText = tps;
        document.getElementById("teethCountPerClick").innerText = tpc;
        document.getElementById("lacelessCost").innerText = lacelessCost;
        document.getElementById("lacelessNum").innerText = laceless;
    }
}

setInterval(function() {
    teeth += tps;
    document.getElementById("teethCount").innerText = teeth;
}, 1000)