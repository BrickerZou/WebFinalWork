/** 
 * @Author: 徐程鸿
 * @Stage: 勤
 */
const poetry=[
  "业精于勤荒于嬉,行成于思毁于随.",
  "读书破万卷,下笔如有神.",
  "三更灯火五更鸡,正是男儿读书时.",
  "劝君莫惜金缕衣,劝君惜取少年时.",
  "精诚所至,金石为开.",
  "不经一番寒彻骨,怎得梅花扑鼻香?",
  "少壮不努力,老大徒悲伤.",
  "路漫漫其修远兮,吾将上下而求索.",

  "穷则独善其身,达则兼济天下.",
  "绳锯木断,水滴石穿.",
  "宝剑锋从磨砺出,梅花香自苦寒来.",
  "天行健,君子以自强不息.",
  "生当作人杰,死亦为鬼雄.",
  "苟利国家生死以,岂因祸福避趋之.",
  "捐躯赴国难,视死忽如归.",
  "位卑未敢忘忧国,事定犹须待阖棺.",
];
const poetryQuestion=[
  "业精于勤荒于嬉,",
  "读书破万卷,",
  "三更灯火五更鸡,",
  "劝君莫惜金缕衣,",
  "精诚所至,",
  "不经一番寒彻骨,",
  "少壮不努力,",
  "路漫漫其修远兮,",

  "穷则独善其身,",
  "绳锯木断,",
  "宝剑锋从磨砺出,",
  "天行健,",
  "生当作人杰,",
  "苟利国家生死以,",
  "捐躯赴国难,",
  "位卑未敢忘忧国,",
];
const poetryAnswer=[
  "行成于思毁于随.",
  "下笔如有神.",
  "正是男儿读书时.",
  "劝君惜取少年时.",
  "金石为开.",
  "怎得梅花扑鼻香?",
  "老大徒悲伤.",
  "吾将上下而求索.",

  "达则兼济天下.",
  "水滴石穿.",
  "梅花香自苦寒来.",
  "君子以自强不息.",
  "死亦为鬼雄.",
  "岂因祸福避趋之.",
  "视死忽如归.",
  "事定犹须待阖棺.",
];
var maobi;   //毛笔精灵
var backStart;
var backMengban;
var timeEvent;
var poetryQuestionDom=[];
var poetryAnswerDom=[];
var keyEnter // 注册enter事件
var keyTab;
var isDrawingAnswer = false;  // 是否正在绘制答案 用于取消enter调用
var isDrawingQuestion =true; // 是否正在绘制问题 用于取消tab调用
var nowQuestionIndex=0;
var nowline = 0;   //上次
var lastLine=0;  // 现在
var inputPoetry; //input dom元素
var text;
var gameQinThis;
var answerWordsIndex=0
var marginLeft = -15;
var maobiStart={x:140,y:100};
var score=0
var passScore=2
var button
var buttonText
var buttonExit
var buttonExitText
var gameProcess=2 //0准备开始 1游戏进行中 2游戏结束过关 3游戏结束失败重来 

var timeEvent
var mengban
var message
var messageText
var TEXT=" <<勤>> 游戏说明：\n 先按tab键补全诗句，在输入框输入下一句诗句后，按enter键确认。最终得分及格即可通过 "


const gameQin = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
    function gameQin() {
      Phaser.Scene.call(this, { key: 'gameQin' });   
    },
  preload: function () {
    console.log("preload",this)
    isDrawingAnswer=false
    isDrawingQuestion = true
    nowQuestionIndex=0
    lastLine=0
    poetryQuestionDom=[];
    poetryAnswerDom=[];
    gameQinThis=this
    score=0;
    gameProcess=0
    this.load.image('gameQinStart',GAMEQINSTART)
    this.load.image("mengban",MENGBAN)
    this.load.image("message", MESSAGE);
    this.load.image('gameQin',GAMEQIN);
    this.load.html('qinHtml', 'src/pages/scenes/qin/qin.html');      //加载dom
    this.load.spritesheet("maobi",MAOBI,{ frameWidth: 140, frameHeight: 320 });
    this.load.image('btn',BTN);
  },
  create() {
    // 背景
    this.add.image(500, 300, 'gameQin');
    backStart=this.add.image(500, 300, 'gameQinStart');
    backMengban=this.add.image(500,300,'mengban').setScale(1.25,1).setAlpha(0.5).setDepth(5)
    // dom元素
    inputPoetry = this.add.dom(500,300).createFromCache('qinHtml');

    // 按钮和提示性文本
    buttonExit = this.add.image(465, 320, 'btn').setScale(0.7, 0.7).setInteractive({ cursor: "pointer" }).setDepth(6);
    buttonExitText=this.add.text(410, 315, "退出游戏", { fontFamily: "华文行楷", fontSize: 25, color: 'black' }).setDepth(6)
    buttonExit.on("pointerup", () => {
      this.scene.switch("sceneQinHouse")
    });
    buttonExit.on("pointerover", function () {
      buttonExit.setTint(0xDCDCDC);
    });
    buttonExit.on("pointerout", function () {
      buttonExit.clearTint();
    }); 
    button = this.add.image(465, 250, 'btn').setScale(1, 0.9).setInteractive({ cursor: "pointer" }).setDepth(6).setAlpha(0);
    buttonText = this.add.text(410, 245, "开始游戏", { fontFamily: "华文行楷", fontSize: 25, color: 'black' }).setDepth(6).setAlpha(0);
    // this.showButton()
    button.on("pointerup", () => {
        this.physics.resume();
        if(gameProcess==0){
          gameProcess=1;
          this.startGame()
        }
        else if(gameProcess==2){
          this.scene.switch('sceneQinHouse');
        }
        else{
          gameProcess=0
          this.scene.restart();
        }
    });
    button.on("pointerover", function () {
        button.setTint(0xDCDCDC);
    });
    button.on("pointerout", function () {
        button.clearTint();
    }); 


    createMessage(this)
    showMessage(this)
    
    // 按Enter输入
    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

  },
  update() {
    if(Phaser.Input.Keyboard.JustDown(keyEnter) && isDrawingAnswer==false && gameProcess==1){
      if(nowQuestionIndex==16){
        console.log("结束")
        if(score>passScore) {//成功
          gameProcess=2
        }
        else{
          gameProcess=1
        }
        this.showButton()
        return
      }
      isDrawingAnswer=true
      maobi.anims.play('maobiDraw',true)
      this.drawAnswer()
      $("#inputPoetry").val("")

    }
    if(Phaser.Input.Keyboard.JustDown(keyTab) && isDrawingQuestion==false && gameProcess==1){
      isDrawingQuestion=true
      isDrawingAnswer=false
      gameQinThis.drawQuestion()

    }  
    if(gameProcess==1)
      text.setText('当前得分 '+score); 
  },
  drawQuestion(){
    if(nowQuestionIndex==16){
      console.log("结束")
      return
    }
    //绘制前半句诗
    var line = lastLine
    if(nowQuestionIndex%8==0) line=0
    poetryQuestionDom[nowQuestionIndex]=this.make.text({
      x:Math.floor(nowQuestionIndex/8+1)*305-130,
      y:line*32+60,
      text:poetryQuestion[nowQuestionIndex],
      // text:poetry[nowQuestionIndex],
      origin:{x:0,y:0},
      style:{ 
        color: 'white', 
        font: '25px 华文行楷',
        lineSpacing: 6,
        wordWrap: { width: 270, useAdvancedWrap: true }
      }
    })
    poetryQuestionDom[nowQuestionIndex]
    line+=Math.ceil(poetry[nowQuestionIndex].length/12)
    console.log('poetryQuestionDom[nowQuestionIndex]',poetryQuestion[nowQuestionIndex])
    
    // 标点
    var line=lastLine
    if(nowQuestionIndex%8==0) line=0
    var question=poetry[nowQuestionIndex];
    var marginLeft=0
    var marginTop=-1;
    var firstBiaodian;
    for(var j=0;j<question.length;j++){
      if(j%11==0) marginLeft=0;
      if(j%11==0&&j!==-1+question.length)marginTop+=1
      if(question[j]==','||question[j]=='.'||question[j]=='?'){
        if(firstBiaodian==undefined)firstBiaodian=j
        this.make.text({
          x:Math.floor(nowQuestionIndex/8+1)*305-130 + 25*(j==question.length-1&&j%11==0?j-1:j%11)+marginLeft,
          y:(line+marginTop)*32+60,
          text:question[j],
          origin:{x:0,y:0},
          style:{ 
            color: 'white', 
            font: '25px 华文行楷',
            lineSpacing: 6,
          }
        })
        marginLeft-=15
      }
    }
    gameQinThis.updateMaobiLocation(
      Math.floor(nowQuestionIndex/8+1)*305-130 + 25*(firstBiaodian==question.length-1&&firstBiaodian%11==0?firstBiaodian-1:firstBiaodian%11)+marginLeft+10,
      (line+1)*32+60,
      90);

    line+=Math.ceil(poetry[nowQuestionIndex].length/12)
  },
  drawAnswer(){
    var question = poetryQuestion[nowQuestionIndex]
    var standardAnswer = poetryAnswer[nowQuestionIndex];
    var userAnswer=$("#inputPoetry").val().substring(0,standardAnswer.length-1)

    marginLeft = -15
    answerWordsIndex=-1
    console.log("lastLine",lastLine)

    nowline=lastLine
    if(nowQuestionIndex%8==0) nowline=0
    
    timeEvent=gameQinThis.time.addEvent({
      delay:100,
      callback:gameQinThis.drawAnswerWord,
      repeat:standardAnswer.length-2,
      args:[question,standardAnswer,userAnswer]
    })            
  },
  drawAnswerWord(question,standardAnswer,userAnswer){
    var poetryline=[]
    answerWordsIndex+=1
    if((question.length+answerWordsIndex)%11==0)marginLeft=0
    if(standardAnswer[answerWordsIndex]==",")marginLeft-=15;
    // console.log(answerWordsIndex,standardAnswer[answerWordsIndex],marginLeft,nowline)
    var color
    if(standardAnswer[answerWordsIndex]===userAnswer[answerWordsIndex]){
      score+=1;
      color="black"
    }
    else if(userAnswer[answerWordsIndex]===undefined)
      color="yellow"
    else
      color="red"
    poetryline[answerWordsIndex]=
    gameQinThis.make.text({
      x:Math.floor(nowQuestionIndex/8+1)*305-130 + 25*((question.length+answerWordsIndex)%11)+marginLeft,
      y:(nowline+Math.floor((question.length+answerWordsIndex)/11))*32+60,
      text:userAnswer[answerWordsIndex]===undefined?'？':userAnswer[answerWordsIndex],
      origin:{x:0,y:0},
      style:{ 
        color: color, 
        font: '25px 华文行楷',
        lineSpacing: 6,
      }
    })
    gameQinThis.updateMaobiLocation(
      Math.floor(nowQuestionIndex/8+1)*305-130 + 25*((question.length+answerWordsIndex)%11)+marginLeft,
      (nowline+Math.floor((question.length+answerWordsIndex)/11))*32+60+40,
    90);


    poetryAnswerDom[nowQuestionIndex]=poetryline

    if(answerWordsIndex==standardAnswer.length-2){
      gameQinThis.updateMaobiLocation(
        Math.floor(nowQuestionIndex/8+1)*305-130 + 25*((question.length+answerWordsIndex)%11)+marginLeft,
        (nowline+Math.floor((question.length+answerWordsIndex)/11))*32+60+40,
        90);
      nowline+=Math.ceil(poetry[nowQuestionIndex].length/12)
      lastLine=nowline
      nowQuestionIndex+=1
      // gameQinThis.drawQuestion()
      // isDrawingAnswer=false // 答案绘制完
      isDrawingQuestion = false; // 可画问题
      maobi.anims.play('maobiStop')
    }
  },
  updateMaobiLocation(x,y,duration){
    var dx=Math.abs(maobi.x-x)*5/duration
    var dy=Math.abs(maobi.y-y)*5/duration
    var stepX=maobi.x<x?dx:-dx;
    var stepY=maobi.y<y?dy:-dy;
    var cs=0;
    function upMaobi(){
      cs+=1;
      maobi.x+=stepX;
      maobi.y+=stepY;
      if(cs==18){
        clearInterval(id)
      }
    }
    var id=setInterval(() => {
      upMaobi()
    }, 5 );  
  },
  startGame(){
    backStart.setAlpha(0)
    backMengban.setAlpha(0)
    button.setAlpha(0);
    buttonText.setAlpha(0);
    buttonExit.setAlpha(0);
    buttonExitText.setAlpha(0);
    // 左上角提示性文本
    text=gameQinThis.add.text(20,42, '当前得分', { color: '#1C1C1C', fontFamily: '华文行楷', fontSize: '25px '}).setDepth(4);
    gameQinThis.add.text(20, 18, '过关要求得分:'+passScore, { color: '#1C1C1C', fontFamily: '华文行楷', fontSize: '25px '}).setDepth(4);
    // 毛笔
    maobi = gameQinThis.physics.add.sprite(maobiStart.x, maobiStart.y, 'maobi').setOrigin(0, 1);
    maobi.setDepth(1);
    maobi.body.setAllowGravity(false);                    // 设置无重力
    gameQinThis.anims.create({
        key: 'maobiDraw',
        frames: gameQinThis.anims.generateFrameNumbers('maobi', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1  
      });
      gameQinThis.anims.create({
        key: 'maobiStop',
        frames:[ {key:'maobi', frame:0}],
        frameRate: 10,
      })

    // 按Enter输入
    // keyEnter = gameQinThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    // keyTab = gameQinThis.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

    gameQinThis.drawQuestion()
  },
  showButton(){
    if(gameProcess==0){
      buttonText.setText("开始游戏")
      button.setScale(0.7,0.7)
      button.x=465
      buttonText.x=410

    }
    else if(gameProcess==2){
      buttonText.setText("恭喜闯关成功,点击退出")
      button.setScale(1.5,0.7)
      button.x=480
      buttonText.x=360
      $("#gameQinFinish").val(1);
    }
    else{
      buttonText.setText("得分太低,点击重新开始")
      button.setScale(1.5,0.7)
      button.x=480
      buttonText.x=360
      buttonExit.setAlpha(1);
      buttonExitText.setAlpha(1);
    }
    $.post('src/server/update.php',{
      stage:1,
    },function(data){
        console.log(data);
    },'json');
    backMengban.setAlpha(0.5)
    button.setAlpha(1);
    buttonText.setAlpha(1);
  }
})
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
  $("#inputPoetry").hide()
  mengban.setAlpha(0.8)
  message.setAlpha(1)
  messageText.setAlpha(1)
  // 暂停物理事件
  this1.physics.pause();
  timeEvent=this1.time.addEvent({
    delay:80,
    callback:function(){
      if(timeEvent.repeatCount>=15){
        messageText.setText(TEXT.substring(0,TEXT.length+15-timeEvent.repeatCount))
      }
        // 文字显示结束
      if(timeEvent.repeatCount==0){
        // 恢复物理事件
        this1.physics.resume();
        $("#inputPoetry").show()

        message.setAlpha(0)
        mengban.setAlpha(0)
        messageText.setAlpha(0)
        this1.showButton()
      }
    },
    repeat:TEXT.length +15,
    args:[]
  }) 
}

export default gameQin



