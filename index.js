var firebaseConfig = {
    apiKey: "AIzaSyDTPu_2Xx9GP_dNT_6Z_A-ZCO2cQXOm18M",
    authDomain: "maze-46199.firebaseapp.com",
    databaseURL: "https://maze-46199.firebaseio.com",
    storageBucket: "maze-46199.appspot.com",
    projectId: "maze-46199",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let mazeLoaded = false;

const mazeList = document.getElementById('mazeList');

let maze = 
    [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];

auth.onAuthStateChanged(user => {
    if (user) {
        let mazeContainerHeight = 50;
                
        function renderMaze(doc) {

            if (doc.id != user.uid) {
                mazeContainerHeight += 50;

                document.getElementById('mazeContainer').style.height = mazeContainerHeight;

                let button = document.createElement('button');
                let name = document.createElement('span');
                let cross = document.createElement('div');

                button.setAttribute('data-id', doc.id);
                name.textContent = doc.data().name;
                cross.textContent = 'x';

                button.appendChild(name);
                button.appendChild(cross);
                mazeList.appendChild(button);

                button.addEventListener('click' , (e) => {
                    mazeLoaded = true;

                    e.stopPropagation;

                    let chunks = [];
                    let mazeSingleArray = doc.data().layout;

                    mazeSingleArray.forEach((item) => {
                        if(!chunks.length || chunks[chunks.length-1].length == 66)
                        chunks.push([]);

                        chunks[chunks.length-1].push(item);
                    })

                    maze = chunks;
                        
                    for (row = 0 ; row < height + 1  ; row++) {
                        for (col = 0 ; col < width + 1 ; col++) {
                
                            if (maze[row][col] == '*') {
                                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                                    blockRef.setAttribute('stroke' , 'black');
                                    blockRef.setAttribute('height' , size);
                                    blockRef.setAttribute('width' , size);
                                    blockRef.setAttribute('x' , col * size);
                                    blockRef.setAttribute('y' , row * size);
                                    blockRef.setAttribute('fill' , colors[maze[row][col]]);
                                canvas.appendChild(blockRef);   
                            }
                            if (maze[row][col] == ' ') {
                                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                                    blockRef.setAttribute('stroke' , 'grey')  ; 
                                    blockRef.setAttribute('height' , size);
                                    blockRef.setAttribute('width' , size);
                                    blockRef.setAttribute('x' , col * size);
                                    blockRef.setAttribute('y' , row * size);
                                    blockRef.setAttribute('fill' , colors[maze[row][col]]);
                                canvas.appendChild(blockRef);   
                            }
                            if (maze[row][col] == 's' || maze[row][col] == 'e') {
                                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                                    blockRef.setAttribute('stroke' , 'grey'); 
                                    blockRef.setAttribute('height' , size);
                                    blockRef.setAttribute('width' , size);
                                    blockRef.setAttribute('x' , col * size);
                                    blockRef.setAttribute('y' , row * size);
                                    blockRef.setAttribute('fill' , colors[maze[row][col]]);
                                canvas.appendChild(blockRef);   
                            }
                        }
                    }
                    
                    document.getElementById('mazeContainer').style.visibility = 'hidden';
                    console.log(chunks)
                });
                cross.addEventListener('click' , (e) => {
                    e.stopPropagation();
                    let id = e.target.parentElement.getAttribute('data-id');
                    name.textContent = 'deleted';
                    db.collection(user.uid).doc(id).delete();
                });
            }
        }
        db.collection(user.uid).get().then(function(snapshot) {
            document.getElementById('nothing').style.visibility = 'hidden';

            snapshot.forEach(function(doc) {
                renderMaze(doc);
                console.log(doc.id, " => ", doc.data());
            });
        });    
    }
    else {
        window.location.href = "http://127.0.0.1:5500/LogIn.html";
    }
});


//
//  DRAWING MAZE -------------------------------------------
//


let template = document.getElementById('app');



maze[12][20] = 's';
maze[12][35] = 'e';

let colors = {
    '*' : 'black',
    ' ' : 'white',
    's' : '#33cc33',
    'e' : '#ff0000',
    'x' : 'yellow',
    'y' : 'pink'
};

let size = 20;

let height = 28;
let width = 55;

let canvas = document.createElementNS('http://www.w3.org/2000/svg' , 'svg');

canvas.setAttribute('width' , width*size);
canvas.setAttribute('height' , height*size);

let appendElement = (canvas , node , maze) => {

    let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect')
		blockRef.setAttribute('stroke' , 'grey')
		blockRef.setAttribute('height' , size);
        blockRef.setAttribute('width' , size);
        blockRef.setAttribute('x' , node.x*size);
        blockRef.setAttribute('y' , node.y*size);
        blockRef.setAttribute('fill' , colors[maze[node.y][node.x]]);  
    canvas.appendChild(blockRef);
}

maze.map((row , y) => {
    row.map((col , x) => {
        appendElement(canvas , {x , y} , maze);
    })
});

template.appendChild(canvas);


//
// BUTTONS ONCLICK -----------------------------------
//


let adding = false;
let removing = false;

let generating = false;
let playing = false;

let start = false;
let exit = false;

function pickStart() {
    adding = false;
    removing = false;
    generating = false;
    playing = false;
    start = true;
    exit = false;

    document.getElementById('pickStart').style.backgroundColor = '#067D88';
    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('clearPath').style.backgroundColor = '#EBEE00';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';
}
function pickExit() {
    adding = false;
    removing = false;
    generating = false;
    playing = false;
    start = false;
    exit = true;

    document.getElementById('pickExit').style.backgroundColor = '#067D88';
    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('clearPath').style.backgroundColor = '#EBEE00';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
}
function add() {
    adding = true;
    removing = false;
    generating = false;
    playing = false;
    start = false;
    exit = false;

    document.getElementById('add').style.backgroundColor = '#067D88';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').onmouseover = ''
    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('clearPath').style.backgroundColor = '#EBEE00';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';
}
function remove() {
    adding = false;
    removing = true;
    generating = false;
    playing = false;
    start = false;
    exit = false;

    document.getElementById('remove').style.backgroundColor = '#067D88';
    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('clearPath').style.backgroundColor = '#EBEE00';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';
}
function clearWalls() {
    adding = false;
    removing = false;
    generating = false;
    playing = false;
    start = false;
    exit = false;

    for (row = 0 ; row < height + 1  ; row++) {
        for (col = 0 ; col < width + 1 ; col++) {

            if (maze[row][col] == '*' || maze[row][col] == ' ') {
                maze[row][col] = ' ';

                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                    blockRef.setAttribute('stroke' , 'grey')   
                    blockRef.setAttribute('height' , size);
                    blockRef.setAttribute('width' , size);
                    blockRef.setAttribute('x' , col * size);
                    blockRef.setAttribute('y' , row * size)
                    blockRef.setAttribute('fill' , colors[maze[row][col]]);
                canvas.appendChild(blockRef);   
            }
        }
    }

    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('clearPath').style.backgroundColor = '#EBEE00';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';
}
function clearPath() {
    document.getElementById('clearPath').style.visibility = 'hidden';

    document.getElementById('add').disabled = false;
    document.getElementById('remove').disabled = false;
    document.getElementById('pickStart').disabled = false;
    document.getElementById('pickExit').disabled = false;
    document.getElementById('upload').disabled = false;
    document.getElementById('load').disabled = false;

    adding = false;
    removing = false;
    generating = false;
    playing = false;
    start = false;
    exit = false;

    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('clearWalls').style.backgroundColor = '#F50000';
    document.getElementById('play').style.backgroundColor = '#20E225';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';

    for (r = 0 ; r < height ; r++) {
        for (c = 0 ; c < width ; c++) {
        
            if (maze[r][c] == 'x' || maze[r][c] == 'y') {
                maze[r][c] = ' ';
                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                    blockRef.setAttribute('stroke' , 'grey')   
                    blockRef.setAttribute('height' , size);
                    blockRef.setAttribute('width' , size);
                    blockRef.setAttribute('x' , c * size);
                    blockRef.setAttribute('y' , r * size)
                    blockRef.setAttribute('fill' , colors[maze[r][c]]);
                canvas.appendChild(blockRef);   
            }
        }
    }   
}
function upload() {
    document.getElementById('nothing').style.visibility = 'hidden';

    document.getElementById('play').disabled = true;

    document.getElementById('text').style.visibility = 'visible';
    document.getElementById('text').innerHTML = 'UPLOAD';

    document.getElementById('shape').style.visibility = 'visible';
    document.getElementById('mazeContainer').style.visibility = 'hidden';

    document.getElementById('name').value = '';
}
function load() {
    document.getElementById('nothing').style.visibility = 'hidden';
    document.getElementById('text').style.visibility = 'hidden';

    document.getElementById('shape').style.visibility = 'hidden';
    document.getElementById('mazeContainer').style.visibility = 'visible';

auth.onAuthStateChanged(user => {
    db.collection(user.uid).get().then(function(snapshot) {
        if (snapshot.size == 1) {
            document.getElementById('nothing').style.visibility = 'visible';
        }
    });    
});
}

function x() {
    document.getElementById('play').disabled = false;

    document.getElementById('shape').style.visibility = 'hidden';
    document.getElementById('text').style.visibility = 'hidden';
    document.getElementById('spinner').style.visibility = 'hidden';
}
function x2() {
    document.getElementById('nothing').style.visibility = 'hidden';

    document.getElementById('mazeContainer').style.visibility = 'hidden';
    document.getElementById('text').style.visibility = 'hidden';
    document.getElementById('spinner').style.visibility = 'hidden';
}



//
//  PICKING POSITIONS -------------------------------------------
//

let mergedMaze;

let colX;
let rowY;

function pickPosition(event) {

    clickX = event.offsetX;
    clickY = event.offsetY;
    
    colX = Math.floor(clickX / size);
    rowY = Math.floor(clickY / size);

    if (start) {
        for (row = 0 ; row < height + 1  ; row++) {
            for (col = 0 ; col < width + 1 ; col++) {
    
                if (maze[row][col] == 's') {
                    maze[row][col] = ' ';

                    let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                        blockRef.setAttribute('stroke' , 'grey')   
                        blockRef.setAttribute('height' , size);
                        blockRef.setAttribute('width' , size);
                        blockRef.setAttribute('x' , col * size);
                        blockRef.setAttribute('y' , row * size)
                        blockRef.setAttribute('fill' , colors[maze[row][col]]);
                    canvas.appendChild(blockRef);   
                }
            }
        }

        maze[rowY][colX] = 's';

        let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
            blockRef.setAttribute('stroke' , 'grey')   
            blockRef.setAttribute('height' , size);
            blockRef.setAttribute('width' , size);
            blockRef.setAttribute('x' , colX * size);
            blockRef.setAttribute('y' , rowY * size)
            blockRef.setAttribute('fill' , colors[maze[rowY][colX]]);
        canvas.appendChild(blockRef);  

        maze[row][col] = ' ';
    }
    if (exit) {
        for (row = 0 ; row < height + 1  ; row++) {
            for (col = 0 ; col < width + 1 ; col++) {
    
                if (maze[row][col] == 'e') {
                    maze[row][col] = ' ';

                    let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                        blockRef.setAttribute('stroke' , 'grey')   
                        blockRef.setAttribute('height' , size);
                        blockRef.setAttribute('width' , size);
                        blockRef.setAttribute('x' , col * size);
                        blockRef.setAttribute('y' , row * size)
                        blockRef.setAttribute('fill' , colors[maze[row][col]]);
                    canvas.appendChild(blockRef);   
                }
            }
        }

        maze[rowY][colX] = 'e';

        let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
            blockRef.setAttribute('stroke' , 'grey')   
            blockRef.setAttribute('height' , size);
            blockRef.setAttribute('width' , size);
            blockRef.setAttribute('x' , colX * size);
            blockRef.setAttribute('y' , rowY * size)
            blockRef.setAttribute('fill' , colors[maze[rowY][colX]]);
        canvas.appendChild(blockRef);   

    }

    if (adding && maze[rowY][colX] != 's' && maze[rowY][colX] != 'e') {    
        maze[rowY][colX] = '*';

        let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');    
            blockRef.setAttribute('stroke' , 'black')   
            blockRef.setAttribute('height' , size);
            blockRef.setAttribute('width' , size);
            blockRef.setAttribute('x' , colX * size);
            blockRef.setAttribute('y' , rowY * size)
            blockRef.setAttribute('fill' , colors[maze[rowY][colX]]);
        canvas.appendChild(blockRef);   
    }
    if (removing  && maze[rowY][colX] != 's' && maze[rowY][colX] != 'e') {
        maze[rowY][colX] = ' '; 
    
        let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
            blockRef.setAttribute('stroke' , 'grey')   
            blockRef.setAttribute('height' , size);
            blockRef.setAttribute('width' , size);
            blockRef.setAttribute('x' , colX * size);
            blockRef.setAttribute('y' , rowY * size)
            blockRef.setAttribute('fill' , colors[maze[rowY][colX]]);
        canvas.appendChild(blockRef);   
            
    }
    mergedMaze = maze.flat(1);
}

function mouseDown() {
    canvas.onmousemove = pickPosition;
}
function mouseUp() {
    canvas.onmousemove = null;
}


//
// FIREBASE SAVING DATA ----------------------------------------
//


function addMaze() {
    console.log(mergedMaze)
    console.log(maze);

    document.getElementById('text').style.visibility = 'hidden';
    document.getElementById('spinner').style.visibility = 'visible';

    auth.onAuthStateChanged((user) => {
        if (mergedMaze !== undefined) {
            document.getElementById('text').innerHTML = 'ADDED SUCCESSFULY'

            setTimeout(() => {
                document.getElementById('text').style.visibility = 'hidden';
                document.getElementById('shape').style.visibility = 'hidden';
            } , 1000);

            document.getElementById('text').style.visibility = 'visible';
            document.getElementById('spinner').style.visibility = 'hidden';    
    
            if (user) {
                db.collection(user.uid).doc(document.getElementById('name').value).set({
                    layout: mergedMaze,
                    name: document.getElementById('name').value
                });
            }
        }
        if (mergedMaze === undefined) {
            document.getElementById('text').style.visibility = 'visible';
            document.getElementById('spinner').style.visibility = 'hidden';    

            alert("You can't upload the maze when it is blank. Draw a wall.")
        }
    });
}

//
//  BFS ------------------------------------------
//


function play() {
    document.getElementById('add').disabled = true;
    document.getElementById('remove').disabled = true;
    document.getElementById('pickStart').disabled = true;
    document.getElementById('pickExit').disabled = true;
    document.getElementById('upload').disabled = true;
    document.getElementById('load').disabled = true;

    document.getElementById('clearPath').style.visibility = 'visible';

    document.getElementById('add').style.backgroundColor = '#08C7D8';
    document.getElementById('remove').style.backgroundColor = '#08C7D8';
    document.getElementById('pickStart').style.backgroundColor = '#08C7D8';
    document.getElementById('pickExit').style.backgroundColor = '#08C7D8';

    adding = false;
    removing = false;
    start = false;
    exit = false;
    playing = true;

    let exitFound = false;

    let startPos;

    for (r = 0 ; r < height ; r++) {
        for (c = 0 ; c < width ; c++) {

            if (maze[r][c] === 's') {
                startPos = {row:r , col:c , path: []}
            }
        }
    }

    let queue = [];

    algorithm(maze);

    function algorithm() {
        queue.push(startPos);

        while (queue.length > 0) {
            let pos = queue.shift();
            
                addNode({row: pos.row + 1 , col: pos.col , path: pos.path});
                addNode({row: pos.row - 1 , col: pos.col , path: pos.path});
                addNode({row: pos.row , col: pos.col + 1 , path: pos.path});
                addNode({row: pos.row , col: pos.col - 1 , path: pos.path});
            

            if (exitFound) {
                printPath(pos);

                for(r = 0 ; r < height ; r++) {
                    for(c = 0 ; c < height ; c++) {

                        if (maze[r][c]== 'x') {
                            setInterval (() => {
                                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                                    blockRef.setAttribute('stroke' , 'grey')   
                                    blockRef.setAttribute('height' , size);
                                    blockRef.setAttribute('width' , size);
                                    blockRef.setAttribute('x' , c * size);
                                    blockRef.setAttribute('y' , r * size)
                                    blockRef.setAttribute('fill' , colors[maze[r][c]]);
                                canvas.appendChild(blockRef);
                            } , 50);
                        }  
                
                    }
                }
                break;
            }
        }
    }
    function addNode(pos) {

        if (pos.row < 0 || pos.col < 0 || pos.row >= maze.length-4 || pos.col >= maze[0].length) {
            return;
        }

        if (maze[pos.row][pos.col] == 'e') {
            exitFound = true;   
        }
        if (maze[pos.row][pos.col] === ' ') {                
            let newPath = pos.path.slice();
            newPath.push({row: pos.row, col: pos.col});
            queue.push({row: pos.row, col: pos.col, path: newPath});

            maze[pos.row][pos.col] = 'y';

            setTimeout(() => {

                let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect');
                    blockRef.setAttribute('stroke' , 'grey')   
                    blockRef.setAttribute('height' , size);
                    blockRef.setAttribute('width' , size);
                    blockRef.setAttribute('x' , pos.col * size);
                    blockRef.setAttribute('y' , pos.row * size)
                    blockRef.setAttribute('fill' , colors[maze[pos.row][pos.col]]);
                canvas.appendChild(blockRef);   
            },50);
        }
    }
}

function printPath(pos) {
    let path = pos.path;

    path.forEach(node => {
        maze[node.row][node.col] = 'x';
    });
}










