/** 
 * @Author: 郭雷扬
 * @Stage: 恕
 */
var time = 0;
var count = 0;
var platforms;
var player;
var fuguan;

var cursors;
var direction;
var flat, soldier2, soldier;
var wall1, wall2;
var gameOver = false;
//对话设置
var enteroverlap, telloverlap, helpoverlap;
var stop = 0, help = 0, tell = 0;

//箭头移动
var shot;
var start, first;
var place;
var x, y;
//弓兵设置
var gongbing;
//初次进入场景，进行背景描述
var TEXT = "你终于返回城池，而副官因作战失误已被撤销官职。面对敌人的进攻，你只能自己率领将士守卫城池。"
var timeEvent
var mengban
var isTipShowed = false
var sceneShuThis
var tipShuOpenText
var tipOpen
var isgo = false
var isPass = true
const sceneShu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function sceneShu() {
            Phaser.Scene.call(this, { key: 'sceneShu' });
            this.cursors;
        },
    preload: function () {
        this.load.image('desertback1', DESERTBACK1);
        this.load.image('stoneboard2', STONEBOARD2);
        this.load.image('wall4', WALL4);
        this.load.spritesheet('zhujue2', SHUSHENG2, { frameWidth: 32, frameHeight: 32 });

        this.load.image("cloud7", CLOUD7);
        this.load.image("cloud8", CLOUD8);
        this.load.image("button", BTN);
        this.load.image("message", MESSAGE);
        this.load.image("mengban", MENGBAN)
        this.load.image("tree4", TREE4);
        this.load.image("tree5", TREE5);
        this.load.image("weapon", WEAPON);
        this.load.image("flat", FLAG1);
        this.load.spritesheet('gongbing', GONGBING, { frameWidth: 63.5, frameHeight: 60 });
        this.load.spritesheet("soldier2", SOLDIER2, { frameWidth: 32, frameHeight: 32 });
        
        this.load.spritesheet("shot", SHOT, { frameWidth: 30.5, frameHeight: 61 })

        this.load.spritesheet("fuguan", FUGUAN, { frameWidth: 32, frameHeight: 38 });
        this.load.image("duihua", DUIHUAKUANG);
        sceneShuThis = this;
    },
    create() {

        // 设置游戏总界限，不同于画面大小
        this.cameras.main.setBounds(0, 0, 1000 * 2, 600);
        this.physics.world.setBounds(0, 0, 1000 * 2, 600);
        //图片添加
        this.add.image(0, 0, "desertback1").setScale(1.25, 1).setOrigin(0, 0);
        this.add.image(1300, 0, "desertback1").setScale(1.25, 1).setOrigin(0, 0).setFlipX(false);
        //射箭添加
        place = new Array();
        place = [0, 100, 280, 480, 580, 970];
        start = new Array();
        first = new Array();
        shot = new Array();
        x = new Array();
        y = new Array();
        for (let i = 1; i <= 5; i++) {
            x[i] = new Array();
            x[i][1] = place[i];
            x[i][2] = place[i];
            y[i] = new Array();
            y[i][1] = 330;
            y[i][2] = 450;
            shot[i] = new Array();
            if (i == 1 || i == 2) {
                shot[i][1] = this.physics.add.sprite(place[i], 450, 'shot').setGravityY(-600);
                shot[i][2] = this.physics.add.sprite(place[i], 450, 'shot').setGravityY(-600);
            }
            else {
                shot[i][1] = this.physics.add.sprite(place[i], 450, 'shot').setGravityY(-600).setFlipX(true);
                shot[i][2] = this.physics.add.sprite(place[i], 450, 'shot').setGravityY(-600).setFlipX(true);
            }
            start[i] = 0;
            first[i] = 0;
        }



        this.add.image(0, 0, "cloud8").setOrigin(0, 0).setScrollFactor(0.1, 1);
        this.add.image(700, 100, "cloud7").setScrollFactor(0.1, 1);
        this.add.image(760, 110, "cloud7").setScrollFactor(0.1, 1);
        this.add.image(0, 430, "wall4");
        this.add.image(600, 430, "wall4");
        this.add.image(1200, 430, "wall4");
        this.add.image(1800, 430, "wall4");
        this.add.image(100, 330, "tree4").setScale(0.4, 0.4).setScrollFactor(0.7, 1);
        this.add.image(500, 340, "tree5").setScale(0.4, 0.4).setScrollFactor(0.7, 1);
        this.add.image(700, 390, "weapon").setScale(0.6, 0.6);
        flat = this.physics.add.staticImage(850, 321, "flat").setScale(1, 1);


        // 增加一个静态group
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 450, "stoneboard2").setScale(2, 2).setOrigin(0, 0).refreshBody();
        platforms.create(1200, 450, "stoneboard2").setScale(2, 2).setOrigin(0, 0).refreshBody();

        gongbing = new Array();
        for (let i = 1; i <= 5; i++) {
            gongbing[i] = this.physics.add.sprite(place[i] - 40, 360, 'gongbing').setScale(1.5).setOrigin(0, 0).setFlipX(true);
        }
        soldier2 = this.physics.add.sprite(850, 430, 'soldier2').setScale(1.5);
        soldier = this.physics.add.sprite(0, 430, 'soldier2').setScale(1.5);
        fuguan = this.physics.add.sprite(1800, 400, 'fuguan').setScale(1.5);



        // 增加一个精灵，即主角
        player = this.physics.add.sprite(150, 390, 'zhujue2').setScale(1.8).setOrigin(0, 0);



        // 镜头一直跟随主角
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        //设置玩家的反弹值为0.2 ，且与世界边缘产生碰撞，否则可以移动出画面
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        soldier2.setCollideWorldBounds(true);
        soldier.setCollideWorldBounds(true);
        fuguan.setCollideWorldBounds(true);
        for (let i = 1; i <= 5; i++)  gongbing[i].setCollideWorldBounds(true);
        // 设置碰撞事件
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(soldier2, platforms);
        this.physics.add.collider(soldier, platforms);
        this.physics.add.collider(fuguan, platforms);
        for (let i = 1; i <= 5; i++)   this.physics.add.collider(gongbing[i], platforms);


        // 创建精灵行为
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

        this.anims.create({
            key: 'shot',
            frames: this.anims.generateFrameNumbers('gongbing', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'tell',
            frames: this.anims.generateFrameNumbers('soldier2', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'help',
            frames: this.anims.generateFrameNumbers('fuguan', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('shot', { start: 0, end: 4 }),
            frameRate: 2.5,
        })

        //首页背景陈述
        mengban = this.add.image(500, 300, "mengban").setScale(2, 2).setAlpha(0.7);
        tipOpen = this.add.image(500, 300, 'message').setScale(0.9, 0.7);
        tipShuOpenText = this.make.text({
            x: 295,
            y: 200,
            text: '',
            // text:poetry[nowQuestionIndex],
            origin: { x: 0, y: 0 },
            style: {
                color: 'black',
                font: '30px 华文行楷',
                lineSpacing: 5,
                wordWrap: { width: 430, useAdvancedWrap: true }
            }
        }).setDepth(6).setAlpha(0);

        sceneShuThis.physics.pause();

        timeEvent = this.time.addEvent({

            delay: 50,
            callback: function () {
                tipShuOpenText.setAlpha(1);
                tipShuOpenText.setText(TEXT.substring(0, TEXT.length - timeEvent.repeatCount));
                if (timeEvent.repeatCount == 0) {
                    isTipShowed = true;
                    sceneShuThis.physics.resume();
                }
            },
            repeat: TEXT.length,
        })


        //cursors为一个输入事件的类
        // 创建并返回一个对象，其中包含向上、向下、向左和向右的 4 个热键，以及空格键和 shift。
        cursors = this.input.keyboard.createCursorKeys();

        //进入游戏
        enteroverlap = this.physics.add.overlap(player, soldier2, this.entergame, null, this);
        //士兵报告

        telloverlap = this.physics.add.overlap(player, soldier, this.tell, null, this);
        //副官对话，重新进入游戏
        helpoverlap = this.physics.add.overlap(player, fuguan, this.help, null, this);


    },

    update() {
        if (isgo && count == 0) {
            //弓兵启动
            count = 1;
            for (let i = 1; i <= 5; i++) {
                shot[i][1].anims.play('fly', true);
                shot[i][1].setVelocityY(-400);
                setTimeout(function () {
                    first[i] = 1;
                    shot[i][2].setVelocityY(-400);
                    start[i] = 1;
                    shot[i][2].anims.play('fly', true);
                }, 1500);
            }
        }
        if (isgo) {
            for (let i = 1; i <= 5; i++) {
                gongbing[i].anims.play('shot', true);
                gongbing1shot(i);
            }
        }
        //第一次游戏结束后，返回当前场景，士兵前来报讯
        if (time == 1) {
            direction="left"
            soldier.setVelocityX(500);
            soldier.anims.play('tell', true);
        }
        if (stop == 1) {
            soldier.setVelocityX(0);
            soldier.anims.play('tell', false);
        }
        if (tell == 1) {
            fuguan.anims.play('help', true);
            fuguan.setVelocityX(-480);
        }
        if (help == 1) {
            direction="right"
            fuguan.setVelocityX(0);
            fuguan.anims.play('help', false);

        }
        // 设置玩家移动
        if (gameOver) {
            // 游戏停止
            return;
        }
        // 方向左键按下
        if (cursors.left.isDown && isTipShowed) {
            // 设置x轴速度
            player.setVelocityX(-480);
            player.anims.play('left0', true);
            mengban.setAlpha(0)
            tipOpen.setAlpha(0)
            tipShuOpenText.setAlpha(0)
            direction = "left";
            isgo = true;
        }
        else if (cursors.right.isDown && isTipShowed) {
            player.setVelocityX(480);
            player.anims.play('right0', true);
            mengban.setAlpha(0)
            tipOpen.setAlpha(0)
            tipShuOpenText.setAlpha(0)
            direction = "right";
            isgo = true;

        }
        else {
            player.setVelocityX(0);
            if (direction == "left") {
                console.log(1);
                player.anims.play('leftStop0');
            }
            else
                player.anims.play('rightStop0');
        }
        // 触碰地面
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-300);
            if (isTipShowed) {
                mengban.setAlpha(0)
                tipOpen.setAlpha(0)
                tipShuOpenText.setAlpha(0)
                isgo = true;
            }
        }
    },
    entergame: function () {
        this.physics.world.removeCollider(enteroverlap);

        var button = this.add.image(player.x + 40, player.y - 40, 'button').setScale(0.6, 0.8).setInteractive({ cursor: "pointer" });
        var text = this.add.text(player.x - 20, player.y - 46, "点击进入游戏", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })

        button.once("pointerup", () => {
            button.destroy();
            button = null;
            text.setText('');
        });
        button.once("pointerdown", () => {
            this.scene.switch('gameShu');
            time = 1;
            button.destroy();
            button = null;
            text.setText('');
        });
        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
    },
    tell: function () {
        if (time == 1) {
            this.physics.world.removeCollider(telloverlap);
            sceneShuThis.physics.pause()
            stop = 1;
            var flag = 0;
            var offsetX = this.cameras.main.scrollX;
            var duihua = this.add.image(200, 490, 'duihua').setScale(1, 0.65).setOrigin(0, 0).setAlpha(0.7);
            var TEXT1 = "徐大人,战事不利,敌方将军勇猛,唯有邹将军可以与之匹敌,在下恳请您";
            var TEXT2 = "宽恕邹将军,给他戴罪立功的机会！"
            var TEXT3 = "也罢，就再给邹将军一次机会！";
            var touxiang = this.add.image(offsetX + 45, 545, 'soldier2').setScale(1.5);
            var text = this.add.text(offsetX + 85, 525, "", { fontFamily: "华文行楷", fontSize: 26, color: 'black' });
            if (flag == 0) {
                flag = 1;
                var i = 0;
                var ID = setInterval(() => {
                    text.setText(TEXT1.substring(0, ++i));
                    if (i == TEXT1.length) {
                        clearInterval(ID);
                        //setTimeout(() => {
                        i = 0;
                        ID = setInterval(() => {
                            text.setText(TEXT2.substring(0, ++i));
                            if (i == TEXT2.length + 10) {
                                clearInterval(ID);
                                setTimeout(() => {
                                    i = 0;
                                    console.log(touxiang)
                                    touxiang.setTexture('zhujue2');
                                    ID = setInterval(() => {
                                        text.setText(TEXT3.substring(0, ++i));
                                        if (i == TEXT3.length + 10) {
                                            clearInterval(ID);
                                            this.physics.resume();
                                            touxiang.destroy();
                                            text.setText("");
                                            duihua.setAlpha(0);
                                            tell = 1;
                                        }
                                    }, 100);
                                }, 100);
                            }
                        }, 100);
                        //}, 100);
                    }
                }, 100);
            }
        }


    },
    help: function () {
        this.physics.world.removeCollider(helpoverlap);
        help = 1;
        var flag = 0;
        var offsetX = this.cameras.main.scrollX;
        var duihua = this.add.image(200, 490, 'duihua').setScale(1, 0.65).setOrigin(0, 0).setAlpha(0.7);
        var TEXT1 = "徐大人！末将已经认识到自己犯下的错了，希望您能够宽恕我";
        var TEXT2 = "请让我将功赎过！！！"
        var TEXT3 = "好！让我们联手退敌，扬我国威！！！";
        var touxiang = this.add.image(offsetX + 45, 545, 'fuguan').setScale(1.5);
        var text = this.add.text(offsetX + 85, 525, "", { fontFamily: "华文行楷", fontSize: 26, color: 'black' });
        sceneShuThis.physics.pause()
        if (flag == 0) {
            flag = 1;
            var i = 0;
            var ID = setInterval(() => {
                text.setText(TEXT1.substring(0, ++i));
                if (i == TEXT1.length) {
                    clearInterval(ID);
                    i = 0;
                    ID = setInterval(() => {
                        text.setText(TEXT2.substring(0, ++i));
                        if (i == TEXT2.length + 10) {
                            clearInterval(ID);
                            setTimeout(() => {
                                i = 0;
                                console.log(touxiang)
                                touxiang.setTexture('zhujue2');
                                ID = setInterval(() => {
                                    text.setText(TEXT3.substring(0, ++i));
                                    if (i == TEXT3.length + 20) {
                                        clearInterval(ID);
                                        this.physics.resume();
                                        touxiang.destroy();
                                        text.setText("");
                                        duihua.setAlpha(0);
                                        sceneShuThis.physics.resume()

                                        this.scene.switch('gameShu');
                                    }
                                }, 100);
                            }, 100);
                        }
                    }, 100);
                }
            }, 100);
        }

    }
})
//弓兵射箭设置
function gongbing1shot(i) {
    var step = 1;
    if (i == 1) step = 1 / i / 3;
    if (i == 2) step = 1 / i / 5;
    if (i == 3) step = -i / 25;
    if (i == 4) step = -i / 20;
    if (i == 5) step = -i / 5;
    x[i][1] += step;
    shot[i][1].x = x[i][1];
    if (start[i] == 0) {
        shot[i][2].y = 450;
        first[i] = 1;
    }
    if (start[i] == 1) {
        if (first[i] == 1) {
            first[i] = 0;
            shot[i][2].y = 330;
        }
        x[i][2] += step;
        shot[i][2].x = x[i][2];
    }
    if (shot[i][1].y > 500) {
        shot[i][1].setVelocityY(-400);
        x[i][1] = place[i];
        shot[i][1].x = place[i];
        shot[i][1].y = 330;
        shot[i][1].anims.play('fly', true);
    }
    if (shot[i][2].y > 500) {
        shot[i][2].setVelocityY(-400);
        x[i][2] = place[i];
        shot[i][2].x = place[i];
        shot[i][2].y = 330;
        shot[i][2].anims.play('fly', true);
    }
}

export default sceneShu