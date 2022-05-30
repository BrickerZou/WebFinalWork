/** 
 * @Author: 徐程鸿
 * @Stage: 勤
 */
var platforms;
var player;
var cunZhang
var cursors;
var direction;
var birds=[];
var birdsMove=[]
var BIRDAMOUNT=3;
var triggerToHouse
var triggerShowTip
var buttonText
var button
var  isTipShowing=false
var isTipShowed=false
var isPass=false
var lupaiToNext
var tipQinOpen;
var tipQinOpenText
var sceneQinMengban
var tipOpenTime
var typeOfTrigger=0; // 1为tip 2为进入房间
var TEXT="你出生在一个中原布衣之家，少时虽不曾大富大贵，但也衣食无虞，在父辈教导之下，你熟读经典，博闻强识，一身才学已闻名十里八乡。及冠之际，听闻父辈言边境战事不断，心中热血上涌，一腔豪情壮志难酬。遂备考科举，明日即是科考之日，你需要在家进行最后一次温习。"

function addInputBox(){
    let str = "<input id = 'gameQinFinish'>";
    $(str).appendTo("body");
    $("#gameQinFinish").val(0);
    $("#gameQinFinish").hide();
}

const sceneQin = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function SceneQin() {
            Phaser.Scene.call(this, { key: 'sceneQin' });
            this.cursors;
            typeOfTrigger=0;
            isTipShowed=false;
        },
    preload: function () {
        this.load.image('sky1', SKY1);
        this.load.image('house1',HOUSE1);
        this.load.image("stoneboard1",STONEBOARD1);
        this.load.image("cloud3",CLOUD3)
        this.load.image("sun",SUN);
        this.load.image("chicken",CHICKEN);
        this.load.image("tipQin",TIPS1)
        this.load.image("btn",BTN)
        this.load.image('tipsOpen',TIPSOPEN)
        this.load.image("tree1",TREE1)
        this.load.image('lupai',LUPAI)
        this.load.image('mengban',MENGBAN)
        this.load.spritesheet("bird",BIRD,{ frameWidth:85.5,frameHeight:106});
        this.load.spritesheet('shusheng1', SHUSHENG1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cunzhang',CUNZHANG,{ frameWidth: 32, frameHeight: 32 })
    },
    create() {
        //添加完成游戏值获取框
        addInputBox();
        // 设置镜头
        this.cameras.main.setBounds(0, 0, 1800, 600 );
        this.physics.world.setBounds(0, 0, 1900, 600 );
        // 背景
        this.add.image(0, 0, 'sky1').setOrigin(0, 0); 
        this.add.image(1300, 0, 'sky1').setOrigin(0, 0); 
        sceneQinMengban=this.add.image(600,300,'mengban').setScale(2).setAlpha(0).setDepth(4);
        this.add.image(450,370,'tree1');
        this.add.image(350,450,'tipQin').setScale(0.5,0.5);
        tipQinOpen = this.add.image(500,250,'tipsOpen').setScale(2.2,2.2).setDepth(5).setAlpha(0)
        tipQinOpenText = this.make.text({
            x:260,
            y:150,
            text:'',
            // text:poetry[nowQuestionIndex],
            origin:{x:0,y:0},
            style:{ 
              color: 'black', 
              font: '30px 华文行楷',
              lineSpacing: 5,
              wordWrap: { width: 500, useAdvancedWrap: true }
            }
          }).setDepth(6).setAlpha(0)

        this.add.image(350,370,"chicken").setScale(0.5,0.5)
        lupaiToNext=this.add.image(1700,450,'lupai').setScale(0.15).setInteractive({ cursor: "pointer" });;
        lupaiToNext.on("pointerup", () => {
            if(isPass){
                this.scene.start('sceneShen')
            }
        })
        lupaiToNext.on("pointerover", function () {
            console.log("进入下一关")  
            lupaiToNext.setTint(0xDCDCDC);
        });
        lupaiToNext.on("pointerout", function () {
            lupaiToNext.clearTint();
        }); 
        //天空装饰
        this.add.image(50, 15, 'sun').setOrigin(0, 0).setScale(1.1,1.1).setScrollFactor(0.01,1);
        this.add.image(250, 20, 'cloud3').setOrigin(0, 0).setScale(0.75,0.75).setScrollFactor(0.11,1);
        this.add.image(600, 30, 'cloud3').setOrigin(0, 0).setScale(0.75,0.6).setScrollFactor(0.21,1);
        this.add.image(1100, 10, 'cloud3').setOrigin(0, 0).setScale(-0.75,0.6).setScrollFactor(0.2,1);;
        this.add.image(1600, 15, 'cloud3').setOrigin(0, 0).setScale(0.7,0.75).setScrollFactor(0.1,1);;
        
        // 房子
        this.add.image(1000, 385, 'house1').setScale(-1,1)
        
        // 创建地板
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 500, 'stoneboard1').setScale(1.2,1.1).setOrigin(0, 0).refreshBody();
        platforms.create(1200, 500, 'stoneboard1').setScale(1.2,1.1).setOrigin(0, 0).refreshBody();
        for(var i=0;i<BIRDAMOUNT;i++){
            var y=Math.floor((Math.random()*100)+50);
            var x=i%2==0?-1:1;
            var dx=-x;
            var dy=i%2==0?-0.1:0.1;
            birdsMove[i]=[dx,dy];
            birds[i]=this.physics.add.sprite((x+1)*650,y,'bird');
            birds[i].body.setAllowGravity(false);                    // 设置无重力
        }
        this.anims.create({
            key:'birdfly',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        for(var i=0;i<BIRDAMOUNT;i++){
            birds[i].anims.play('birdfly',true);
        }
        // 按钮和提示性文本
        button = this.add.image(0,0, 'btn').setScale(0.7, 0.7).setInteractive({ cursor: "pointer" });
        buttonText = this.add.text(0,0, "进入“勤”游戏", { fontFamily: "华文行楷", fontSize: 25, color: 'black' })
        button.setAlpha(0);
        buttonText.setAlpha(0);
        button.on("pointerup", () => {
            if(typeOfTrigger==1){
                sceneQinMengban.setAlpha(0.7)
                tipQinOpen.setAlpha(1)
                tipQinOpenText.setAlpha(1)
                var sceneQinThis=this;
                if(isTipShowed==false && isTipShowing==false){
                    tipOpenTime=this.time.addEvent({
                        delay:50,
                        callback:function(){
                            isTipShowing=true;
                            tipQinOpenText.setText(TEXT.substring(0,TEXT.length-tipOpenTime.repeatCount))
                            if(tipOpenTime.repeatCount==0){
                                sceneQinThis.physics.resume();
                                isTipShowed = true

                            }
                        },
                        repeat:TEXT.length,
                        args:[]
                    }) 
                }
                else{
                    this.physics.resume();
                }
            }
            else if(typeOfTrigger==2){
                this.scene.switch('sceneQinHouse');  
            }
        });
        button.on("pointerover", function () {
            button.setTint(0xDCDCDC);
        });
        button.on("pointerout", function () {
            button.clearTint();
        }); 
        //碰撞区域 用于触发进入房间按钮
        triggerToHouse = this.add.zone(1000, 400).setSize(100, 100);
        this.physics.world.enable(triggerToHouse);
        triggerToHouse.body.setAllowGravity(false);
        triggerToHouse.body.moves = false;
        //碰撞区域 用于触发显示tip按钮
        triggerShowTip = this.add.zone(350, 400).setSize(100, 100);
        this.physics.world.enable(triggerShowTip);
        triggerShowTip.body.setAllowGravity(false);
        triggerShowTip.body.moves = false;

        //创建npc
        cunZhang=this.physics.add.sprite(500,350,'cunzhang').setScale(1.8);
        // 创建玩家
        player = this.physics.add.sprite(150, 350, 'shusheng1').setScale(1.8).setOrigin(0, 0);
         // 镜头一直跟随主角
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        //   设置玩家的反弹值为0.2 ，且与世界边缘产生碰撞，否则可以移动出画面
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
            frames: [ { key: 'shusheng1', frame: 8 } ],
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
            frames: [ { key: 'shusheng1', frame: 4 } ],
            frameRate: 20
        });
        cursors = this.input.keyboard.createCursorKeys();
        // 碰撞
        this.physics.add.collider(cunZhang,platforms)
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, triggerShowTip,this.tipsOpen, null, this);
        this.physics.add.overlap(player, triggerToHouse,this.houseOpen, null, this);
    },
    update() {
        if(isPass)lupaiToNext.setAlpha(1)
        this.decorationMove();
        // 设置玩家移动
        if (cursors.left.isDown )
        {   
            // 设置x轴速度
            player.setVelocityX(-180);  
            player.anims.play('left', true);
            direction="left";
        }
        else if (cursors.right.isDown)
        {    
            if(isTipShowed == true){
                sceneQinMengban.setAlpha(0)
                tipQinOpen.setAlpha(0)
                tipQinOpenText.setAlpha(0)
            } 
            player.setVelocityX(180);       
            player.anims.play('right', true);
            direction="right";
        }
        else
        {
            player.setVelocityX(0);
            if(direction==="left")
                player.anims.play('leftStop');
            else 
                player.anims.play('rightStop');
        }
        // 跳跃
        if (cursors.up.isDown && player.body.touching.down)
        {   
            player.setVelocityY(-300);
        }
        if(triggerShowTip.body.touching.none && triggerToHouse.body.touching.none){
            button.setAlpha(0);
            buttonText.setAlpha(0);
        }
        if($("#gameQinFinish").val() == 1)isPass = true;
    },
    decorationMove(){
        //鸟
        for(var i=0;i<BIRDAMOUNT;i++){
            birds[i].x+=birdsMove[i][0]
            birds[i].y+=birdsMove[i][1]
            if(birds[i].x>1850||birds[i].x<-50){
                birdsMove[i][0]=-birdsMove[i][0]
                birdsMove[i][1]=-birdsMove[i][1]
            }
        }
    },
    houseOpen() {
        typeOfTrigger=2
        buttonText.setText("进入房间")
        button.setAlpha(1);
        buttonText.setAlpha(1);
        button.x=player.x + 30
        button.y=player.y - 45
        buttonText.x=player.x -20
        buttonText.y=player.y - 55
    },
    tipsOpen(){
        if(isTipShowed==0)
            this.physics.pause();
        buttonText.setText("查看信息")
        typeOfTrigger=1
        button.setAlpha(1);
        buttonText.setAlpha(1);
        button.x=player.x + 30
        button.y=player.y - 45
        buttonText.x=player.x -20
        buttonText.y=player.y - 55
    },

})


export default sceneQin