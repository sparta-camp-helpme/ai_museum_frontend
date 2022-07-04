window.onload =async function loadArticles(){
    articles = await getArticles()
    const article_list = document.getElementById("article")

    articles.forEach(article => {
        const newArticle =document.createElement("div");
        const articleImage = document.createElement("img")
        articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
        newArticle.setAttribute("id",article.id)
        newArticle.innerText = article.content

        // 클릭시 모달띄워지게끔
        // newArticle.setAttribute("onclick","articleDetail(this.id)")

        newArticle.appendChild(articleImage)
        article_list.appendChild(newArticle)
    })
}