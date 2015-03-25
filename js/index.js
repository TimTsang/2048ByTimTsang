window.onload = function(){
    function timtsang2048(){
        this.data = [];
        this.flag = true;//检测能否上下左右移动的标志
        this.full = 0;//小版块是否已经充满16格子
        this.maxNum = 0;//计数
        this.init();
        this.addNew();
    }
    timtsang2048.prototype = {
        
        //初始化数组
        init:function(){
            /*产生4*4=0的新数组，数组重置*/
            for (var i = 0 ; i < 4 ; i++){
                this.data.push([]);
                for (var j = 0 ; j < 4 ; j ++){ 
                    this.data[i].push(0);
                }
            }
        },
        
        //添加一个新的小板块
        addNew:function(){
            while(1){/*随机位置上产生一个随机的2或4*/
                pos = Math.floor(Math.random() * 16);
                var x = Math.floor(pos/4);//横坐标
                var y = Math.floor(pos%4);//纵坐标
                if (this.data[x][y] == 0) {
                    this.data[x][y] = Math.ceil(Math.random()*4) < 4 ? 2 : 4;
                    break;
                }
            }
        },
        
        //将小版块显示在页面上
        displayDiv:function(game){
            console.dir(game.data);
            var n = "cell_";//id名
            var nowId = null;
            for( var i = 0 ; i < 4 ; i++ ){
                for( var j = 0 ; j < 4 ; j++ ){
                    nowId = n + ( i * 4 + j );
                    if( game.data[i][j] != 0 ){
                        document.getElementById(nowId).innerHTML="<div class='tile tile_"+game.data[i][j]+"'><div class='tile-inner'>"+game.data[i][j]+"</div></div>";
                    }else{
                        document.getElementById(nowId).innerHTML="";
                    }
                }
            }
        },
        
        //小版块向左移动
        moveToLeft:function(game,i){
            var nowRowlen = game.data[i].length;
            for(var j = 0 ; j < nowRowlen - 1 ; j++ ){
                if(game.data[i][j] == 0 && game.data[i][j+1] != 0){
                    if(!game.flag){
                        game.flag = true;
                    }
                    game.data[i][j] = game.data[i][j+1];
                    game.data[i][j+1] = 0;
                    this.moveToLeft(game,i);
                }
            }
        },
       
        //小版块向左合并
        mergeToLeft:function(game,i){
            var nowRowlen = game.data[i].length;
            for(var j = 0;j < nowRowlen - 1 ; j++){
                if(game.data[i][j] == game.data[i][j+1]){
                    //如果左右相隔的两个小版块的数值相等则将它们相加
                    game.data[i][j] *= 2;
                    game.data[i][j+1] = 0;//将后面那个小版块的内容清空
                    game.moveToLeft(game,i);//继续向左移
                    break;
                }
            }
        },
        
         //小版块向左移动后合并
        doMoveToLeft:function(game){
            game.addNew();//每次向左移动都生随机成一个新的小版块
            for(var i = 0 ; i < 4 ; i++){
                game.moveToLeft(game,i);
                game.mergeToLeft(game,i);
            }
        },
        
        //小版块向右移动
        moveToRight:function(game,i){
            var nowRowlen = game.data[i].length;
            for(var j = nowRowlen - 1 ; j > 0 ; j-- ){
                if(game.data[i][j] == 0 && game.data[i][j-1] != 0){
                    if(!game.flag){
                        game.flag = true;
                    }
                    game.data[i][j] = game.data[i][j-1];
                    game.data[i][j-1] = 0;
                    this.moveToRight(game,i);
                }
            }
        },
       
        //小版块向右合并
        mergeToRight:function(game,i){
            var nowRowlen = game.data[i].length;
            for(var j = nowRowlen - 1 ; j > 0 ; j-- ){
                if(game.data[i][j] == game.data[i][j-1]){
                    //如果左右相隔的两个小版块的数值相等则将它们相加
                    game.data[i][j] *= 2;
                    game.data[i][j-1] = 0;//将后面那个小版块的内容清空
                    game.moveToRight(game,i);//继续向右移
                    break;
                }
            }
        },
            
        //小版块向右移动后合并
        doMoveToRight:function(game){
            game.addNew();//每次向右移动都生随机成一个新的小版块
            for(var i = 0 ; i < 4 ; i++){
                game.moveToRight(game,i);
                game.mergeToRight(game,i);
            }
        },
        
        //小版块向上移动
        moveToTop:function(game,j){
            var nowColumnlen = game.data.length;
            for(var i = 0 ; i < nowColumnlen - 1 ; i++ ){
                if(game.data[i][j] == 0 && game.data[i+1][j] != 0){
                    if(!game.flag){
                        game.flag = true;
                    }
                    game.data[i][j] = game.data[i+1][j];
                    game.data[i+1][j] = 0;
                    this.moveToTop(game,j);
                }
            }
        },
       
        //小版块向上合并
        mergeToTop:function(game,j){
            var nowColumnlen = game.data.length;
            for(var i = 0 ; i < nowColumnlen - 1 ; i++ ){
                if(game.data[i][j] == game.data[i+1][j]){
                    //如果上下相隔的两个小版块的数值相等则将它们相加
                    game.data[i][j] *= 2;
                    game.data[i+1][j] = 0;//将后面那个小版块的内容清空
                    game.moveToTop(game,j);//继续向上移
                    break;
                }
            }
        },
            
        //小版块向上移动后合并
        doMoveToTop:function(game){
            game.addNew();//每次向上移动都生随机成一个新的小版块
            for(var j = 0 ; j < 4 ; j++){
                game.moveToTop(game,j);
                game.mergeToTop(game,j);
            }
        },
        
         //小版块向下移动
        moveToBelow:function(game,j){
            var nowColumnlen = game.data.length;
            for(var i = nowColumnlen - 1 ; i > 0 ; i-- ){
                if(game.data[i][j] == 0 && game.data[i-1][j] != 0){
                    if(!game.flag){
                        game.flag = true;
                    }
                    game.data[i][j] = game.data[i-1][j];
                    game.data[i-1][j] = 0;
                    this.moveToBelow(game,j);
                }
            }
        },
       
        //小版块向下合并
        mergeToBelow:function(game,j){
            var nowColumnlen = game.data.length;
            for(var i = nowColumnlen - 1; i > 0 ; i-- ){
                if(game.data[i][j] == game.data[i-1][j]){
                    //如果上下相隔的两个小版块的数值相等则将它们相加
                    game.data[i][j] *= 2;
                    game.data[i-1][j] = 0;//将后面那个小版块的内容清空
                    game.moveToBelow(game,j);//继续向下移
                    break;
                }
            }
        },
            
        //小版块向下移动后合并
        doMoveToBelow:function(game){
            for(var j = 0 ; j < 4 ; j++){
                game.moveToBelow(game,j);
                game.mergeToBelow(game,j);
            }
        },
        
        //统计分数
        countScore:function(game){
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(game.maxNum <= game.data[i][j]){
                        game.maxNum = game.data[i][j];
                    }
                }
            }
            document.getElementById("maxScore").innerHTML = game.maxNum;
        },
        
        //判断是否小板块中数字已达到2048
        whetherWin:function(game){
            for(var i = 0 ; i < 4 ;i++){
                for(j = 0; j < 4 ;j++){
                    if(game.data[i][j] == 2048){
                        alert("恭喜！您赢了！");
                        return;
                    }
                }
            }
        }
        
    }
    
    document.onkeydown = function(ev){
        game.countScore(game);
        game.flag = false;//每次触发键盘事件都先将game.flag的值重置为false
        var ev = ev || event;
        switch(ev.keyCode){
            case 37: //向左
                game.doMoveToLeft(game);
                break;
            case 38: //向上
                game.doMoveToTop(game);
                break;
            case 39: //向右
                game.doMoveToRight(game);
                break;
            case 40: //向下
                game.doMoveToBelow(game);
                break;
        }
        if(game.flag){//如果有一个方向是可以移动的
            game.addNew();//每次移动都生随机成一个新的小版块
        }else{
            game.whetherWin(game);
        }
        game.displayDiv(game);//同时将新的小版块显示在页面上
    }

    // 监听触屏事件
  	var touchStartClientX, touchStartClientY;
    var gameContainer = document.getElementsByClassName("game-container")[0];

	gameContainer.addEventListener("touchstart", function (event) {
		if (event.touches.length > 1) return;

		touchStartClientX = event.touches[0].clientX;
		touchStartClientY = event.touches[0].clientY;
		event.preventDefault();
	});

	gameContainer.addEventListener("touchmove", function (event) {
	    event.preventDefault();
	});

	gameContainer.addEventListener("touchend", function (event) {
		game.countScore(game);
        game.flag = false;//每次触发事件都先将game.flag的值重置为false

	    if (event.touches.length > 0) return;

	    var dx = event.changedTouches[0].clientX - touchStartClientX;
	    var absDx = Math.abs(dx);

	    var dy = event.changedTouches[0].clientY - touchStartClientY;
	    var absDy = Math.abs(dy);

	    if (Math.max(absDx, absDy) > 10) {
	      if(absDx > absDy){
	      		if(dx > 0){//向右
	      			game.doMoveToRight(game);
	      		}else{//向左
	      			game.doMoveToLeft(game);
	      		}
	      }else{
	      		if(dy > 0){//向下
	      			game.doMoveToBelow(game);
	      		}else{//向上
	      			game.doMoveToTop(game);
	      		}

	      }
	    }
	    
	    if(game.flag){//如果有一个方向是可以移动的
            game.addNew();//每次移动都生随机成一个新的小版块
        }else{
            game.whetherWin(game);
        }
        game.displayDiv(game);//同时将新的小版块显示在页面上
	});

    function newGame(type){
        if(type == 0){
            alert("游戏结束！");
        }
        if(type == 1){
            game = new timtsang2048();//new一个新的游戏对象
            game.displayDiv(game);//将小版块显示在页面上
        }
    }
    
    newGame(1);
}