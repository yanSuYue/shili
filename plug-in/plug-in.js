function _MovingScroll(obj){                          //滚动条插件
    var MovingScroll={
        box:obj.box,                            
        contentBox:obj.contentBox,           
        scrollBox:obj.scrollBox,            
        speed:obj.speed,
        position:obj.position || null,
        watch_keyup:obj.watch_keyup || false,                    
        height_box(){
            return parseInt(this.box.getStyle('height'));
        },
        height_content(){
            return parseInt(this.contentBox.el.offsetHeight);
        },
        height_scroll(){
            return this.height_content()<=this.height_box()?0:Math.ceil((this.height_box()/this.height_content())*this.height_box());
        }
    }; 
    MovingScroll.contentBox.transition('.5s ease-out');
    setTimeout(function(){
        MovingScroll.scrollBox.transition('.5s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'cursor':'pointer'});       //初始化滚动条高度，必要时需要加定时器
    },500);        
    MovingScroll.box.mousewheel(function(){
        //滚动条跟着内容box走 ↓↓↓
        var top_contentBox=parseInt(MovingScroll.contentBox.getStyle('top')) + MovingScroll.speed;
        if(top_contentBox>0 || MovingScroll.height_content()<MovingScroll.height_box())top_contentBox=0;
        if(MovingScroll.height_content()<MovingScroll.height_box())top_contentBox=0;
        MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
        var top_scrollBox=-Math.ceil(top_contentBox / MovingScroll.height_box() * MovingScroll.height_scroll());
        MovingScroll.scrollBox.transition('.5s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});

        //内容box跟着滚动条走 ↓↓↓
/*        var top_scrollBox=parseInt(MovingScroll.scrollBox.getStyle('top')) - MovingScroll.speed;
        if(top_scrollBox<0 || MovingScroll.height_content()<MovingScroll.height_box())top_scrollBox=0;
        MovingScroll.scrollBox.transition('.1s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        var top_contentBox=-Math.ceil(top_scrollBox / MovingScroll.height_scroll() * MovingScroll.height_box());
        MovingScroll.contentBox.transition('.5s ease-out').css('top', top_contentBox+'px');*/
    }, function(){
        //滚动条跟着内容box走 ↓↓↓
        var top_contentBox=parseInt(MovingScroll.contentBox.getStyle('top')) - MovingScroll.speed;
        if(top_contentBox<-(MovingScroll.height_content()-MovingScroll.height_box()))top_contentBox=-(MovingScroll.height_content()-MovingScroll.height_box());
        if(MovingScroll.height_content()<MovingScroll.height_box())top_contentBox=0;
        MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
        var top_scrollBox=-Math.ceil(top_contentBox / MovingScroll.height_box() * MovingScroll.height_scroll());
        MovingScroll.scrollBox.transition('.5s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});

        //内容box跟着滚动条走 ↓↓↓
/*        var top_scrollBox=parseInt(MovingScroll.scrollBox.getStyle('top')) + MovingScroll.speed;
        if(top_scrollBox>(MovingScroll.height_box()-MovingScroll.height_scroll()))top_scrollBox=MovingScroll.height_box()-MovingScroll.height_scroll();
        if(MovingScroll.height_content()<MovingScroll.height_box())top_scrollBox=0;
        MovingScroll.scrollBox.transition('.1s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        var top_contentBox=-Math.ceil(top_scrollBox / MovingScroll.height_scroll() * MovingScroll.height_box());
        MovingScroll.contentBox.transition('.5s ease-out').css('top', top_contentBox+'px');*/
    });
    MovingScroll.box.BD({mouseenter(){
        MovingScroll.scrollBox.transition('1s ease-out').css('opacity', 1);
    }, mouseleave(){
        MovingScroll.scrollBox.transition('1s ease-out').css('opacity', .3);
    },click(){                                    //默认当点击容器盒子时，执行滚动条盒子的高度自动变化
        setTimeout(function() {
            var top_contentBox=parseInt(MovingScroll.contentBox.getStyle('top'));
            if(top_contentBox>0 || MovingScroll.height_content()<MovingScroll.height_box()){
                top_contentBox=0;
            }else if(top_contentBox<-(MovingScroll.height_content()-MovingScroll.height_box())){
                top_contentBox=-(MovingScroll.height_content()-MovingScroll.height_box());
            }
            if(MovingScroll.height_content()<MovingScroll.height_box())top_contentBox=0;
            MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
            var top_scrollBox=-Math.ceil(top_contentBox / MovingScroll.height_box() * MovingScroll.height_scroll());
            MovingScroll.scrollBox.transition('.5s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        }, 500);
    }});
    if(obj.watch_keyup===true){                  //当页面上按键抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('keyup', function(){         
            setTimeout(function() {
                var top_contentBox=parseInt(MovingScroll.contentBox.getStyle('top')) + MovingScroll.speed;
                if(top_contentBox>0 || MovingScroll.height_content()<MovingScroll.height_box()){
                    top_contentBox=0;
                }else if(top_contentBox<-(MovingScroll.height_content()-MovingScroll.height_box())){
                    top_contentBox=-(MovingScroll.height_content()-MovingScroll.height_box());
                }
                if(MovingScroll.height_content()<MovingScroll.height_box())top_contentBox=0;
                MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
                var top_scrollBox=-Math.ceil(top_contentBox / MovingScroll.height_box() * MovingScroll.height_scroll());
                MovingScroll.scrollBox.transition('.5s ease-out').css({'height':MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
            }, 500);        
        })        
    }
    MovingScroll.scrollBox.BD('mousedown', function(event){
        _stopPropagation(event);
        _preventDefault(event);
        var cursor=getClient(event).y;
        var L=cursor-parseInt(MovingScroll.scrollBox.getStyle('top'));
        var runner=function(event){
            var cursor=getClient(event).y;
            var s=cursor-L;
            if(s<0)s=0;
            if(s>parseInt(MovingScroll.box.getStyle('height'))-parseInt(MovingScroll.scrollBox.getStyle('height')))s=parseInt(MovingScroll.box.getStyle('height'))-parseInt(MovingScroll.scrollBox.getStyle('height'));
            var S=Math.floor(-s*parseInt(MovingScroll.box.getStyle('height'))/parseInt(MovingScroll.scrollBox.getStyle('height')));
            MovingScroll.scrollBox.transition('').css('top', s+'px');
            MovingScroll.contentBox.transition('').css('top', S+'px');
        };
        _(document).BD('mousemove', runner);
        _(document).BD('mouseup', function(){
            _(document).unBD('mousemove', runner);
        }); 
    });
    if(isArray(MovingScroll.position) && MovingScroll.position.length>0){
        for(var i=0; i<MovingScroll.position.length; i++){
            MovingScroll.position[i].clickObj.el.setAttribute('MovingScrollPlugIn', i);
            MovingScroll.position[i].clickObj.BD('click', function(){
                var mark= MovingScroll.position[this.getAttribute('MovingScrollPlugIn')].targetObj.el.offsetTop>(MovingScroll.height_content()-MovingScroll.height_box())?-(MovingScroll.height_content()-MovingScroll.height_box()):-(MovingScroll.position[this.getAttribute('MovingScrollPlugIn')].targetObj.el.offsetTop);
                if(MovingScroll.height_content()<MovingScroll.height_box())mark=0;
                MovingScroll.contentBox.transition('.5s ease-out').css('top', mark+'px');
                MovingScroll.scrollBox.transition('.5s ease-out').css('top', Math.ceil(-mark*MovingScroll.height_scroll()/MovingScroll.height_box())+'px');
            })
        };
    }
};

/*_MovingScroll({                          //滚动条插件    参数：json
    box:_('.box', 0),                   //容器盒子选择器  element       容器盒子不能加任何border、padding和margin相关的任何样式，如有需要可在容器盒子再套一个div来添加样式
    contentBox:_('.content', 0),        //滚动内容盒子选择器  element
    scrollBox:_('.scroll', 0),          //滚动条盒子选择器  element     滚动条盒子不能加任何border、padding和margin相关的任何样式
    speed:50,                           //滚动速度  number 
    position:[                          //锚记定位  array   *数组内是各个json对象[json, json, ...]，json内是{clickObj:锚记链接元素，targetObj:锚记书签元素}
        {clickObj:_('.c1', 0), targetObj:_('.t1', 0)},
        {clickObj:_('.c2', 0), targetObj:_('.t2', 0)},
        {clickObj:_('.c3', 0), targetObj:_('.t3', 0)},
        {clickObj:_('.c4', 0), targetObj:_('.t4', 0)},
        {clickObj:_('.c5', 0), targetObj:_('.t5', 0)}
    ],
    watch_keyup:false                  //当页面上按键抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项       
});*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullDown(obj){                           //下拉内容过渡插件
    var PullDown={
        caption:obj.caption,
        down:obj.down,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || false,
        choosable:obj.choosable || false,
        height(){
            return this.down.getStyle('height');
        },
        padding_top(){
            return this.down.getStyle('paddingTop');
        },
        padding_bottom(){
            return this.down.getStyle('paddingBottom');
        },
        margin_top(){
            return this.down.getStyle('marginTop');
        },
        margin_bottom(){
            return this.down.getStyle('marginBottom');
        }
    };
    var height=PullDown.height();
    var top_p=PullDown.padding_top();
    var bottom_p=PullDown.padding_bottom();
    var top_m=PullDown.margin_top();
    var bottom_m=PullDown.margin_bottom();
    if(PullDown.now===true)PullDown.down.css({opacity:1, height:height, overflow:'hidden'});
    if(PullDown.now===false)PullDown.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, overflow:'hidden'});
    if(PullDown.choosable===false)PullDown.caption.choosable(false);
    PullDown.caption.css('cursor', 'pointer');
    PullDown.caption.BD('click', function(event){
        _stopPropagation(event);
        if(PullDown.now===false){
            PullDown.down.transition(PullDown.speed+'s ease').css({opacity:1, height:height, paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
        }else{
            PullDown.down.transition(PullDown.speed+'s ease').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        };
        PullDown.now=!PullDown.now;
    });
    if(PullDown.D_click===false){
        _(document).BD('click', function(){
            PullDown.down.transition(PullDown.speed+'s ease').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            PullDown.now=false;
        });
    }
    if(PullDown.select===false){
        PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            PullDown.down.transition(PullDown.speed+'s ease').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            PullDown.now=false;
        })
    }  
};

/*_PullDown({                               //下拉内容过渡插件  参数：json
    caption:_('.caption', 0),             //标题选择器                                         element
    down:_('.down', 0),                   //下拉内容选择器                                     element
    speed:1,                              //速度(在几秒内完成过渡)                             number      [可选, 默认0.5]
    now:false,                            //下拉内容初始状态(false隐藏或者true显示)            boolean     [可选, 默认false]
    select:false,                         //点击下拉框是否隐藏下拉框(false隐藏或者true不隐藏)  boolean     [可选, 默认false]
    D_click:false,                        //点击背景是否隐藏下拉框(false隐藏或者true不隐藏)    boolean     [可选，默认false]
    choosable:false                       //标题选择器内的文字是否可被选中(false不可被选中)    boolean     [可选, 默认false]
});*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullLeft(obj){                           //左拉内容过渡插件
    var PullLeft={
        caption:obj.caption,
        left:obj.left,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || true,
        choosable:obj.choosable || false,
        width(){
            return this.left.getStyle('width');
        },
        padding_left(){
            return this.left.getStyle('paddingLeft');
        },
        padding_right(){
            return this.left.getStyle('paddingRight');
        },
        margin_left(){
            return this.left.getStyle('marginLeft');
        },
        margin_right(){
            return this.left.getStyle('marginRight');
        }
    };
    var width=PullLeft.width();
    var left_p=PullLeft.padding_left();
    var right_p=PullLeft.padding_right();
    var left_m=PullLeft.margin_left();
    var right_m=PullLeft.margin_right();
    if(PullLeft.now===true)PullLeft.left.css({opacity:1, width:width, overflow:'hidden'});
    if(PullLeft.now===false)PullLeft.left.css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0, overflow:'hidden'});
    if(PullLeft.choosable===false)PullLeft.caption.choosable(false);
    PullLeft.caption.css('cursor', 'pointer');
    PullLeft.caption.BD('click', function(event){
        _stopPropagation(event);
        if(PullLeft.now===false){
            PullLeft.left.transition(PullLeft.speed+'s ease').css({opacity:1, width:width, paddingLeft:left_p, paddingRight:right_p, marginLeft:left_m, marginRight:right_m});
        }else{
            PullLeft.left.transition(PullLeft.speed+'s ease').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
        }
        PullLeft.now=!PullLeft.now;
    });
    if(PullLeft.D_click===true){
        _(document).BD('click', function(){
            PullLeft.left.transition(PullLeft.speed+'s ease').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            PullLeft.now=false;
        });
    }
    if(PullDown.select===true){
        PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            PullLeft.left.transition(PullLeft.speed+'s ease').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            PullLeft.now=false;
        })
    }   
};

/*_PullLeft({                               //左拉内容过渡插件  参数：json
    caption:_('.caption', 0),             //标题选择器                                         element
    left:_('.left', 0),                   //左拉内容选择器                                     element
    speed:1,                              //速度(在几秒内完成过渡)                             number      [可选, 默认0.5]
    now:false,                            //左拉内容初始状态(false隐藏或者true显示)            boolean     [可选, 默认false]
    select:false,                         //点击左拉框是否隐藏左拉框(false隐藏或者true不隐藏)  boolean     [可选, 默认false]
    D_click:false,                        //点击背景是否隐藏左拉框(false隐藏或者true不隐藏)    boolean     [可选，默认false]
    choosable:false                       //标题选择器内的文字是否可被选中(false不可被选中)    boolean     [可选, 默认false]
});*/