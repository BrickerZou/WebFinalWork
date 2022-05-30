/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var platforms;
var player;
var soldier;
var cursors;
var direction;
var OpenTipEvent;
var OpenHouseEvent;
var soldierColliderEvent;
var flag = 0;
var music;
var birds = [];
var birdsMove = []
const BIRDAMOUNT = 2;

var timeEvent;
var mengban;
var message;
var messageText;
const TipTEXT="出仕十余载，你在官场步步升迁，被封为封疆大史，眼看戍边百姓疾苦，自请长缨投身前线。";
const Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'town' });
        },
    preload() {
        this.scene.remove("gameShen")
        this.scene.remove("sceneShen")
        this.scene.remove("sceneHotel")
        var progress = this.add.graphics();
        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });
        this.load.on('complete', function () {
            progress.destroy();
        });

        this.load.image('back', DESERTBACK1);
        this.load.image('board', DESERTBOARD1);
        this.load.image('tip', TIPS2);
        this.load.image('wall', WALL4);
        this.load.image('cloud1', CLOUD7);
        this.load.image('cloud2', CLOUD8);
        this.load.image('moon', MOON1);
        this.load.image('tree', TREE4);
        this.load.image('button', BTN)
        this.load.image('house', HOUSE9);
        this.load.image('fudi', HOUSE4)
        this.load.spritesheet('soldier', SOLDIER2, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('zhujue2', SHUSHENG2, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bird', BIRD, { frameWidth: 85.5, frameHeight: 106 });
        this.load.image('duihua', DUIHUAKUANG);
        this.textures.remove('right');
        this.load.image("message",MESSAGE)
        this.load.image("mengban",MENGBAN)
        
        this.load.audio('backmusic', ZHANGZHENGAUDIO3);
    },


    create() {
        music = this.sound.add('backmusic');
        music.play();
        createMessage(this);
        showMessage(this,TipTEXT);
        this.cameras.main.setBounds(0, 0, 2000, 600);
        this.physics.world.setBounds(0, 0, 2000, 600);
         /*添加场景*/
        this.add.image(0, 0, 'back').setScale(1.55, 1).setOrigin(0, 0);
        this.add.image(800, 30, 'moon').setScale(0.6).setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.image(100, 50, 'cloud1').setScale(1).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(300, 60, 'cloud2').setScale(1).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(0, 350, 'wall').setScale(3, 1).setOrigin(0, 0);
        this.add.image(800, 329, 'house').setScale(1, 1).setOrigin(0, 0);

        var tip = this.physics.add.staticGroup();
        tip.create(300, 350, 'tip').setScale(0.5).setOrigin(0, 0).refreshBody();

        var fudi = this.physics.add.staticImage(1800, 366, 'fudi').setScale(0.8).refreshBody();
        this.add.image(50, 337, 'tree').setScale(1).setOrigin(0, 0);
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'board').setScale(3.35, 1).setOrigin(0, 0).refreshBody();
          /*添加人物*/
        player = this.physics.add.sprite(150, 440, 'zhujue2').setScale(1.8).setOrigin(0, 0);
        soldier = this.physics.add.staticImage(800, 440, 'soldier').setScale(1.8).setOrigin(0, 0);
        // 镜头一直跟随主角
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
            frames: [{ key: 'zhujue2', frame: 6 }],
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

        cursors = this.input.keyboard.createCursorKeys();
          /*添加交互事件*/
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(soldier, platforms);

        OpenTipEvent = this.physics.add.overlap(player, tip, this.tipOpen, null, this);
        OpenHouseEvent = this.physics.add.collider(player, fudi, this.houseOpen, null, this);
        soldierColliderEvent = this.physics.add.overlap(player, soldier, this.soldierCollier, null, this);

          /*添加飞鸟*/
        for (var i = 0; i < BIRDAMOUNT; i++) {
            var y = Math.floor((Math.random() * 100) + 50);
            var x = i % 2 == 0 ? -1 : 1;
            var dx = -x;
            var dy = i % 2 == 0 ? -0.1 : 0.1;
            birdsMove[i] = [dx, dy];
            birds[i] = this.physics.add.sprite((x + 1) * 650, y, 'bird');
            birds[i].body.setAllowGravity(false);
        }
        this.anims.create({
            key: 'birdfly',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        for (var i = 0; i < BIRDAMOUNT; i++) {
            birds[i].anims.play('birdfly', true);
        }
    },
    update() {
        this.birdsFly();
        if (cursors.left.isDown) {
            player.setVelocityX(-180);
            player.anims.play('left0', true);
            direction = "left";

        }
        else if (cursors.right.isDown) {
            player.setVelocityX(180);
            player.anims.play('right0', true);
            direction = "right";

        }
        else {
            player.setVelocityX(0);
            if (direction === "left")
                player.anims.play('leftStop0');
            else
                player.anims.play('rightStop0');

        }

    },
    birdsFly() {
        for (var i = 0; i < BIRDAMOUNT; i++) {
            birds[i].x += birdsMove[i][0]
            birds[i].y += birdsMove[i][1]
            if (birds[i].x > 1850 || birds[i].x < -50) {
                birdsMove[i][0] = -birdsMove[i][0]
                birdsMove[i][1] = -birdsMove[i][1]
            }
        }
    },
    tipOpen() {
        this.physics.world.removeCollider(OpenTipEvent);
        this.physics.pause();

        var button = this.add.image(player.x + 20, player.y - 40, 'button').setScale(0.5, 0.8).setInteractive({ cursor: "pointer" });
        var text = this.add.text(player.x - 20, player.y - 46, "查看内容", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })

        button.once("pointerup", () => {
            text.setText('');
            button.destroy();
            button = null;

            $("#game").css("background-color", "rgba(0,0,0,0,0.5)");
            $("#game").append("<div class='wenzitu'></div>");
            $(".wenzitu").append("<div class='wenzi'></div>");
            const TEXT = "明盛四十年,因边境纷争问题,徐国邹国正式开战,战火一触即发,本县地处前线,首当其冲。为尽快平息战火,派新上任的封疆大史徐书剑去前线监督作战。";
            var i = 0;
            var ID = setInterval(() => {
                let str = TEXT.substring(0, ++i);
                $(".wenzi").text(str);
                if (i === TEXT.length + 15) {
                    clearInterval(ID);
                    $(".wenzitu").hide();
                    this.physics.resume();
                }
            }, 100);

        });

        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
    },
    soldierCollier() {
        this.physics.world.removeCollider(soldierColliderEvent);
        this.physics.pause();
        soldier.setFrame(4)

        var button = this.add.image(soldier.x + 16, soldier.y - 40, 'button').setScale(0.5, 0.8).setInteractive({ cursor: "pointer" });
        var tiptext = this.add.text(soldier.x - 24, soldier.y - 46, "点击对话", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })

        button.once("pointerup", () => {
            tiptext.setText('');
            button.destroy();
            button = null;

            var offsetX = this.cameras.main.scrollX;
            var duihua = this.add.image(0, 490, 'duihua').setScale(1, 0.65).setOrigin(0, 0).setAlpha(0.7);
            var TEXT1 = "徐大人,前线告急，将军已等候您多时了。";
            var TEXT2 = "辛苦了你了,我速速前去。";


            // var role=this.add.text(15,525,roleName,{fontFamily: "华文行楷",fontSize: 30,color: 'red'});
            var touxiang = this.add.image(offsetX + 45, 545, 'soldier').setScale(1.5);
            var text = this.add.text(offsetX + 85, 525, "", { fontFamily: "华文行楷", fontSize: 26, color: 'black' });
            if (flag == 0) {
                flag = 1;
                var i = 0;
                var ID = setInterval(() => {
                    text.setText(TEXT1.substring(0, ++i));
                    if (i == TEXT1.length+10) {
                        clearInterval(ID);
                        // 第二段对话
                        setTimeout(() => {
                            i = 0;
                            touxiang.setTexture('zhujue2');
                            ID = setInterval(() => {
                                text.setText(TEXT2.substring(0, ++i));
                                if (i == TEXT2.length+10) {
                                    clearInterval(ID);
                                    this.physics.resume();

                                    setTimeout(() => {
                                        touxiang.destroy();
                                        text.setText("");
                                        duihua.setAlpha(0);
                                    }, 1000);
                                }

                            }, 100);
                        }, 1000);
                    }

                }, 100);
            }


        });

        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });


    },
    houseOpen() {
        this.physics.world.removeCollider(OpenHouseEvent);
        this.physics.pause();

        var button = this.add.image(player.x + 16, player.y - 40, 'button').setScale(0.5, 0.8).setInteractive({ cursor: "url(" + GUANGBIAO + "),pointer" });
        var text = this.add.text(player.x - 24, player.y - 46, "点击进入", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })

        button.once("pointerup", () => {
            this.physics.resume();
            button.destroy();
            button = null;
            text.setText('');
        });
        button.once("pointerdown", () => {
            music.pause();
            this.scene.start('mansion');
        });
        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
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
          }
      },
      repeat:text.length+15,
      args:[]
    }) 
  }

export default Scene;
