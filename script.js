function runCode() {

}
checkBox[0] = document.getElementById("1person");
checkBox[1] = document.getElementById("2person");
checkBox[2] = document.getElementById("3person");
checkBox[3] = document.getElementById("4person");
checkBox[4] = document.getElementById("5person");
checkBox[5] = document.getElementById("6person");
checkBox[6] = document.getElementById("7person");
checkBox[7] = document.getElementById("8person");
var text = new Array();

var person2 = ["Bomb", "Boom", "X", "Pim", "Nat", "Pai", "Sai", "Mew"];
text[0] = document.getElementById("text1");
text[1] = document.getElementById("text2");
text[2] = document.getElementById("text3");
text[3] = document.getElementById("text4");
text[4] = document.getElementById("text5");
text[5] = document.getElementById("text6");
text[6] = document.getElementById("text7");
text[7] = document.getElementById("text8");

var remnantText=document.getElementById("remnant");

var debug = new Array();
debug[0] = document.getElementById("debug1");
debug[1] = document.getElementById("debug2");


function match() {
    justStop=0;
    number = []; //reset data in number and matches
    for (var i = 0; i <= checkBox.length - 1; i++) {
        for (var j = 0; j <= checkBox.length - 1; j++) {
            matches[i][j] = false;
        }
        remnant[i]=false;
    }
    var j = 0;
    //put number in to number[j]
    for (var i = 0; i <= checkBox.length - 1; i++) {
        if (checkBox[i].checked == true) {
            number[j] = i;
            j++;
        }
    }
    maxStop=0;
    for(var i=1;i<=number.length-1;i++)
    {
        maxStop=maxStop+i;
    }
    block=Math.floor(number.length/2);//divide the possibility of every match
    maxStop=maxStop/block;
    number.sort(function (a, b) { return 0.5 - Math.random() });
    countForStop=1;

    checkMatchesRemnantAndDebug();
    showText();

}
function reMatch() {
    //shuffle and then check
    var re = true;
    var countForReset = 0;
    var allNameCount = person2.length;
    if (countForStop < maxStop) {
        number.sort(function (a, b) { return 0.5 - Math.random() });
        while (re == true) {
            re = false;
            for (var i = 0; i <= number.length - 2; i = i + 2) {
                for (var j = 0; j <= allNameCount; j++) {
                    for (var k = j + 1; k <= allNameCount; k++) {
                        if ((number[i] == j && number[i + 1] == k && matches[j][k] == true) ||
                            (number[i] == k && number[i + 1] == j && matches[k][j] == true)) {
                            re = true;
                            number.sort(function (a, b) { return 0.5 - Math.random() });
                            countForReset++;
                            //to step out
                            k = allNameCount + 1;
                            j = allNameCount + 1;
                            i = number.length + 1;
                        }
                    }
                }
            }
            // check the remnant when there is an odd number
            if(re==false && (number.length%2)==1)
            {
                for(var i=0;i<=allNameCount;i++){
                    if(number[number.length-1]==i && remnant[i]==true){
                        number.sort(function (a, b) { return 0.5 - Math.random() });
                        countForReset++;
                        re=true;
                        i=allNameCount+1;
                    }
                }
            }
            if (countForReset > 200) {
                //also step out but not show the value
                re = false;
                countForStop=maxStop;
                justStop=1;
                /*
                for (var i = 0; i <= allNameCount; i++) {
                    for (var j = 0; j <= allNameCount; j++) {
                        matches[i][j] = false;
                        matches[j][i] = false;
                    }
                    remnant[i] = false;
                }*/
                document.getElementById("possibility2").innerHTML="It is not possible to match";
            }
        }
        countForStop++;
        checkMatchesRemnantAndDebug();
        
    }   
    if (justStop==0) {
        showText();
    }
    //debug[0].innerHTML = countForReset;

}
function checkMatchesRemnantAndDebug() {
    for (var i = 0; i <= number.length - 2; i = i + 2) {
        matches[number[i]][number[i + 1]] = true;
        matches[number[i + 1]][number[i]] = true;
    }

    if (number.length % 2 == 1) {
        remnant[number[number.length - 1]] = true;
    }

    
    //debug[0].innerHTML = remnant[number[number.length - 1]];
    /*
    try {
        
        debug[1].innerHTML = matches[0][1].toString() + " " + matches[0][2].toString() + "<br>" +
            matches[0][3].toString() + " " + matches[1][2].toString() + "<br>" +
            matches[1][3].toString() + " " + matches[2][3].toString() + "<br>";
           
            debug[1].innerHTML = remnant[0].toString()+"<br>"+
            remnant[1].toString()+"<br>"+
            remnant[2].toString()+"<br>"+
            remnant[3].toString()+"<br>"+
            remnant[4].toString()+"<br>"+
            remnant[5].toString()+"<br>"+
            remnant[6].toString()+"<br>"+
            remnant[7].toString()+"<br>";
        } catch (err) {
        debug[1].innerHTML =
            err.name + "<br>" + err.message;
    }*/
    
    
}
function showText() {

    for (var i = 0; i <= person2.length - 1; i++) {
        var s = "";
        for (var j = 0; j <= person2.length - 1; j++) {
            if (number[i] == j) {
                s = person2[j];
                j = 20;
            }
        }
        if(i==number.length-1 && (number.length-1)%2==0 && i%2==0)
        {
            remnantText.innerHTML=s;
        }else{
            text[i].innerHTML = s;
        }

        
    }
    if((number.length)%2==0){
        remnantText.innerHTML="";
    }
    document.getElementById("possibility").innerHTML="Possibility "+countForStop.toString()+"/"+maxStop.toString();
    document.getElementById("possibility2").innerHTML="";

}