let offsetLeftGrid = -1;
let offsetRightGrid = -1;
let height = -1;
let width = -1;

window.addEventListener('click', (event) => {
    console.log(event.clientX, event.clientY);

});

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    console.log('Right click:', event.clientX, event.clientY);
});

window.onload = (event) => {
    const gridImage = document.getElementById('gridImage');
    offsetLeftGrid = gridImage.offsetLeft;
    offsetTopGrid = gridImage.offsetTop;
    height = gridImage.height;
    width = gridImage.width;
    console.log(offsetLeftGrid, offsetTopGrid);
}

window.onresize = (event) => {
    const gridImage = document.getElementById('gridImage');
    offsetLeftGrid = gridImage.offsetLeft;
    offsetTopGrid = gridImage.offsetTop;
    height = gridImage.height;
    width = gridImage.width;
    console.log(offsetLeftGrid, offsetTopGrid);
}