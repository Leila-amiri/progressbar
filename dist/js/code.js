
let width, bar, barTxt, limit;
const btn = document.getElementsByTagName("button");

var xmlhttp = new XMLHttpRequest();
let url = "http://pb-api.herokuapp.com/bars";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        myFunction(myObj);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();


function myFunction(obj) {
    limit = Number(obj.limit);
    let i, option, selectList;

    for(i = 0; i < obj.buttons.length; i++) {
        btn[i].textContent = obj.buttons[i]; 
        btn[i].style.display = "inline-block";    
    }
    
    for(i = 0; i < obj.bars.length; i++) {
        bar = document.querySelector("#bar" + (i + 1));
        bar.children[0].innerHTML = obj.bars[i] + "%";
        bar.style.width = (obj.bars[i] / (limit / 100)) + "%";
        bar.parentNode.style.display = "block";  

        selectList = document.querySelector("#selectBar");
        option = document.createElement("option");
        option.text = "#progress" + (i + 1);
        option.value = "bar"+(i+1);
        selectList.add(option);
    }

    bar = document.querySelector("#bar1");
    barTxt = bar.children[0];
    width = obj.bars[0];
    document.querySelector("#current").children[0].innerHTML = " " + limit;
}

 
function move(n) {
  var btnTxt = Number(btn[n].textContent);
  width = width + btnTxt;

  switch(true) {
    case (width > 0 && width < limit):
        barTxt.innerHTML = width + "%";
        bar.style.width = (width / (limit / 100)) + "%";
        bar.style.backgroundColor = "#a7dbf6";  
        break;
    case (width >= limit):
        barTxt.innerHTML = width + "%";
        bar.style.width = 100 + "%";
        bar.style.backgroundColor = "#ed4040";
        break;
    default:
        bar.style.width = 0;
        barTxt.innerHTML = "0%";
        width = 0;
  }
}

const selectBar = document.querySelector("#selectBar");
selectBar.addEventListener("change", function() {
  bar = document.getElementById(selectBar.value);
  barTxt = bar.children[0];
  width = Number(barTxt.textContent.slice(0,-1));
}, false);







