var PROBLEM
var STARTED = false;
var PAUSED = false;
var MOVES;
var TM;
var TIMMER;
let PUZZLE = [{
    //ben10
    "IMG_URL": "imgs/ben10.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 6,
}, {
    "IMG_URL": "imgs/cowardlyDog.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 9,
    "ROWS": 5,
}, {
    "IMG_URL": "imgs/chotaBheem.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 9,
    "ROWS": 5,
}, {
    "IMG_URL": "imgs/scoobyDoo.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/tomAndJerry.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/oggyAndCockroaches.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/mrBean.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/popEye.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/zoozoo.jpg",
    "BG_SIZE": 800,
    "SIDE": 100,
    "COLUMNS": 8,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/minions4.jpg",
    "BG_SIZE": 850,
    "SIDE": 98,
    "COLUMNS": 9,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/kungFuPanda2.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 9,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/toyStory2.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 9,
    "ROWS": 5
}, {
    "IMG_URL": "imgs/avengers2.jpg",
    "BG_SIZE": 800,
    "SIDE": 90,
    "COLUMNS": 9,
    "ROWS": 5
}]

function run() {
    STARTED = false;
    PAUSED = false;
    MOVES = 0;
    endTimer();
    document.getElementById("beforeStart").style.display = "flex";
    document.getElementById("afterStart").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";

    PROBLEM = PUZZLE[Math.floor(Math.random() * PUZZLE.length)];
    document.getElementById("main").style.width = PROBLEM["SIDE"] * PROBLEM["COLUMNS"] + "px";
    document.getElementById("main").style.height = PROBLEM["SIDE"] * +PROBLEM["ROWS"] + "px";
    // console.log(PROBLEM);

    document.documentElement.style.setProperty("--bgurl", "url(" + PROBLEM["IMG_URL"] + ")");
    document.documentElement.style.setProperty("--bgsize", PROBLEM["BG_SIZE"] + "px");
    document.documentElement.style.setProperty("--side", PROBLEM["SIDE"] + "px");

    for (let i = 0; i < PROBLEM["ROWS"]; i++) {
        let row = document.createElement("DIV");
        row.classList.add("rows");
        row.setAttribute('id', "img" + i);
        for (let j = 0; j < PROBLEM["COLUMNS"]; j++) {

            //dynamically creating element
            let column = document.createElement("DIV");
            column.setAttribute('id', "img" + i + "-" + j);
            column.classList.add("imgs");
            column.classList.add("img" + i + "-" + j);

            column.onmousedown = function() {
                grabber(event);
            };

            //CSS
            column.style.left = j * PROBLEM["SIDE"] + "px";
            column.style.top = i * PROBLEM["SIDE"] + "px";
            column.style.backgroundPositionX = "-" + j * PROBLEM["SIDE"] + "px";
            column.style.backgroundPositionY = "-" + i * PROBLEM["SIDE"] + "px";
            column.style.zIndex = 0;
            row.appendChild(column);
        }
        document.getElementById("main").appendChild(row);
    }
}


// DRAG AND DROP
var diffx, diffy, theElement, zindx = 0;
var curI, curJ;

function grabber(event) {
    // console.log(event);
    if (!STARTED || PAUSED)
        return;
    theElement = event.currentTarget;
    var eid = String(theElement.id);

    curJ = parseInt((parseInt(theElement.style.left) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);
    curI = parseInt((parseInt(theElement.style.top) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);
    //console.log(curI, curJ);
    var posX = parseInt(theElement.style.left);
    var posY = parseInt(theElement.style.top);
    diffx = event.clientX - posX;
    diffy = event.clientY - posY;
    zindx += 1;
    theElement.style.zIndex = zindx;
    theElement.classList.add("highlight");

    document.addEventListener("mousemove", mover, true); //The addEventListener() method attaches an event handler to the specified element.
    document.addEventListener("mouseup", dropper, true);
    event.stopPropagation();
    event.preventDefault();
}

function mover(event) {
    theElement.style.left = (event.clientX - diffx) + "px";
    theElement.style.top = (event.clientY - diffy) + "px";

    event.stopPropagation(); //The stopPropagation() method allows you to prevent propagation of the current event.
}

function dropper(event) {
    // console.log(theElement.style.left, theElement.style.top);
    if (parseInt(theElement.style.left) >= 0 - (PROBLEM["SIDE"] / 2) &&
        parseInt(theElement.style.left) <= PROBLEM["COLUMNS"] * PROBLEM["SIDE"] &&
        parseInt(theElement.style.top) >= 0 - (PROBLEM["SIDE"] / 2) &&
        parseInt(theElement.style.top) <= PROBLEM["ROWS"] * PROBLEM["SIDE"]) {
        var newJ = parseInt((parseInt(theElement.style.left) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);
        var newI = parseInt((parseInt(theElement.style.top) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);

        theElement.style.left = newJ * PROBLEM["SIDE"] + "px";
        theElement.style.top = newI * PROBLEM["SIDE"] + "px";

        var theElementTogled = "img" + newI + "-" + newJ;
        theElementTogled = document.getElementById(theElementTogled);
        theElementTogled.style.left = curJ * PROBLEM["SIDE"] + "px";
        theElementTogled.style.top = curI * PROBLEM["SIDE"] + "px";

        theElement.id = "img" + newI + "-" + newJ;
        theElementTogled.id = "img" + curI + "-" + curJ;
        if (theElement != theElementTogled) {
            MOVES += 1;
        }
    } else {
        theElement.style.left = curJ * PROBLEM["SIDE"] + "px";
        theElement.style.top = curI * PROBLEM["SIDE"] + "px";
    }
    document.removeEventListener("mouseup", dropper, true); //The removeEventListener() method removes an event handler that has been attached with the addEventListener() method.
    document.removeEventListener("mousemove", mover, true);
    event.stopPropagation();
    theElement.classList.remove("highlight");
    zindx -= 1;
    theElement.style.zIndex = zindx;
}
//drag and drop done


// shuffel

function shuffel() {
    STARTED = true;
    startTimer();
    document.getElementById("beforeStart").style.display = "none";
    document.getElementById("afterStart").style.display = "flex";
    var rows = Array.from(Array(PROBLEM["ROWS"]).keys())
    var columns = Array.from(Array(PROBLEM["COLUMNS"]).keys())
        // console.log(k);
    var elearr = []
    for (let index = 0; index < rows.length; index++) {
        for (let j = 0; j < columns.length; j++) {
            elearr.push(String(rows[index]) + String(columns[j]));
        }
    }
    var eles = document.getElementsByClassName("imgs");
    var i, j, itm;
    for (let index = 0; index < eles.length; index++) {
        const element = eles[index];
        var indx = Math.floor(Math.random() * elearr.length);
        var numString = elearr[indx];
        var num = parseInt(numString);
        i = parseInt(num / 10);
        j = parseInt(num % 10);

        element.style.top = i * PROBLEM["SIDE"] + "px";
        element.style.left = j * PROBLEM["SIDE"] + "px";

        element.id = "img" + i + "-" + j;
        elearr.splice(indx, 1);
    }
}

// CHECK

function check() {
    var eles = document.getElementsByClassName("imgs");
    var right = true;
    for (let index = 0; index < eles.length; index++) {
        const element = eles[index];
        if (element.id != element.classList[1]) {
            alert("NOT DONE YET BRO!!!");
            right = false;
            break;
        }
    }
    if (right) {
        alert("Congrats BRO!!!");
    }
}

//clear and run

function clearNRun() {
    document.getElementById("main").innerHTML = "";
    run();
}

function startTimer() {
    document.getElementById("timmer").style.display = "block";
    TM = 0;
    document.getElementById("time").innerText = (TM < 10) ? "0" + TM : TM;
    TIMMER = setInterval(() => {
        if (PAUSED) {
            return;
        }
        TM += 1;
        document.getElementById("time").innerText = (TM < 10) ? "0" + TM : TM;
    }, 1000);
}

function endTimer() {
    document.getElementById("timmer").style.display = "none";
    clearInterval(TIMMER);
}

function pause(params) {
    if (PAUSED) {
        PAUSED = false;
        document.getElementById("main").style.filter = "";
        document.getElementById("pause-play-lable").innerText = "Pause";
    } else {
        PAUSED = true;
        document.getElementById("main").style.filter = "blur(6px)";
        document.getElementById("pause-play-lable").innerText = "Resume";
    }
}

function askAndSubmit() {
    if (confirm("Are you sure you want to submit? ")) {
        submit();
    }
}

function submit(params) {
    STARTED = false;
    PAUSED = true;
    let crtBlock = 0;
    let numBlock = PROBLEM["COLUMNS"] * PROBLEM["ROWS"];
    var eles = document.getElementsByClassName("imgs");
    var tbl = document.getElementById("table");

    var arr = new Array(PROBLEM["ROWS"]);
    for (let index = 0; index < arr.length; index++) {
        arr[index] = new Array(PROBLEM["COLUMNS"]);
    }
    // console.log(arr);

    for (let index = 0; index < eles.length; index++) {
        const element = eles[index];
        var ids = element.id.replace("img", "");
        ids = ids.split("-");
        // console.log(ids);
        var iVal = parseInt(ids[0]);
        var jVal = parseInt(ids[1]);
        if (element.id == element.classList[1]) {
            crtBlock += 1;
            arr[iVal][jVal] = true;
        } else {
            arr[iVal][jVal] = false;
        }
    }

    var table = document.createElement("TABLE");
    var side = (parseInt(tbl.style.width) - 30) / PROBLEM["COLUMNS"];
    document.documentElement.style.setProperty("--resside", side + "px");
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        var trow = document.createElement("TR");
        for (let j = 0; j < element.length; j++) {
            if (arr[i][j]) {
                var tele = document.createElement("TD")
                tele.innerHTML = " "
                tele.classList.add("grn");
            } else {
                var tele = document.createElement("TD")
                tele.innerHTML = " "
                tele.classList.add("rd");
            }
            trow.appendChild(tele);
        }
        table.appendChild(trow);
    }
    tbl.replaceChild(table, tbl.childNodes[0]);
    var accuracy = crtBlock / numBlock * 100;
    endTimer();
    document.getElementById("tMoves").innerText = MOVES;
    document.getElementById("acc-score").innerText = accuracy.toFixed(1) + "%";
    document.getElementById("timetaken").innerText = TM + "sec";
    document.getElementById("roller").style.width = accuracy * 150 / 100 + "px";
    document.getElementById("scoreboard").style.display = "block";
}