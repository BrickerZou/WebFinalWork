/** 
 * @Author: 邹成明
 * @Stage: 诚
 */
var TextList = ["尚", "思", "为", "国", "戍", "轮", "台"];
var textList = [];
var flag = 0;
const SPACE = 62;
var rt;
var graphics;
var offset;
var cropWidth = 190;
var cropHeight = 100;
const Scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function Scene() {
            Phaser.Scene.call(this, { key: 'gameCheng' });
        },
    preload() {
        this.load.image('suo', WENZISUO);
        this.load.audio('kaisuo',KAISUOAUDIO)
    },

    create() {
        rt = this.add.image(0, 0, 'suo').setOrigin(0, 0);
        for (let i = 0; i < TextList.length; i++) {
            textList[i] = this.add.text(307 + i * SPACE, 320, TextList[parseInt(Math.random() * TextList.length)], { fontFamily: "华文行楷", fontSize: 55, color: 'black' });
            textList[i].setInteractive();
            // 添加点击事件,点击文字切换
            textList[i].on('pointerdown', function () {
                this.setText(TextList[(TextList.indexOf(this.text) + 1) % TextList.length]);
                function handleClick() {
                    for (let i = 0; i < TextList.length; i++) {
                        console.log(textList[i].text, TextList[i])
                        if (textList[i].text !== TextList[i]) {
                            flag = 0;
                            return;
                        }
                    }
                    flag = 1;
                };
                handleClick();

            });
        }
        
        graphics = this.add.graphics();
        rt.setCrop(200, 200, cropWidth, cropHeight);
        offset = rt.getTopLeft();

        this.input.on('pointermove', function (pointer) {
            rt.setCrop(
                (pointer.x - offset.x) - cropWidth / 2,
                (pointer.y - offset.y) - cropHeight / 2,
                cropWidth,
                cropHeight
            );
        });


    },
    update() {
        // 游戏成功
        if (flag === 1) {
            flag=2;
            cropWidth = 1000
            cropHeight = 600;
            var music=this.sound.add('kaisuo');
            music.play();
            $.post('src/server/update.php',{
                stage:3,
            },function(data){
                console.log(data);
            },'json');
            // 芝麻开门！
            setTimeout(() => {
                this.scene.start("wall");
            }, 3000);
        }
        graphics.clear();
        graphics.lineStyle(1, 0x00ff00);
        graphics.strokeRect(offset.x + rt._crop.x, offset.y + rt._crop.y, rt._crop.width, rt._crop.height);
    },
})


export default Scene