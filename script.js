var pages=["home","profil","gejala","penyebab","pencegahan","penanganan","konsultasi","kontak"];

// Navigasi antar menu
function route(){
  var h=(location.hash||"#home").slice(1);
  if(pages.indexOf(h)<0)h="home";
  pages.forEach(function(p){document.getElementById(p).classList.toggle("on",p===h)});
  document.querySelectorAll("nav a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+h)});
  document.getElementById("nav").classList.remove("open");
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
route();

// Tombol menu di HP
document.getElementById("tg").onclick=function(){
  document.getElementById("nav").classList.toggle("open");
};

// Validasi formulir konsultasi
function $(i){return document.getElementById(i)}
function chk(id,eid,ok,msg){
  var el=$(id);
  $(eid).textContent=ok?"":msg;
  el.classList.toggle("bad",!ok);
  return ok;
}
$("f").addEventListener("submit",function(e){
  e.preventDefault();
  var n=$("nm").value.trim(),
      m=$("em").value.trim(),
      t=$("tl").value.trim().replace(/[\s-]/g,""),
      p=$("ps").value.trim();
  var a=chk("nm","e1",/^[A-Za-z\u00C0-\u024F .'’-]{3,}$/.test(n),"Nama minimal 3 huruf dan tanpa angka.");
  var b=chk("em","e2",/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m),"Format email tidak valid.");
  var c=chk("tl","e3",/^(\+62|62|0)8[0-9]{8,11}$/.test(t),"Nomor harus format Indonesia, contoh 081234567890.");
  var d=chk("ps","e4",p.length>=10,"Pesan minimal 10 karakter.");
  if(a&&b&&c&&d){
    var o=$("ok");
    o.style.display="block";
    o.textContent="Terima kasih, "+n+". Pertanyaan Anda sudah kami terima dan akan dibalas melalui email.";
    $("f").reset();
  }else{
    $("ok").style.display="none";
  }
});