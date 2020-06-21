

(function () {
    "use strict";

var el = function(element){
    if(element.charAt(0) === "#") {
        return document.querySelector(element);

    }

    return document.querySelectorAll(element);
};

//Varok
var view = el("#view");
var equals = el("#equals");
var numbers = el(".num");
var ops = el(".op");
var curNum = "";
var oldNum = "";
var resultNum;
var operator;
var helpCurNum = "";



// When number is clicked
var setNumber = function() {

    if(resultNum){
        curNum = this.getAttribute("data-num");
        resultNum = "";
    }else{
        curNum += this.getAttribute("data-num")
       
    }

    if(oldNum && operator){
        view.innerHTML = oldNum + " " + operator + " " + curNum;
    }else{
        view.innerHTML = curNum;
    }
};

//When an operator is clicked
var numBack = function() {
    oldNum = curNum;

    curNum = "";
    operator = this.getAttribute("data-op");

    equals.setAttribute("data-result", ""); // Reset result in attr

 
   view.innerHTML = oldNum + " " + operator + " " + curNum;

  };


var displayNumber = function () {

    curNum = parseFloat(curNum);
    oldNum = parseFloat(oldNum);

    switch(operator){

    case "+":
        resultNum = oldNum + curNum;
    break;

    case "-":
        resultNum = oldNum - curNum;
    break;

    case "/":
        resultNum = oldNum / curNum;
    break;

    case "x":
        resultNum = oldNum * curNum;
    break;

    case "%":
        resultNum = (oldNum % curNum) * curNum;
    break;

    default:
        resultNum = curNum;


    }

    //Ha NaN-t vagy Infinity-t ad vissza
    if(!isFinite(resultNum)){
        if(isNaN(resultNum)){
            resultNum = "Tönkretetted -.-";
        }else{
            resultNum = "Nullával mióta osztunk?"
        }
    
    }

  

    //Megjelenítés
    view.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    oldNum = 0;
    curNum = resultNum;


    

    };

    //Clear All button
    var clearAll = function(){
        oldNum = "";
        curNum = "";
        view.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);

    };

    //Onclickek
    for (var i = 0, l = numbers.length; i < l; i++) {
        numbers[i].onclick = setNumber;
      }
    
      // Add click event to operators
      for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = numBack;
      }

    equals.onclick = displayNumber;

    el("#clear").onclick = clearAll;




})();