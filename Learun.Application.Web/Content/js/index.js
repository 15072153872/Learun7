$(function(){
	$('.menuLi').click(function(){
		$(this).addClass('liBg').siblings().removeClass('liBg')
	})
	$('.tipTitle').click(function(){
		$(this).addClass('tiggleColor').siblings().removeClass('tiggleColor')
	})
})
