/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var platforms;
var player;
var fuguan;
var cursors;
var direction;
var duihua;
var flag = 0;
var flag2 = 0;
const Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'mansion' });
        },
    preload() {
        var progress = this.add.graphics();
        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);
        });
        this.load.on('complete', function () {
            progress.destroy();
        });
        this.scene.remove("town");
        this.textures.removeKey("back");
        this.load.image('back', INSIDEBACK3);
        this.load.image('board1', INSIDEBOARD1);
        this.load.image('desk', DESK2);
        this.load.image('weapon', WEAPON)
        this.load.image('bookshelf', BOOKSHELF2);
        this.load.image('paper', PAPER4);
        this.load.image('duihua', DUIHUAKUANG);
        this.load.spritesheet('soldier3', SOLDIER3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('zhujue2', SHUSHENG2, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fuguan', FUGUAN, { frameWidth: 32, frameHeight: 38 });
        this.load.spritesheet('fuguan2', FUGUAN2, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fuguan3', FUGUAN3, { frameWidth: 32, frameHeight: 32 });
    },


    create() {
        this.cameras.main.setBounds(0, 0, 1000, 600);
        this.physics.world.setBounds(0, 0, 1000, 600);
        // 添加场景
        this.add.image(0, 0, 'back').setScale(0.77, 1).setOrigin(0, 0);
        this.add.image(300, 393, 'desk').setOrigin(0, 0);
        this.add.image(100, 306, 'weapon').setScale(0.8).setOrigin(0, 0);
        this.add.image(260, 100, 'paper').setOrigin(0, 0);
        this.add.image(540, 217, 'bookshelf').setOrigin(0, 0);
        this.add.image(650, 217, 'bookshelf').setOrigin(0, 0);
        this.add.image(760, 217, 'bookshelf').setOrigin(0, 0);
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'board1').setScale(1.67, 1).setOrigin(0, 0).refreshBody();
        duihua = this.add.image(0, 490, 'duihua').setScale(1, 0.65).setOrigin(0, 0).setAlpha(0);
        this.add.image(70, 452, 'soldier3').setScale(1.5).setOrigin(0, 0);
        this.add.image(30, 452, 'soldier3').setScale(1.5).setOrigin(0, 0);
        this.add.image(510, 452, 'fuguan2').setScale(1.5).setOrigin(0, 0).setFrame(3);
        this.add.image(470, 452, 'fuguan3').setScale(1.5).setOrigin(0, 0).setFrame(8);
        player = this.physics.add.sprite(150, 430, 'zhujue2').setScale(1.8).setOrigin(0, 0);
        fuguan = this.physics.add.sprite(800, 430, 'fuguan').setScale(1.8).setOrigin(0, 0);
        fuguan.setFrame(5);

        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        player.setCollideWorldBounds(true);
        fuguan.setCollideWorldBounds(true);
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
            key: 'fuguanLeft',
            frames: this.anims.generateFrameNumbers('fuguan', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fuguanRight',
            frames: this.anims.generateFrameNumbers('fuguan', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftStop0',
            frames: [{ key: 'zhujue2', frame: 3 }],
            frameRate: 20
        });


        fuguan.play('fuguanLeft', true);
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fuguan, platforms);

        var event = this.physics.add.collider(player, fuguan, () => {
            this.physics.world.removeCollider(event);
            this.physics.pause();
            flag = 1;
            fuguan.stop();
            fuguan.setFrame(5);
            duihua.setAlpha(0.7);

            var TEXT1 = "敌军已攻至城下,如今敌军长久异地作战,定疲惫不堪,\n乃一举击溃,立下战功之良机";
            var TEXT2 = "万万不可,如今敌军势如破竹,屡战屡捷,还应御敌于城下为好";
            var TEXT3 = "哈哈哈,徐兄多虑了,吾有猛将数十位,勇士数千人,\n三刀之内必斩敌将于胯下,杀敌军片甲不留";
            var TEXT4 = "徐兄到时定要莅临前线,鼓舞三军士气！";

            var touxiang = this.add.image(45, 545, 'fuguan').setScale(1.5);
            var text = this.add.text(85, 525, "", { fontFamily: "华文行楷", fontSize: 26, color: 'black' });
            // var obj=[{name:"",content:}]
            var i = 0;
            var ID = setInterval(() => {
                text.setText(TEXT1.substring(0, ++i));
                if (i == TEXT1.length + 10) {
                    clearInterval(ID);
                    i = 0;
                    touxiang.setTexture('zhujue2');
                    ID = setInterval(() => {
                        text.setText(TEXT2.substring(0, ++i));
                        if (i == TEXT2.length + 10) {
                            clearInterval(ID);
                            i = 0;
                            touxiang.setTexture('fuguan');
                            ID = setInterval(() => {
                                text.setText(TEXT3.substring(0, ++i));
                                if (i == TEXT3.length + 10) {
                                    clearInterval(ID);
                                    i = 0;
                                    ID = setInterval(() => {
                                        text.setText(TEXT4.substring(0, ++i));
                                        if (i == TEXT4.length + 10) {
                                            clearInterval(ID);
                                            i = 0;
                                            touxiang.destroy();
                                            text.setText("");
                                            duihua.setAlpha(0);
                                            flag2 = 1;
                                            this.physics.resume();
                                            fuguan.play('fuguanRight', true);
                                        }
                                    }, 100)

                                }

                            }, 100);

                        }

                    }, 100);
                }

            }, 100);



        }, null, this);

    },
    update() {
        if (!flag) {
            fuguan.x -= 2;
        }
        if (flag2) {
            if (fuguan.x < 920)
                fuguan.x += 2;
            else
                fuguan.stop();
        }

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
            if (direction === "left")
                player.anims.play('leftStop0');
            else
                player.anims.play('rightStop0');

        }

        if (player.x > fuguan.x - 20) {
            this.scene.start("war");
        }

    },



})


export default Scene;