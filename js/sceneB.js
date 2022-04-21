
const SceneB = new Phaser.Class({
    
    Extends: Phaser.Scene,
    initialize:
    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
        this.cursors;
    },
    preload:function(){
        this.load.image('skyA', 'assets/sky.png');
    },
    create(){
        this.add.image(0, 0, 'skyA').setOrigin(0, 0).setScale(2);
        
            
   },
   update(){

   }

});
export default SceneB;