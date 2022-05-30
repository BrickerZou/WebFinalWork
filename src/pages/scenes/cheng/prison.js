/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var platforms;
var player;
var soldier;
var cursors;
var direction;
var door;
var doorOverlapEvent;
var soldierColliderlapEvent;

var timeEvent;
var mengban;
var message;
var messageText;
const TEXT1="为了平定战乱，\n为了匡扶大业，\n为了精忠报国。\n请躲避看守，趁机逃离监狱，亲信卫兵已在城外备好马匹!";
const TEXT2="<<诚>> 游戏说明：\n 这是一把文字密码锁，需要将七字连成诗句，才能解锁通过。";

const Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'prison' });

        },
    preload() {

        this.scene.remove('war');
        this.textures.remove('soldier');
        this.load.image('back2', PRISONBACK);
        this.load.image('board2', PRISONBOARD);
        this.load.image('door',PRISONDOOR);
        this.load.image('button',BTN);
        this.load.image('desk',DESK3);
        this.load.spritesheet('zhujue2',SHUSHENG2, { frameWidth: 32, frameHeight:32 });
        this.load.spritesheet('soldier1',SOLDIER1, { frameWidth: 32, frameHeight:32 })
        this.load.image("message",MESSAGE)
        this.load.image("mengban",MENGBAN)
        
    },

    create() {
        createMessage(this);
        showMessage(this,TEXT1);
        this.cameras.main.setBounds(0, 0, 1000, 600 );
        this.physics.world.setBounds(0, 0, 1000, 600 );

        //  添加场景
        this.add.image(0, 0, 'back2').setScale(0.77, 1).setOrigin(0, 0);
        this.add.image(700,435,'desk').setScale(1, 1).setOrigin(0, 0);
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'board2').setScale(1.67, 1).setOrigin(0, 0).refreshBody();
        door =  this.physics.add.staticGroup();
        door.create(400, 275, 'door').setScale(1, 1).setOrigin(0, 0).refreshBody();
        player = this.physics.add.sprite(50, 430, 'zhujue2').setScale(1.8).setOrigin(0, 0);
        soldier = this.physics.add.sprite(640, 440, 'soldier1').setScale(1.8).setOrigin(0, 0);

        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        player.setCollideWorldBounds(true);

          /*添加动作*/
        this.anims.create({
            key: 'right0',
            frames: this.anims.generateFrameNumbers('zhujue2', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'rightStop0',
            frames: [{ key: 'zhujue2', frame: 6}],
            frameRate: 20
        });

        this.anims.create({
            key: 'left0',
            frames: this.anims.generateFrameNumbers('zhujue2', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftStop0',
            frames: [{ key: 'zhujue2', frame: 3 }],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'soldierLeft',
            frames: this.anims.generateFrameNumbers('soldier1', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'soldierRight',
            frames: this.anims.generateFrameNumbers('soldier1', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });


        cursors = this.input.keyboard.createCursorKeys();

          /*添加交互事件*/ 
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(soldier, platforms);
        doorOverlapEvent=this.physics.add.collider(player, door, this.openDoor, null, this);
        soldierColliderlapEvent=this.physics.add.collider(player, soldier, this.discoveredBySoldier, null, this);
      
    },
    update() {
        if(soldier.x>620){
            soldier.setVelocityX(-80);  
            soldier.anims.play('soldierLeft', true);
        }
        if(soldier.x<220){
            soldier.setVelocityX(80);  
            soldier.anims.play('soldierRight', true);
        }

        if (cursors.left.isDown )
        {   
            player.setVelocityX(-180);  
            player.anims.play('left0', true);
            direction="left";
            
        }
        else if (cursors.right.isDown)
        {    
            player.setVelocityX(180);       
            player.anims.play('right0', true);
            direction="right";
    
        }
        else
        {
            player.setVelocityX(0);
            if(direction==="left")
                player.anims.play('leftStop0');
            else 
                player.anims.play('rightStop0');
        }

    },

    openDoor(){
        this.physics.world.removeCollider(doorOverlapEvent);
        this.physics.pause();
        console.log("进入大门");
    
        var button = this.add.image(player.x + 16, player.y - 40, 'button').setScale(0.5,0.8).setInteractive({ cursor: "pointer" });
        var text = this.add.text(player.x - 24, player.y - 46, "是否进入", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })
        
        button.once("pointerup", () => {
            this.physics.resume();
            button.destroy();
            button = null;
            text.setText('');
            // 游戏说明
            createMessage(this)
            showMessage(this,TEXT2)
            
        });
        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
    },

    discoveredBySoldier(){
        this.physics.pause();
        soldier.stop();
        player.setTint(0xff0000);
        setTimeout(()=>{
            this.scene.restart();
        },2000)
        
    },

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
      font: '32px 华文行楷',
      lineSpacing:8,
      wordWrap: { width: 380, useAdvancedWrap: true }
    }
  }).setDepth(10).setAlpha(0)
}
function showMessage(this1,text){
  mengban.setAlpha(0.8)
  message.setAlpha(1)
  messageText.setAlpha(1)
  // 暂停物理事件
  this1.physics.pause();
  timeEvent=this1.time.addEvent({
    delay:100,
    callback:function(){
        if(timeEvent.repeatCount>=15){
            messageText.setText(text.substring(0,text.length+15-timeEvent.repeatCount))
        }
          // 文字显示结束
        if(timeEvent.repeatCount==0){
          // 恢复物理事件
          this1.physics.resume();
          message.setAlpha(0)
          mengban.setAlpha(0)
          messageText.setAlpha(0)
          if (text==TEXT2)  this1.scene.start("gameCheng");
        }
    },
    repeat:text.length+15,
    args:[]
  }) 
}
export default Scene;