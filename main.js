
let A = [];


for(let i = 0; i < 100; i++){
    A[i] = []; 
    for(let j = 0; j < 100; j++){
        A[i][j] = 0;
    }
}
let playerRow = 0;
let playerCol = 0;

function stick_make(maxRow, maxCol){
    for(let i = 0; i < maxRow; i++){
        A[0][i] = 1;          // 上辺
        A[maxRow-1][i] = 1; // 下辺
        A[i][0] = 1;          // 左辺
        A[i][maxCol-1] = 1; // 右辺
    }

    const directions = [
        {r: -1, c: 0}, // 上
        {r: 0, c: 1},  // 右
        {r: 1, c: 0},  // 下
        {r: 0, c: -1}  // 左
    ];

    for(let row = 0; row < maxRow; row += 2){
        for(let col = 0; col < maxCol; col += 2){

            A[row][col] = 1; 

            let downloaded = false; 
            let count=0;

            while(!downloaded){
                let randomIdx = Math.floor(Math.random() * directions.length);
                let dir = directions[randomIdx];

               
                let targetRow = row + dir.r;
                let targetCol = col + dir.c;

                
                if (targetRow >= 0 && targetRow < maxRow && targetCol >= 0 && targetCol < maxCol) {
                    if(A[targetRow][targetCol] === 0){
                        A[targetRow][targetCol] = 1;
                        downloaded = true; 
                    }
                }
                count++;
                if(count>100){
                    break;
                }
            }
        }
    }
}

// 3. 描画用関数の定義
function drawMaze(startPosition = "random"){
    const field = document.getElementById("field");
    field.innerHTML = ""; 

    const maxRow = 100;
    const maxCol = 100;
    const corners = [
        {r: 1, c: 1},
        {r: 1, c: maxCol - 7},
        {r: maxRow - 7, c: 1},
        {r: maxRow - 7, c: maxCol - 7}
    ];

    let startCoord;
    if(startPosition === "random"){
        const randomIndex = Math.floor(Math.random() * corners.length);
        startCoord = corners[randomIndex];
    } else if(startPosition === "top-left"){
        startCoord = corners[0];
    } else if(startPosition === "top-right"){
        startCoord = corners[1];
    } else if(startPosition === "bottom-left"){
        startCoord = corners[2];
    } else if(startPosition === "bottom-right"){
        startCoord = corners[3];
    }

    currentStartCoord = startCoord;

    const remainingCorners = corners.filter(c => !(c.r === startCoord.r && c.c === startCoord.c));
    const goalCoord = remainingCorners[Math.floor(Math.random() * remainingCorners.length)];
    currentGoalCoord = goalCoord; 


    for(let i = goalCoord.r - 2; i <= goalCoord.r + 8; i++){
        for(let j = goalCoord.c - 2; j <= goalCoord.c + 8; j++){
            if(i >= 0 && i < maxRow && j >= 0 && j < maxCol){
                A[i][j] = 0; 
            }
        }
    }
    for(let i = goalCoord.r; i <= goalCoord.r + 7; i++){
        for(let j = goalCoord.c; j <= goalCoord.c + 7; j++){
                A[i][j] = 0; 
            }
        }

   
    playerRow = startCoord.r + 3;
    playerCol = startCoord.c + 3;

    for(let i = 0; i < maxRow; i++){
        for(let j = 0; j < maxCol; j++){
            const box = document.createElement("div");
            box.classList.add("box");
            if(A[i][j] === 1){
                box.classList.add("wall");
            }
            if(i >= startCoord.r && i < startCoord.r + 7 && j >= startCoord.c && j < startCoord.c + 7){
                box.classList.add("start");
            }
            if(i >= goalCoord.r && i < goalCoord.r + 7 && j >= goalCoord.c && j < goalCoord.c + 7){
                box.classList.add("goal");
            }
            if(i === playerRow && j === playerCol){
                box.classList.add("player");
            }
            field.appendChild(box);
        }
    }
}

document.addEventListener("keydown", function(event){
    let nextRow = playerRow;
    let nextCol = playerCol;

    if(event.key === "w" || event.key === "W"){
        nextRow--;
    }else if(event.key === "s" || event.key === "S"){
        nextRow++;
    }else if(event.key === "a" || event.key === "A"){
        nextCol--;
    }else if(event.key === "d" || event.key === "D"){
        nextCol++;
    }else{
        return;
    }
    if(nextRow >= 0 && nextRow < 100 && nextCol >= 0 && nextCol < 100 && A[nextRow][nextCol] === 0){
        if(A[nextRow][nextCol] === 0){
            playerRow = nextRow;
            playerCol = nextCol;

            redrawPlayer();

            if(playerRow >= currentGoalCoord.r && playerRow < currentGoalCoord.r + 7 && playerCol >= currentGoalCoord.c && playerCol < currentGoalCoord.c + 7){
                alert("ゴールおめでとうございます！");

                location.reload();
            }
        }
    }
});

function redrawPlayer(){
    const filed = document.getElementById("field");
    const boxes = filed.children;

    for(let i=0;i<100;i++){
        for(let j=0;j<100;j++){
            const index = i*100+j;
            const box = boxes[index];

            box.classList.remove("player");

            if(i == playerRow && j == playerCol){
                box.classList.add("player");
            }
        }
    }
}
stick_make(100, 100);
drawMaze("random");

playerRow = currentStartCoord.r;
playerCol = currentStartCoord.c;