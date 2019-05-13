var dude = {
    name: "Chadwick",
    id: "@ chadrulez",
    bio: "Love my Gainzz"
};
function makeround(x, y, w, h, radius, ctx) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var r = x + w;
    var b = y + h;
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1";
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.stroke();
}

//make profile lul
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
makeround(0, 0, canvas.width, canvas.height, 30, ctx);
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height, 30);
makeround(canvas.width * 0.025, canvas.width * 0.025, canvas.width / 4, canvas.height * 0.8, 10, ctx);
ctx.font = "40px Calibri";
ctx.fillStyle = "black";
ctx.fillText(dude.name, canvas.width * (250 / 800), canvas.height * (60 / 300));
ctx.font = "30px Calibri";
ctx.fillStyle = "#737373";
ctx.fillText(dude.id, canvas.width * (250 / 800), canvas.height * (100 / 300));
ctx.fillText("\uD83D\uDEA9 Silloe Gym", canvas.width * (250 / 800), canvas.height * (140 / 300));
ctx.font = "35px Calibri";
ctx.fillStyle = "black";
ctx.fillText(dude.bio, canvas.width * (250 / 800), canvas.height * (240 / 300));
ctx.font = "30px Calibri";
ctx.fillText("Level 16", canvas.width * (680 / 800), canvas.height * (50 / 300));
makeround(canvas.width * (600 / 800), canvas.height * (56 / 300), canvas.width * (185 / 800), canvas.height * (25 / 300), 10, ctx);
ctx.fillStyle = "#33cc33";
ctx.fillRect(canvas.width * (605 / 800), canvas.height * (65 / 300), canvas.width * (130 / 800), canvas.height * (7 / 300));

//make stats
var workout = [{
  exer: "Bench Press",
  rank: "1",
  max: "70 kg"
}, {
  exer: "Deadlift",
  rank: "3",
  max: "95 kg"
}];
var canvas2 = document.getElementById("pro1");
var ctx2 = canvas2.getContext("2d");
ctx2.fillStyle = "white";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height, 30, ctx2);
makeround(canvas2.width * (20 / 800), canvas2.height * (15 / 150), canvas2.width / 5, canvas2.height * (120 / 150), 10, ctx2);
ctx2.fillStyle = "black";
ctx2.font = "40px Calibri";
ctx2.fillText(workout[0].exer, canvas2.width * (150 / 600), canvas2.height * (50 / 150));
ctx2.font = "25px Calibri";
ctx2.fillText("Recent achievement: Pecs of Steel", canvas2.width * (150 / 600), canvas2.height * (90 / 150));
ctx2.fillText("Current Best " + workout[0].max, canvas2.width * (150 / 600), canvas2.height * (120 / 150));
ctx2.fillText("#" + workout[0].rank + " in friends", canvas2.width * (450 / 600), canvas2.height * (40 / 150));

var canvas2 = document.getElementById("pro2");
var ctx2 = canvas2.getContext("2d");
ctx2.fillStyle = "white";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height, 30, ctx2);
makeround(canvas2.width * (20 / 800), canvas2.height * (15 / 150), canvas2.width / 5, canvas2.height * (120 / 150), 10, ctx2);
ctx2.fillStyle = "black";
ctx2.font = "40px Calibri";
ctx2.fillText(workout[1].exer, canvas2.width * (150 / 600), canvas2.height * (50 / 150));
ctx2.font = "25px Calibri";
ctx2.fillText("Recent achievement: Son of Thor", canvas2.width * (150 / 600), canvas2.height * (90 / 150));
ctx2.fillText("Current Best " + workout[1].max, canvas2.width * (150 / 600), canvas2.height * (120 / 150));
ctx2.fillText("#" + workout[1].rank + " in friends", canvas2.width * (450 / 600), canvas2.height * (40 / 150));





//tracker


var xPadding = 30;
var yPadding = 30;
var data = {
    values: [
        { X: "Jan", Y: 12 },
        { X: "Feb", Y: 28 },
        { X: "Mar", Y: 18 },
        { X: "Apr", Y: 34 },
        { X: "May", Y: 40 },
    ]
};

function getMaxY() {
    var max = 0;

    for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
}

function getXPixel(val) {
    return ((graph.width() - xPadding) / data.values.length) * val + (xPadding * 1.5);
}

function getYPixel(val) {
    return graph.height() - (((graph.height() - yPadding) / getMaxY()) * val) - yPadding;
}
var graph1 = document.getElementById("graph1");
var c = graph1.getContext('2d');
c.fillText("Bucci", 0, 0);
c.lineWidth = 2;
c.strokeStyle = '#333';
c.font = 'italic 8pt sans-serif';
c.textAlign = "center";
c.beginPath();
c.moveTo(xPadding, 0);
c.lineTo(xPadding, graph.height() - yPadding);
c.lineTo(graph.width(), graph.height() - yPadding);
c.stroke();
for (var i = 0; i < data.values.length; i++) {
    c.fillText(data.values[i].X, getXPixel(i), graph.height() - yPadding + 20);
}
c.textAlign = "right"
c.textBaseline = "middle";

for (var i = 0; i < getMaxY(); i += 10) {
    c.fillText(i, xPadding - 10, getYPixel(i));
}

c.strokeStyle = '#f00';
c.beginPath();
c.moveTo(getXPixel(0), getYPixel(data.values[0].Y));

for (var i = 1; i < data.values.length; i++) {
    c.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
}
c.stroke();
c.fillStyle = '#333';

for (var i = 0; i < data.values.length; i++) {
    c.beginPath();
    c.arc(getXPixel(i), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
    c.fill();
}

//toggle - fix autotoggle
function toggle() {
    var but1 = document.getElementById("overview");
    var but2 = document.getElementById("stats");
    const div1 = document.getElementById("summary")
    if (but1.value == "view") {
        but2.value = "view";
        but1.value = "hide";
        summary.style.display = "none";
    } else {
        but2.value = "hide";
        but1.value = "view";
        summary.style.display = "block";
    }
}


//edit profile


