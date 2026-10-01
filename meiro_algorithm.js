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

                if(row === 2 && dir.r === -1){
                    continue; // 上方向に倒すのを避ける
                }

                let targetRow = row + dir.r;
                let targetCol = col + dir.c;

                if(A[targetRow][targetCol] === 0){
                    A[targetRow][targetCol] = 1;
                    downloaded = true; 
                }
            }
        }
    }
}