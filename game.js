//var board =Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
var tableId = Array(Array("00", "01", "02", "03"), Array("10", "11", "12", "13"), Array("20", "21", "22", "23"), Array("30", "31", "32", "33"));

var board = [];
for (var i = 0; i < 4; i++) {
    board[i] = [];
    for (var j = 0; j < 4; j++) {
        board[i][j] = {};
    }
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    for (var i = 0; i < 2; i++) {
        var rand = parseInt(Math.random() * 16);
        var y = parseInt(rand / 4)
        var x = parseInt(rand % 4)
        console.log(y, x)
        if (board[y][x] == 0) {

            board[y][x] = 2;

        } else i--;
    }

    update();
}


function newCard(){
    var rand = parseInt(Math.random() * 16);
    var y = parseInt(rand / 4)
    var x = parseInt(rand % 4)
    
    if (board[y][x] == 0) {

        board[y][x] = 2;

    }
 
    update();
    

}


function update() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = document.getElementById(tableId[i][j])
            cell.innerHTML = board[i][j] == 0 ? 0 : board[i][j]
        }
    }

}


init();


function moveTile() {
    var check = false;
    var isPlused = [];
    for (var i = 0; i < 4; i++) {
        isPlused[i] = [];
        for (var j = 0; j < 4; j++) {
            isPlused[i][j] = {};
        }
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            isPlused[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) continue;
            var tempY = i - 1;
            console.log(tempY, i)
            if(i==0) continue;
            while (tempY > 0 && board[tempY][j] == 0) tempY--;

            if (board[tempY][j] == 0) {

                board[tempY][j] = board[i][j]
                board[i][j] = 0
                check=true;

            } else if (board[tempY][j] != board[i][j]) {
                if (tempY+1 == i) continue;
                board[tempY + 1][j] = board[i][j];
                board[i][j] = 0;
                check=true;
            } else {
                if (isPlused[tempY][j] == 0) {
                    board[tempY][j] *= 2;
                    board[i][j] = 0;
                    isPlused[tempY][j] = 1;
                    check=true;
                } else {
                    board[tempY + 1][j] = board[i][j]
                    board[i][j] = 0;
                    check=true;
                }
            }



        }
    }
    if(check){

        newCard();
    }
    update();
}

function directionBoard(n){

    while(n--){

        var tempBoard = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
    
        for(var i=0; i<4; i++)
            for(var j=0; j<4; j++)
            tempBoard[i][j] =board[i][j];
        for(var i=0; i<4; i++)
            for(var j=0; j<4; j++)
                board[j][3-i] = tempBoard[i][j];
    }
}

function dirMove(op){
    switch(op){
        case 0:   moveTile(); break;
        case 1:  directionBoard(2);moveTile();directionBoard(2); break;
        case 2:  directionBoard(1);moveTile();directionBoard(3); break;
        case 3: directionBoard(3);moveTile();directionBoard(1); break;
    }
    update();
}

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 39: //오른쪽
        // dirMove(3)
        directionBoard(3);moveTile();directionBoard(1);
       
        break;
        case 37: //왼쪽
        // dirMove(2)
        directionBoard(1);moveTile();directionBoard(3);
            break;
        case 40: //아래
        // dirMove(1)
        directionBoard(2);moveTile();directionBoard(2);
            break;
        case 38: //위
        moveTile();
            // dirMove(0)
            break;

    }
    update();
});

