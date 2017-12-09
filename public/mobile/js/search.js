$(function () {
  // 1.当页面载入之后 展示历史记录列表
  getHistoryList();
  //2点击搜索按钮,显示搜索列表
  $('.search-box span').on('click',function(){
    setHistory($('.search-box input').val());
    location.href='./searchList.html?key='+$('.search-box input').val();
    $('.search-box input').val('');

  });
  // 3 点击历史及录列表,把文字当成搜索词
  $('.history-list').on('click','span',function(){
    location.href='./searchList.html?key='+$(this).html();

  });
  // 4 点击清空列表,清空历史记录
  $('.history-list .clear').on('click',function(){
    localStorage.removeItem('aHistory');
    getHistoryList();
  });
  // 5 点击删除按钮,删除记录
  $('.history-list').on('click','i',function(){
    var val=$(this).siblings('span').html();
    delHistory(val);
    getHistoryList();
  })


  
})







// 如何获取历史记录
var getHistory = function () {
  // 这句话意味着如果有历史记录 我就获取到历史记录 如果没有那么我一定获取的是一个空数组
  return JSON.parse(localStorage.getItem('aHistory') || '[]');
}

// var cc =getHistory();

// console.log(cc); // 空数组
// 如何添加历史记录
var setHistory = function (value) {
  // 1.value是什么 -- input中的输入的内容   ['','','']
  // 2.定义一个空数组--可以直接通过getHistory获取
  var aArr = getHistory(); //数组 --有元素和没有元素两种情况
  // 判断一下你输入的值是不是已经在数组中存在了 如果存在了就不再添加了 如果步存在 则需要添加
  // 1.遍历数组 $.each(数组名称,function(index,item){})
  $.each(aArr, function (i, item) {
    // 2.判断数组中的每一个值是否和value一样
    if (item == value) {
      // 3.如果一样 就不再添加了(找到item==value)的时候对应的索引 把那个索引找到 切掉一个元素
      aArr.splice(i, 1);
    }
  })

  aArr.push(value)
  // 现在的aArr是一个js数组 我们要的是json
  localStorage.setItem('aHistory', JSON.stringify(aArr));
}
setHistory("nine");
// 如何删除历史记录
// 1.肯定不能用localStorage.removeItem()
var delHistory = function (value) {
  // 1.获取历史记录
  // 2.获取的历史记录是 数组 ["zs","ls"];
  var aArr = getHistory();
  // 3.如果遍历数组完找到了和value一样的值就给他切掉
  $.each(aArr, function (i, item) {
    if (value == item) {
      aArr.splice(i, 1);
    }
  })
  // 4.还要把变化的历史记录添加到历史记录中
  window.localStorage.setItem("aHistory", JSON.stringify(aArr));
}

var getHistoryList = function(){
    // 历史记录
  // 1.没有历史记录告诉用户 “没有历史搜索记录”
  // 2.如果有历史记录  使用列表展示
  var HistoryData = {
    list: getHistory()
  }
  // console.log(HistoryData);
  var historyList = template('history-template',HistoryData);
  // console.log(historyList);
  $('.history-list').html(historyList);
}
getHistoryList();