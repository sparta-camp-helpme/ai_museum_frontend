const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)

async function loadArticle(article_id){
    const article = await getArticleDetail(article_id);
    console.log(article)
    const article_list = document.getElementById("article_detail")
    article.forEach(article => {
        const newArticle =document.createElement("div");
        const articleImage = document.createElement("img");

        articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
        newArticle.setAttribute("id",article.id)
        newArticle.setAttribute("class","detaildiv")
        articleImage.setAttribute("class","picture")
        // articleImage.setAttribute("onclick","articleDetail(this.id)")

        // newArticle.innerText = article.content

        // 클릭시 모달띄워지게끔
        // newArticle.setAttribute("onclick","articleDetail(this.id)")



        console.log(article.comments)

        // 댓글
        const comment_section = document.getElementById("comment_section")
        comment_section.innerHTML=''

        for (let i = 0; i < article.comments.length; i++){
            const new_comment = document.createElement("p")
            new_comment.innerText = article.comments[i].comment

            new_comment.setAttribute("class","comment")
            comment_section.appendChild(new_comment)
        }

        newArticle.appendChild(articleImage);
        article_list.appendChild(newArticle);
    })

    // # 프론트 데이터 자리 할당
    // const picture = document.getElementById("picture")
    // const picture = document.createElement("img");
    // const newArticle =document.createElement("div");
    // const content = document.getElementById("content")
    // const user_email = document.getElementById("user_email")

    // # 백엔드 데이터 저장
    // picture.setAttribute("src", `${backend_base_url}${article.image}`)
    // content.innerText = article.content
    // user_email.innerText = article.user_email
    // time.innerText = article.time
    // console.log(article.comments)




    // for (const comment of article.comments){
    //     const new_comment = document.createElement("p")
    //     console.log(comment)
    //     new_comment.innerText = comment.content
    //     comment_section.appendChild(new_comment)
    // }

    // const user = await getName()
    // if(user.id != article.user){
    //     const update_button = document.getElementById("update_button")
    //     const delete_button = document.getElementById("delete_button")
    //     update_button.style.visibility = "hidden"
    //     delete_button.style.visibility = "hidden"
    // }

}

// function updateMode(){

//     const title = document.getElementById("title")
//     const content = document.getElementById("content")
//     title.style.visibility = "hidden"
//     content.style.visibility = "hidden"

//     const input_title = document.createElement("textarea")
//     input_title.setAttribute("id", "picture")
//     input_title.innerText = title.innerHTML


//     // const input_content = document.createElement("textarea")
//     // input_content.setAttribute("id", "input_content") 
//     // input_content.innerText = content.innerHTML
//     // input_content.rows=10


//     const body = document.body
//     body.insertBefore(input_title, title)
//     body.insertBefore(input_content, content)

//     const update_button = document.getElementById("update_button")
//     update_button.setAttribute("onclick","updateArticle()")


// }


// async function removeArticle(){
//     await deleteArticle(article_id)

// }


async function writeComment(){
    const comment_content = document.getElementById("comment_content")
    const comment = await postComment(article_id, comment_content.value)
    loadArticle(article_id)
    comment_content.value = ''
}


loadArticle(article_id)