import Scene0 from "./scene.js";
import SceneA from "./sceneA.js";
import SceneB from "./sceneB.js";

var config = {
    Extends: Phaser.Scene,
    // parent:"game",
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [
        Scene0,
        // SceneB,
    ]

}

var game=new Phaser.Game(config);
// $(".start-level1").click(function(){
//     $(this).hide();
//     game=new Phaser.Game(config);
// })