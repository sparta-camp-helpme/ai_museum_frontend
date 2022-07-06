const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// #backend와 frontend의 각각 baseurl 설정

async function handlejoin() {
    const signupData = {
        username : document.getElementById("nameinput").value,
        password : document.getElementById("pwinput").value,
    }
    // #input의 입력값들을 signupData라는 변수에 저장함.

    const response = await fetch(`${backend_base_url}/user/`, {
    // #response는 await를 걸고 fetch를 보낸다. ``안의 url로. user로 설정해두면 views.py에 user.view로 들어가서 signup이 진행된다.
        headers: {
            Accept:"application/json",
            'Content-type' : 'application/json'
        },
        // #headers를 추가해야 415에러가 뜨지 않는다.
        method:'POST',
        // #post 메소드를 이용하고,
        body:JSON.stringify(signupData)
        // body는 signupdata를 stringify해준다.
    })

    response_json = await response.json()
    // #response_json은 api때문에 await를 걸어주고, response를 json화 시켜준다.

    if (response.status == 200) {
    // #만약 response의 상태가 200이라면 (정상통신이라면)
        window.location.replace(`${frontend_base_url}/login.html`);
        // #frontend url의 login.html을 보여줘. (회원가입 다 했으니 이제 로그인 할 수 있도록)
    } else {
        // #그게 아니라면 (실패라면)
        alert(response.status)
        // #alert으로 response의 상태를 띄워줘
    }

}


async function handlelogin() {
    console.log("handle login")

    const loginData = {
        username : document.getElementById("nameinput").value,
        password : document.getElementById("pwinput").value,
    }

    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            Accept:"application/json",
            'Content-type' : 'application/json'
        },
        method:'POST', 
        body : JSON.stringify(loginData)
        }
    )

    response_json = await response.json()
    console.log(response_json.access)

    if (response.status == 200) {
        localStorage.setItem("access", response_json.access)
        // #localstorage에 access란 변수에 담겨온 access값을 받아와서 저장

        localStorage.setItem("refresh", response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // #jwt사이트에서 바꿔주는 것처럼 우리가 토큰값을 알기 쉽게 꺼내올 수 있도록 하는 로직


        localStorage.setItem("payload", jsonPayload);
        // #위에서 받아온 payload를 다시 로컬스토리지에 payload라는 이름으로 저장한다.
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }

}


async function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    window.location.replace(`${frontend_base_url}/login.html`);
}

async function gomypage(){
    window.location.replace(`${frontend_base_url}/mypage.html`)
}

async function run() {
    document.getElementById("srt").value = document.getElementById("drop-down").value;
    // const test = document.getElementById("srt").value
    // console.log(test)
}

async function handleTransfer(){
    
    const image = document.getElementById("article_image").files[0]
    const content = document.getElementById('article_content').value
    const number = document.getElementById("drop-down").value
    console.log(number)

    const formdata = new FormData();

    formdata.append('image', image)
    formdata.append('content', content)
    formdata.append('number', number)

    const response = await fetch(`${backend_base_url}/article/`,{
        headers:{
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept:"application/json"
        },
        method:'POST',
        body:formdata
    })
    if (response.status == 200){
        alert("글 작성 완료")
        window.location.replace(`${frontend_base_url}/`);
    }
    // else if (number == null){
    //     alert("스타일을 선택해주세요.")
    // }
    else{
        alert(response.data)
    }
    // postArticle(content, result_img)
}


// async function postArticle(content, result_img){


//     const articleData = {
//         content : content,
//         result_img : result_img,
//     }

//     const response = await fetch(`${backend_base_url}/article/`,{
//         method:'POST',
//         headers:{
//             Authorization: "Bearer " + localStorage.getItem("access"),
//             Accept:"application/json",
//             'Content-type':'application/json'
//         },
//         body:JSON.stringify(articleData)
//     }
//     )

//     response_json = await response.json()
//     console.log(response_json)
//     if (response.status ==200){

//         window.location.replace(`${frontend_base_url}/mainpage.html`);
//     }else{
//         alert(response.status)
//     }
// }

async function getArticles(){
    const response = await fetch(`${backend_base_url}/article/`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json"
            },
        method:'GET',
    }
    )
    response_json = await response.json()
    return response_json
}

function articleDetail(article_id){
    console.log(article_id)
    const url = `${frontend_base_url}/detail.html?id=${article_id}`
    location.href=url
}


async function getArticleDetail(article_id){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept:"application/json"
            },
        method:'GET',
    }
    )
    response_json = await response.json()
    console.log(response_json)
    
    return response_json

}

async function postComment(article_id, comment_content){

    const commentData = {
        "comment":comment_content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`,{
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept:"application/json",
        method:'POST',
        body: JSON.stringify(commentData)
    }
    )


    if (response.status ==200){
        return response
    }else{
        alert(response.status)
    }
}