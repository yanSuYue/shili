export default {
	componentsName_pageTurn:{
		                           //需要分页的总数据   *根据实际情况手动添加*    ↓↓↓↓↓
		arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],    
		onePage:7,             //每一页的数据条数       *根据实际情况手动改变*
		view:4,               //当前按钮显示的页数数字
		pageSum(){            //总页数
			return this.arr.length/this.onePage==parseInt(this.arr.length/this.onePage)?parseInt(this.arr.length/this.onePage):parseInt(this.arr.length/this.onePage)+1
		},   
		now:1,                 //当前第几页
		goTo:null,             //直接跳转到哪一页
		pageContent(index){    //当前页所需要展示的数据数组
			return this.arr.slice((index-1)*this.onePage, index*this.onePage);
		}
	}
};