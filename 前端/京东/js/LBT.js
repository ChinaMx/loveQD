// JavaScript Document
var lock = true; //锁
	var list = document.getElementById("list"); //图片的位移设置
	var prev = document.getElementById("prev"); //后退
	var next = document.getElementById("next"); //前进
	var span = document.querySelectorAll("#buttons span"); //小圆点
	var carausel = document.getElementById("Carausel"); //轮播图容器
	var fla; //自动轮播的判断标志
	var flag1; //播放下一张图的判断标志
	var flag2; //播放上一张图的判断标志
	var flag3 = false; //设置前进，后退按钮出现的标志
	var flag4 = true;
	var total = 0; //图片移动的当前位置
	var number = 0; //图片的索引
	flag = setInterval(pictruenext, 3000);

	next.onclick = pictruenext; //下一张图
	prev.onclick = pictrueprev; //上一张图

	carausel.onmouseover = function() { //移入轮播图容器
		//停止自动轮播
		flag3 = true;
		clearInterval(flag);//清除定时器
		setNone();//设置当前小圆点的样式

		setNone(); //显示前进，后退按钮。
	}

	carausel.onmouseout = function() {
		flag3 = false;
		flag = setInterval(pictruenext, 3000); //开始自动轮播
		setNone(); //隐藏前进，后退按钮
	}

	for (let i = 0; i < 7; i++) {
		span[i].onclick = function() { //设置当前小圆点的样式
			reset(); //重置小圆点样式
			span[i].className = "on button"; //设置当前小圆点的样式
			buttonClick(i); //点击小圆点，跳到相应的图
		}
	}

	function setNone() { //设置前进，后退按钮
		if (flag3 == true) {
			prev.style = "display:block";
			next.style = "display:block";
		} else {
			prev.style = "display:none";
			next.style = "display:none";
		}

	}

	function reset() { //重置小圆点样式
		for (let i = 0; i < 7; i++) {
			span[i].className = "button";
		}

	}

	function setClassName() { //设置当前小圆点样式
		reset();
		span[number].className = "on button";
	}

	function pictruenext() { //下一张图
		if (lock == true) {
			flag1 = setInterval(nextInterval, 7); //下一张图的过渡动画。后判断溢出
		}
	}

	function pictrueprev() { //上一张图
		if (lock == true) {
			overflow2(); //先判断溢出
			flag2 = setInterval(prevInterval, 7);
		}
	}

	function overflow1() { //前进时后判断是否number溢出
		let temp = number;
		if (temp >= 6) {
			number = 0;
			total = 0;
		} else {
			number += 1;
		}
	}

	function overflow2() { //后退时先判断是否number溢出
		let temp = number;
		temp -= 1;
		if (temp < 0) {
			number = 6;
			total = 5187;
		} else {
			number -= 1;
		}
	}

	function buttonClick(index) { //点击小圆点，跳到相应的图
		number = index;
		total = index * 741;
		setValue();
		clearInterval(flag1);
		clearInterval(flag2);
		lock = true;
	}

	function stopInterval1() { //停止前进动画
		total = total - 6;
		overflow1();
		clearInterval(flag1);
		setClassName();
		lock = true;
	}

	function stopInterval2() { //停止后退动画
		total = total - 6;
		clearInterval(flag2);
		setClassName();
		lock = true;
	}

	function nextInterval() { //下一张图的调用的函数
		lock = false;
		let step = 6;
		total += step;
		if (total > ((number + 1) * 741)) {
			stopInterval1();
			return;
		} else {
			setValue();
		}
	}

	function prevInterval() { //上一张图的调用的函数
		lock = false;
		let step = 6;
		total -= step;
		if (total < ((number) * 741)) {
			stopInterval2();
			total -= step;
			return;
		} else {
			setValue();
		}
	}

	function setValue() { //设置图片的偏移量
		let tt = -1 * total + "px";
		list.style.transform = "translateX(" + tt + ")";
	}
