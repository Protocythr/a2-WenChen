let offsetLeftGrid = -1;
let offsetRightGrid = -1;
let height = -1;
let width = -1;

let gridMap;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let display;
let leftButton;
let rightButton;

var leftIncreament;
var rightIncreament;

window.onload = (event) => {
    leftButton = document.getElementById('bearing_button_left');
    rightButton = document.getElementById('bearing_button_right');
    display = document.getElementById('bearing_angle_display');
    gridMap = document.getElementById("gridImage");
    offsetLeftGrid = gridMap.offsetLeft;
    offsetTopGrid = gridMap.offsetTop;
    height = gridMap.height;
    width = gridMap.width;
    console.log(offsetLeftGrid, offsetTopGrid);
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
    leftButton.onclick = (event) => {
        event.preventDefault();
    }
    rightButton.onclick = (event) => {
        event.preventDefault();
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
}

window.onresize = (event) => {
    const gridImage = document.getElementById('gridImage');
    offsetLeftGrid = gridImage.offsetLeft;
    offsetTopGrid = gridImage.offsetTop;
    height = gridImage.height;
    width = gridImage.width;
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