//!: 함수오류 & 축하메시지  (F부분 부터)
////: 게임종료 구현 (시간, COUNT(최종 배열의 길이))
////: 게임완성 시 축하메시지
////: 큐브 믹스 기능 추가

console.log("linked")

const printArea = document.querySelector(".printCube");
const topFace = printArea.querySelector(".top");
const leftSide = printArea.querySelector(".left");
const frontSide = printArea.querySelector(".front");
const rightSide = printArea.querySelector(".right");
const backSide = printArea.querySelector(".back");
const bottom = printArea.querySelector(".bottom");
const orderedList = [];
const nextOrder = [];
const time = [];
const colors=['B','W','O','G','Y','R'];

const arr =[[],[],[],[],[],[]];
const empty=[[],[],[],[],[],[]];
for (i=0; i<6; i++){
    let j = 0;
    while (j<3){
        empty[i].push(colors[i]);
        j++;
    }

    let k =0;
    while (k<3){
        arr[i].unshift(empty[i]);
        k++;
    }
}

const perfect_arr =[[],[],[],[],[],[]];
const perfect_empty=[[],[],[],[],[],[]];
for (i=0; i<6; i++){
    let j = 0;
    while (j<3){
        perfect_empty[i].push(colors[i]);
        j++;
    }

    let k =0;
    while (k<3){
        perfect_arr[i].unshift(empty[i]);
        k++;
    }
}




function quit(s){
    console.log(s);

    const orderCount = (orderedList.concat(nextOrder)).length;
    
    const endTime = (String(time[1]).split(" ")[4]).split(":");
    const startTime = (String(time[0]).split(" ")[4]).split(":");
    const elapsedHour = Number(endTime[0])-Number(startTime[0]);
    const elapsedMinute = Number(endTime[1])-Number(startTime[1]);
    const elapsedSeconds = Number(endTime[2])-Number(startTime[2]);

    const interval = `${elapsedHour}:${elapsedMinute}:${elapsedSeconds}`;
    
    if (s===1){
    alert ('축하합니다. 큐브를 완성했어요🤩✨\n\n'
            +'report▶\n\n조작갯수___'+orderCount+"\n게임시간___"+interval);
    } else {
    confirm('게임을 종료하시겠습니까?')
    ? alert('report▶\n\n조작갯수___'+orderCount+"\n게임시간___"+interval+"\n\n더욱 분발하세요!🤨")
    : pass;
    }
    window.location.reload();
}

function ctrlZ(){
    const currIndex = orderedList.length-1;
    const status = orderedList[currIndex];
    nextOrder.unshift(orderedList.pop());
    console.log(orderedList, nextOrder);
    performOrder(status[0], status[1] ? repeat=1 : repeat=3);
    orderedList.pop()
    
    console.log(orderedList, nextOrder);
}

function ctrlY(){
    console.log(orderedList, nextOrder);
    const status = nextOrder.shift();
    performOrder(status[0], status[1] ? repeat=3 : repeat=1);
}

function linkedFace(arr, n){
    target = arr[n][0][0];
    arr[n][0][0] = arr[n][2][0];
    arr[n][1][0] = arr[n][2][1];
    arr[n][2][0] = arr[n][2][2];
    arr[n][2][1] = arr[n][1][2];
    arr[n][2][2] = arr[n][0][2];
    arr[n][1][2] = arr[n][0][1];
    arr[n][1][2] = target;
};

//!FB오류
function performOrder(order, repeat){
    console.log(order);

    const orderList = {
        U(){
            target = arr[2][0];
            arr[2][0] = arr[3][0];
            arr[3][0] = arr[4][0];
            arr[4][0] = arr[1][0];
            arr[1][0] = target;
            linkedFace(arr, 0);
        },
        D(){
            target = arr[2][2];
            arr[2][2] = arr[1][2];
            arr[1][2] = arr[4][2];
            arr[4][2] = arr[3][2];
            arr[3][2] = target;
            linkedFace(arr, 5);
        },
        R(){
            target = arr[2][0][2], arr[2][1][2], arr[2][2][2];
            arr[2][0][2], arr[2][1][2], arr[2][2][2] = arr[5][0][2], arr[5][1][2], arr[5][2][2];
            arr[5][0][2], arr[5][1][2], arr[5][2][2] = arr[4][2][0], arr[4][1][0], arr[4][0][0];
            arr[4][2][0], arr[4][1][0], arr[4][0][0] = arr[0][0][2], arr[0][1][2], arr[0][2][2];
            arr[0][0][2], arr[0][1][2], arr[0][2][2] = target;
            linkedFace(arr, 3);
        },
        L(){
            target = arr[2][0][0], arr[2][1][0], arr[2][2][0];
            arr[2][0][0], arr[2][1][0], arr[2][2][0] = arr[0][0][0], arr[0][1][0], arr[0][2][0];
            arr[0][0][0], arr[0][1][0], arr[0][2][0] = arr[4][2][2], arr[4][1][2], arr[4][0][2];
            arr[4][2][2], arr[4][1][2], arr[4][0][2] = arr[5][0][0], arr[5][1][0], arr[5][2][0];
            arr[5][0][0], arr[5][1][0], arr[5][2][0] = target;
            linkedFace(arr, 1);
        },
        F(){
            target = arr[1][0][2], arr[1][1][2], arr[1][2][2];
            arr[1][0][2], arr[1][1][2], arr[1][2][2] = arr[5][0][0], arr[5][0][1], arr[5][0][2];
            arr[5][0][0], arr[5][0][1], arr[5][0][2] = arr[3][2][0], arr[3][1][0], arr[3][0][0];
            arr[3][2][0], arr[3][1][0], arr[3][0][0] = arr[0][2][2], arr[0][2][1], arr[0][2][0];
            arr[0][2][2], arr[0][2][1], arr[0][2][2] = target;
            linkedFace(arr, 2);
        },
        B(){
            target = arr[0][0][0], arr[0][0][1], arr[0][0][2];
            arr[0][0][0], arr[0][0][1], arr[0][0][2] = arr[3][0][2], arr[3][1][2], arr[3][2][2];
            arr[3][0][2], arr[3][1][2], arr[3][2][2] = arr[5][2][2], arr[5][2][1], arr[5][2][0];
            arr[5][2][2], arr[5][2][1], arr[5][2][0] = arr[1][2][0], arr[1][1][0], arr[1][0][0];
            arr[1][2][0], arr[1][1][0], arr[1][0][0] = target;
            linkedFace(arr, 4);
        }
    }

    if (repeat===3){
        for(let i=0; i<repeat; i++){
            orderList[order]();
            orderedList.push(order+"'");
        }
    } else {
        orderList[order]();
        if (repeat===1) orderedList.push(order);
    }

    expression(arr);
  
    //! 오류.
    if(arr === perfect_arr) quit(1);
    
}



////명령 버튼 클릭 및 처리
function readOrder(event){

    const order = event.path[0].innerText;
    const basicOrder = ["U","D","F","B","R","L"];

    if (!order[1]){       
        order==="◀" && ctrlZ();
        order==="▶" && ctrlY();
        basicOrder.includes(order) && performOrder(order,1);
    } else {
        order[1]==="'" && performOrder(order[0],3);
        order==="종료" && quit(0);
    }
}

//// 초기큐브 구현
function expression(arr){
    topFace.innerText= arr[0][0].join(" ")+"\n"+arr[0][1].join(" ")+"\n"+arr[0][2].join(" ");
    leftSide.innerText= arr[1][0].join(" ")+"\n"+arr[1][1].join(" ")+"\n"+arr[1][2].join(" ");
    frontSide.innerText= arr[2][0].join(" ")+"\n"+arr[2][1].join(" ")+"\n"+arr[2][2].join(" ");
    rightSide.innerText= arr[3][0].join(" ")+"\n"+arr[3][1].join(" ")+"\n"+arr[3][2].join(" ");
    backSide.innerText= arr[4][0].join(" ")+"\n"+arr[4][1].join(" ")+"\n"+arr[4][2].join(" ");
    bottom.innerText= arr[5][0].join(" ")+"\n"+arr[5][1].join(" ")+"\n"+arr[5][2].join(" ");   
}

function liveBtn(){
    const buttonBox = document.querySelector(".clickOrder");
    const orderBtn = buttonBox.querySelectorAll("button");
    for(let i=0; i<orderBtn.length;i++){
        orderBtn[i].addEventListener("click",readOrder);
    }
}

function mixCube(arr){
    const basicOrder = ["U","D","F","B","R","L"];
    for (i=0; i<5; i++){
        const randomNumber = Math.floor(Math.random()*basicOrder.length);
        performOrder(basicOrder[randomNumber],0);
    }
}

function init(){
    expression(arr);

    Given("START버튼을 눌러 하단 동작버튼들이 활성화된 상태에서"){
        const startBtn = document.querySelector(".start");
        startBtn.addEventListener("click", liveBtn());
    
        When ("버튼을 눌러 동작을 시행할때"){
            const Btn = document.querySelector("#Q");
            quitBtn.addEventListener("click",readOrder)
        }
            Then ("버튼 내용을 분석해주는 ReadOrder 함수로 테스트를 거친다."){
                function readOrder(event){

                    const order = event.path[0].innerText;
                    const basicOrder = ["U","D","F","B","R","L"];
                
                    if (!order[1]){       
                        order==="◀" && ctrlZ();
                        order==="▶" && ctrlY();
                        basicOrder.includes(order) && performOrder(order,1);
                    } else {
                        order[1]==="'" && performOrder(order[0],3);
                        order==="종료" && quit(0);
                    }
                }
            }
            

            And("해당버튼을 눌럿을때"){
                
                then("원하는 함수가 출력되는지 체크한다.")
            }

}
