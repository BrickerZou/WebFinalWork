
// export default class GameScene extends Phaser.Scene{
//     constructor()
// 	{
// 		super('game-scene');
// 	}
//     preload(){
//         this.load.image('sky', 'assets/sky1.jpg');
//     }
//     create(){
//         this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2);
//    }

// }
    


const SceneA = new Phaser.Class({
    
    Extends: Phaser.Scene,
   
    initialize:
    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
        this.cursors;
    },
    preload:function(){
        this.load.image('skyA', 'assets/sky.png');
    },
    create(){
        this.add.image(0, 0, 'skyA').setOrigin(0, 0).setScale(2);
        this.add.text(160, 160, '小游戏界面', { fontSize: '39px', fill: '#000' });
        this.input.on('pointerdown', function () { 
            this.scene.remove("sceneA");

        }, this);
            
   },
   update(){

   }

});
export default SceneA; 