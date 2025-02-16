import {Month} from "./month.js";
var months=new Array();
var answer=new Array();//ответы пользователя
var countMonth;
window.onload=function(){
	drawGameGrid();
}
//фиксируем ответ пользователь
function handleRadioChange(numberMonth){
	if(document.getElementById("winter"+numberMonth).checked)
		answer[numberMonth]="зима";
	if(document.getElementById("spring"+numberMonth).checked)
		answer[numberMonth]="весна";
	if(document.getElementById("summer"+numberMonth).checked)
		answer[numberMonth]="лето";
	if(document.getElementById("autumn"+numberMonth).checked)
		answer[numberMonth]="осень";
}
document.getElementById("Done").onclick=DoneClick;
let attaboy=false;//флаг выполнения задания
function DoneClick(){
	//пользователь должен сопоставить ВСЕ месяцы
	if(answer.indexOf("")==-1){
		let numberCorrectAnswers=0;
		for(let i=0; i<countMonth; ++i){
			if(months[i].season==answer[i])
				++numberCorrectAnswers;
		}
		//выведем сообщение о выполнении задания
		let verdict=numberCorrectAnswers==countMonth?"Молодец! Так держать!":"Хорошенько подумай.";
		attaboy=numberCorrectAnswers==countMonth?true:false;
		createMessageBox("Правильных ответов "+numberCorrectAnswers+" из "+countMonth+".<br>"+verdict, "info");
		console.log(numberCorrectAnswers+" из "+countMonth);
	}
	else{
		createMessageBox("Ты не завершил задание.", "warning");
	}
}
function OKClick(type){
	document.getElementsByClassName("modal")[0].style.display="none";
	receivedModalResultOK(type);
}
function createMessageBox(message, type){
	document.getElementById("message").innerHTML=message;
	document.getElementsByClassName("modal")[0].style.display="block";
	document.getElementById("OK").onclick=function(){OKClick(type)};
}
function receivedModalResultOK(type){
	//если пользователь справился, дадим новое задание
	if(type=="info" && attaboy){
		for(let i=countMonth; i>=1; --i){
			document.getElementsByClassName("row")[i].remove();
		}
		answer=[];//подготовим новым массив ответов
		drawGameGrid();
	}
}
function drawGameGrid(){
	countMonth=Math.floor(Math.random()*(6-3)+3);
	let numbersOfMonths=new Array();//номера месяцев для задания
	for(let i=0; i<countMonth; ++i){
		//создаём список месяцев без повторений
		let numberMonth;
		do{
			numberMonth=Math.floor(Math.random()*(13-1)+1);}
		while(numbersOfMonths.indexOf(numberMonth)!=-1)
		numbersOfMonths.push(numberMonth);
		let month=new Month(numberMonth);
		months.push(month);
		answer.push("");
		let newRow=document.createElement("div");
		newRow.setAttribute("class", "row");
		newRow.setAttribute("id", i);
		for(let j=0; j<5; ++j){
			let newCell=document.createElement("div");
			//в первом столбце храним названия месяцев
			if(j!=0){
				newCell.setAttribute("class", "cell clientCell");
				let newRadioButton=document.createElement("input");
				newRadioButton.setAttribute("type", "radio");
				switch(j){
					case 1:{
						newRadioButton.setAttribute("id", "winter"+i);
						newRadioButton.setAttribute("value", "зима");
						break;}
					case 2:{
						newRadioButton.setAttribute("id", "spring"+i);
						newRadioButton.setAttribute("value", "весна");
						break;}
					case 3:{
						newRadioButton.setAttribute("id", "summer"+i);
						newRadioButton.setAttribute("value", "лето");
						break;}
					case 4:{
						newRadioButton.setAttribute("id", "autumn"+i);
						newRadioButton.setAttribute("value", "осень");
						break;}
				}
				newRadioButton.setAttribute("name", "month"+i);
				newRadioButton.setAttribute("class", "picRadio");
				newRadioButton.onchange=function(){handleRadioChange(i);};
				newCell.append(newRadioButton);}
			else{
				newCell.setAttribute("class", "cell headerRow");
				newCell.textContent=months[i].name;}
			newRow.append(newCell);	  
		}
		document.getElementById("GameGrid").append(newRow);
	}
}