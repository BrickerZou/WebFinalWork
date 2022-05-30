/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var platforms;
var player;
var horse;
var cursors;
var direction;
var flag = 0;
var i = 0;
var ridEvent;
var OpenHouseEvent;
var music;
var isPass = true
const Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'wall' });

        },
    preload() {

        this.scene.remove('prison');
        var progress = this.add.graphics();
        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);

        });
        this.load.on('complete', function () {
            progress.destroy();
        });

        this.load.image('desertback1', DESERTBACK1);
        this.load.image('desertboard1', DESERTBOARD1);
        this.load.image('wall4', WALL4);
        this.load.image('lupai', LUPAI);
        this.load.image('cloud7', CLOUD7);
        this.load.image('cloud8', CLOUD8);
        this.load.image('sun', SUN);
        this.load.image('btn', BTN)
        this.load.image('flag1', FLAG1);
        this.load.image('house4', HOUSE4)
        this.load.spritesheet('zhujue2',SHUSHENG2, { frameWidth: 32, frameHeight:32 });
        this.load.spritesheet('horse', HORSE, { frameWidth: 32, frameHeight: 32 });
        this.textures.removeKey("right");
        this.textures.removeKey("rightStop");
        this.textures.removeKey("left");
        this.textures.removeKey("leftStop");
        this.load.spritesheet('soldier2', SOLDIER2, { frameWidth: 32, frameHeight: 32 });
        this.load.image('weapon', WEAPON)
        this.load.audio('ridemusic', RIDEAUDIO);
    },
    create() {
        // $.post('src/server/update.php',{
        //     stage:3,
        // },function(data){
        //     console.log(data);
        // },'json');

        this.cameras.main.setBounds(0, 0, 3000, 600);
        this.physics.world.setBounds(0, 0, 3000, 600);
        /* 添加场景 */
        this.add.image(0, 0, 'desertback1').setScale(2.6, 1).setOrigin(0, 0);
        this.add.image(800, 30, 'sun').setScale(1).setOrigin(0, 0).setScrollFactor(0.2, 1);
        this.add.image(1100, 50, 'cloud7').setScale(1).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(1200, 70, 'cloud8').setScale(0.7).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(750, 50, 'cloud7').setScale(1).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(500, 60, 'cloud8').setScale(1).setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.add.image(0, 350, 'wall4').setScale(1, 1).setOrigin(0, 0);
        this.add.image(960, 350, 'wall4').setScale(1, 1).setOrigin(0, 0);
        this.add.image(2 * 960, 350, 'wall4').setScale(1, 1).setOrigin(0, 0);
        this.add.image(3 * 960, 350, 'wall4').setScale(1, 1).setOrigin(0, 0);
        this.add.image(4 * 960, 350, 'wall4').setScale(1, 1).setOrigin(0, 0);
        this.add.image(2550, 180, 'flag1').setScale(1).setOrigin(0, 0);
        this.add.image(2750, 306, 'weapon').setScale(0.8).setOrigin(0, 0);
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'desertboard1').setScale(5.1, 1).setOrigin(0, 0).refreshBody();
        var house4 = this.physics.add.staticImage(500, 366, 'house4').setScale(0.8).refreshBody();

        /* 添加人物 */
        this.add.image(650, 450, 'soldier2').setScale(1.5).setOrigin(0, 0);
        this.add.image(690, 450, 'soldier2').setScale(1.5).setOrigin(0, 0);
        player = this.physics.add.sprite(2750, 350, 'zhujue2').setScale(1.5).setOrigin(0, 0);
        horse = this.physics.add.sprite(2450, 400, 'horse').setScale(2).setOrigin(0, 0);
        player.setFrame(4);
        horse.setFrame(4)
        player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(player, true, 0.05, 0.05, 200);
        /* 添加动作 */
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
            key: 'horseRight',
            frames: this.anims.generateFrameNumbers('horse', { start: 8, end: 11 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'horseRightStop',
            frames: [{ key: 'horse', frame: 8 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'horseLeft',
            frames: this.anims.generateFrameNumbers('horse', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'horseLeftStop',
            frames: [{ key: 'horse', frame: 4 }],
            frameRate: 20
        });

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(horse, platforms);

        /* 添加交互事件 */
        OpenHouseEvent = this.physics.add.collider(player, house4, this.OpenHouse, null, this);
        ridEvent = this.physics.add.collider(horse, player, this.ridHorse, null, this);

    },
    update() {
        //上马
        if (flag == 1) {
            player.y = horse.y - 20;
            player.x = horse.x + 10;
            if (cursors.left.isDown) {
                horse.setVelocityX(-300);
                player.anims.play('left0', true);
                horse.anims.play('horseLeft', true);
                direction = "left";
                music.resume();

            }
            else if (cursors.right.isDown) {

                horse.setVelocityX(300);
                player.anims.play('right0', true);
                horse.anims.play('horseRight', true);
                direction = "right";
                music.resume();
            }
            else {
                horse.setVelocityX(0);
                if (direction === "left") {
                    player.anims.play('leftStop0');
                    horse.anims.play('horseLeftStop');
                }
                else {
                    player.anims.play('rightStop0');
                    horse.anims.play('horseRightStop');
                }
                music.pause();

            }
        }
        // 未上马
        else {
            if (cursors.left.isDown) {
                // 设置x轴速度
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
                if (direction === "right") {
                    player.anims.play('rightStop0', true);
                }

                else {
                    player.anims.play('leftStop0', true);
                }

            }
        }


    },
    OpenHouse() {
        this.physics.world.removeCollider(OpenHouseEvent);
        var lupaiToNext;
        lupaiToNext = this.add.image(150, 390, 'lupai').setOrigin(0, 0).setScale(-0.15, 0.15).setInteractive({ cursor: "pointer" });;
        console.log(124)
        lupaiToNext.on("pointerup", () => {
            if (isPass) {
                this.scene.start('sceneShu')
            }
        })
        lupaiToNext.on("pointerover", function () {
            // console.log("进入下一关")  
            lupaiToNext.setTint(0xDCDCDC);
        });
        lupaiToNext.on("pointerout", function () {
            lupaiToNext.clearTint();
        });
    },
    ridHorse() {
        this.physics.world.removeCollider(ridEvent);
        this.physics.pause();

        var button = this.add.image(player.x + 16, player.y - 40, 'btn').setScale(0.5, 0.8).setInteractive({ cursor: "pointer" });
        var text = this.add.text(player.x - 24, player.y - 46, "点击骑马", { fontFamily: "华文行楷", fontSize: 20, color: 'black' })

        button.once("pointerdown", () => {
            this.physics.resume();
            flag = 1;
            button.destroy();
            button = null;
            text.setText('');
            player.body.setAllowGravity(false);
            music = this.sound.add('ridemusic');
            music.play();
        });
        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });
        button.on("pointerout", function () {
            button.clearTint();
        });
    }




})

export default Scene;