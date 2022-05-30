/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var players = [];
var enemys = [];
var flag = 0;
var music;
var i = 0;
const Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'war' });
        },
    preload() {
        this.scene.remove('fudi');
        // this.textures.removeKey("backmusic");
        this.textures.removeKey("soldier");
        this.load.image('background', FIGHTBACK);
        this.load.image('flag2', FLAG2);
        this.load.audio('warmusic',ZHANGZHENGAUDIO);
        this.load.spritesheet('soldier', FIGHTSOLDIER, { frameWidth: 100, frameHeight: 120 });
        this.load.spritesheet('enemy', FIGHTENEMY, { frameWidth: 100, frameHeight: 81 });
    },


    create() {
        this.cameras.main.setBounds(0, 0, 1000, 600);
        this.physics.world.setBounds(0, 0, 1000, 600);

        music=this.sound.add('warmusic');
        music.play();
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(30,180,'flag2').setScale(1).setOrigin(0, 0);
        this.add.text(55,260,"我军",{ fontFamily: "华文行楷", fontSize: 40, color: 'black' })
        this.add.image(840,180,'flag2').setScale(1).setOrigin(0, 0);
        this.add.text(865,260,"敌军",{ fontFamily: "华文行楷", fontSize: 40, color: 'black' })

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                var player = this.add.sprite(90 + 80 * j, 280 + 30 * i, 'soldier').setScale(1).setOrigin(0, 0);
                players.push(player);
            }

        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                var enemy = this.add.sprite(620 + 100 * j, 310 + 30 * i, 'enemy').setScale(1).setOrigin(0, 0);
                enemys.push(enemy);
            }

        }
        this.anims.create({
            key: 'right1',
            frames: this.anims.generateFrameNumbers('soldier', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'rightStop1',
            frames: [{ key: 'soldier', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'fight1',
            frames: this.anims.generateFrameNumbers('soldier', { start: 16, end: 19 }),
            frameRate: 8
        });



        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftStop2',
            frames: [{ key: 'enemy', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'fight2',
            frames: this.anims.generateFrameNumbers('enemy', { start: 19, end: 16 }),
            frameRate: 8
        });
  
        
        for (let i = 0; i < 35; i++) {
            var enemy = enemys[i];
            var player = players[i];
            enemy.play('left2', true);
            player.play('right1',true);

        }

  
       
    },
    update() {
        // 两军推进
        if (enemys[0].x > players[0].x+40) {
            for (let i = 0; i < 35; i++) {
                var player = players[i];
                var enemy = enemys[i];
             
                if(enemy.x>player.x+40){
                    enemy.x -= 1.4;
                    var speed=(((i)%5)*0.2);
                    player.x += speed;
                }
            }
        }
        // 两军接触
        else {
            // 两军交战
            if (i < 250) {
                i++;
                for (let i = 0; i < 35; i++) {
                    var player = players[i];
                    var enemy = enemys[i];
                    player.play('fight1', true);
                    enemy.play('fight2', true);
                  
                }
            }
             // 交战结束,敌人继续推进
            else {
                for (let i = 0; i < 35; i++) {
                    var player = players[i];
                    var enemy = enemys[i];
                    if (i%2==0) {
                        enemy.stop();
                        enemy.setFrame(25);
                        enemy.setAlpha(0.5);
                    }
                    else {
                        enemy.play("left2", true);
                        if (enemy.x > 20) {
                            enemy.x -= 1.5;
                        }
                        else {
                            enemy.stop();   
                            if(flag===0) 
                            flag=1;     
                        }
                    }
                    player.stop();
                    player.setFrame(25);
                    player.setAlpha(0.5);
                }
            }
        }
        // 战争结束的说明
        if(flag===1){
            flag=2;
            setTimeout(()=>{
                $("#game").css("background-color", "rgba(0,0,0,0,0.5)");
                $("#game").append("<div class='wenzitu'></div>");
                $(".wenzitu").append("<div class='wenzi'></div>");
                var TEXT = "我军大败,损失惨重。郭明时武功高强，得以撤回城内，而徐书剑在乱战之中被俘。";
                var len = 0;
                var id = setInterval(() => {
                    len++;
                    let str = TEXT.substring(0, len);
                    $(".wenzi").text(str);
                    if (len === TEXT.length + 15) {
                        clearInterval(id);
                        $(".wenzitu").hide();
                        music.pause();
                        this.scene.start("prison");    
                    }
                }, 100);
            },2000);
        }
    },





})


export default Scene;