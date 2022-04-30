

const SceneB = new Phaser.Class({
    
    Extends: Phaser.Scene,
    initialize:
    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
        this.cursors;
    },
    preload:function(){
        this.load.image('skyA', 'assets/assets/back/sky1.png');
        this.load.image('duihua', 'assets/duihuakuang.png');
    },
    create(){
        this.add.image(0, 0, 'skyA').setOrigin(0, 0).setScale(2);
        this.add.image(100, 300, 'duihua').setOrigin(0, 0).setScale(1);
        this.add.text(120,320, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' ,color:'black'});
            
   }, 
   update(){

   }

});
export default SceneB;

