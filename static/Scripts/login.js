const content = "Go to the AI MUSEUM"
const text = document.querySelector(".starttext")
let index = 0;


function typing() {
text.textContent += content[index++];
if (index > content.length) {
    text.textContent = ""
    index = 0;
    }
}

setInterval(typing, 200)


$(document).ready(function(){
$("#loginbox").hide();
    $("#startbutton").click(function(){
        $("#boxtext").show();
        $("#loginbox").show();
        $("#starttext").hide();
        $("#startbutton").hide();
    })
})