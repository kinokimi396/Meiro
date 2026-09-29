function stick_make(maxRow, maxCol){
    // 1. 外周を壁(1)にする
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

    // 2. 偶数マスごとに柱を立てて倒す
    for(let row = 0; row < maxRow; row += 2){
        for(let col = 0; col < maxCol; col += 2){

            A[row][col] = 1; // 柱を立てる

            let downloaded = false; // 倒せるまで繰り返すためのフラグ

            while(!downloaded){
                let randomIdx = Math.floor(Math.random() * directions.length);
                let dir = directions[randomIdx];

                // ルール：2行目以降（row >= 2）は「上（r: -1）」に倒してはいけない
                if(row === 2 && dir.r === -1){
                    continue; // もう一度別の方向を選ぶ
                }

                let targetRow = row + dir.r;
                let targetCol = col + dir.c;

                // 倒す先が通路(0)であれば壁を倒す
                if(A[targetRow][targetCol] === 0){
                    A[targetRow][targetCol] = 1;
                    downloaded = true; // 倒せたのでループを抜け出す
                }
            }
        }
    }
}