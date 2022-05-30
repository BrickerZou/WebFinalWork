/** 
 * @Author: 张佳豪
 * @Stage: 慎
 */
var player;
var hotelBoard;
var hotelCursors;
var dialogue = ["夜已深，是该好好休息的时候了，为明日科举养好精神。",
                "明日我定要打起万分精神，谨慎对待每一个考题", 
                "做完要认真仔细检查自己的错误，特别要注意错别字"];
var towards=0;
var moveToBed = 0;
var dialogueTextBox;
var dialogueText;
var blackHold;
var blackAlpha = 0;

function hotelLeftMove(){
    player.setVelocityX(-300);
    player.anims.play('left', true);
    towards = 1;
}


function hotelRightMove(){
    player.setVelocityX(300);
    player.anims.play('right', true);
    towards = 2;
}

function hotelStopMove(){
    player.setVelocityX(0);
    if(towards == 0)player.anims.play('turn');
    else if(towards == 1)player.anims.play('leftstop');
    else if(towards == 2)player.anims.play('rightstop');
}

const sceneHotel = new Phaser.Class({
    
    Extends: Phaser.Scene,
   
    initialize:
    function sceneHotel()
    {
        Phaser.Scene.call(this, { key: 'sceneHotel' });
        this.cursors;
    },
    preload:function(){
        
        this.load.spritesheet('zhujue1', SHUSHENG1, {frameWidth: 32, frameHeight: 32});
        this.load.image('hotelBack', HOTELBACK);
        this.load.image('insideboard1', INSIDEBOARD1);
        this.load.image('duihuakuang', DUIHUAKUANG);
        this.load.image('mengban', MENGBAN);
    },
    create(){
        this.cameras.main.setBounds(0, 0, 1300, 600);
        this.physics.world.setBounds(0, 0, 1300, 600);
        hotelBoard = this.physics.add.staticGroup();
        this.add.image(0, -50, 'hotelBack').setOrigin(0, 0).setScale(1.5);
        hotelBoard.create(0, 455, 'insideboard1').setOrigin(0, 0).setScale(1).refreshBody();
        hotelBoard.create(500, 455, 'insideboard1').setOrigin(0, 0).setScale(1).refreshBody();
        hotelBoard.create(1000, 455, 'insideboard1').setOrigin(0, 0).setScale(1).refreshBody();
        
        
        player = this.physics.add.sprite(0, 350, 'zhujue1').setScale(1.8);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
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

        this.physics.add.collider(player, hotelBoard);

        dialogueTextBox = this.add.image(0, 450, 'duihuakuang').setOrigin(0, 0).setScale(0.85);
        dialogueText = this.add.text(50, 500, dialogue[0].substring(0,1), { fontFamily: "华文行楷", fontSize: 30, color: 'black' });
        console.log(dialogue[0].substring(0, 1));
        var hotelInterval;
        var dialogueIndex = 0;
        var num = 0;
        var blackTurn;
        hotelInterval = setInterval(() => {
            if(dialogueIndex>2){
                clearInterval(hotelInterval);
                setTimeout(() => {
                    moveToBed = 1;
                    dialogueTextBox.setAlpha(0);
                    dialogueText.setAlpha(0);
                    setTimeout(() => {
                        moveToBed = 0;
                        blackTurn = setInterval(() => {
                            blackAlpha+=0.2;
                            blackHold.setAlpha(blackAlpha);
                            if(blackAlpha>=1.5){
                                clearInterval(blackTurn);
                                this.scene.switch('sceneShen');
                            }
                        }, 200);
                        
                    }, 3500);
                }, 500);
                return;
            }
            if(num <= dialogue[dialogueIndex].length)dialogueText.setText(dialogue[dialogueIndex].substring(0, num));
            console.log(dialogue[dialogueIndex].substring(0, num));
            if(num <= dialogue[dialogueIndex].length)num ++;
            if(num > dialogue[dialogueIndex].length){
                dialogueIndex++;
                num = 0;
            }
        }, 100);

        blackHold = this.add.image(0, 0, 'mengban').setOrigin(0, 0).setScale(2).setAlpha(0);

        



    },
    update(){
        hotelCursors = this.input.keyboard.createCursorKeys();
        
        if(moveToBed){
            hotelRightMove();
        }else {
            hotelStopMove()
        }
        // if(hotelCursors.left.isDown){
        //     hotelLeftMove();
        // } else if(hotelCursors.right.isDown){
        //     hotelRightMove();
        // }else{
        //     hotelStopMove();
        // }
        

    }

});
export default sceneHotel;