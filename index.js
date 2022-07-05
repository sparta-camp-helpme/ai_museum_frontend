
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

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
});

async function modal() {
const openButton = document.getElementById("modalclick");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const closeBtn = modal.querySelector("button");
const openModal = () => {
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);
}

$(document).ready(function() {
    $('#submitphoto').hide();
    $('#preview').hide();

    $("#choosephoto").click(function () {
        $("#choosephoto").hide()

    });

    $("#pr_photo").change(function () {
        // pr_photo가 값이 바뀌면 아래와 같이 체인지
        readURL(this);
        $("#preview").show();
        $("#submitphoto").show();
    });
});
