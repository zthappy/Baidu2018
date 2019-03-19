<template>
    <div class='page'>
        <div class="content-box" >
            <ul v-if="tipText">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<style>
.page {
    height: 100%;
    width: 100%;
}
.content-box {
    text-align: center;
}
 .content-box li{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: grey;
    animation:loading-ani 1s linear infinite;;
    -moz-animation: loading-ani 1s linear infinite;
    -webkit-animation: loading-ani 1s linear infinite;
}
.content-box li:nth-child(1) { 
    left: 180px; 
    -webkit-animation-delay: 0.33s; 
    animation-delay: 0.33s; 
}
.content-box li:nth-child(2) { 
    left: 210px;
    animation-delay:0.66s;
    -webkit-animation-delay: 0.66s;
}
.content-box li:nth-child(3) { 
    left: 210px;
    animation-delay: 0.99s;
    -webkit-animation-delay: 0.99s;
}
@keyframes loading-ani{
    0% {
        background-color:#238d7b;
    }
    100% {
        background-color:#bbb;
    }
}
</style>
<script>
export default {
    data: function () {
        return {
            startX: '',
            endX: '',
            startY: '',
            endY: '',
            moveDistance: 0,
            tipText: '',
            el: null,
        }
    },
    created: function () {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    mounted: function () {
        this.el = document.querySelector(".page");
        this.bindTouchEvent();
    },

    // /**
    //  * 生命周期函数--监听页面显示
    //  */
    // onShow: function () {
    // },

    methods: {
       
          /**
         * 绑定touch事件
         */
        bindTouchEvent(){
            let that = this;
            this.el.addEventListener('touchstart', this._touchStart);
    
            this.el.addEventListener('touchmove', this._touchMove);
    
            this.el.addEventListener('touchend', this._touchEnd)
        },
        /**
         * 开始下拉的监听 这里主要是记录下初始坐标 下拉只需记录y即可(这里方便以后测其他的使用,也记录了 x)
         * @param e 下拉事件
         */
        _touchStart(e){
            let touch = e.changedTouches[0];
            // this.tipText = '下拉刷新';
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        },
        /**
         * 下拉过程的监听 这里记录下移动的距离
         * @param e
         */
        _touchMove(e){
            let touch = e.changedTouches[0];
            //获取下拉的距离
            let _move = touch.clientY - this.startY;
            //这里主要是让内容区随着下拉操作而往下滚动
            //_move>0是指往下滑动(下拉),_move<100是给一个上限,不然一直下拉的话整个内容区就会随着下拉距离一直增大,用户体验不是很好
            //这里下拉操作主要是显示出顶上的一层tipText
            if (_move > 0 && _move < 100) {
            this.el.style.marginTop = _move + 'px';
            //记录下下拉的距离
            this.moveDistance = touch.clientY - this.startY;
            if (_move > 50) {
                this.tipText = 'ceshi'
            }
            }
        },
        /**
         * 下拉动作结束(松开手指)监听
         * @param e
         * @private
         */
        _touchEnd(e){
            let touch = e.changedTouches[0];
            this.endX = touch.clientX;
            this.endY = touch.clientY;
            let that = this;
            if (this.moveDistance > 50) {
            this.tipText = '';
            //调用父组件的加载数据的方法
            //这时候要在父组件的数据加载完成后,才将div还原,所以这里把resolve传进了父组件中,也可以采取其他方法
                // new Promise((resolve, reject) => {
                //     // this.$emit('load', resolve);
                //     alert('1111')
                // }).then(() => {
                //     that._resetBox();
                // });
                alert('111')
                this._resetBox();
            } else {
                this._resetBox();
            }
        },
        /**
         * 重置视图
         * 这里的操作主要是将移动的距离还原,用一个定时器慢慢将marginTop的值减回去直到0为止
         */
        _resetBox(){
            let that = this;
            if (this.moveDistance > 0) {
                let timer = setInterval(function () {
                    that.el.style.marginTop = --that.moveDistance + 'px';
                    if (Number(that.el.style.marginTop.split('px')[0]) <= 0) clearInterval(timer);
                }, 1)
            }
        }
    },
    components:{
    }
}
</script>