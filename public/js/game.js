let offsetLeftGrid = -1;
let offsetRightGrid = -1;
let height = -1;
let width = -1;
let remainingMunitions = -1;
let remainingAbilities = -1;
let playerLocation = [];
let enemies = [];
let fireButton;
let calculateButton;
let squareSize;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let gridMap;
let display;
let leftButton;
let rightButton;
let munitionsDisplay;
let canvas;
let gameBoard;
let ctx;

var leftIncreament;
var rightIncreament;

let updateMunitions;

function getExplosivePower() {
    let value = 0;
    document.querySelectorAll('input[name="explosive_strength"]').forEach(radio => {
        if (radio.checked === true) {
            value = radio.value;
        }
    });
    return value;
}

window.onload = async function() {
    leftButton = document.getElementById('bearing_button_left');
    rightButton = document.getElementById('bearing_button_right');
    display = document.getElementById('bearing_angle_display');
    gridMap = document.getElementById("gridImage");
    munitionsDisplay = document.getElementById("remaining_munitions");
    fireButton = document.getElementById('fire_button');
    minimizeFiringMenuButton = document.getElementById('minimize_firing_menu_button');
    minimizeCalculatorMenuButton = document.getElementById('minimize_calculator_menu_button');
    calculateButton = document.getElementById('calculate_button');
    canvas = document.getElementById('gameBoard');
    function toggleFiringMenu() {
        document.getElementById('firing_menu').classList.toggle('hidden');
        if (minimizeFiringMenuButton.innerText === '<') {
            minimizeFiringMenuButton.innerText = '>'
        }else{
            minimizeFiringMenuButton.innerText = '<'
        }
    }
    function toggleCalculator() {
        document.getElementById('calculating_form').classList.toggle('hidden');
        if (minimizeCalculatorMenuButton.innerText === '<') {
            minimizeCalculatorMenuButton.innerText = '>'
        }else{
            minimizeCalculatorMenuButton.innerText = '<'
        }
    }
    document.querySelectorAll('input[name="explosive_strength"]').forEach(radio => {
        radio.addEventListener('change', function () {
            getExplosivePower();
        });
    });
    minimizeFiringMenuButton.onclick = toggleFiringMenu;
    minimizeCalculatorMenuButton.onclick = toggleCalculator;
    offsetLeftGrid = gridMap.offsetLeft;
    offsetTopGrid = gridMap.offsetTop;
    height = gridMap.height;
    width = gridMap.width;
    squareSize = height/13;
    console.log("canvas: "+canvas)
    console.log(offsetLeftGrid)
    canvas.style.width = width+"px";
    canvas.style.height = height+"px";
    canvas.style.marginLeft = offsetLeftGrid+"px";
    canvas.style.marginTop = offsetTopGrid+"px";
    canvas.width = width;
    canvas.height = height;
    console.log(offsetLeftGrid, offsetTopGrid);
    await fetch("/level1")
        .then(response => response.json()).then(res => {
            remainingMunitions = res.start_munitions;
            remainingAbilities = res.ability_points;
            enemies = res.enemy_positions;
            playerLocation = res.player_location;
            updateMunitions = function () {
                munitionsDisplay.innerText = "Remaining Ammo: "+remainingMunitions;
            }
            updateMunitions();
        })
    gridMap.addEventListener('click', (event) => {
        event.preventDefault();

        console.log(event.clientX, event.clientY);
    });

    gridMap.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        console.log('Right click:', event.clientX, event.clientY);
    });
    const bearingAngle = document.getElementById('rotation')
    bearingAngle.onchange = (event) => {
        const bearing = event.target.value;
        display.innerText = "Bearing Angle: "+bearing;
    }
    calculateButton.onclick = (event) => {
        event.preventDefault();
        let currentExplosivePower = getExplosivePower();
        console.log(currentExplosivePower)
        let explosive_force = 0;
        let distance = parseInt(document.getElementById('distance_input').value);
        let gravity = 9.8
        switch(currentExplosivePower) {
            case '1':
                explosive_force = 40;
                break;
            case '2':
                explosive_force = 60;
                break;
            case '3':
                explosive_force = 90;
                break;
            case '4':
                explosive_force = 120;
                break;
            case '5':
                explosive_force = 160;
                break;
        }
        let angle = Math.asin((distance*gravity) / (explosive_force*explosive_force))/2;
        angle = angle * (180/Math.PI);
        console.log(angle)
        document.getElementById('calculated_angle_output').innerText = "Calculated Angle Trajectory: "+angle.toFixed(2);
    }
    leftButton.onclick = (event) => {
        event.preventDefault();
    }
    leftButton.onmouseleave = (event) => {
        event.preventDefault();
        clearInterval(increamentLeft)
    }
    rightButton.onclick = (event) => {
        event.preventDefault();
    }
    rightButton.onmouseleave = (event) => {
        event.preventDefault();
        clearInterval(increamentRight)
    }
    leftButton.onmousedown = (event) => {
        event.preventDefault();
        increamentLeft = setInterval(function() {
            let bearing = parseFloat(bearingAngle.value)
            if (bearingAngle.value > 0) {
                bearingAngle.value = bearing-0.01;
                display.innerText = "Bearing Angle: "+bearingAngle.value;
            }
        }, 2);
    }
    leftButton.onmouseup = (event) => {
        event.preventDefault();
        clearInterval(increamentLeft)
    }
    rightButton.onmousedown = (event) => {
        event.preventDefault();
        console.log("Mouse Down")
        increamentRight = setInterval(function() {
            let bearing = parseFloat(bearingAngle.value)
            if (bearingAngle.value < 360) {
                bearingAngle.value = bearing+0.01;
                display.innerText = "Bearing Angle: "+bearingAngle.value;
            }
        }, 2);
    }
    rightButton.onmouseup = (event) => {
        event.preventDefault();
        console.log("Mouse Up")
        clearInterval(increamentRight)
    }
    gameBoard = document.getElementById('gameBoard');
    ctx = canvas.getContext('2d');
    function renderPlayerLocation() {
        let x = playerLocation[0];
        let y = playerLocation[1];
        ctx.beginPath();
        console.log(squareSize);
        ctx.arc(
            (squareSize*x)+(squareSize/2),           // center X
            (squareSize*y)+(squareSize/2),           // center Y
            (squareSize/2),       // radius
            0,            // starting angle
            Math.PI * 2   // ending angle
        );
        ctx.fillStyle = 'deepskyblue'; // Fill color
        ctx.fill();
    }
    const fire = async function( event ) {
        // stop form submission from trying to load
        // a new .html page for displaying results...
        // this was the original browser behavior and still
        // remains to this day
        event.preventDefault()

        if (remainingMunitions === 0) {
            event.target.style.backgroundColor = 'red';
        }else{
            remainingMunitions-=1
            updateMunitions();
            const explosivePower = getExplosivePower();
            const bearing = bearingAngle.value;
            const x = playerLocation[0];
            const y = playerLocation[1];
            const json = { explosivePower, bearing, x, y, squareSize};
            const body = JSON.stringify( json );
            let landX;
            let landY;
            let data;
            const response = await fetch( '/attack', {
                method:'POST',
                body
            })
            const res = await response.json();
            landX = res.newX;
            landY = res.newY;
            data = res.data;
            ctx.beginPath();
            console.log(squareSize);
            ctx.arc(
                landX,           // center X
                landY,           // center Y
                (squareSize/2),       // radius
                0,            // starting angle
                Math.PI * 2   // ending angle
            );
            ctx.fillStyle = 'red'; // Fill color
            ctx.fill();
            console.log(data);
            document.getElementById('shots_display').innerHTML = "";
            for (const entry of data) {
                const li = document.createElement("li");
                li.innerHTML = JSON.stringify(entry);
                document.getElementById('shots_display').appendChild(li);
            }
        }
    }
    fireButton.onclick = fire;
    renderPlayerLocation();
}

window.onresize = (event) => {
    const gridImage = document.getElementById('gridImage');
    offsetLeftGrid = gridImage.offsetLeft;
    offsetTopGrid = gridImage.offsetTop;
    height = gridImage.height;
    width = gridImage.width;
    squareSize = height/13;
    canvas.width = width;
    canvas.height = height;
    canvas.marginLeft = offsetLeftGrid;
    canvas.marginTop = offsetTopGrid;
    console.log(offsetLeftGrid, offsetTopGrid);
}

document.querySelectorAll('input[name="explosive_strength"]').forEach(radio => {
    radio.addEventListener('click', function () {
        console.log(clicked)

        if (this.dataset.waschecked === 'true') {
            this.checked = false;
            this.dataset.waschecked = 'false';
        } else {
            this.dataset.waschecked = 'true';
        }

        document.querySelectorAll('input[name="explosive_strength"]').forEach(other => {
            if (other !== this) {
                other.dataset.waschecked = 'false';
            }
        });
    });
});