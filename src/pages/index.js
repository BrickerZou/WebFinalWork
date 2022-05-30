import SceneLogin from "./login.js";

import sceneQin from "./scenes/qin/sceneQin.js";
import sceneQinHouse from "./scenes/qin/sceneQinHouse.js";
import gameQin from "./scenes/qin/gameQin.js"

import sceneShen from "./scenes/shen/sceneShen.js";
import gameShen from "./scenes/shen/gameShen.js";
import sceneHotel from "./scenes/shen/sceneHotel.js";

import town from "./scenes/cheng/town.js";
import mansion from "./scenes/cheng/mansion.js";
import gameCheng from './scenes/cheng/gameCheng.js';
import prison from "./scenes/cheng/prison.js";
import war from './scenes/cheng/war.js';
import wall from './scenes/cheng/wall.js';

import sceneShu from "./scenes/shu/sceneShu.js";
import gameShu from "./scenes/shu/gameShu.js"
import sceneWin from "./scenes/shu/sceneWin.js";

var config = {
    Extends: Phaser.Scene,
    parent: "game",
    dom: {
        createContainer: true
    },
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    gameProcess: 0,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [

        SceneLogin,

        // //勤
        sceneQin,
        sceneQinHouse,
        gameQin,
        // // // 慎
        sceneShen,
        sceneHotel,
        gameShen,
        // 诚
        town,
        mansion,
        war,
        prison,
        gameCheng,
        wall,
        // 恕
        sceneShu,
        gameShu,
        sceneWin,

    ],
}

$("body").on('dblclick',()=>{
    $('body')[0].requestFullscreen();
})


 //先判断登录状态
$.get('src/server/isLogin.php', function (data) {
    data = data[0];
    console.log(55)
    var config2=config;
    if (data['code'] === 1) {
        alert("已经登录");
        var obj=data.data;
        var stage=parseInt(obj['stage']);
        if(stage === 0){
            config2.scene=config.scene.slice(1)
        }
        else if(stage === 1){
            config2.scene=config.scene.slice(4)
        }
        else if(stage === 2){
            config2.scene=config.scene.slice(7)
        }
        else if(stage === 3){
            config2.scene=config.scene.slice(13)
        }
        else if(stage === 4){
            config2.scene=config.scene.slice(config.scene.length-1)
            console.log(1)
        }
        else{
            config2.scene=config.scene.slice(1)
            console.log(2)
        }
    }
    else {
        alert("请先登录");
    }
    var Game = new Phaser.Game(config2);
}, 'json')
 






