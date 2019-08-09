

var myTouch = {
    /**
     * 
     * @param {*} el Dom 元素
     * @param {*} callback 
     */
    tap: function (el, callback) {
        var startTime = 0;
        var isMove = false;
        // 点击事件的封装：
        // 移动端的点击事件会有300ms的延迟需要优化。
        // 触屏开始时间和结束的时间差要小于150ms
        // 触发点击事件是：先触发了touch事件，点击事件没有touchmove事件。

        // 触点按下
        el.addEventListener('touchstart', function () {
            startTime = new Date() * 1;
        })
        // 触点移动
        el.addEventListener('touchmove', function () {
            isMove = true;
        })

        //  触点离开
        el.addEventListener('touchend', function () {
            var endTime = new Date() * 1;
            if ((endTime - startTime) < 150 && !isMove) {
                callback && callback();
            }
            startTime = 0;
            isMove = false;
        })

    },
    /**
      * @param {object} el:添加事件的DOM元素
      * @param {function} callback:单击事件执行的回调函数
      * @param {dir} dir 定义方向
      * @function [封装滑动事件：左滑，右滑，上滑，下滑]
      */
    swiper: function (el, dir, callback) {
        // 开始坐标点
        var startPoint = null;
        // 结束坐标点
        var endPoint = null;

        el.addEventListener('touchstart', function (e) {
            var myPoint = e.touches[0];
            startPoint = {
                x: myPoint.clientX,
                y: myPoint.clientY
            }
        })
        // 触点移动
        el.addEventListener('touchmove', function (e) {
            var myPoint = e.touches[0];
            endPoint = {
                x: myPoint.clientX,
                y: myPoint.clientY
            }
        })

        //  触点离开
        el.addEventListener('touchend', function () {
            //计算坐标差值 
            if(startPoint && endPoint && count(startPoint, endPoint) == dir){
                callback && callback();
                // if(callback){
                //     callback()
                // }
            }
        })

        function count(start, end) {
            // 水平
            var diffX = end.x - start.x;
            var diffY = end.y - start.y;
            var text = "";
            // 求绝对值
            var absX = Math.abs(diffX);
            var absY = Math.abs(diffY);
            if (absX > 30 || absY > 30) {
                // 水平或垂直
                if (absX > absY) {
                    // 水平
                    text = diffX > 0 ? "right" : "left";
                } else {
                    //垂直
                    text = diffY > 0 ? "bottom" : "top";
                }
            }
            return text;
        }
        
        // 开始坐标点
        startPoint = null;
        // 结束坐标点
        endPoint = null;
    }
}