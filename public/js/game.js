let offsetLeftGrid = -1;
let offsetRightGrid = -1;

window.addEventListener('click', (event) => {
    console.log(event.clientX, event.clientY);
});

window.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    console.log('Right click:', event.clientX, event.clientY);
});

window.onload = (event) => {
    const gridImage = document.getElementById('gridImage');
    let offsetLeftGrid = gridImage.offsetLeft;
    let offsetTopGrid = gridImage.offsetTop;
}