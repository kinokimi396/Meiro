// 1. 変数の初期化
let A = [];

for(let i = 0; i < 20; i++){
    A[i] = []; 
    for(let j = 0; j < 20; j++){
        A[i][j] = 0;
    }
}

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
            }
        }
    }
}

// 3. 描画用関数の定義
function drawMaze(){
    const field = document.getElementById("field");
    field.innerHTML = ""; 

    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            const box = document.createElement("div");
            box.classList.add("box");
            if(A[i][j] === 1){
                box.classList.add("wall");
            }
            field.appendChild(box);
        }
    }
}

// 4. 実行
stick_make(20, 20);
drawMaze();