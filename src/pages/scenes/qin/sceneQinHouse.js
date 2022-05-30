/** 
 * @Author: 徐程鸿
 * @Stage: 勤
 */
var player
var platforms
var cursors
var direction
var triggerOutHouse
var triggerToGame
var typeOfTrigger = 0; // 1为退出房间 2为进入游戏
var button
var buttonText

const sceneQinHouse = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function SceneQin() {
            Phaser.Scene.call(this, { key: 'sceneQinHouse' });
            this.cursors;
            typeOfTrigger = 0;
        },
    preload: function () {
        //   this.scene.remove("gameQin");
        this.load.image("message", MESSAGE);
        this.load.image("mengban", MENGBAN)
        this.load.image('insideback1', INSIDEBACK1);
        this.load.image("insideboard1", INSIDEBOARD1);
        this.load.image("desk1", DESK1);
        this.load.image("desk3", DESK3);
        this.load.image("cup1", CUP1);
        this.load.image("bookshelf2", BOOKSHELF2)
        this.load.image("btn", BTN)
        this.load.image("paper", PAPER1);
        this.load.image("qinhousedoor", QINHOUSEDOOR)
        this.load.spritesheet('shusheng1', SHUSHENG1, { frameWidth: 32, frameHeight: 32 });

    },
    create() {
        this.cameras.main.setBounds(0, 0, 1400, 600);
        this.physics.world.setBounds(0, 0, 1400, 600);
        this.add.image(0, 0, 'insideback1').setOrigin(0, 0);
        this.add.image(1300, 0, 'insideback1').setOrigin(0, 0);
        this.add.image(400, 460, 'desk3').setScale(1.2, 1.2);
        this.add.image(100, 425, "qinhousedoor").setScale(0.42, 0.4)
        this.add.image(900, 300, 'paper')
        this.add.image(900, 460, 'desk1').setScale(1.2, 1.2);
        this.add.image(400, 425, 'cup1').setScale(1);
        this.add.image(1200, 340, 'bookshelf2').setScale(1.2, 1.2)
        // 创建地板
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'insideboard1').setScale(1.2, 1.1).setOrigin(0, 0).refreshBody();
        platforms.create(500, 500, 'insideboard1').setScale(1.2, 1.1).setOrigin(0, 0).refreshBody();
        platforms.create(1000, 500, 'insideboard1').setScale(1.2, 1.1).setOrigin(0, 0).refreshBody();
        // 创建玩家
        player = this.physics.add.sprite(150, 350, 'shusheng1').setScale(2.2, 2.5).setOrigin(0, 0);
        // 镜头一直跟随主角
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        // 设置玩家的反弹值为0.2 ，且与世界边缘产生碰撞，否则可以移动出画面
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('shusheng1', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rightStop',
            frames: [{ key: 'shusheng1', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('shusheng1', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftStop',
            frames: [{ key: 'shusheng1', frame: 1 }],
            frameRate: 20
        });
        cursors = this.input.keyboard.createCursorKeys();

        // 按钮和提示性文本
        button = this.add.image(player.x + 30, player.y - 50, 'btn').setScale(0.7, 0.7).setInteractive({ cursor: "pointer" });
        buttonText = this.add.text(player.x - 20, player.y - 55, "进入“勤”游戏", { fontFamily: "华文行楷", fontSize: 25, color: 'black' })
        button.setAlpha(0);
        buttonText.setAlpha(0);
        button.on("pointerup", () => {
            // buttonText.setText('');
            // this.physics.resume();
            if (typeOfTrigger == 1) {
                this.scene.switch("sceneQin")
            }
            else if (typeOfTrigger == 2) {
                this.scene.switch('gameQin');
                
            }
        });
        button.on("pointerover", function () {
            button.setTint(0xDCDCDC);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
        // 碰撞区域 用于返回外面
        triggerOutHouse = this.add.zone(100, 400).setSize(50, 100);
        this.physics.world.enable(triggerOutHouse);
        triggerOutHouse.body.setAllowGravity(false);
        triggerOutHouse.body.moves = false;

        //碰撞区域 用于触发按钮
        triggerToGame = this.add.zone(900, 400).setSize(100, 100);
        this.physics.world.enable(triggerToGame);
        triggerToGame.body.setAllowGravity(false);
        triggerToGame.body.moves = false;
        // 碰撞
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, triggerOutHouse, this.outHouse, null, this);
        this.physics.add.overlap(player, triggerToGame, this.toGame, null, this);
    },
    update() {
        if (cursors.left.isDown) {
            // 设置x轴速度
            player.setVelocityX(-180);
            player.anims.play('left', true);
            direction = "left";
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(180);
            player.anims.play('right', true);
            direction = "right";
        }
        else {
            player.setVelocityX(0);
            if (direction === "left")
                player.anims.play('leftStop');
            else
                player.anims.play('rightStop');
        }
        // 跳跃
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-300);
        }
        if (triggerToGame.body.touching.none && triggerOutHouse.body.touching.none) {
            button.setAlpha(0);
            buttonText.setAlpha(0);
        }
        // console.log(qinDoor.body.touching)
        // triggerToGame.body.touching.player ? 0x00ffff : 0xffff00;
    },
    toGame() {
        typeOfTrigger = 2;
        button.setAlpha(1);
        buttonText.setAlpha(1);
        buttonText.setText("进入“勤”游戏")
        button.setScale(1, 0.7)
        button.x = player.x + 30
        button.y = player.y - 45
        buttonText.x = player.x - 45
        buttonText.y = player.y - 55
    },
    outHouse() {
        typeOfTrigger = 1;
        button.x = player.x + 30
        button.y = player.y - 45
        buttonText.x = player.x - 20
        buttonText.y = player.y - 55
        button.setScale(0.7, 0.7)
        buttonText.setText("退出房间")
        button.setAlpha(1);
        buttonText.setAlpha(1);
    }
})


export default sceneQinHouse