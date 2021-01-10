function start()
{
    setteam();
    setfirstteamplayer();
    setthetime();
}  
function setteam()
{
    var newobj = JSON.parse(localStorage.getItem('team'));
    document.getElementById("first team").innerHTML = newobj.team1;
    document.getElementById("second team").innerHTML = newobj.team2;
}
function setfirstteamplayer()
{
    for(var i=1;i<11;i++)
    {
        var newobj = JSON.parse(localStorage.getItem('F'+i));
        document.getElementById("firstteamplayer"+i).innerHTML = newobj.playernumber;
        document.getElementById("firstteamplayer"+i+"place").innerHTML = newobj.playerplace;
    }
    for(var i=1;i<11;i++)
    {
        var newobj = JSON.parse(localStorage.getItem('S'+i));
        document.getElementById("secondteamplayer"+i).innerHTML = newobj.playernumber;
        document.getElementById("secondteamplayer"+i+"place").innerHTML = newobj.playerplace;
    }
    
}
function setthetime()
{
    var newobj = JSON.parse(localStorage.getItem('today'));
    document.getElementById("date").innerHTML = newobj.date;
}
window.addEventListener("load", start, false);