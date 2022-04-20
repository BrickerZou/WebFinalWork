import Scene0 from "./scene.js";
import SceneA from "./sceneA.js";
var config = {
    Extends: Phaser.Scene,
    parent:"container",
    type: Phaser.AUTO,
    width: 800,
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
        SceneA,
    ]

}

var game = new Phaser.Game(config);