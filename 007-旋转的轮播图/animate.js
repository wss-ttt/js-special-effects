//参数右变为3个
function animate(ele, attr, fn) {
    //先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true;
        // 遍历attr
        for (var k in attr) {
            // k -> 属性
            // attr[k] -> target
            // 四步
            var leader;
            if (k === 'opacity') {
                // FF chrome ie(含)9+ 获取的透明度值是小数制的
                // eg 0.3... 所以这里需要乘以100
                // 在这里进行一个四舍五入 取整
                // ie8中测试的时候,发现 leader=为一个无限不循环的小数了
                // 否则就不能停止掉定时器
                leader = Math.round(getStyle(ele, k) * 100) || 1;
                console.log(leader);
            } else {
                leader = parseInt(getStyle(ele, k)) || 0;
            }
            //  求出剩余距离
            // var distance = attr[k] - leader;
            //1.获取步长
            var step = (attr[k] - leader) / 10;
            //2.二次加工步长
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            //3.赋值
            if (k === 'opacity') {
                ele.style[k] = leader / 100;   // 小数制
                // 兼容ie6/7/8 
                ele.style.filter = 'alpha(opacity=' + leader + ')'; // 百分制
            } else if (k === 'zIndex') {
                // 层级的处理,直接赋值就行了,不需要缓动赋值
                ele.style.zIndex = attr[k];
            } else {
                ele.style[k] = leader + "px";
            }
            console.log(1);
            // 或者如下进行判断更加简单(不考虑目标值是小数,eg:400.5)
            // 而且本身 step就进行取整了,小数值目标也达不到
            //  4.判断条件:两个值不相等,就说明该属性还没达到目标值,
            // 那么,此时就不能清除定时器
            if (attr[k] !== leader) {
                flag = false;
            }
        }
        // 5.清除定时器
        if (flag) {
            clearInterval(ele.timer);
            // 需要判断是否传递了fn
            if (fn) {
                fn();
            }
        }
    }, 25);
}


//兼容方法获取元素样式
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        // ie9 获取  谷歌(因为ie9有该属性)
        return getComputedStyle(obj, null)[attr];
    } else {
        // ie8(含)以下
        return obj.currentStyle[attr];
    }
}
