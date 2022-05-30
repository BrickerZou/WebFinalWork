/** 
 * @Author: 张佳豪
 * @Stage: 慎
 */
var submitNum = 0;
var missLeft = 0;
var onPage = 0;
var tipOnShow = 0;
var res = 0;
var LR = 0;
var correctAnsNum = 0;
var shenGameFinish = 0;

var correctIdiom = ["精忠报国", "治国安邦","殉国忘身"];
var correctPoem = ["留取丹心照汗青", "万马齐喑究可哀", "死去元知万事空"];
var correctArticle = ["回溯历史，我热泪盈眶，无数的志士用血泪谱写了爱国之歌。“路漫漫其修远兮，吾将上下而求索。”心怀楚国至死不渝，屈原抱恨而去;“王师北定中原日，家祭无忘告乃翁。”不忘国家统一大业，陆游临终写《示儿》；“壮志饥餐胡虏肉，笑谈渴饮匈奴血。”精忠报国，奋勇杀敌，岳飞北伐斗志昂扬。",
                      "爱国就是要对祖国忠诚和热爱。历朝历代，许多仁人志士都具有强烈的忧国忧民思想，以国事为己任，前仆后继，临危不屈，视死如归，让民族历经劫难而不衰。爱国主义感情可以在每个人身上体现，无论是乡下的少年，还是保家卫国的战士。我们要让爱国之志变成报国之行，为祖国创造辉煌未来",
                      "他们是爱国的，他们热爱祖国的山河，关心祖国的命运，在危难之时英勇奋战，为国捐躯，他们走了，但他们那爱国灵魂还在，还有千千万万个他们向我们走来，带着“铁”的精神，向前迈步，砥砺前行。他们虽与世长辞，但却名垂青史，为后人所尊崇。他们即是我辈的榜样，是我等需要学习的榜样"];
var now_word;


var player;


var idiomContent = ["情忠报国", "忧国忧民", "碧血丹心", "济世爱民",
                    "赤胆忠心", "忧国奉公", "护国佑民", "冶国安邦",
                    "富国强兵", "忠肝义胆", "相忍为国", "徇国忘身"];
var poemContent = [ "人生自古谁无死","留取丹心照汗清",
                    "胸中有誓深于海","肯使神州竟陆沉",
                    "九州生气恃风雷","万马齐暗究可哀",
                    "欲为圣贤除弊事","肯将衰朽惜残年",
                    "位卑未敢忘忧国","事定犹须待阖棺",
                    "死去无知万事空","但悲不见九州同"];
var articleContent=["回溯历史，我热泪盈眶，无数的志士用血泪谱写了爱国之歌。“路漫漫其修远兮，吾将上下而求索。”心怀楚国至死不喻，屈原抱恨而去;“王师北定中原日，家祭无忘告乃翁。”不忘国家统一大业，陆游临终写《示儿》；“壮志饥餐胡虏肉，笑谈渴饮匈奴血。”精忠报国，奋勇杀敌，岳飞北伐斗志昂扬。",
                    "爱国就是要对祖国忠诚和热爱。历朝历代，许多仁人志士都具有强烈的忧国忧民思想，以国事为己任，前仆后继，临危不屈，视死如归，让民族历经劫难而不哀。爱国主义感情可以在每个人身上体现，无论是乡下的少年，还是保家卫国的战士。我们要让爱国之志变成报国之行，为祖国创造辉煌未来",
                    "他们是爱国的，他们热爱祖国的山河，关心祖国的命运，在危难之时英勇奋战，为国捐躯，他们走了，但他们那爱国灵魂还在，还有千千万万个他们向我们走来，带着“铁”的精神，向前迈步，抵砺前行。他们虽与世长辞，但却名垂青史，为后人所尊崇。他们即是我辈的榜样，是我等需要学习的榜样"];





function createGameWindow(){
    let str = "<div class = 'gameShen'></div>";
    $(str).appendTo("#game");
    $(".gameShen").css("position", "absolute");
    $(".gameShen").css("width", "1000px");
    $(".gameShen").css("height", "600px");
    $(".gameShen").css("border", "1px solid black");
    $(".gameShen").css("display", "flex");
    $(".gameShen").css("flex-direction", "row");
}

function idiomAndPoemWindow(){
    let str = "<div class = 'textDepress'></div>";
    $(str).appendTo(".gameShen");
    $(".textDepress").css("width", "700px");
    $(".textDepress").css("height", "600px");
    // $(".textDepress").css("border", "1px solid #CC0033");
    $(".textDepress").css("background-image", "url("+TESTPAPER+")");
    $(".textDepress").css("background-size", "800px")
    let lines = [];
    for(let i =0;i<12;i++){
        lines[i] = "<p class = 'lines' id='line"+i+"'><span class = 'leftLine'></span><span class = 'rightLine'></span></p>";
        $(lines[i]).appendTo(".textDepress");
    }
    $(".lines").css("width", "100%");
    $(".lines").css("height","48px");
    $(".lines").css("border","1px solid #CC0033");
    $(".lines").css("margin", "0px");
    // $(".lines").css("backgroundColor", "#FFEC8B");
    $(".lines").css("display", "flex");
    $(".lines").css("flex-direction", "row");
    $(".lines").css("justify-content", "space-around");


    $(".leftLine").css("height", "100%");
    $(".leftLine").css("align-self", "center");
    $(".leftLine").css("font-size", "40px");
    $(".leftLine").css("font-family", "华文行楷");
    
    $(".rightLine").css("height", "100%");
    $(".rightLine").css("align-self", "center");
    $(".rightLine").css("font-size", "40px");
    $(".rightLine").css("font-family", "华文行楷");
    $(".rightLine").css("margin-left", "10px");
}



function idiomTest(){
    submitNum = 3;
    missLeft = 3;
    for(let i = 0;i<12;i+=2){
        $("#line"+i+" .leftLine").text(idiomContent[i]); 
        $("#line"+i+" .rightLine").text(idiomContent[i+1]);
        $("#line"+i+" .leftLine").on("click", function(){
            if(tipOnShow)return;
            $("#changeMiss").val($(this).text());
            now_word = i;
            LR = 0;
        });
        $("#line"+i+" .rightLine").on("click", function(){
            if(tipOnShow)return;
            $("#changeMiss").val($(this).text());
            now_word = i;
            LR = 1;
        });
        $("#line"+i+" span").mouseover(function(){
            $(this).css("color", "#FF0000");
            $(this).css("cursor","Pointer");       
        });
        $("#line"+i+" span").mouseleave(function(){
            $(this).css("color", "black");
        });
    }
}


function poemTest(){
    submitNum = 3;
    missLeft = 3;
    
    $("#changeMiss").css("font-size", "40px");
    for(let i = 0;i<12;i+=2){
        $("#line"+i+" .leftLine").css("text-decoration", "none");
        $("#line"+i+" .rightLine").css("text-decoration", "none");
        $("#line"+i+" .leftLine").text(poemContent[i]); 
        $("#line"+i+" .rightLine").text(poemContent[i+1]);
        $("#line"+i+" .leftLine").on("click", function(){
            if(tipOnShow)return;
            $("#changeMiss").val($(this).text());
            now_word = i;
            LR = 0;
        });
        $("#line"+i+" .rightLine").on("click", function(){
            if(tipOnShow)return;
            $("#changeMiss").val($(this).text());
            now_word = i;
            LR = 1;
        });
        $("#line"+i+" span").mouseover(function(){
            $(this).css("color", "#FF0000");
            $(this).css("cursor","Pointer");       
        });
        $("#line"+i+" span").mouseleave(function(){
            $(this).css("color", "black");
        });
    }
}

function articleTest(){
    submitNum = 3;
    missLeft = 3;
    $(".lines").remove();
    $("#changeMiss").remove();
    
    let str = "<p id = 'articleText'></p>";
    $(str).appendTo(".textDepress");
    // $("#articleText").css("text-decoration", "underline");
    $("#articleText").css("width", "100%");
    $("#articleText").css("height", "100%");
    $("#articleText").text(articleContent[0]);
    // $("#articleText").css("backgroundColor", "#FFEC8B");
    $("#articleText").css("margin-top", "0px")
    $("#articleText").css("font-size", "40px");
    $("#articleText").css("font-family", "华文行楷");
    // $("#articleText").css("margin-left", "10px");
    $("#articleText").css("line-height", "150%");
    
    let strTextArea = "<textarea id = 'articleChange'></textarea>";
    $(strTextArea).appendTo(".gameShen");
    $("#articleChange").css("width", "280px");
    $("#articleChange").css("height", "250px");
    $("#articleChange").css("margin", "40px 0px 0px 5px");
    $("#articleChange").css("border-radius", "20px");
    $("#articleChange").css("border", "4px solid black");
    $("#articleChange").css("font-size", "20px");
    $("#articleChange").css("font-family", "华文行楷");
    $("#articleChange").css("backgroundColor", "#fff");

    $("#articleChange").text(articleContent[0]);
    addPageBtn();

}


function addInputBox(){
    let str = "<input type='text' id = 'changeMiss'>";
    $(str).appendTo(".gameShen");
    $("#changeMiss").css("width", "280px");
    $("#changeMiss").css("height", "170px");
    $("#changeMiss").css("margin", "40px 0px 0px 5px");
    $("#changeMiss").css("border-radius", "20px");
    $("#changeMiss").css("border", "4px solid black");
    $("#changeMiss").css("font-size", "48px");
    $("#changeMiss").css("font-family", "华文行楷");
    $("#changeMiss").css("backgroundColor", "#fff");
}

function addPageBtn(){
    let str;
    for(let i = 1;i <= 3;i++){
        str = "<button id = 'page"+i+"'>"+i+"</button>";
        $(str).appendTo(".gameShen");
        $("#page"+i+"").css("width",  "50px");
        $("#page"+i+"").css("height", "50px");
        $("#page"+i+"").css("backgroundColor", "#b9");
        $("#page"+i+"").css("border-radius", "50%");
        $("#page"+i+"").css("font-family", "华文行楷");
        $("#page"+i+"").css("font-size", "30px");
        $("#page"+i+"").css("position", "absolute");
        $("#page"+i+"").css("top", 510 - 60*i);
        $("#page"+i+"").css("left", 930);
    }
    $("#page1").on("click", function(){
        $("#articleText").text(articleContent[0]);
        $("#articleChange").val(articleContent[0]);
        if(articleContent[0] == correctArticle[0]){
            $("#articleChange").css("color", "#bfa");
        }
        
    });
    $("#page2").on("click", function(){
        $("#articleText").text(articleContent[1]);
        $("#articleChange").val(articleContent[1]);
    });
    $("#page3").on("click", function(){
        $("#articleText").text(articleContent[2]);
        $("#articleChange").val(articleContent[2]);
    });
    
}


function addSubmitBtn(){
    let str = "<button id = 'submit'>修改</button>"
    $(str).appendTo(".gameShen");
    $("#submit").css("width",  "50px");
    $("#submit").css("height", "50px");
    $("#submit").css("backgroundColor", "#b9");
    $("#submit").css("border-radius", "50%");
    $("#submit").css("font-family", "华文行楷");
    $("#submit").css("position", "absolute");
    $("#submit").css("top", 510);
    $("#submit").css("left", 930);
    $("#submit").on("click", function(){
        if(tipOnShow)return;
        let userAns = $("#changeMiss").val();
        if(onPage<2)userAns = $("#changeMiss").val();
        else {
            userAns = $("#articleChange").text();
            userAns = $("#articleChange").val();
        }
        res = 0;
        console.log(userAns, missLeft, submitNum);
        if(userAns != ""){
            for(let i = 0;i<3;i++){
                if(onPage == 0){
                    if(userAns == correctIdiom[i]){
                        res = 1;
                        missLeft--;
                        if(LR == 0){
                            $("#line"+now_word+" .leftLine").text(correctIdiom[i]);
                            $("#line"+now_word+" .leftLine").css("text-decoration", "underline");
                        }else{
                            $("#line"+now_word+" .rightLine").text(correctIdiom[i]);
                            $("#line"+now_word+" .rightLine").css("text-decoration", "underline");
                        }
                        correctIdiom[i] = "";
                    }
                }else if(onPage == 1){
                    if(userAns == correctPoem[i]){
                        res = 1;
                        missLeft--;
                        if(LR == 0){
                            $("#line"+now_word+" .leftLine").text(correctPoem[i]);
                            $("#line"+now_word+" .leftLine").css("text-decoration", "underline");
                        }else{
                            $("#line"+now_word+" .rightLine").text(correctPoem[i]);
                            $("#line"+now_word+" .rightLine").css("text-decoration", "underline");
                        }
                        correctPoem[i] = "";
                    }
                }else {
                    if(userAns == correctArticle[i]){
                        res = 1;
                        missLeft--;
                        articleContent[i] = correctArticle[i];
                        $("#articleText").text(correctArticle[i]);
                        correctArticle[i] = "";
                    }
                }
                
            }
        }
        submitNum--;
        rightAns();
        if(submitNum == 0|| missLeft == 0){
            if(onPage < 2){
                onPage++;
                setTimeout(() => {
                    if(onPage == 1)poemTest();
                    else articleTest();
                }, 1000);
            }else {
                setTimeout(() => {
                    shenGameFinish = 1;
                }, 1000);       
            }
        }
    });
}



function rightAns(){
    // console.log(res);
    if(onPage < 2)$("#changeMiss").val("");
    let str = "<p id = 'judge'></p>"
    $(str).appendTo(".gameShen");
    $("#judge").css("position", "absolute");
    $("#judge").css("width", "600px") 
    $("#judge").css("height", "88px")
    $("#judge").css("top", "35%") 
    $("#judge").css("left", "27%")
    $("#judge").css("font-family", "华文行楷");
    $("#judge").css("font-size", "45px");
    $("#judge").css("line-height", "88px");
    $("#judge").css("text-align", "center");
    // $("#judge").css("backgroundColor", "gray");
    $("#judge").css("background-image", "url("+TIPONCHANGEMISS+")");
    $("#judge").css("background-size", "600px")
    // $("#judge").css("border", "1px solid black");
    $("#judge").css("border-radius", "10px");
    if(onPage < 2){
        if(res == 1){
            $("#judge").css("color", "green");
            correctAnsNum++;
            if(missLeft>0){
                if(submitNum > 0)$("#judge").text("更改正确 还剩"+missLeft+"个错误");
                else $("#judge").text("更改正确 进入下一个测试");
            }else $("#judge").text("更改正确 进入下一个测试");
            
        }else {
            $("#judge").css("color", "red");
            if(submitNum>0){
                $("#judge").text("更改错误 还剩"+submitNum+"次更改机会");
            }else $("#judge").text("更改错误 进入下一个测试");
            
        }
    }else {
        if(res == 1){
            correctAnsNum++;
            $("#judge").css("color", "green");
            if(missLeft>0){
                if(submitNum > 0)$("#judge").text("更改正确 还剩"+missLeft+"个错误");
                else $("#judge").text("更改正确 进入下一个测试");
            }else {
                $("#judge").text("更改正确 恭喜你完成测试");
                
            }
            
        }else{
            $("#judge").css("color", "red");
            if(submitNum>0)$("#judge").text("更改错误 还剩"+submitNum+"次更改机会");
            else {
                if(correctAnsNum > 0){
                    $("#judge").text("更改错误 恭喜你完成测试");
                }else {
                    $("#judge").text("太不谨慎了重新检查一遍");
                }
            }
           
        }
    }
    tipOnShow = 1;
    setTimeout(() =>{
        $("#judge").remove();
        tipOnShow = 0;
    }, 1000);
}

function createMessage(this1){
    message=this1.add.image(500,300,'message').setAlpha(0).setDepth(10)
    mengban=this1.add.image(500,300,'mengban').setScale(2).setDepth(9).setAlpha(0);
    messageText=this1.make.text({
      x:300,
      y:150,
      text:'',
      origin:{x:0,y:0},
      style:{ 
        color: 'black', 
        font: '30px 华文行楷',
        lineSpacing: 5,
        wordWrap: { width: 400, useAdvancedWrap: true }
      }
    }).setDepth(10).setAlpha(0)
  }
  function showMessage(this1){
    mengban.setAlpha(0.8);
    message.setAlpha(1);
    messageText.setAlpha(1);
    timeEvent=this1.time.addEvent({
      delay:80,
      callback:function(){
        if(timeEvent.repeatCount>=15){
          messageText.setText(TEXT.substring(0,TEXT.length+15-timeEvent.repeatCount))
        }
          // 文字显示结束
        if(timeEvent.repeatCount==0){
          // 恢复物理事件
          $("#inputPoetry").show();
          message.setAlpha(0);
          mengban.setAlpha(0);
          messageText.setAlpha(0);
          gameShenStart();
        }
      },
      repeat:TEXT.length +15,
      args:[]
    }) 
  }



function gameShenStart(){
    submitNum = 0;
    missLeft = 0;
    onPage = 0;
    tipOnShow = 0;
    res = 0;
    LR = 0;
    correctAnsNum = 0;
    shenGameFinish = 0;
    createGameWindow();
    idiomAndPoemWindow();
    addInputBox();
    idiomTest();
    addSubmitBtn();
}

var timeEvent
var mengban
var message
var messageText
var TEXT=" <<慎>> 游戏说明：\n 点击错别诗句，在输入框内改正，点击修改修改按钮确认，答案正确则得分，最终得分及格即可通过"

const gameShen = new Phaser.Class({
    
    Extends: Phaser.Scene,
   
    initialize:
    function sceneShen ()
    {
        Phaser.Scene.call(this, { key: 'gameShen' });
        this.cursors;
    },
    preload:function(){
        this.load.image('solvemiss', SOLVEMISS);
        this.load.image('insideback2', INSIDEBACK2);
        this.load.image('testdesk', TESTDESK);
        this.load.image("message",MESSAGE)
        this.load.image("mengban",MENGBAN)
        
    },
    create(){
        createMessage(this)
        showMessage(this)
      
        this.add.image(0, 0, 'insideback2').setOrigin(0, 0).setScale(1.5);
        this.add.image(730,320, 'testdesk').setOrigin(0, 0).setScale(6);
        player = this.add.image(730, 400, 'solvemiss').setOrigin(0, 0).setScale(6);
        
    },
    update(){
        if(shenGameFinish == 1){
            $(".gameShen").remove();
            $.post('src/server/update.php',{
                stage:2,
            },function(data){
                console.log(data);
            },'json');
            if(correctAnsNum > 0){
                $("#gameShenPoint").val(correctAnsNum);
                this.scene.switch('sceneShen');
            }else {
                this.scene.restart('gameShen');
                shenGameFinish = 0;
            }
        }
        
    }
});


export default gameShen;