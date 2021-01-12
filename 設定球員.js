function start()
{
    var teambutton = document.getElementById("teambutton");
    teambutton.addEventListener("click",saveteam,false);
    var teambutton = document.getElementById("teambutton2");
    teambutton.addEventListener("click",saveteam,false);
    var fteambutton = document.getElementById("fteamlineup");
    fteambutton.addEventListener("click",setfteamlineup,false);
    var steambutton = document.getElementById("steamlineup");
    steambutton.addEventListener("click",setsteamlineup,false);
    load();
}
function load()
{
    var tag = [];
    for(var i=0;i<localStorage.length;i++)
    {
        tag[i] = localStorage.key(i);
    }
    for(tt in tag)
    {
        if(tag[tt].startsWith("team") == true)
        {
            var obj = JSON.parse(localStorage.getItem(tag[tt]));
            document.getElementById("fdefence").setAttribute("value",obj.team1);
            document.getElementById("sdefence").setAttribute("value",obj.team2);
        }
        else if(tag[tt].startsWith("F")==true)
        {
            if(tag[tt].substring(1,3)=="10")
            {
                var value=10;
            }
            else
            {
                var value = tag[tt].substring(1,2);
            }
            
            var obj = JSON.parse(localStorage.getItem(tag[tt]));
            document.getElementById("fnumber"+value).setAttribute("value",obj.playernumber);
            var select=document.getElementById("fteam"+value).getElementsByTagName("option");
            switch (obj.playerplace)
            {
                case "P":
                    select[1].selected=true;
                    break;
                case "C":
                    select[2].selected=true;
                    break;
                case "1B":
                    select[3].selected=true;
                    break;
                case "2B":
                    select[4].selected=true;
                    break;
                case "3B":
                    select[5].selected=true;
                    break;
                case "SS":
                    select[6].selected=true;
                    break;
                case "SF":
                    select[7].selected=true;
                    break;
                case "CF":
                    select[8].selected=true;
                    break;
                case "RF":
                    select[9].selected=true;
                    break;
                case "LF":
                    select[10].selected=true;
                    break;
                default:
                    select[0].selected=true;
                    break;
            }
        }
        else if(tag[tt].startsWith("S")==true)
        {
            if(tag[tt].substring(1,3)=="10")
            {
                var value=10;
            }
            else
            {
                var value = tag[tt].substring(1,2);
            }
            
            var obj = JSON.parse(localStorage.getItem(tag[tt]));
            console.log(obj.playerplace);
            document.getElementById("snumber"+value).setAttribute("value",obj.playernumber);
            var select=document.getElementById("steam"+value).getElementsByTagName("option");
            switch (obj.playerplace)
            {
                case "P":
                    select[1].selected=true;
                    break;
                case "C":
                    select[2].selected=true;
                    break;
                case "1B":
                    select[3].selected=true;
                    break;
                case "2B":
                    select[4].selected=true;
                    break;
                case "3B":
                    select[5].selected=true;
                    break;
                case "SS":
                    select[6].selected=true;
                    break;
                case "SF":
                    select[7].selected=true;
                    break;
                case "CF":
                    select[8].selected=true;
                    break;
                case "RF":
                    select[9].selected=true;
                    break;
                case "LF":
                    select[10].selected=true;
                    break;
                default:
                    select[0].selected=true;
                    break;
            }
        }
    }
    
}
function saveteam()
{
    var firstteam = document.getElementById("fdefence");
    var secondteam = document.getElementById("sdefence");
    var obj = { team1:firstteam.value,team2:secondteam.value};
    var myJson = JSON.stringify(obj);
    localStorage.setItem("team",myJson);
}
function setfteamlineup()
{
    for(var i=1;i<11;i++)
    {
        var playernum = document.getElementById("fnumber"+i);
        var playerplace = document.getElementById("fteam"+i);
        var obj = { playernumber:playernum.value,playerplace:playerplace.value};
        var myJson = JSON.stringify(obj);
        localStorage.setItem("F"+i,myJson);
    }
}
function setsteamlineup()
{
    for(var i=1;i<11;i++)
    {
        var playernum = document.getElementById("snumber"+i);
        var playerplace = document.getElementById("steam"+i);
        var obj = { playernumber:playernum.value,playerplace:playerplace.value};
        var myJson = JSON.stringify(obj);
        localStorage.setItem("S"+i,myJson);
    }
}
function check(team,batter)
{
    if(team==1)
    {
        var target=document.getElementById("fteam"+batter);
        var select=target.getElementsByTagName("option");
    }
    else
    {
        var target=document.getElementById("steam"+batter);
        var select=target.getElementsByTagName("option");
    }
    for(i=1;i<11;i++)
    {
        if(batter==i)
        {

        }
        else
        {
            if((target.value=="請選擇守位"))
            {

            }
            else
            {
                if(team==1)
                {
                    var compare=document.getElementById("fteam"+i);
                    if(target.value==compare.value)
                    {
                        window.alert("守備位置與"+i+"棒重複");
                        select[0].selected=true;
                        break;
                    }

                }
                else if(team==2)
                {
                    var compare=document.getElementById("steam"+i);
                    if(target.value==compare.value)
                    {
                        window.alert("守備位置與"+i+"棒重複");
                        select[0].selected=true;
                        break;
                    }
                }
            }
        }
    }
}
function music()
{
    var target=document.getElementById("music");
    var today = document.getElementById("data");
    var obj = { date:today.value};
    var myJson = JSON.stringify(obj);
    localStorage.setItem("today",myJson);
    target.play();
}
$(document).ready(
    function()
    {
        $("#gogogo").click(
            function()
            {
                $(".ball").attr({"src":"good.png","width":"250px","height":"400px","style":"position: absolute;left: 57%;top: 35%;"});
                $(".bat").attr({"src":"try.png","width":"200px","height":"250px","style":"position: absolute;left: 30%;top: 44%;"});
                window.setTimeout(function()
                {
                    $(".ball").attr({"src":"pitcher.gif","width":"200px","height":"200px","style":"position: absolute;left: 59%;top: 54%;"});
                    window.setTimeout(function()
                    {
                        $("#movebaseball").attr("style","display:block;position: absolute;left: 62%;top: 69%; z-index: 2;");
                        $("#movebaseball").attr("style","position: absolute; animation-name: move1; animation-duration: 3s;")
                        $(".bat").attr({"src":"swing.gif","width":"200px","height":"200px","style":"position: absolute;left: 30%;top: 50%;"})
                        window.setTimeout(function()
                        {
                            $("#movebaseball").attr("style","position: absolute; animation-name: move2; animation-duration: 2s;")
                            window.setTimeout(function()
                            {
                                $("#movebaseball").attr("style","display:none;")
                                alert("比賽開打!");
                                window.location.href="file:///C:/Users/acer/Desktop/ex1/Home.html";
                            },2000)
                        },1000)
                    },3000)},2000)})})
window.addEventListener("load", start, false);
