var button_sleeve = 0;
var sleeve = 6;
var op = ["المشاركة", "الصلاة", "الصيام", "الصدقة", "الحج"];
var l = ["المشاركة", "مقاطع صوتية", "فديوهات", "خطب", "كتب", "قرءاّن"]
var o = ["Shere.html", "The-prayer.html", "The-Fasting.html"];

const ButtonStyle = {
    Top : 19,
    Left : 9.5,
}

for (let i = 0; i < l.length; i++) {
    lin = document.createElement("a");
    lin.innerHTML = l[i];
    lin.style.left = ButtonStyle.Left + "%";
    lin.style.top = ButtonStyle.Top + "%";
    lin.classList.add("button");
    ButtonStyle.Left += 13;
    document.getElementById("card").appendChild(lin);
}