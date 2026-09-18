var $=function(i){return document.getElementById(i)};

var MT=[
{id:"light",n:"Сота Лайт",p:350,old:420,tg:["cheap"],f:["15 ГБ интернета","300 минут","Защита от спама"]},
{id:"stand",n:"Сота Стандарт",p:550,old:650,tg:["int"],bdg:"Популярный",pop:1,f:["35 ГБ интернета","600 минут","Безлимит внутри сети"]},
{id:"plus",n:"Сота Плюс",p:750,old:890,tg:["int","call"],bdg:"Хит",f:["60 ГБ интернета","1000 минут","Соцсети без трафика"]},
{id:"game",n:"Сота Игровой",p:990,old:1150,tg:["game","int"],bdg:"Pro",f:["100 ГБ интернета","1500 минут","Низкий пинг","Приоритет в сети"]},
{id:"call",n:"Сота Просто связь",p:250,old:300,tg:["cheap","call"],f:["5 ГБ интернета","1200 минут","Для звонков по РФ"]}];

var HN=[
{id:"h100",n:"Быстрый",sp:100,p:400,old:500,f:["Безлимитный интернет","Wi-Fi роутер","Монтаж бесплатно"]},
{id:"h500",n:"Скоростной",sp:500,p:600,old:750,bdg:"Хит",pop:1,f:["Безлимитный интернет","Wi-Fi 6 роутер","Для ПК и ТВ"]},
{id:"h1000",n:"Гигабит",sp:1000,p:900,old:1200,bdg:"Максимум",f:["Безлимитный интернет","Wi-Fi 6 премиум","20+ устройств"]}];

var HT=[
{id:"t100",n:"Быстрый + ТВ",sp:100,p:500,old:620,f:["Безлимит","120 каналов ТВ","Wi-Fi + приставка"]},
{id:"t500",n:"Скоростной + ТВ",sp:500,p:750,old:940,bdg:"Выгодно",pop:1,f:["Безлимит","200+ каналов HD/4K","Wi-Fi 6 + приставка"]},
{id:"t1000",n:"Гигабит + ТВ",sp:1000,p:1100,old:1390,bdg:"Всё включено",f:["Безлимит","250+ каналов 4K","Wi-Fi 6 премиум"]}];

var CT={light:{n:"Сота Лайт",p:350,mn:300,gb:15,sm:50},stand:{n:"Сота Стандарт",p:550,mn:600,gb:35,sm:100},plus:{n:"Сота Плюс",p:750,mn:1000,gb:60,sm:200},game:{n:"Сота Игровой",p:990,mn:1500,gb:100,sm:300},call:{n:"Сота Просто связь",p:250,mn:1200,gb:5,sm:50}};

var NUMS=[
{num:"+7 (900) 879-69-72",rank:"🥉 Бронза",cls:"bronze"},
{num:"+7 (955) 125-00-22",rank:"🥈 Серебро",cls:"silver"},
{num:"+7 (999) 555-90-73",rank:"🥇 Золотой",cls:"gold"},
{num:"+7 (999) 571-77-77",rank:"💎 Платина",cls:"platinum"},
{num:"+7 (900) 421-37-58",rank:"🥉 Бронза",cls:"bronze"},
{num:"+7 (955) 611-00-22",rank:"🥈 Серебро",cls:"silver"},
{num:"+7 (999) 555-52-27",rank:"🥇 Золотой",cls:"gold"},
{num:"+7 (999) 499-77-77",rank:"💎 Платина",cls:"platinum"},
{num:"+7 (900) 337-59-57",rank:"🥉 Бронза",cls:"bronze"}];

function toast(t){var e=$("tst");e.textContent=t;e.classList.add("on");clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove("on")},2000)}
function openM(i){$(i).classList.add("on")}
function closeM(i){$(i).classList.remove("on")}
function today(){var d=new Date(),p=function(n){return n<10?"0"+n:n};return p(d.getDate())+"."+p(d.getMonth()+1)+"."+d.getFullYear()}
function fmtP(v){var d=v.replace(/\D/g,"");if(d[0]=="8")d="7"+d.slice(1);if(d[0]!="7")d="7"+d;d=d.slice(0,11);var o="+7";if(d.length>1)o+=" ("+d.slice(1,4);if(d.length>=5)o+=") "+d.slice(4,7);if(d.length>=8)o+="-"+d.slice(7,9);if(d.length>=10)o+="-"+d.slice(9,11);return o}

function go(p){
document.querySelectorAll(".pg").forEach(function(e){e.classList.remove("on")});
$("pg-"+p).classList.add("on");
document.querySelectorAll("#nv button").forEach(function(b){b.classList.toggle("on",b.dataset.p==p)});
$("bb").classList.remove("on");window.scrollTo(0,0);
if(p=="c"){var u=loadU();if(u)showC(u);else showL()}
if(p=="s"){renderNums();renderSimT()}
}
document.querySelectorAll("#nv button").forEach(function(b){b.onclick=function(){go(b.dataset.p)}});

var mF="all",mS=null,hM="net",hS=null,ctx=null;
function renderTars(elId,list,sel,cb){
var el=$(elId);el.innerHTML="";
list.forEach(function(t){
var c=document.createElement("div");c.className="tr"+(t.id==sel?" sel":"");
var h="";
if(t.bdg)h+='<span class="bd'+(t.pop?" p":"")+'">'+t.bdg+'</span>';
h+="<h3>"+t.n+"</h3>";
if(t.sp)h+='<div class="sp">до '+t.sp+' Мбит/с</div>';
h+='<div class="pr">'+t.p+' <small>₽/мес</small></div>';
h+='<div class="pn"><s>'+t.old+' ₽</s> скидка</div>';
h+='<ul>'+t.f.map(function(x){return "<li>"+x+"</li>"}).join("")+'</ul>';
h+='<div class="tb">'+(t.id==sel?"Выбрано":"Выбрать")+"</div>";
c.innerHTML=h;c.onclick=function(){cb(t)};el.appendChild(c);
});
}
function renderM(){var l=mF=="all"?MT:MT.filter(function(t){return t.tg.indexOf(mF)>=0});renderTars("mt",l,mS,function(t){mS=t.id;renderM();showBB(t.n,t.p,"m")})}
function renderH(){var l=hM=="net"?HN:HT;renderTars("htars",l,hS,function(t){hS=t.id;renderH();showBB(t.n+(t.sp?" · "+t.sp+" Мбит/с":""),t.p,"h")})}
document.querySelectorAll("#mf button").forEach(function(b){b.onclick=function(){document.querySelectorAll("#mf button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");mF=b.dataset.f;renderM()}});
document.querySelectorAll("#ht button").forEach(function(b){b.onclick=function(){document.querySelectorAll("#ht button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");hM=b.dataset.m;hS=null;$("bb").classList.remove("on");renderH()}});
function showBB(n,p,c){ctx=c;$("sn").textContent=n;$("sp").textContent=p+" ₽";$("bb").classList.add("on")}
$("cn").onclick=function(){
var t=ctx=="m"?MT.find(function(x){return x.id==mS}):(hM=="net"?HN:HT).find(function(x){return x.id==hS});
if(!t)return;$("mtn").textContent=t.n;openM("cm");
};

var STOR="sota_u";
function loadU(){try{return JSON.parse(localStorage.getItem(STOR)||"null")}catch(e){return null}}
function saveU(u){try{localStorage.setItem(STOR,JSON.stringify(u))}catch(e){}}
function createU(p){return{phone:p,balance:350,tariff:"stand",usage:{mn:120,gb:8.4,sm:14},hist:[{d:"Пополнение",t:today(),a:500},{d:"Подключён тариф Стандарт",t:today(),a:0}]}}
function showL(){$("ls").style.display="flex";$("cb").classList.remove("on");$("s1").style.display="block";$("s2").style.display="none";$("ph").value="";$("cd").value="";$("gc").disabled=true;$("li").disabled=true}
function showC(u){
$("ls").style.display="none";$("cb").classList.add("on");
$("abphone").textContent=u.phone;
$("hbal").textContent=u.balance+" ₽";
$("bv").innerHTML=u.balance+" <small>₽</small>";
var t=CT[u.tariff];
$("tn").textContent=t.n;$("tp").textContent=t.p+" ₽/мес";
$("mu").textContent=u.usage.mn;$("mt2").textContent=t.mn;
$("mb").style.width=Math.min(100,u.usage.mn/t.mn*100)+"%";
$("gu").textContent=u.usage.gb.toFixed(1);$("gt").textContent=t.gb;
$("gb").style.width=Math.min(100,u.usage.gb/t.gb*100)+"%";
$("su").textContent=u.usage.sm;$("st").textContent=t.sm;
$("sb").style.width=Math.min(100,u.usage.sm/t.sm*100)+"%";
var h=$("hs");h.innerHTML="";
u.hist.slice(0,8).forEach(function(x){
var li=document.createElement("li");
li.innerHTML='<div><div class="d">'+x.d+'</div><div class="dt">'+x.t+'</div></div><div class="am '+(x.a>=0?"pl":"mi")+'">'+(x.a>0?"+":"")+x.a+' ₽</div>';
h.appendChild(li);
});
}
var pend="";
$("ph").oninput=function(e){e.target.value=fmtP(e.target.value);$("gc").disabled=e.target.value.replace(/\D/g,"").length<11};
$("gc").onclick=function(){pend=$("ph").value;$("s1").style.display="none";$("s2").style.display="block";$("cd").focus();toast("Код отправлен")};
$("cd").oninput=function(e){e.target.value=e.target.value.replace(/\D/g,"").slice(0,4);$("li").disabled=e.target.value.length!=4};
$("li").onclick=function(){var u=loadU();if(!u||u.phone!=pend){u=createU(pend);saveU(u)}showC(u)};
$("bp").onclick=function(){$("s1").style.display="block";$("s2").style.display="none";$("cd").value="";$("li").disabled=true};
$("tu").onclick=function(){var u=loadU();if(!u)return;u.balance+=500;u.hist.unshift({d:"Пополнение",t:today(),a:500});saveU(u);showC(u);toast("+500 ₽")};

var chS=null;
$("ct").onclick=function(){var u=loadU();if(!u)return;chS=u.tariff;renderTops();openM("chm")};
function renderTops(){
var el=$("tops");el.innerHTML="";
Object.keys(CT).forEach(function(k){
var t=CT[k],d=document.createElement("div");
d.className="to"+(k==chS?" sel":"");
d.innerHTML='<div><div class="n">'+t.n+'</div><div style="color:#7a7a7a;font-size:11px">'+t.mn+' мин · '+t.gb+' ГБ</div></div><div class="p">'+t.p+' ₽</div>';
d.onclick=function(){chS=k;renderTops()};el.appendChild(d);
});
}
$("ap").onclick=function(){
var u=loadU();if(!u)return;
if(chS==u.tariff){closeM("chm");return}
u.tariff=chS;u.hist.unshift({d:"Смена тарифа",t:today(),a:0});
saveU(u);showC(u);closeM("chm");toast("Тариф изменён");
};

/* SIM */
var simNum=null,simTariff=null;
function renderNums(){
var el=$("nums");el.innerHTML="";
NUMS.forEach(function(n){
var d=document.createElement("div");
d.className="num "+n.cls+(simNum==n.num?" sel":"");
d.innerHTML='<div class="rank">'+n.rank+'</div><div class="val">'+n.num+'</div>';
d.onclick=function(){simNum=n.num;renderNums();checkSim()};
el.appendChild(d);
});
}
function renderSimT(){
var el=$("sim-tariffs");el.innerHTML="";
MT.forEach(function(t){
var d=document.createElement("div");
d.className="num"+(simTariff==t.id?" sel":"");
d.innerHTML='<div class="rank">'+t.n+'</div><div class="val">'+t.p+' ₽/мес</div>';
d.onclick=function(){simTariff=t.id;renderSimT();checkSim()};
el.appendChild(d);
});
}
function checkSim(){
var fio=($("fio")||{}).value||"";
$("orderSim").disabled=!(simNum && simTariff && fio.trim().length>2);
}
if($("fio"))$("fio").oninput=checkSim;
if($("orderSim"))$("orderSim").onclick=function(){
var t=MT.find(function(x){return x.id==simTariff});
$("siminfo").textContent='Номер: '+simNum+' · Тариф: '+t.n+' ('+t.p+' ₽/мес)';
openM("simm");
var u=loadU();
if(!u){u=createU(simNum.replace(/\D/g,""))}
u.phone=simNum;u.tariff=simTariff;
u.hist.unshift({d:"Заказана SIM: "+simNum,t:today(),a:0});
saveU(u);
};

document.querySelectorAll(".mb").forEach(function(m){m.onclick=function(e){if(e.target==m)m.classList.remove("on")}});

renderM();renderH();renderNums();renderSimT();
