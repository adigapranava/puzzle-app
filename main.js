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
var INDEX = Math.floor(Math.random() * PUZZLE.length)
var PROBLEM = PUZZLE[INDEX];


// reinitilize the Global variables and take an image and make puzzle
function run() {
    //its like new game so re-initialize the variables and reset the timers;
    STARTED = false;
    PAUSED = false;
    MOVES = 0;
    endTimer();
    document.getElementById("beforeStart").style.display = "flex";
    document.getElementById("afterStart").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("main").style.filter = "";

    INDEX = (INDEX + 1) % PUZZLE.length;
    PROBLEM = PUZZLE[INDEX];

    // setting the puzzle area
    document.getElementById("main").style.width = PROBLEM["SIDE"] * PROBLEM["COLUMNS"] + "px";
    document.getElementById("main").style.height = PROBLEM["SIDE"] * +PROBLEM["ROWS"] + "px";

    //setting css variable about bg url bg size and size of each block;
    document.documentElement.style.setProperty("--bgurl", "url(" + PROBLEM["IMG_URL"] + ")");
    document.documentElement.style.setProperty("--bgsize", PROBLEM["BG_SIZE"] + "px");
    document.documentElement.style.setProperty("--side", PROBLEM["SIDE"] + "px");


    // creating the puzzle blocks
    for (let i = 0; i < PROBLEM["ROWS"]; i++) {

        // creating row wise divs and setting ids and classes
        let row = document.createElement("DIV");
        row.classList.add("rows");
        row.setAttribute('id', "img" + i);

        for (let j = 0; j < PROBLEM["COLUMNS"]; j++) {

            //dynamically creating element setting ids and classes
            let column = document.createElement("DIV");
            column.setAttribute('id', "img" + i + "-" + j);
            column.classList.add("imgs");
            column.classList.add("img" + i + "-" + j);

            // adding drag and drop feature to each block
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

//this function make drag and drop work only if STARTED or not(PAUSED)
//it is called whe the block is pressed
// it calls mover and dropper
function grabber(event) {
    // If not started or paused no drag and drop feature
    if (!STARTED || PAUSED)
        return;
    // getting the dragging element
    theElement = event.currentTarget;
    var eid = String(theElement.id);

    // getting the elements x and y cordinate
    var posX = parseInt(theElement.style.left);
    var posY = parseInt(theElement.style.top);

    // getting its row and column in curI and curJ respectively
    curJ = parseInt((posX + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);
    curI = parseInt((posY + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);

    diffx = event.clientX - posX;
    diffy = event.clientY - posY;
    zindx += 1;
    theElement.style.zIndex = zindx;
    theElement.classList.add("highlight");

    //The addEventListener() method attaches an event handler to the specified element.
    document.addEventListener("mousemove", mover, true);
    document.addEventListener("mouseup", dropper, true);
    event.stopPropagation();
    event.preventDefault();
}

// it moves the element in the direction of the cusor
function mover(event) {
    theElement.style.left = (event.clientX - diffx) + "px";
    theElement.style.top = (event.clientY - diffy) + "px";

    //The stopPropagation() method allows you to prevent propagation of the current event.
    event.stopPropagation();
}

// this function drops the block in the puzzel area and swaps the block in that block
function dropper(event) {
    // condition to check if droping in the puzzle area only.
    if (
        parseInt(theElement.style.left) >= 0 - (PROBLEM["SIDE"] / 2) &&
        parseInt(theElement.style.left) <= (PROBLEM["COLUMNS"] - 1) * PROBLEM["SIDE"] &&
        parseInt(theElement.style.top) >= 0 - (PROBLEM["SIDE"] / 2) &&
        parseInt(theElement.style.top) <= (PROBLEM["ROWS"] - 1) * PROBLEM["SIDE"]
    ) {
        // getting i and j value of the puzzle block where you are dropping
        var newJ = parseInt((parseInt(theElement.style.left) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);
        var newI = parseInt((parseInt(theElement.style.top) + (PROBLEM["SIDE"] / 2)) / PROBLEM["SIDE"]);

        // setting the left and top 
        theElement.style.left = newJ * PROBLEM["SIDE"] + "px";
        theElement.style.top = newI * PROBLEM["SIDE"] + "px";

        // getting the block in the droped position
        var theElementTogled = "img" + newI + "-" + newJ;
        theElementTogled = document.getElementById(theElementTogled);

        // changing the position to the draged block
        theElementTogled.style.left = curJ * PROBLEM["SIDE"] + "px";
        theElementTogled.style.top = curI * PROBLEM["SIDE"] + "px";

        // seting new id
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
// here the game starts
// timer starts and calls shuffel()

function play(params) {
    STARTED = true;
    startTimer();
    document.getElementById("beforeStart").style.display = "none";
    document.getElementById("afterStart").style.display = "flex";
    shuffel()
}

function shuffel() {
    // logic to assign random position to puzzle block
    var rows = Array.from(Array(PROBLEM["ROWS"]).keys())
    var columns = Array.from(Array(PROBLEM["COLUMNS"]).keys())

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