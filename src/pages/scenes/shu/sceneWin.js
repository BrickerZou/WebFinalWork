/** 
 * @Author: 徐程鸿
 * @Stage: Ending大结局
 */
var player;
var direction;
var platforms;
var cursors;
//显示信息
var timeEvent;
var mengban;
var message;
var messageText;
var TEXT="徐书剑运筹帷幄，审时度势；郭许明骁勇善战，一骑当千；士兵们以摧枯拉朽之势冲入敌军。最终荡除敌寇，平定战乱。自此徐国无人敢犯，四海升平，国泰民安。";

var messageEndText;
var TEXTEND="吾生勤慎且诚恕，已将书剑许明时。";
//-----------
var process=0 ;//0敌人在逃 1逃跑动画结束 2文字说明 3end
var timeEnd;
var direns=[];
var soldiers=[];
var countStop=0;
const sceneWin=new Phaser.Class({
  Extends: Phaser.Scene,
   
    initialize:
    function sceneShu ()
    {
  console.log(55)

        Phaser.Scene.call(this, { key: 'sceneWin' });
        this.cursors;
    },
    preload:function(){
      process=0
      countStop=0;

      this.textures.remove('diren1');
      this.textures.remove('diren2');
      this.textures.remove('diren3');
      this.textures.remove('soldier1');
      this.textures.remove('soldier2');
      this.textures.remove('soldier3');

      this.load.image('desertback3',DESERTBACK3);
      this.load.image("wall5",WALL5);
      this.load.image('stoneBoard2',STONEBOARD2)
      this.load.image("message",MESSAGE);
      this.load.image("mengban",MENGBAN);

      this.load.spritesheet('zhujue2', SHUSHENG2, { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('diren1',DIREN1,{ frameWidth: 48, frameHeight: 64 });
      this.load.spritesheet('diren2',DIREN2,{ frameWidth: 48, frameHeight: 64 });
      this.load.spritesheet('diren1_dead',DIREN1_DEAD,{ frameWidth: 48, frameHeight: 48 });
      this.load.spritesheet('diren2_dead',DIREN2_DEAD,{ frameWidth: 48, frameHeight: 48 });
      this.load.spritesheet('diren3',DIREN3,{ frameWidth: 48, frameHeight: 64 });
      this.load.spritesheet('soldier1',SOLDIER1,{ frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('soldier2',SOLDIER2,{ frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('soldier3',FUGUAN3,{ frameWidth: 32, frameHeight: 32 });

    },
    create(){
  console.log(55)

      // 设置镜头
      this.cameras.main.setBounds(0, 0, 1500, 600 );
      this.physics.world.setBounds(0, 0, 1500, 600 );

      this.add.image(500,300,'desertback3');
      this.add.image(1300,300,'desertback3');
      this.add.image(480,530,"wall5").setDepth(4);
      this.add.image(1440,530,"wall5").setDepth(4);

      for(let i=0;i<12;i++){
       
        if(i%2)
        this.add.image(500-i*40,350+Math.random()*100,'diren1_dead').setFrame(2)
        else
        this.add.image(500+i*40,350+Math.random()*100,'diren2_dead').setFrame(2)

      }
      // this.add.image(400,360,'diren1_dead').setFrame(2)
      // this.add.image(500,390,'diren2_dead').setFrame(2)
      platforms = this.physics.add.staticGroup();
      platforms.create(0, 530, 'stoneBoard2').setScale(1.2,0.8).setOrigin(0, 0).refreshBody().setDepth(4);
      platforms.create(700, 530, 'stoneBoard2').setScale(1.2,0.8).setOrigin(0, 0).refreshBody().setDepth(4);
      this.anims.create({
        key: 'right0',
        frames: this.anims.generateFrameNumbers('zhujue2', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
          key: 'left0',
          frames: this.anims.generateFrameNumbers('zhujue2', { start: 3, end: 5 }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          key: 'stand',
          // frames: [ { key: 'zhujue2', frame: 9 } ],
          frames: this.anims.generateFrameNumbers('zhujue2', { start: 9, end: 11 }),
          frameRate: 10,
          repeat: -1
      });
      cursors = this.input.keyboard.createCursorKeys();
      player = this.physics.add.sprite(150, 350, 'zhujue2').setScale(1.8).setOrigin(0, 0).setDepth(4)

      for(var i=0;i<20;i++){
        if(i%3==1)
          direns[i]=this.add.sprite(i*65+50,Math.random()*400+200,'diren1')
        else if(i%3==2)
          direns[i]=this.add.sprite(i*65+50,Math.random()*400+200,'diren2')
        else
          direns[i]=this.add.sprite(i*65+50,Math.random()*400+200,'diren3')
      }
      this.anims.create({
        key: 'diren1Run',
        frames: this.anims.generateFrameNumbers('diren1', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: 'diren2Run',
        frames: this.anims.generateFrameNumbers('diren2', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: 'diren3Run',
        frames: this.anims.generateFrameNumbers('diren3', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      for(var i=0;i<20;i++){
        if(i%3==1)
          soldiers[i]=this.add.sprite(i*65+50,Math.random()*200+600,'soldier1')
        else if(i%3==2)
          soldiers[i]=this.add.sprite(i*65+50,Math.random()*200+600,'soldier2')
        else
          soldiers[i]=this.add.sprite(i*65+50,Math.random()*200+600,'soldier3')
      }
      this.anims.create({
        key: 'soldier1Run',
        frames: this.anims.generateFrameNumbers('soldier1', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: 'soldier2Run',
        frames: this.anims.generateFrameNumbers('soldier2', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: 'soldier3Run',
        frames: this.anims.generateFrameNumbers('soldier3', { start: 12, end: 15 }),
        frameRate: 12,
        repeat: -1
      });

      this.anims.create({
        key: 'soldier1Face',
        frames: [ { key: 'soldier1', frame: 3 } ],
        frameRate: 20
      });
      this.anims.create({
        key: 'soldier2Face',
        frames: [ { key: 'soldier2', frame: 2 } ],
        frameRate: 20
      });
      this.anims.create({
        key: 'soldier3Face',
        frames: [ { key: 'soldier3', frame: 1 } ],
        frameRate: 20
      });
      createMessage(this);

      this.cameras.main.startFollow(player, true, 0.05, 0.05);
      this.physics.add.collider(player, platforms);
    },
   update(){
     this.dirensRun();
     this.soldiersRun();
      if (cursors.left.isDown )
      {   
          // 设置x轴速度
          player.setVelocityX(-260);  
          player.anims.play('left0', true);
          direction="left";
      }
      else if (cursors.right.isDown)
      {    
          player.setVelocityX(260);       
          player.anims.play('right0', true);
          direction="right";
      }
      else
      {
          player.setVelocityX(0);
          player.anims.play('stand', true);

      }

      if(process==1){
        process=2;
        showMessage(this)
      }
      if(process==3){
        process=4
        showEnd(this)
      }
    },
    dirensRun(){
      for(var i=0;i<20;i++){
        if(i%3==1){
          direns[i].play('diren1Run',true)

        }
        else if(i%3==2){
          direns[i].play('diren2Run',true)
        }
        else{
          direns[i].play('diren3Run',true)
        }
        if(direns[i].y>500){
          direns[i].y-=0.3
          direns[i].setScale(1)
        }
        else if(direns[i].y>400){
          direns[i].y-=0.25
          direns[i].setScale(1)

        }
        else if(direns[i].y>300){
          direns[i].y-=0.22
          direns[i].setScale(0.9)
          
        }
        else if(direns[i].y>200){
          direns[i].y-=0.1
          direns[i].setScale(0.8)
          
        }
        else if(direns[i].y>150){
          direns[i].y-=0.08
          direns[i].setScale(0.6)
      
        }
        else{
          direns[i].setAlpha(0)
        }
      }
    },
    soldiersRun(){
      countStop=0;
      for(var i=0;i<20;i++){
        if(i%3==1){
          soldiers[i].play('soldier1Run',true)
        }
        else if(i%3==2){
          soldiers[i].play('soldier2Run',true)
        }
        else{
          soldiers[i].play('soldier3Run',true)
        }

        if(soldiers[i].y>500){
          soldiers[i].y-=0.3
          soldiers[i].setScale(1.5)
        }
        else if(soldiers[i].y>400){
          soldiers[i].y-=0.25
          soldiers[i].setScale(1.2)

        }
        else if(soldiers[i].y>300){
          soldiers[i].y-=0.22
          soldiers[i].setScale(1.1)
        }
        else{
          countStop+=1;
          if(i%3==1){
            soldiers[i].play('soldier1Face')
          }
          else if(i%3==2){
            soldiers[i].play('soldier2Face')
          }
          else{
            soldiers[i].play('soldier3Face')
          }
        }
      }
      if(countStop==20 && process==0){
        process=1
      }
    },
    
})
//定义全局变量：
// message 显示的板
// messageText 内容
// mengban
// TEXT文本内容
function createMessage(this1){
  console.log(55)
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

  messageEndText=this1.make.text({
    x:300,
    y:200,
    text:'',
    origin:{x:0,y:0},
    style:{ 
      color: 'white', 
      font: '50px 华文行楷',
      lineSpacing:10,
      wordWrap: { width: 400, useAdvancedWrap: true }
    }
  }).setDepth(15)
}
function showMessage(this1){
  mengban.setAlpha(0.8)
  message.setAlpha(1)
  messageText.setAlpha(1)
  // 暂停物理事件
  this1.physics.pause();
  timeEvent=this1.time.addEvent({
    delay:50,
    callback:function(){
      messageText.setText(TEXT.substring(0,TEXT.length-timeEvent.repeatCount))
          // 文字显示结束
        if(timeEvent.repeatCount==0){
          // 恢复物理事件
          this1.physics.resume();
          process=3;
        }
    },
    repeat:TEXT.length,
    args:[]
  }) 
}
function showEnd(this1){
  // 等待10 黑屏 显示文字 滚动
  var alpha=0;
  var mengban2=this1.add.image(500,300,'mengban').setScale(2).setDepth(11).setAlpha(0);

  timeEnd=this1.time.addEvent({
    delay:200,
    callback:function(){
      if(timeEnd.repeatCount<=TEXTEND.length+10 && timeEnd.repeatCount>TEXTEND.length){
        console.log(alpha)
        alpha+=0.1

        mengban2.setAlpha(alpha)
      }
      else if(timeEnd.repeatCount<=TEXTEND.length)
        messageEndText.setText(TEXTEND.substring(0,TEXTEND.length-timeEnd.repeatCount))
     
    },
    repeat:TEXTEND.length+10+10,
    args:[]
  })
}


export default sceneWin