///For interactive small-window nav bar
var nav = document.getElementById('nav');
var sW = window.matchMedia("screen and (max-height: 929px)")
var bW = window.matchMedia("screen and (min-height: 929px)")

function nav_open() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
  }
  
function nav_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function smallWindow(x) {
    if (x.matches) {
        document.getElementById("navTitle").textContent = "Z";
    }
}

function bigWindow(x) {
    if (x.matches) {
        document.getElementById("navTitle").textContent = "Zenithly";
    }
}

sW.addEventListener("change", function() {
    smallWindow(sW);
});

bW.addEventListener("change", function() {
    bigWindow(bW);
});