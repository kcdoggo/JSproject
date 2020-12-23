const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

/*모든 서클들을 선택,클래스선택 쿼리설렉터올*/
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

//(넥스트)어떤 기능이냐면,클릭했을때 1,2,3,4 증가하여 추가되는 기능임.
next.addEventListener('click',()=>{
    currentActive++;
    
    //4까지만 증가하도록, 줄이 쭉 나가버리면 안되니까
    // circles 는 node list로 array처럼 다룬다.
    if(currentActive>circles.length){
        currentActive = circles.length
        //계속 4로 남게 해준다.console.log(currentActive);로 테스트해봐.
    }
    update()
})


//(Prev)어떤 기능이냐면,클릭했을때 감소하도록
prev.addEventListener('click',()=>{
    currentActive--;
    
    // circles 는 node list로 array처럼 다룬다.
    if(currentActive<1){
        currentActive = 1
        //계속 줄어도 1로 남게한다.
    }
    update();

})

//css 클래스 조작. 서클 색 바꿀 수 있도록
function update(){
    //서클 nodelists를 loop through한다
    circles.forEach((circle,inx)=>{
        if(inx < currentActive){
            //1보다 작다면 서클1을 불러온다
            circle.classList.add('active')
        }else{
            circle.classList.remove('active')
        }

    })
    //여기선 줄을 설정 
    // active된거 다 선택해줌
    const actives = document.querySelectorAll('.active')
    //액티브는 2,3,4가되고,서클은 항상4니까 서로 나눈 것을 구한다.10단위로 하기위해 100곱해줌,근데 그렇게하면 줄이 원을 지나가버리셔,1씩 뺀다, 저게 3줄이잖아1-2,2-3,3-4니까.1/3,2/3,3/3으로 맞춰야할거아냐.그래서 액티베이드는 2부터 시작하니(원엑티베이트가1임.증가해서2)-1,서클길이는4니 -1.
    //프로그래스 변수,맨위에 있는거의 스타일위드 설정해줌, progress의 css에 width가 %로 정의되었기때문에
    //꼭 %붙여줘야 css가 알아듣고 줄이 늘어난다.
    progress.style.width=((actives.length-1) / (circles.length-1))*100+'%'

    // prev작업, 1을 지나면 활성화되게
    if (currentActive === 1){
        prev.disabled = true
    } 
    //4가 되면 next 못누르게, JS .disabled알아보기
    else if(currentActive === circles.length){
        next.disabled = true;
    }else{ //여기는 active가 2와3일때
        prev.disabled = false
        next.disabled = false
        
    }
}