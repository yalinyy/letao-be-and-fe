/*
* @Author: Administrator
* @Date:   2017-11-25 19:59:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 21:57:04
*/
//轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

		// 左侧选项卡
			mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			var controls = document.getElementById("segmentedControls");
				var contents = document.getElementById("segmentedControlContents");

			 //默认选中第一个
			controls.querySelector('.mui-control-item').classList.add('mui-active');
			contents.querySelector('.mui-control-content').classList.add('mui-active');
