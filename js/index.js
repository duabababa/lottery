require(["config"],function(){
  require(["jquery"],function($){
  	var companyArr = [];
  	$.ajax({
  		type:"GET",
  		url:"./js/list.json",
  		success:function(data){
  			companyArr = data;
		  	
		    // 抽奖的上半部分
		    function PrizeClass(){
		      if(PrizeClass.unique !== undefined){
		        return PrizeClass.unique;
		      }
		      this.classesArr = ["五等奖", "四等奖", "三等奖", "二等奖", "一等奖", "特等奖"];
		      this.classNumArr = [15, 10, 6, 4, 2, 1];
		      this.classImgNameArr = ["迷你  电子秤", "不锈钢  保温杯", "外交官  拉杆箱", "ipad", "佳能  单反相机", "三亚  带薪七日游"];
		      this.currentClass = 0;
		      this.classBtn = $(".class-btn")[0];
		      this.classImg = $(".prize-box img")[0];
		      this.classImgName = $(".prize-box .prize-name")[0];
		      this.classNumText = $(".prize-class-num .prize-num .num")[0];
		      this.init = function(){
		          $(this.classBtn).html(this.classesArr[this.currentClass]);
		          $(this.classNumText).html(this.classNumArr[this.currentClass]);
		          $(this.classImg).attr("src", "./images/prize" + (5-this.currentClass) + ".jpg");
		          $(this.classImgName).html(this.classImgNameArr[this.currentClass]);
		          return this;
		        };
		      this.initEvent = function(){
		          var classArrLen = this.classesArr.length;
		          var that = this;
		          $(this.classBtn).on("click", function(){
		            $(this).on("mousewheel DOMMouseScroll", function (e) {
		              var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
		                          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
		              if (delta > 0) {
		                  // 向上滚
		                  that.currentClass--;
		                  if(that.currentClass == -1){
		                    that.currentClass = that.classesArr.length - 1;
		                  }
		                  that.init();
		                  new Lottery().createPer(that.currentClass);
		              } else if (delta < 0) {
		                  // 向下滚
		                  that.currentClass++;
		                  if(that.currentClass == classArrLen){
		                    that.currentClass = 0;
		                  }
		                  that.init();
		                  new Lottery().createPer(that.currentClass);
		              }
		            });
		          })
		        }
		      PrizeClass.unique = this;
		    }
		    
		    
		    // 抽奖下半部分
		    function Lottery(){
		      if(Lottery.unique !== undefined){
		        return Lottery.unique;
		      }
		      this.resBlocks = $(".lottery-list-show .lottery-list ul")[0];
		      this.defaultStr = "诸葛亮, 司马懿, 周瑜, 鲁肃, 刘备, 曹操, 孙权, 赵子龙, 关羽, 张飞, 董卓, 吕布, 貂蝉, 袁绍, 孙悟空, 沙和尚, 猪八戒, 唐三藏, 玉皇大帝, 如来佛";
		      this.defaultArr = this.defaultStr.split(",");
		//    this.listArr = ["蒙古", "新疆", "宁夏", "广西", "西藏", "云南", "贵州", "青海", "四川", "甘肃", "黑龙江", "辽宁", "吉林", "湖南", "湖北", "海南", "台湾等省", "自治区", "诸葛亮", " 司马懿", " 周瑜", " 鲁肃", " 刘备", " 曹操", " 孙权", " 赵子龙", " 关羽", " 张飞", " 董卓", " 吕布", " 貂蝉", " 袁绍", " 孙悟空", " 沙和尚", " 猪八戒", " 唐三藏", " 玉皇大帝", " 如来佛"];
					this.listArr = companyArr;
		//    this.imgArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
		      this.startBtn = $(".lottery-list-show .start-end-btn .start-btn")[0];
		      this.endBtn = $(".lottery-list-show .start-end-btn .end-btn")[0];
		      this.btnFlag = true;//true只能点击start
		      this.n = 6; //抽完6次奖项后不能再点击抽奖了
		      this.init = function(){
		        this.createPer(new PrizeClass().currentClass);
		        return this;
		      };
		      this.createPer = function(num){
		        $(this.resBlocks).children().remove();
		        var n;
		        switch(num){
		          case 0: n = 15;break;
		          case 1: n = 10;break;
		          case 2: n = 6;break;
		          case 3: n = 4;break;
		          case 4: n = 2;break;
		          case 5: n = 1;break;
		          default: n = 15;break;
		        }
		        var str = '';
		        for(var i = 0;i< n;i++){
		          str += '<li class="li'+ new PrizeClass().currentClass +'"><span class="span'+ num +'"></span><em class="em'+ num +'">'+ this.defaultArr[i] +'</em></li>';
		        }
		        $(this.resBlocks).append(str);
		        var liWidth = $(this.resBlocks).children("li").width();
		        var lis = $(this.resBlocks).children("li").css({"height":liWidth*1.23+""});
		      };
		      this.shuffle = function(arr){
		        var len = arr.length;
		        for(var i = 0; i < len - 1; i++){
		          var idx = Math.floor(Math.random() * (len - i));
		          var temp = arr[idx];
		          arr[idx] = arr[len - i - 1];
		          arr[len - i -1] = temp;
		        }
		        return arr;
		      };
		      this.shuffleList = function(){//arr 数组
		        var liList = this.resBlocks.getElementsByTagName("li");
		        var spanList = this.resBlocks.getElementsByTagName("span");
		        var emList = this.resBlocks.getElementsByTagName("em");
		        for(var i = 0, l = liList.length;i < l;i++){
		//        spanList[i].style.background = "url(./images/bao"+ this.imgArr[i] +".png) no-repeat";
		          spanList[i].style.background = "url("+ this.listArr[i].imgSrc +") no-repeat";
		          spanList[i].style.backgroundSize = "100% auto";
		          emList[i].innerHTML = this.listArr[i].name;
		        }
		      }
		      this.initEvent = function(){
		        var that = this;
		        $(this.startBtn).on("click", function(){
		          if(that.n<=0){
		            return false;
		          }
		          if(!that.btnFlag){
		            return false;
		          }else{// true
		            that.btnFlag = false;
		            that.timer = setInterval(function(){
		              that.shuffle(that.listArr);
		//            that.shuffle(that.imgArr);
		              that.shuffleList();
		            },100)
		          }
		        });
		        $(this.endBtn).on("click", function(){
		          if(that.btnFlag){
		            return false;
		          }else{// false
		            that.btnFlag = true;
		            --that.n;
		            clearInterval(that.timer);
		            var n = 0;
		            switch(new PrizeClass().currentClass){
		              case 0: n = 15;break;
		              case 1: n = 10;break;
		              case 2: n = 6;break;
		              case 3: n = 4;break;
		              case 4: n = 2;break;
		              case 5: n = 1;break;
		              default: n = 15;break;
		            }
		            for(var j=0; j<n; j++){  // 这个是为了记录最终选中的tel是什么
		            	console.log(that.listArr[j]);
		            }
		            console.log(n);
		            that.listArr.splice(0,n);
		          }
		        });
		      }
		    }
		    var prizeClass = new PrizeClass().init().initEvent();
		    var lottery = new Lottery().init().initEvent();
		    
		  }
  	})
  })
})