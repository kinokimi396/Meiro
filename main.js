// 1. 変数の初期化
let A = [];


for(let i = 0; i < 100; i++){
    A[i] = []; 
    for(let j = 0; j < 100; j++){
        A[i][j] = 0;
    }
}
let playerRow = 0;
let playerCol = 0;
// 2. 迷路のアルゴリズム（関数）の定義
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

            A[row][col] = 1; // 柱を立てる

            let downloaded = false; 
            let count=0;

            while(!downloaded){
                let randomIdx = Math.floor(Math.random() * directions.length);
                let dir = directions[randomIdx];

                // ※ row === 2 のときの判定はお好みで調整してください
                let targetRow = row + dir.r;
                let targetCol = col + dir.c;

                // 範囲内チェックを入れて安全に壁を伸ばす
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
        {r:1,c:1},
        {r:1,c:maxCol-7},
        {r:maxRow-7,c:1},
        {r:maxRow-7,c:maxCol-7}
    ];

    let startCoord;
    if(startPosition === "random"){
        const randomIndex = Math.floor(Math.random()*corners.length);
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

    const remainingCorners = corners.filter(c => !(c.r === startCoord.r && c.c === startCoord.c));
    const goalCoord = remainingCorners[Math.floor(Math.random()*remainingCorners.length)];

    for(let i=goalCoord.r; i<goalCoord.r+7; i++){
        for(let j=goalCoord.c; j<goalCoord.c+7; j++){
            A[i][j] = 0; 
        }
    }

    playerRow = startCoord.r;
    playerCol = startCoord.c;

    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 100; j++){
            const box = document.createElement("div");
            box.classList.add("box");
            if(A[i][j] === 1){
                box.classList.add("wall");
            }
            if(i >= startCoord.r && i<startCoord.r + 7 && j>=startCoord.c && j<startCoord.c + 7){
                box.classList.add("start");
            }
            if(i >= goalCoord.r && i < goalCoord.r + 7 && j>=goalCoord.c && j < goalCoord.c + 7){
                box.classList.add("goal");
            }
            if(i === playerRow && j === playerCol){
                box.classList.add("player");
            }
            field.appendChild(box);
        }
    }
}
// 4. 実行
stick_make(100, 100);
drawMaze("random");