const A = [];

for(let i = 0; i < 20; i++){
    A[i] = []; // ← これを忘れるとエラーになります！
    for(let j = 0; j < 20; j++){
        A[i][j] = 0;
    }
}

// 迷路生成関数を呼び出す
stick_make(20, 20);

// 確認用
console.log(A);