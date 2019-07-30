const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const rectBtn = document.getElementById("rectBtn");
const circleBtn = document.getElementById("circleBtn");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let rect = false;
let circle = false;

let bx = null;
let by = null;

// 그리기 정지
function stopPainting(event){
    painting = false;
    if(rect){
        ctx.strokeRect(bx, by, Math.abs(bx-event.offsetX), Math.abs(by-event.offsetY));
        handleRectClick();
    }
    if(circle){
        var a = Math.sqrt(Math.pow(bx-event.offsetX,2)+Math.pow(by-event.offsetY,2));
        ctx.arc(bx, by, a, 0, 2 * Math.PI);
        ctx.stroke();
        handleCircleClick();
    }
}
// 그리기 시작
function startPainting(event){
    painting = true;
    if(rect || circle){
        painting = false;
        bx = event.offsetX;
        by = event.offsetY;
        console.log(bx, by);
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    console.log(event);
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    // 아래와 같이 작성하면 .jpeg 파일로 저장합니다.
    // const image = canvas.toDataURL("image/jpeg");
    // 아래와 같이 작성하면 default로 .png 파일로 만듭니다.
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click(); 
}

function handleRectClick(event){
    console.log(event);
    if(rect === true){
        rect = false;
        rectBtn.innerText = "Rect";
    }else{
        rect = true;
        filling = false;
        rectBtn.innerText = "Active Rect";
    }
}

function handleCircleClick(event){
    console.log(event);
    if(circle === true){
        circle = false;
        circleBtn.innerText = "Circle";
    }else{
        circle = true;
        filling = false;
        circleBtn.innerText = "Active Cir";
    }
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(rectBtn){
    rectBtn.addEventListener("click", handleRectClick);
}

if(circleBtn){
    circleBtn.addEventListener("click", handleCircleClick);
}