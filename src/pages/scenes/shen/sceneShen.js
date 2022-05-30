/** 
 * @Author: 张佳豪
 * @Stage: 慎
 */
var towards = 0;
var testArea;
var sceneShenback;
var capWall;
var capBackHouse;
var capComHouse;
var capClouds;
var capBtnToHotel;
var capBtnToExam;
var toHotelEvent;
var toExamEvent;
var BtnTowards;
var player;
var capPlatfroms;
var capCursors;
var capSun;
var comeBack = 0;
var button;
var buttonText;
var onGameShenFinish=0;
var capNightBack;
var capNightCloud;
var caphuangbang;
var capbang;
var btnOnHuangbang;
var toHuangbangEvent;
var testResultText;
var btnToNextFrame;
var isPass=true;


var largeBang;
var huangbangText = ["状元—", "榜眼—", "探花—"];
var rankName = ["郭勤慎",'陈恕','张诚'];

function addScore(){
    let str = "<input id = 'gameShenPoint'>";
    $(str).appendTo('body');
    $("#gameShenPoint").hide();
}


function huangbangOnShow(){
    if(onGameShenFinish != 2) return;
    let getPoint = $("#gameShenPoint").val();
    btnToNextFrame = this.add.image(1000, 100, 'huangbang').setOrigin(0, 0).setScale(0.8, 0.6);
    capbang = this.add.image(1070, 170, 'bang').setOrigin(0, 0).setScale(0.61, 0.61);
    for(let i = 0;i<3;i++){
        if(i == 0 && getPoint == 9)rankName[i] = "徐书剑";
        else if(i == 1 &&getPoint >5)rankName[i] = "徐书剑";
        else if(i == 2 &&getPoint >0)rankName[i] = "徐书剑";
        testResultText = this.add.text(1320, 200 + i*75, huangbangText[i]+rankName[i], { fontFamily: "华文行楷", fontSize: 50, color: 'black' })
    }
    onGameShenFinish++;


    var lupaiToNext;
    lupaiToNext = this.add.image(2090, 390, 'lupai').setOrigin(0, 0).setScale(0.15, 0.15).setInteractive({ cursor: "pointer" });;
    lupaiToNext.on("pointerup", () => {
        if (isPass) {
            this.scene.start('town')
        }
    })
    lupaiToNext.on("pointerover", function () {
        lupaiToNext.setTint(0xDCDCDC);
    });
    lupaiToNext.on("pointerout", function () {
        lupaiToNext.clearTint();
    });

    
}




const sceneShen=new Phaser.Class({
    Extends: Phaser.Scene,
   
    initialize:
    function sceneShen ()
    {
        Phaser.Scene.call(this, { key: 'sceneShen' });
        this.cursors;
    },
    preload:function(){
        this.scene.remove('gameQin')
        this.scene.remove('sceneQin')
        this.scene.remove('sceneQinHouse')
        this.load.image('lupai', LUPAI);
        this.load.spritesheet('zhujue1', SHUSHENG1, {frameWidth: 32, frameHeight: 32});
        this.load.image("wall1", WALL1);
        this.load.image("stoneboard2",STONEBOARD2);
        this.load.image("sky2", SKY2);
        this.load.image("sun", SUN);
        this.load.image("cloud1", CLOUD1);
        this.load.image("cloud2", CLOUD2);
        this.load.image("cloud3", CLOUD3);
        this.load.image("cloud4", CLOUD4);
        this.load.image("cloud5", CLOUD5);
        this.load.image("cloud6", CLOUD6);
        this.load.image("house8", HOUSE8);
        this.load.image("house7", HOUSE7);
        this.load.image('insideback1', INSIDEBACK1);
        this.load.image('insideboard1', INSIDEBOARD1);
        this.load.image('insideboard2', INSIDEBOARD2);
        this.load.image('bookshelf1', BOOKSHELF1);
        this.load.image('bookshelf2', BOOKSHELF2);
        this.load.image('desk1', DESK1);
        this.load.image('desk2', DESK2);
        this.load.image('desk3', DESK3);
        this.load.image('paper1', PAPER1);
        this.load.image('paper2', PAPER2);
        this.load.image('capButton', BTN);
        this.load.image('nightsky2', NIGHTSKY2);
        this.load.image('mengban', MENGBAN);
        this.load.image('huangbang', HUANGBANG);
        this.load.image('bang', BANG);
    },
    create(){
        addScore();
        this.cameras.main.setBounds(0, 0, 2200, 600);
        this.physics.world.setBounds(0, 0, 2200, 600);
        capNightBack = this.add.image(0, 0, 'nightsky2').setOrigin(0, 0).setScale(1.8);
        sceneShenback = this.add.image(0, 0, 'sky2').setOrigin(0, 0).setScale(1.8);
        sceneShenback.setAlpha(0);
        capSun = this.add.image(400 ,20, 'sun').setOrigin(0, 0).setScale(1.5).setScrollFactor(0.1, 1);
        // capClouds = this.add.image(500, 40, 'cloud1').setOrigin(0, 0).setScale(1);
        // capClouds = this.add.image(200, 100, "cloud2").setOrigin(0, 0).setScale(1.5);
        //添加云
        capClouds = this.add.image(500, 100, "cloud3").setOrigin(0, 0).setScale(0.5).setScrollFactor(0.5, 1);
        capClouds = this.add.image(50, 0, "cloud3").setOrigin(0, 0).setScale(1).setScrollFactor(0.4, 1);
        capClouds = this.add.image(600, 100, "cloud3").setOrigin(0, 0).setScale(1).setScrollFactor(0.4, 1);
        capClouds = this.add.image(1000, 0, "cloud3").setOrigin(0, 0).setScale(1).setScrollFactor(0.4, 1); 
        
        //添加背景房子
        capBackHouse = this.add.image(900, 0, "house8").setOrigin(0, 0).setScale(1);
        capBackHouse = this.add.image(500, 140, "house8").setOrigin(0, 0).setScale(1);
        //添加墙
        capWall = this.add.image(-150, 300, 'wall1').setOrigin(0, 0).setScale(1);
        capWall = this.add.image(700, 300, 'wall1').setOrigin(0, 0).setScale(1);
        //添加皇榜
        caphuangbang = this.add.image(1000, 380, 'huangbang').setOrigin(0, 0).setScale(0.3, 0.2);
        capbang = this.add.image(1040, 400, 'bang').setOrigin(0, 0).setScale(0.21, 0.21);
        caphuangbang.setAlpha(0);
        capbang.setAlpha(0);
        //加入可交互房子
        // capComHouse = this.physics.add.staticGroup();
        capComHouse = this.add.image( 0, 160, "house8").setOrigin(0, 0).setScale(1);
        capComHouse = this.add.image( 0, -15, "house8").setOrigin(0, 0).setScale(1);
        // testArea = this.physics.add.staticGroup();
        testArea = this.add.image( 1400, 140, "house7").setOrigin(0, 0).setScale(1);
        
        
        //加入地板
        capPlatfroms = this.physics.add.staticGroup();
        capPlatfroms.create(0, 500, 'stoneboard2').setOrigin(0 ,0).setScale(1).refreshBody();
        capPlatfroms.create(600, 500, 'stoneboard2').setOrigin(0 ,0).setScale(1).refreshBody();
        capPlatfroms.create(1200, 500, 'stoneboard2').setOrigin(0 ,0).setScale(1).refreshBody();
        capPlatfroms.create(1800, 500, 'stoneboard2').setOrigin(0 ,0).setScale(1).refreshBody();
        
        //添加玩家精灵
        player = this.physics.add.sprite(100, 250, 'zhujue1').setScale(1.8);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //加入交互按钮
        //皇榜
        btnOnHuangbang = this.add.zone(1200, 380).setSize(200, 200);
        this.physics.world.enable(btnOnHuangbang);
        btnOnHuangbang.body.setAllowGravity(false);
        btnOnHuangbang.body.moves = false;
        toHuangbangEvent = this.physics.add.overlap(player, btnOnHuangbang, huangbangOnShow, null, this);
        
        //客栈
        capBtnToHotel = this.add.zone(300, 400).setSize(200, 200);
        this.physics.world.enable(capBtnToHotel);
        capBtnToHotel.body.setAllowGravity(false);
        capBtnToHotel.body.moves = false;
        toHotelEvent = this.physics.add.overlap(player, capBtnToHotel, this.capHouseOpen , null, this);
        
        //考场
        capBtnToExam = this.add.zone(1800, 400).setSize(200, 200);
        this.physics.world.enable(capBtnToExam);
        capBtnToExam.body.setAllowGravity(false);
        capBtnToExam.body.moves = false;
        toExamEvent = this.physics.add.overlap(player, capBtnToExam, this.capExamOpen , null, this);
        button = this.add.image(player.x + 16, player.y - 40, 'capButton').setScale(0.5,0.8).setInteractive({ cursor: "pointer" });
        buttonText = this.add.text(player.x - 24, player.y - 46, "是否进入", { fontFamily: "华文行楷", fontSize: 20, color: 'black' });
        button.setAlpha(0)
        buttonText.setAlpha(0)

        button.once("pointerup", () => {
            // this.physics.resume();
            button.setAlpha(0);
            buttonText.setAlpha(0);
        });
        
        button.on("pointerdown", () => {
            console.log("pointdown");
            // if(comeBack == 1){
            //     buttonText.setText("该去考试了");
            // }
            if(BtnTowards == 1 && comeBack == 0){
                this.scene.switch('sceneHotel');
                comeBack++;
            }else if(BtnTowards == 2 && comeBack == 1){
                this.scene.switch('gameShen');
                comeBack++;
                onGameShenFinish++;
            }
        });

        button.on("pointerover", function () {
            button.setTint(0xff0000);
        });

        button.on("pointerout", function () {
            button.clearTint();
        });
        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('zhujue1', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'zhujue1', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('zhujue1', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftstop',
            frames: [ { key: 'zhujue1', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'rightstop',
            frames: [ { key: 'zhujue1', frame: 8 } ],
            frameRate: 20
        });
        capNightCloud = this.add.image(0, 0, 'mengban').setOrigin(0, 0).setScale(3);
        capNightCloud.setAlpha(0.5);
        this.physics.add.collider(player, capPlatfroms);
        this.physics.add.collider(player, caphuangbang, huangbangOnShow, null, this);
        
    
    },
   capHouseOpen(){
        buttonText.setText("进入客栈");
        BtnTowards=1;
        button.setAlpha(1);
        buttonText.setAlpha(1);
        button.x=player.x;
        button.y=player.y - 75;
        buttonText.x=player.x -40;
        buttonText.y=player.y - 80;
   },
   capExamOpen(){
        if(comeBack == 1)buttonText.setText("进入考试");
        else if(comeBack == 0)buttonText.setText("明天考试");
        else buttonText.setText("考试结束");
        BtnTowards=2;
        button.setAlpha(1);
        buttonText.setAlpha(1);
        button.x=player.x;
        button.y=player.y - 75;
        buttonText.x=player.x -40;
        buttonText.y=player.y - 80;
   },
   update(){
        capCursors = this.input.keyboard.createCursorKeys();
        if(capCursors.left.isDown){
            player.setVelocityX(-300);
            player.anims.play('left', true);
            towards = 1;
        } else if(capCursors.right.isDown){
            player.setVelocityX(300);
            player.anims.play('right', true);
            towards = 2;
        }else{
            player.setVelocityX(0);
            if(towards == 0)player.anims.play('turn');
            else if(towards == 1)player.anims.play('leftstop');
            else if(towards == 2)player.anims.play('rightstop');
        }
        if(capCursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
        if(capBtnToHotel.body.touching.none && capBtnToExam.body.touching.none){
            button.setAlpha(0)
            buttonText.setAlpha(0)
        }


        if(comeBack > 0){
            sceneShenback.setAlpha(1);
            capNightCloud.setAlpha(0);
        }
        if(onGameShenFinish == 1){
            //添加皇榜
            player.x = 100;
            caphuangbang.setAlpha(1);
            capbang.setAlpha(1);
            
            onGameShenFinish++;
        }
   }
})


export default sceneShen