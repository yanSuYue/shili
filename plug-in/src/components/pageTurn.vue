<template>
<div class="componentsName_pageTurn_Box">
	<div class="componentsName_pageTurn_ContentBox">
		<div :class="{componentsName_pageTurn_ContentList:true, componentsName_pageTurn_ContentList_bk:index%2==1}" v-for="(val, index) in componentsName_pageTurn.pageContent(componentsName_pageTurn.now)">
			{{'第 '+val+' 条记录: 我在第'+componentsName_pageTurn.now+'页, 我在本页的编号是 '+(index+1)}}
		</div>
	</div>
	<div class="componentsName_pageTurn_btnBox">
		<div class="componentsName_pageTurn_up" @click="componentsName_turnTo('up')">上一页</div>
		<div class="componentsName_pageTurn_down" @click="componentsName_turnTo('down')">下一页</div>
		<div class="componentsName_pageTurn_pageBox">
			<div :class="{componentsName_pageTurn_pageF:true, now_bk:componentsName_pageTurn.now==1}" v-if="componentsName_pageTurn.view>=4" @click="componentsName_turnTo(1)">            <!-- 页数按钮_前面第一个按钮 -->
				<span :class="{componentsName_pageTurn_pageText:true, aassdd4:false}">1</span>
			</div>

			<div :class="{componentsName_pageTurn_pageF2:true, now_bk:componentsName_pageTurn.now==2}" v-if="componentsName_pageTurn.view==4&&componentsName_pageTurn.pageSum()>1" @click="componentsName_turnTo(2)">   <!-- 页数按钮_前面第二个按钮 -->
				<span class="componentsName_pageTurn_pageText">2</span>
			</div>          
			<div class="componentsName_pageTurn_pointF" v-if="componentsName_pageTurn.pageSum()>3&&componentsName_pageTurn.view>4"><span class="componentsName_pageTurn_pageText">......</span></div>
 

			<div :class="{componentsName_pageTurn_pageM1:true, now_bk:componentsName_pageTurn.now==componentsName_pageTurn.view-1}" v-if="componentsName_pageTurn.pageSum()>2" @click="componentsName_turnTo(3)">        <!-- 页数按钮_中间第一个按钮 -->
				<span class="componentsName_pageTurn_pageText">{{componentsName_pageTurn.view-1}}</span>
			</div>
			<div :class="{componentsName_pageTurn_pageM2:true, now_bk:componentsName_pageTurn.now==componentsName_pageTurn.view}" v-if="componentsName_pageTurn.pageSum()>3" @click="componentsName_turnTo(4)">          <!-- 页数按钮_中间第二个按钮 -->
				<span class="componentsName_pageTurn_pageText">{{componentsName_pageTurn.view}}</span>
			</div>
			<div :class="{componentsName_pageTurn_pageM3:true, now_bk:componentsName_pageTurn.now==componentsName_pageTurn.view+1}" v-if="componentsName_pageTurn.pageSum()>4" @click="componentsName_turnTo(5)">        <!-- 页数按钮_中间第三个按钮 -->
				<span class="componentsName_pageTurn_pageText">{{componentsName_pageTurn.view+1}}</span>
			</div>

			<div :class="{componentsName_pageTurn_pageN2:true, now_bk:componentsName_pageTurn.now==componentsName_pageTurn.pageSum()-1}" v-if="componentsName_pageTurn.pageSum()>5&&(componentsName_pageTurn.pageSum()==6||componentsName_pageTurn.pageSum()==7||((componentsName_pageTurn.pageSum()-componentsName_pageTurn.view)==3))" @click="componentsName_turnTo(6)">            <!-- 页数按钮_倒数第二个按钮 -->
				<span class="componentsName_pageTurn_pageText">{{componentsName_pageTurn.view+2}}</span>
			</div>          
			<div class="componentsName_pageTurn_pointN" v-if="componentsName_pageTurn.pageSum()>7&&(componentsName_pageTurn.pageSum()-componentsName_pageTurn.view)>3"><span class="componentsName_pageTurn_pageText">......</span></div>

			<div :class="{componentsName_pageTurn_pageN:true, now_bk:componentsName_pageTurn.now==componentsName_pageTurn.pageSum()}" v-if="componentsName_pageTurn.pageSum()>6" @click="componentsName_turnTo(7)">            <!-- 页数按钮_尾页按钮 -->
				<span :class="{componentsName_pageTurn_pageText:true, aassdd4:false}" v-text="componentsName_pageTurn.pageSum()"></span>
			</div>       
		</div>
		<div class="componentsName_pageTurn_turnBox">
			<span class="componentsName_pageTurn_turnText">跳转到</span>
			<input type="text" maxlength="2" class="componentsName_pageTurn_turnIpt" title="请输入数字" @keyup="componentsName_mustBeNum($event)" v-model="componentsName_pageTurn.goTo">
			<div class="componentsName_pageTurn_turnGo" @click="componentsName_turnTo('goTo')">go</div>
		</div>
	</div>
</div>
</template>

<script>
import Data from '../Data.js';

export default {
	data(){
		return Data
	},
	methods:{
		componentsName_turnTo(index){
			if(index==1){
				this.componentsName_pageTurn.view=4;
				this.componentsName_pageTurn.now=1;
			}
			if(index==2){
				this.componentsName_pageTurn.view=4;
				this.componentsName_pageTurn.now=2;
			}
			if(index==3){
				if(this.componentsName_pageTurn.view<5){
					this.componentsName_pageTurn.view=4;
					this.componentsName_pageTurn.now=3;
				}else{
					this.componentsName_pageTurn.view-=1;
					this.componentsName_pageTurn.now=this.componentsName_pageTurn.view;					
				};
			}
			if(index==4){
				this.componentsName_pageTurn.now=this.componentsName_pageTurn.view;
			}
			if(index==5){
				if(this.componentsName_pageTurn.pageSum()-this.componentsName_pageTurn.view>3){
					this.componentsName_pageTurn.view+=1;
					this.componentsName_pageTurn.now=this.componentsName_pageTurn.view;
				}else{
					this.componentsName_pageTurn.now=this.componentsName_pageTurn.view+1;
				}
			}
			if(index==6){
				this.componentsName_pageTurn.now=this.componentsName_pageTurn.view+2;
			}
			if(index==7){
				this.componentsName_pageTurn.view=this.componentsName_pageTurn.pageSum()-3;
				this.componentsName_pageTurn.now=this.componentsName_pageTurn.pageSum();
			}
			if(index=='up'){
				if(this.componentsName_pageTurn.now>1)this.componentsName_pageTurn.now-=1;
				if(this.componentsName_pageTurn.pageSum()-this.componentsName_pageTurn.now>3 && this.componentsName_pageTurn.view>4)this.componentsName_pageTurn.view-=1;
			}
			if(index=='down'){
				if(this.componentsName_pageTurn.now<this.componentsName_pageTurn.pageSum())this.componentsName_pageTurn.now+=1;
				if(this.componentsName_pageTurn.now>4 && this.componentsName_pageTurn.pageSum()-this.componentsName_pageTurn.view>3)this.componentsName_pageTurn.view+=1;
			}
			if(index=='goTo'){
				if(this.componentsName_pageTurn.goTo && !isNaN(this.componentsName_pageTurn.goTo)){
					if(this.componentsName_pageTurn.goTo>this.componentsName_pageTurn.pageSum()){
						alert('输入的数字超过总页数,请输入小于或等于 '+this.componentsName_pageTurn.pageSum()+' 的数字');
						this.componentsName_pageTurn.goTo=null;
					}else{
						if(this.componentsName_pageTurn.goTo<5){
							this.componentsName_pageTurn.view=4;
							this.componentsName_pageTurn.now=this.componentsName_pageTurn.goTo;
						}else if(this.componentsName_pageTurn.goTo>this.componentsName_pageTurn.pageSum()-3){
							this.componentsName_pageTurn.view=this.componentsName_pageTurn.pageSum()-3;
							this.componentsName_pageTurn.now=this.componentsName_pageTurn.goTo;
						}else{
							this.componentsName_pageTurn.view=parseInt(this.componentsName_pageTurn.goTo);
							this.componentsName_pageTurn.now=this.componentsName_pageTurn.goTo;
						};
						this.componentsName_pageTurn.goTo=null;
					};
				}
			}
		},
		componentsName_mustBeNum(event){
			if(event.keyCode<48||(event.keyCode>57&&event.keyCode<96)||event.keyCode>105)this.componentsName_pageTurn.goTo=null;
		}
	},
	mounted:function(){
		var timer_componentsName=setInterval(function(){
			if(ifDom('.componentsName_pageTurn_ContentList')){         //为防止展示数据是一个空对象导致的页面无法渲染,这里须加一个判断
				_('.componentsName_pageTurn_up').setH('.componentsName_pageTurn_up', {lineHeight:1});
				_('.componentsName_pageTurn_down').setH('.componentsName_pageTurn_down', {lineHeight:1});
				_('.componentsName_pageTurn_pageText').setH('.componentsName_pageTurn_up', {lineHeight:1});
				_('.componentsName_pageTurn_turnGo').setH('.componentsName_pageTurn_turnGo', {lineHeight:1});
				_('.componentsName_pageTurn_ContentList').setH('.componentsName_pageTurn_ContentBox', {height:1/this.componentsName_pageTurn.onePage}); //自适应内容列表容器高度
				_('.componentsName_pageTurn_ContentList').setH('.componentsName_pageTurn_ContentList', {lineHeight:1});
				_('.componentsName_pageTurn_turnText').setH('.componentsName_pageTurn_turnBox', {lineHeight:1});

				clearInterval(timer_componentsName);
			}			
		}.bind(this),50);
	},
	updated:function(){
		if(document.getElementsByClassName('componentsName_pageTurn_ContentList')[0]){        //为防止展示数据是一个空对象导致的页面无法渲染,这里须加一个判断
			_('.componentsName_pageTurn_ContentList').css({height:parseInt(_('.componentsName_pageTurn_ContentBox', 0).getStyle('height'))/this.componentsName_pageTurn.onePage+'px'});    //自适应内容列表容器高度, 可改进
			_('.componentsName_pageTurn_ContentList').css({lineHeight:_('.componentsName_pageTurn_ContentList', 0).getStyle('height')});          //行高自适应,需改进
		}
	}
}
</script>

<style>
.componentsName_pageTurn_Box {width:100%; height:100%; position:relative;}
.componentsName_pageTurn_ContentBox {width:100%; height:80%; position:absolute; top:2%;}
.componentsName_pageTurn_ContentList {width:94%; margin-left:3%; font-size:14px;}
.componentsName_pageTurn_ContentList_bk {background:#EBEBEB;}
.componentsName_pageTurn_btnBox {width:100%; height:15%; position:absolute; bottom:2%; z-index:10;}

.componentsName_pageTurn_up {width:10%; height:70%; position:absolute; left:5%; bottom:15%; border-radius:5px; background:#f3f3f3; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer; text-align:center; font-size:10px;}
.componentsName_pageTurn_up:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_down {width:10%; height:70%; position:absolute; left:63%; bottom:15%; border-radius:5px; background:#f3f3f3; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer; text-align:center; font-size:10px;}
.componentsName_pageTurn_down:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageBox {width:48%; height:70%; position:absolute; left:15%; bottom:15%; font-size:10px;}

.componentsName_pageTurn_turnBox {width:25%; height:70%; position:absolute; left:75%; bottom:15%;}
.componentsName_pageTurn_turnText {font-size:10px; height:100%; float:left;}
.componentsName_pageTurn_turnIpt {width:20%; height:90%; outline:none; border-radius:5px; border:1px solid #A8A8A8; font-size:14px; float:left; margin-left:5%;}
.componentsName_pageTurn_turnGo {width:30%; height:100%; border-radius:5px; text-align:center; font-size:12px; background:#f3f3f3; cursor:pointer; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer; float:left; margin-left:5%;}
.componentsName_pageTurn_turnGo:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}

.componentsName_pageTurn_pageF {width:12%; height:100%; margin-left:2%; background:#f3f3f3; border-radius:5px; position:absolute; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageF:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageF2 {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:16%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageF2:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageM1 {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:30%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageM1:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageM2 {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:44%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageM2:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageM3 {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:58%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageM3:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pageN2 {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:72%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageN2:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;} 
.componentsName_pageTurn_pageN {width:12%; height:100%; background:#f3f3f3; border-radius:5px; position:absolute; left:86%; cursor:pointer; text-align:center; box-shadow:1px 1px 3px #A5A5A5; cursor:pointer;}
.componentsName_pageTurn_pageN:hover {color:#E6952B; text-shadow:0px 0px 3px #FEFFB4;}
.componentsName_pageTurn_pointN {width:12%; height:100%; position:absolute; left:72%; text-align:center;}
.componentsName_pageTurn_pointF {width:12%; height:100%; position:absolute; left:16%; text-align:center;}
.now_bk {background:#D9D9D9;}
.componentsName_pageTurn_pageText {}	
</style>