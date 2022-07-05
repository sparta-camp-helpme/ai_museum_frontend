$(document).ready(function() {
    $('#btn-transfer').hide();
    $('#preview').hide();

    $("#article_image").change(function () {
        readURL(this);
        $("#preview").show();
        $("#btn-transfer").show();
        $('#choosephoto').hide();
    });
});


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
const closeBtn = modal.querySelector(".xbutton");
const closeBtn2 = modal.querySelector("button");
const openModal = () => {
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);
closeBtn2.addEventListener("click", closeModal);
}

// 이미지 미리보기
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('preview').src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            document.getElementById('preview').src = "";
        }
    }
