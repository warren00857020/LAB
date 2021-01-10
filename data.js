function whichteam(id)
{
    return id.substring(0,1);
}
function whichinning(id)
{
    return id.substring(1,2);
}
function whichbatter(id)
{
    if(parseInt(id.substring(2,5))==110){
        return id.substring(2,5);
    }
    else if(parseInt(id.substring(2,4))>9){
        return id.substring(2,4);
    }
    else{
        return id.substring(2,3);
    }
}
function get_R_H_E(team){
    var tag = [];
    
    var obj={};
    var score=0,error=0,hit=0;
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).startsWith("1") || localStorage.key(i).startsWith("2")){
            tag[i] = localStorage.key(i);
        }
    }
    for(tt in tag){
        if(tag[tt].startsWith(team) == true){
            obj = JSON.parse(localStorage.getItem(tag[tt]));
            score = score + parseInt(obj.R);
            error = error + parseInt(obj.E);
            hit = hit + parseInt(obj.H);
        }
    }
    document.getElementById(team+"R").innerHTML = score;
    document.getElementById(team+"H").innerHTML = hit;
    if(team==1){
        document.getElementById("2E").innerHTML = error;
    }
    else{
        document.getElementById("1E").innerHTML = error;
    }
}

function printall()
{
    var tag = [];
    var obj={};
    var overOutput1="",overOutput2="";
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).startsWith("1")==true || localStorage.key(i).startsWith("2")==true){
            tag[i] = localStorage.key(i);
        }
    }
    var arr=new Array();
    for(var i=1;i<3;i++){
        for(var j=1;j<8;j++){
            var index = String(i) + String(j);
            arr[index]=0;
        }
    }

    for(tt in tag){
        obj = JSON.parse(localStorage.getItem(tag[tt]));
        var output = "";
        switch (obj.end)
        {
            case "K":
                output+=obj.end;
                //document.getElementById(obj.id).innerHTML = obj.end;
                break;
            case "界K":
                output+=obj.end;
                //document.getElementById(obj.id).innerHTML = obj.end;
                break;
            case "揮K":
                output+=obj.end;
                //document.getElementById(obj.id).innerHTML = obj.end;
                break;
            case "BB":
                output+=obj.end;
                //document.getElementById(obj.id).innerHTML = obj.end;
                break;
            case "H":
                output+=obj.way + "  <a>" + obj.end+"</a>";
                //document.getElementById(obj.id).innerHTML = obj.way + "  " + obj.end;
                break;
            case "E":
                output+=obj.way + "  <a>" + obj.end+"</a>";
                //document.getElementById(obj.id).innerHTML = obj.way + "  " + obj.end;
                break;
            default:
                output+=obj.way + "  " + obj.end;
                //document.getElementById(obj.id).innerHTML = obj.way + "  " + obj.end;
                break;
        }
        if(obj.RunnerError==true){
            output+= ' + RE';
        }
        if(obj.R!=0)
        {
            output+=" "+"("+obj.R+")";
        }
        if(whichbatter(obj.id)<=10){
            if(obj.last==true){
                document.getElementById(obj.id).setAttribute("class","b");
            }
            else{
                document.getElementById(obj.id).setAttribute("class","");
            }
            document.getElementById(obj.id).innerHTML = output;
        }
        else{
            
            if(whichteam(obj.id)==1){
                overOutput1 += '第' + parseInt(whichbatter(obj.id))%10 +'棒 : ' + output +'</br>'; 
            }
            else{
                overOutput2 += '第' + parseInt(whichbatter(obj.id))%10 +'棒 : ' + output+ '</br>'; 
            }
        }
        

        /*單局分數*/
        arr[whichteam(obj.id)+whichinning(obj.id)] = arr[whichteam(obj.id)+whichinning(obj.id)] + parseInt(obj.R);
        document.getElementById(whichteam(obj.id)+whichinning(obj.id)+'R').innerHTML = arr[whichteam(obj.id)+whichinning(obj.id)];
    }
    /*Over 10 棒*/
    document.getElementById('Display1').innerHTML =" ";
    document.getElementById('Display2').innerHTML =" ";
    document.getElementById('Display1').innerHTML = overOutput1;
    document.getElementById('Display2').innerHTML = overOutput2;
    /*更換球員*/
    
    document.getElementById("display1").innerHTML = " ";
    document.getElementById("display2").innerHTML = " ";
    var markup1="",markup2="";
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).startsWith("R")==true){
            var OBJ=JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(parseInt(OBJ.team)==1){
                markup1 += '第'+ OBJ.inning +'局，'+OBJ.batter+'棒 -> 背號：' + OBJ.number + '  、  守備位置：' + OBJ.place + '<br>';  
            }
            else if(parseInt(OBJ.team)==2){
                markup2 += '第'+ OBJ.inning +'局，'+OBJ.batter+'棒 -> 背號：' + OBJ.number + '  、  守備位置：' + OBJ.place + '<br>';
            }
        }
    }
    document.getElementById("display1").innerHTML = markup1;
    document.getElementById("display2").innerHTML = markup2;
    
}
function adjust(team,batter,inning){
    var tags=[];
    
    
    /*收集localstorge*/
    for(var i=0;i<localStorage.length;i++){
        tags[i]=localStorage.key(i);
    }
    /*initial arr*/
    var arr_max = 10;
    
    
    var arr = new Array(arr_max);
    for(var i=0;i<arr_max;i++){
       arr[i]=null;
    }
    console.log(arr_max);
    
    /*將同隊同局的出局數放入arr index：棒次 value:出局數*/
    for(tag in tags){
        if(tags[tag].startsWith(team+inning)==true){
            var obj = JSON.parse(localStorage.getItem(tags[tag]));
            arr[parseInt(whichbatter(tags[tag]))-1]=obj.out;
            obj.last=false;
            localStorage.setItem(tags[tag],JSON.stringify(obj));
        }
    }
    
    /*判斷3出局 錯誤資料 從localstorge移除*/
    var front,rear=parseInt(batter),START; 
    /*front*/
    if(inning==1){
        front=1;
        START=1;
    }
    else{
        for(tt in tags){
            var index = team+String(parseInt(inning-1));
            if(tags[tt].startsWith(index)==true){
                var h = JSON.parse(localStorage.getItem(tags[tt]));
                if(h.last==true){
                    front = parseInt(whichbatter(h.id));
                    START = front;
                }
            }
        }
        if(front >= arr_max)
            front = 1;
        else
            front++;

        
    }
    
    /*rear*/
    if(rear>=arr_max)
        rear=1;
    else
        rear++;
    console.log(rear);
    while(arr[rear-1]!=null && rear!=START){
        if(rear>=arr_max)
            rear=1;
        else
            rear++;
    }
    console.log(rear,START);
    if(rear==1 && rear!=START)
        rear=arr_max;
    else if(rear!=START)
        rear--;

    
   
    console.log(front,rear);
    /*front代表第一位 rear代表最後一位*/
    var outSum=0;
    while(outSum<3){
        if(front==rear){
            outSum += arr[front-1];
            break;
        }
        outSum += arr[front-1];
        if(outSum<3){
            if(front==arr_max)
                front=1;
            else
                front++;
        }
        
    }
    console.log(front,rear);
    //console.log("jj",outSum);
    if(outSum>=3){
        //document.getElementById(team+inning+front).setAttribute("class","b");
        var OBJ = JSON.parse(localStorage.getItem(team+inning+front));
        OBJ.last = true;
        localStorage.setItem(team+inning+front,JSON.stringify(OBJ));
        if(team==1){
            if(parseInt(inning)<7)
                document.getElementById("inning_Ateam").value = 1 + parseInt(inning);
        }
        else if(team==2){
            if(parseInt(inning)<7)
                document.getElementById("inning_Bteam").value = 1 + parseInt(inning);
        }
        while(front!=rear){
            if(front==arr_max)
                front=1;
            else
                front++;
            if(front<=10)
                document.getElementById(team+inning+front).innerHTML = "";
            var j =JSON.parse(localStorage.getItem(team+inning+front));
            
            localStorage.removeItem('R'+team+inning+front);
            
            localStorage.removeItem(team+inning+front);
            
            console.log(front,rear);
        }
    }
    
}

function load(id){
    //baterr第幾棒 inning第幾局 team哪一隊
    var team = whichteam(id);
    var batter = whichbatter(id);
    var inning = whichinning(id);
    //adjust(team,batter,inning);
    get_R_H_E(team);
    adjust(team,batter,inning);
    printall();
}


/*獲取out H E BB 存入localstorage*/
function distinguishSituation_R_H_E_Out(obj){
    obj['out'] = 0;
    obj['H'] = 0;
    obj['E'] = 0;
    obj['BB'] = 0;
    switch (obj.end)
    {
        case "BB":
            obj['BB'] = 1;
            break;
        case "DP" :
            obj['out'] = 2;
            break;
        case "TP":
            obj['out'] = 3;
            break;
        case "H":
            obj['H'] = 1;
            break;
        case "E":
            obj['E'] = 1;
            break;
        default:
            obj['out'] = 1;
            break;
    }
    if(obj.RunnerError==true){
        obj['out']+=1;
    }
}
function doProcess_Ateam(){
    var obj={};
    obj['last']=false;
    var output="";
    /*抓取document 方向內容*/
    for ( counter = 0; counter < document.getElementsByName("way_Ateam").length; counter++ ) {
       if ( document.getElementsByName("way_Ateam")[counter].checked == true ) {
          obj['way']=document.getElementsByName("way_Ateam")[counter].value;
          break;
        }
    }
    /*抓取document 結果內容*/
    for ( counter = 0; counter < document.getElementsByName("end_Ateam").length; counter++ ) {
        if ( document.getElementsByName("end_Ateam")[counter].checked == true ) {
           //output += document.getElementsByName("end_Ateam")[counter].value;
           obj['end']=document.getElementsByName("end_Ateam")[counter].value;
           break;
        }
    }
    /*判斷跑者失誤*/
    for ( counter = 0; counter < document.getElementsByName("RunnerError_Ateam").length; counter++ ) {
        if ( document.getElementsByName("RunnerError_Ateam")[counter].checked == true ) {
           obj['RunnerError']=true;
           document.getElementsByName("RunnerError_Ateam")[counter].checked = false; 
           break;
        }
        else{
            obj['RunnerError']=false;
        }   
    }
    /*得分*/
    obj['R']=parseInt(document.getElementById("Ateam_R").value);
    document.getElementById("Ateam_R").value = 0;
    distinguishSituation_R_H_E_Out(obj);
    var location;
    location = "1"  + document.getElementById("inning_Ateam").value + document.getElementById("batter_Ateam").value; //獲取該局的打者的id
    if(parseInt(document.getElementById("batter_Ateam").value)==10){
        document.getElementById("batter_Ateam").value = 1;
    }
    else{
        document.getElementById("batter_Ateam").value = 1 + parseInt(document.getElementById("batter_Ateam").value);
    }
    obj['id']=location;
    if($("#replace1").prop('checked')==true){
        obj['replace']='R'+location;
        var number=document.getElementById("replace1number").value;
        var place=document.getElementById("replace1place").value;
        var jj={'number':number, 'place':place,'team':whichteam(obj.id), 'inning':whichinning(obj.id), 'batter':whichbatter(obj.id) };
        localStorage.setItem(obj.replace,JSON.stringify(jj));
    }
    else{
        obj['replace']=false;
    }
    if(obj['replace']==false){
        for(var i=0;i<localStorage.length;i++){
            if(localStorage.key(i).startsWith('R'+obj.id)==true){
                localStorage.removeItem(localStorage.key(i))
                break;
            }
        }
    }
    obj['start']=true;
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).startsWith('1'+document.getElementById("inning_Ateam").value)==true && localStorage.key(i)!="111"){
            obj['start'] = false;
            break;
        }
    }
    localStorage.setItem(location,JSON.stringify(obj));//setlocalstorge
    if(whichbatter(obj.id)<=10){
        load(location);
    }   
    else{
        get_R_H_E("1");
        printall();
    }
        
}

function doProcess_Bteam(){
    var obj={};
    obj['last']=false;
    //var output="";
    /*抓取document內容*/
    for ( counter = 0; counter < document.getElementsByName("way_Bteam").length; counter++ ) {
       if ( document.getElementsByName("way_Bteam")[counter].checked == true ) {
          obj['way']=document.getElementsByName("way_Bteam")[counter].value;
          break;
       }
    }
    for ( counter = 0; counter < document.getElementsByName("end_Bteam").length; counter++ ) {
        if ( document.getElementsByName("end_Bteam")[counter].checked == true ) {
           obj['end']=document.getElementsByName("end_Bteam")[counter].value;
           break;
        }
    }
    /*判斷跑者失誤*/
    for ( counter = 0; counter < document.getElementsByName("RunnerError_Bteam").length; counter++ ) {
        if ( document.getElementsByName("RunnerError_Bteam")[counter].checked == true ) {
           obj['RunnerError']=true;
           document.getElementsByName("RunnerError_Bteam")[counter].checked = false; 
           break;
        }
        else{
            obj['RunnerError']=false;
        }
        
    }
    obj['R']=parseInt(document.getElementById("Bteam_R").value);
    document.getElementById("Bteam_R").value =0;
    distinguishSituation_R_H_E_Out(obj);
    var location;
    location = "2" + document.getElementById("inning_Bteam").value  + document.getElementById("batter_Bteam").value; //獲取該局的打者的id
    if(parseInt(document.getElementById("batter_Bteam").value)==10 ){
        document.getElementById("batter_Bteam").value = 1;
    }
    else{
        document.getElementById("batter_Bteam").value = 1 + parseInt(document.getElementById("batter_Bteam").value);
    }
    obj['id']=location;
    if($("#replace2").prop('checked')==true){
        obj['replace']='R'+location;
        var number=document.getElementById("replace2number").value;
        var place=document.getElementById("replace2place").value;
        var jj={'number':number, 'place':place,'team':whichteam(obj.id), 'inning':whichinning(obj.id), 'batter':whichbatter(obj.id) };
        localStorage.setItem(obj.replace,JSON.stringify(jj));
    }
    else{
        obj['replace']=false;
    }
    if(obj['replace']==false){
        for(var i=0;i<localStorage.length;i++){
            if(localStorage.key(i).startsWith('R'+obj.id)==true){
                localStorage.removeItem(localStorage.key(i))
                break;
            }
        }
    }
    obj['start']=true;
    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i).startsWith('2'+document.getElementById("inning_Bteam").value)==true && localStorage.key(i)!="211"){
            obj['start'] = false;
            break;
        }
    }
    localStorage.setItem(location ,JSON.stringify(obj));
    //document.getElementById(location).innerHTML = output;
    if(whichbatter(obj.id)<=10)
        load(location);  
    else{
        get_R_H_E("2");
        printall();
    }
                                                 
   
}

function Clear(){
    localStorage.clear();
    location.reload();
}
function doClear_Ateam(){
    var ID="1";
    ID += document.getElementById("inning_Ateam").value;
    ID += document.getElementById("batter_Ateam").value;
    var obj = JSON.parse(localStorage.getItem(ID));
    if(obj.replace!=false){
        localStorage.removeItem('R'+ID);
    }
    document.getElementById(ID).innerHTML = " ";
    document.getElementById('1'+document.getElementById("inning_Ateam").value+'R').innerHTML = " ";
    localStorage.removeItem(ID);
    printall();
    get_R_H_E("1");
    get_R_H_E("2");
}
function doClear_Bteam(){
    var ID="2";
    ID += document.getElementById("inning_Bteam").value;
    ID += document.getElementById("batter_Bteam").value;
    var obj = JSON.parse(localStorage.getItem(ID));
    if(obj.replace!=false){
        localStorage.removeItem('R'+ID);
    }
    document.getElementById(ID).innerHTML = " ";
    document.getElementById('2'+document.getElementById("inning_Bteam").value+'R').innerHTML = " ";
    localStorage.removeItem(ID);
    printall();
    get_R_H_E("1");
    get_R_H_E("2");
}


function start(){
    Ateam_R=0;
    Bteam_R=0;
    document.getElementById("ok_1st_inning").addEventListener("click",doProcess_Ateam,false);
    document.getElementById("ok_2nd_inning").addEventListener("click",doProcess_Bteam,false);
    document.getElementById("clear_1st_inning").addEventListener("click",doClear_Ateam,false);
    document.getElementById("clear_2nd_inning").addEventListener("click",doClear_Bteam,false);
    document.getElementById("clear").addEventListener("click",Clear,false);
    printall();
    get_R_H_E("1");
    get_R_H_E("2");
}

window.addEventListener("load",start,false);