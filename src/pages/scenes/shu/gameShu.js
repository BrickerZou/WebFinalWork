/** 
 * @Author: 郭雷扬
 * @Stage: 恕
 */
var gameShuThis

//兵1 兵2 炮1 炮2 车1 车2 相 帅
var flag = [0, 0, 0, 0, 0, 0, 0, 0];
//棋盘二维数组
var chess = new Array();
//红色棋子
var redpawn1, redpawn2, redgeneral, redminister, redvehicle1, redvehicle2, redgun1, redgun2
//黑色棋子
var blackpawn1, blackpawn2, blackpawn3, blackgeneral, blackvehicle, blackgun
//一格的大小
var step = 44;
//楚河汉界位置
var boundary = 297;
//棋盘边界
var top = 78;
var bottom = 478;
var left = 320;
var right = 672;
//转换下棋方
var turn = 1;
//当前棋子位置
var x = 0, y = 0;
//直线类棋子可走范围
var leftx, rightx, topy, bottomy;

//进入当前场景的次数
var time = 0
//保证在update中只更新一次
let count = 0, c = 0
//车将军判断
var kill
var leftchess
const gameShu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function gameShu() {
            Phaser.Scene.call(this, { key: 'gameShu' });
            this.cursors;
        },
    preload: function () {
        this.load.image("message", MESSAGE);
        this.load.image("mengban", MENGBAN)

        this.load.image('chessback1', CHESSBACK1);
        this.load.image('chessback2', CHESSBACKWAR);
        //红色棋子
        this.load.image('redpawn', REDPAWN)
        this.load.image('redgeneral', REDGENERAL)
        this.load.image('redscholar', REDSCHOLAR)
        this.load.image('redminister', REDMINISTER);
        this.load.image('redhorse', REDHORSE)
        this.load.image('redvehicle', REDVEHICLE)
        this.load.image('redgun', REDGUN);
        //黑色棋子
        this.load.image('blackpawn', BLACKPAWN);
        this.load.image('blackgeneral', BLACKGENERAL);
        this.load.image('blackscholar', BLACKSCHOLAR);
        this.load.image('blackminister', BLACKMINISTER);
        this.load.image('blackhorse', BLACKHORSE);
        this.load.image('blackvehicle', BLACKVEHICLE)
        this.load.image('blackgun', BLACKGUN);
        gameShuThis = this
        addVictory();
        addFail();

    
        

    },
    create() {
        this.cameras.main.setBounds(0, 0, 1000 * 2, 600);
        this.physics.world.setBounds(0, 0, 1000 * 2, 600);
        console.log(time)


        this.add.image(-30, 0, 'chessback2').setOrigin(0, 0).setScale(0.85, 0.9);
        this.add.image(300, 60, 'chessback1').setOrigin(0, 0).setScale(0.7);
        //红色棋子
        redpawn1 = this.add.image(left + 2 * step, top + step, "redpawn").setScale(0.6).setInteractive();
        redpawn2 = this.add.image(left + 4 * step, top + step, "redpawn").setScale(0.6).setInteractive();
        redgeneral = this.add.image(left + 3 * step, top + 9 * step, 'redgeneral').setScale(0.6).setInteractive();
        redminister = this.add.image(left + 6 * step, top + 9 * step, 'redminister').setScale(0.6).setInteractive();
        if (count == 0) {
            redvehicle1 = this.add.image(0, -100, 'redvehicle').setScale(0.6).setInteractive();
        }
        else {
            redvehicle1 = this.add.image(left + 8 * step, top + 5 * step, 'redvehicle').setScale(0.6).setInteractive();
        }
        redvehicle2 = this.add.image(left + 6 * step, top + 5 * step, 'redvehicle').setScale(0.6).setInteractive();
        redgun1 = this.add.image(left + 6 * step, top + 3 * step, 'redgun').setScale(0.6).setInteractive();
        redgun2 = this.add.image(left + 6 * step, top + 4 * step, 'redgun').setScale(0.6).setInteractive();
        //黑色棋子
        blackpawn1 = this.add.image(left, top + 7 * step, 'blackpawn').setScale(0.6).setInteractive();
        blackpawn2 = this.add.image(left + 3 * step, top + 7 * step, 'blackpawn').setScale(0.6).setInteractive();
        blackpawn3 = this.add.image(left + 4 * step, top + 8 * step, 'blackpawn').setScale(0.6).setInteractive();
        blackgeneral = this.add.image(left + 5 * step, top, 'blackgeneral').setScale(0.6).setInteractive();
        blackvehicle = this.add.image(left + 5 * step, top + 2 * step, 'blackvehicle').setScale(0.6).setInteractive();
        blackgun = this.add.image(left + 4 * step, top, 'blackgun').setScale(0.6).setInteractive();
        //初始化获得棋盘数组
        $.getAllPlace();
            //添加按钮
            addBtnRestart();
            if (time == 0)
                addBtnSurrender();
        if (time == 1) {
            hideAll();
            $('#game').css("pointer-events","none");
            var mengban = this.add.image(500, 300, "mengban").setScale(2, 2).setAlpha(0.7);
            var message = this.add.image(500, 300, 'message').setScale(0.9, 0.7);
            const TEXT = "副官因你的宽恕而重回战场，此时你获得了另外一个车，原本应该是死局的战场，因为副官的出现，局势发生了转变。"
            var tipShuOpenText = this.make.text({
                x: 295,
                y: 200,
                text: '',
                // text:poetry[nowQuestionIndex],
                origin: { x: 0, y: 0 },
                style: {
                    color: 'black',
                    font: '30px 华文行楷',
                    lineSpacing: 5,
                    wordWrap: { width: 430, useAdvancedWrap: true }
                }
            }).setDepth(10).setAlpha(1);


            var timeEvent = this.time.addEvent({
                delay: 100,
                callback: function () {
                    tipShuOpenText.setAlpha(1);
                    tipShuOpenText.setText(TEXT.substring(0, TEXT.length + 10 - timeEvent.repeatCount));
                    if (timeEvent.repeatCount == 0) {
                        $('#game').css("pointer-events","auto");
                        message.setAlpha(0)
                        mengban.setAlpha(0)
                        tipShuOpenText.setAlpha(0)
                        addBtnRestart();
                    
                    }
                },
                repeat: TEXT.length + 10,
            })

        }

        if (turn == 1) {
            redpawn1.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[0] = 1;
            });
            redpawn2.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[1] = 1;
            });
            redgun1.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[2] = 1;
            });
            redgun2.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[3] = 1;
            });
            redvehicle1.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[4] = 1;
            });
            redvehicle2.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[5] = 1;
            });
            redminister.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[6] = 1;
            });
            redgeneral.on('pointerdown', function (pointer) {
                for (var i = 0; i < 8; i++)   flag[i] = 0;
                flag[7] = 1;
            });

        }



        this.input.on('pointerdown', function (pointer) {
            
            console.log(pointer.x, pointer.y);
            $(".point").hide();
            if (pointer.x >= left && pointer.y >= top && pointer.x <= right + 0.5 * step && pointer.y <= bottom) {
                //兵1
                if (flag[0] == 1) {
                    showPawnRangeXY(redpawn1);
                    if (pointer.x >= left - 0.5 * step && pointer.x <= right + step * 0.5 && pointer.y > top - 0.5 * step && pointer.y < bottom + 0.5 * step) {
                        if (redpawn1.y >= boundary && step * 0.5 < redpawn1.y - pointer.y && redpawn1.y - pointer.y < step * 1.5) {
                            redpawn1.y -= parseInt((redpawn1.y + step * 0.5 - pointer.y) / step) * step;
                        }
                        //兵过河后
                        if (redpawn2.y < boundary) {
                            //过河后往前走
                            if (step * 0.5 <= redpawn1.y - pointer.y && redpawn1.y - pointer.y < step * 1.5 && -step * 0.5 < redpawn1.x - pointer.x && redpawn1.x - pointer.x < step * 0.5) {
                                redpawn1.y -= parseInt((redpawn1.y + step * 0.5 - pointer.y) / step) * step;
                                turn = 0;
                            }
                            //过河后左右走
                            if (-step * 0.5 <= redpawn1.y - pointer.y && redpawn1.y - pointer.y < step * 0.5) {
                                //右移1步
                                if (step * 0.5 <= pointer.x - redpawn1.x && pointer.x - redpawn1.x < step * 1.5) {
                                    redpawn1.x += parseInt((pointer.x + step * 0.5 - redpawn1.x) / step) * step;
                                    turn = 0;
                                }
                                //左移1步
                                if (-step * 1.5 < pointer.x - redpawn1.x && pointer.x - redpawn1.x <= -step * 0.5) {
                                    redpawn1.x += parseInt((pointer.x - step * 0.5 - redpawn1.x) / step) * step;
                                    turn = 0;
                                }
                            }
                        }
                    }
                }
                //兵2
                if (flag[1] == 1 && turn == 1) {
                    showPawnRangeXY(redpawn2);
                    if (pointer.x >= left - 0.5 * step && pointer.x <= right + step * 0.5 && pointer.y > top - 0.5 * step && pointer.y < bottom + 0.5 * step) {
                        //兵未过河
                        if (redpawn2.y >= boundary && step * 0.5 < redpawn2.y - pointer.y && redpawn2.y - pointer.y < step * 1.5) {
                            redpawn2.y -= parseInt((redpawn2.y + step * 0.5 - pointer.y) / step) * step;
                        }
                        //兵过河后
                        if (redpawn2.y < boundary) {
                            //过河后往前走
                            if (step * 0.5 <= redpawn2.y - pointer.y && redpawn2.y - pointer.y < step * 1.5 && -step * 0.5 < redpawn2.x - pointer.x && redpawn2.x - pointer.x < step * 0.5) {
                                redpawn2.y -= parseInt((redpawn2.y + step * 0.5 - pointer.y) / step) * step;
                                turn = 0;
                                if (blackgun.x == left + 4 * step) {
                                    blackgun.destroy();
                                    $.init(blackgun);
                                    setTimeout(function () {
                                        blackgeneral.x = redpawn2.x;
                                        redpawn2.destroy();
                                        $.init(redpawn2);
                                        turn = 1;
                                    }, 1000);

                                }
                                else {
                                    setTimeout(function () {
                                        blackgeneral.x = redpawn2.x;
                                        redpawn2.destroy();
                                        $.init(redpawn2);
                                        turn = 1;
                                    }, 1000);
                                }

                            }
                            //过河后左右走
                            if (-step * 0.5 <= redpawn2.y - pointer.y && redpawn2.y - pointer.y < step * 0.5) {
                                //右移1步
                                if (step * 0.5 <= pointer.x - redpawn2.x && pointer.x - redpawn2.x < step * 1.5) {
                                    redpawn2.x += parseInt((pointer.x + step * 0.5 - redpawn2.x) / step) * step;
                                    turn = 0;
                                    setTimeout(function () {
                                        blackgeneral.y = redpawn2.y;
                                        redpawn2.destroy();
                                        $.init(redpawn2);
                                        turn = 1;
                                    }, 1000);

                                }
                                //左移1步
                                if (-step * 1.5 < pointer.x - redpawn2.x && pointer.x - redpawn2.x <= -step * 0.5) {
                                    redpawn2.x += parseInt((pointer.x - step * 0.5 - redpawn2.x) / step) * step;
                                    turn = 0;
                                }
                            }
                        }
                    }
                }
                //炮1
                if (flag[2] == 1 && turn == 1) {
                    $.getCurrentChessPlace(redgun1);
                    $.getRangeXY(x, y);
                    console.log(leftx, rightx, topy, bottomy);
                    showGunRangeXY(redgun1);
                    if (pointer.x >= left + step * leftx - 0.5 * step && pointer.x <= left + step * rightx + step * 0.5 && pointer.y > top + topy * step - 0.5 * step && pointer.y < top + bottomy * step + 0.5 * step) {
                        if (-step * 0.5 < redgun1.x - pointer.x && redgun1.x - pointer.x < step * 0.5) {
                            if (-step * 0.5 > redgun1.y - pointer.y) {
                                redgun1.y += parseInt((pointer.y - redgun1.y + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redgun1.y - pointer.y > step * 0.5) {
                                redgun1.y += parseInt((pointer.y - redgun1.y - 0.5 * step) / step) * step;
                                turn = 0;
                            }
                        }
                        else if (-step * 0.5 < redgun1.y - pointer.y && redgun1.y - pointer.y < step * 0.5) {
                            if (-step * 0.5 > redgun1.x - pointer.x) {
                                redgun1.x += parseInt((pointer.x - redgun1.x + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redgun1.x - pointer.x > step * 0.5)
                                redgun1.x += parseInt((pointer.x - redgun1.x - 0.5 * step) / step) * step;
                            turn = 0;
                        }
                        if (redgun1.x == blackvehicle.x && redgun1.y > blackvehicle.y && redgun1.x == blackgeneral.x) {
                            setTimeout(function () {
                                blackvehicle.y = redgun1.y;
                                redgun1.destroy();
                                $.init(redgun1);
                                turn = 1;
                            }, 1000);
                        }
                    }
                }
                //炮2
                if (flag[3] == 1 && turn == 1) {
                    $.getCurrentChessPlace(redgun2);
                    $.getRangeXY(x, y);
                    console.log(leftx, rightx, topy, bottomy);
                    showGunRangeXY(redgun2);
                    if (pointer.x >= left + step * leftx - 0.5 * step && pointer.x <= left + step * rightx + step * 0.5 && pointer.y > top + topy * step - 0.5 * step && pointer.y < top + bottomy * step + 0.5 * step) {
                        if (-step * 0.5 < redgun2.x - pointer.x && redgun2.x - pointer.x < step * 0.5) {
                            if (-step * 0.5 > redgun2.y - pointer.y) {
                                redgun2.y += parseInt((pointer.y - redgun2.y + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redgun2.y - pointer.y > step * 0.5) {
                                redgun1.y += parseInt((pointer.y - redgun2.y - 0.5 * step) / step) * step;
                                turn = 0;
                            }
                        }
                        else if (-step * 0.5 < redgun2.y - pointer.y && redgun2.y - pointer.y < step * 0.5) {
                            if (-step * 0.5 > redgun2.x - pointer.x) {
                                redgun2.x += parseInt((pointer.x - redgun1.x + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redgun2.x - pointer.x > step * 0.5) {
                                redgun2.x += parseInt((pointer.x - redgun2.x - 0.5 * step) / step) * step;
                                turn = 0;
                            }
                        }
                        if (redgun2.x == blackvehicle.x && redgun2.x == blackgeneral.x) {
                            setTimeout(function () {
                                blackvehicle.y = redgun2.y;
                                redgun2.destroy();
                                $.init(redgun2);
                                turn = 1;
                            }, 1000);
                        }

                    }
                }
                //车1
                if (flag[4] == 1 && turn == 1) {
                    $.getCurrentChessPlace(redvehicle1);
                    $.getRangeXY(x, y);
                    // console.log(leftx,rightx,topy,bottomy);
                    showVehicle1RangeXY(redvehicle1);
                    if (pointer.x >= left + step * leftx - 0.5 * step && pointer.x <= left + step * rightx + step * 0.5 && pointer.y > top + topy * step - 0.5 * step && pointer.y < top + bottomy * step + 0.5 * step) {
                        //if(pointer.x>=left+step*leftx-0.5*step&&pointer.x<=left+step*rightx+step*0.5&&pointer.y>top+topy*step-0.5*step&&pointer.y<top+bottomy*step+0.5*step){
                        if (-step * 0.5 < redvehicle1.x - pointer.x && redvehicle1.x - pointer.x < step * 0.5) {
                            if (-step * 0.5 > redvehicle1.y - pointer.y) {
                                redvehicle1.y += parseInt((pointer.y - redvehicle1.y + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redvehicle1.y - pointer.y > step * 0.5) {
                                redvehicle1.y += parseInt((pointer.y - redvehicle1.y - 0.5 * step) / step) * step;
                                turn = 0;
                            }
                        }
                        else if (-step * 0.5 < redvehicle1.y - pointer.y && redvehicle1.y - pointer.y < step * 0.5) {
                            if (-step * 0.5 > redvehicle1.x - pointer.x) {
                                redvehicle1.x += parseInt((pointer.x - redvehicle1.x + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redvehicle1.x - pointer.x > step * 0.5)
                                redvehicle1.x += parseInt((pointer.x - redvehicle1.x - 0.5 * step) / step) * step;
                            turn = 0;
                        }
                        if (parseInt(redvehicle1.y / step) == parseInt(blackgun.y / step) && blackgun.x == left + 4 * step) {
                            setTimeout(function () {
                                if (blackgun.x != top) {
                                    blackgun.x = redvehicle1.x;
                                    redvehicle1.destroy();
                                    $.init(redvehicle1);
                                    turn = 1;
                                }
                            }, 1000);

                        }
                        if (parseInt(redvehicle1.y / step) == parseInt(blackgeneral.y / step) && redpawn2.x == 0 && blackgeneral.y == top) {
                            setTimeout(function () {
                                if (blackgun.x != top)
                                    blackgeneral.y += step;
                                turn = 1;
                            }, 1000);
                        }
                        else if (parseInt(redvehicle1.y / step) == parseInt(blackgeneral.y / step) && redpawn2.x == 0 && blackgeneral.y == top + step) {
                            setTimeout(function () {
                                blackgeneral.y -= step;
                                turn = 1;
                            }, 1000);
                        }
                        if (parseInt(redvehicle1.y / step) == parseInt(blackgeneral.y / step && blackgeneral.y == top)) {
                            setTimeout(function () {
                                blackgeneral.y -= step;
                            }, 1000);
                        }
                        if ((redvehicle1.x == blackgeneral.x && redvehicle1.y + step == blackgeneral.y) || (redvehicle1.x == blackgeneral.x && redvehicle1.y - step == blackgeneral.y) || (redvehicle1.x + step == blackgeneral.x && redvehicle1.y == blackgeneral.y) || (redvehicle1.x - step == blackgeneral.x && redvehicle1.y == blackgeneral.y)) {
                            setTimeout(function () {
                                blackgeneral.x = redvehicle1.x;
                                blackgeneral.y = redvehicle1.y;
                                redvehicle1.destroy();
                                $.init(redvehicle1);
                                turn = 1;
                            }, 1000);
                        }
                    }
                }
                //车2
                if (flag[5] == 1 && turn == 1) {
                    $.getCurrentChessPlace(redvehicle2);
                    $.getRangeXY(x, y);
                    //console.log(x,y);
                    //console.log(leftx,rightx,topy,bottomy);
                    showVehicle1RangeXY(redvehicle2);
                    if (pointer.x >= left + step * leftx - 0.5 * step && pointer.x <= left + step * rightx + step * 0.5 && pointer.y > top + topy * step - 0.5 * step && pointer.y < top + bottomy * step + 0.5 * step) {
                        if (-step * 0.5 < redvehicle2.x - pointer.x && redvehicle2.x - pointer.x < step * 0.5) {
                            if (-step * 0.5 > redvehicle2.y - pointer.y) {
                                redvehicle2.y += parseInt((pointer.y - redvehicle2.y + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redvehicle2.y - pointer.y > step * 0.5) {
                                redvehicle2.y += parseInt((pointer.y - redvehicle2.y - 0.5 * step) / step) * step;
                                turn = 0;
                            }
                        }
                        else if (-step * 0.5 < redvehicle2.y - pointer.y && redvehicle2.y - pointer.y < step * 0.5) {
                            if (-step * 0.5 > redvehicle2.x - pointer.x) {
                                redvehicle2.x += parseInt((pointer.x - redvehicle2.x + 0.5 * step) / step) * step;
                                turn = 0;
                            }
                            else if (redvehicle2.x - pointer.x > step * 0.5)
                                redvehicle2.x += parseInt((pointer.x - redvehicle2.x - 0.5 * step) / step) * step;
                            turn = 0;
                        }

                        if (redvehicle2.y == blackgeneral.y && redpawn2.x == 0) {
                            console.log(blackgun.x, blackgeneral.x - step);
                            if (blackgeneral.y == top && blackgun.x != blackgeneral.x - step) {
                                setTimeout(function () {
                                    blackgeneral.y += step;
                                    turn = 1;
                                }, 1000);
                            }
                            if (blackgeneral.y > top) {
                                setTimeout(function () {
                                    blackgeneral.y -= step;
                                    turn = 1;
                                }, 1000);
                            }
                        }
                        if (parseInt(redvehicle2.x / step) == parseInt(blackgeneral.x / step) && blackgeneral.x < right - 3 * step) {
                            setTimeout(function () {
                                blackgeneral.x += step;
                                turn = 1;
                            }, 1000);
                        }
                        if (parseInt(redvehicle2.y / step) == parseInt(blackgun.y / step) && redvehicle2.x > blackgun.x) {
                            setTimeout(function () {
                                blackgun.x = redvehicle2.x;
                                redvehicle2.destroy();
                                $.init(redvehicle2);
                                turn = 1;
                            }, 1000);
                        }
                        if ((redvehicle2.x == blackgeneral.x && redvehicle2.y + step == blackgeneral.y) || (redvehicle2.x == blackgeneral.x && redvehicle2.y - step == blackgeneral.y) || (redvehicle2.x + step == blackgeneral.x && redvehicle2.y == blackgeneral.y) || (redvehicle2.x - step == blackgeneral.x && redvehicle2.y == blackgeneral.y)) {
                            if (redvehicle2.x >= left + 2 * step && redvehicle2.x <= left + 5 * step && redvehicle2.y >= top && redvehicle2.y <= top + 2 * step) {
                                setTimeout(function () {
                                    blackgeneral.x = redvehicle2.x;
                                    blackgeneral.y = redvehicle2.y;
                                    redvehicle2.destroy();
                                    $.init(redvehicle2);
                                    turn = 1;
                                }, 1000);
                                console.log("eat");
                            }
                        }
                    }
                }
                //相 需要添加判断条件
                if (flag[6] == 1) {
                    showMinisterRangeXY(redminister);
                    if (pointer.x >= left - 0.5 * step && pointer.x <= right + step * 0.5 && pointer.y > bottom - 4.5 * step && pointer.y < bottom + 0.5 * step) {
                        if (step * 2.5 > -redminister.x + pointer.x && -redminister.x + pointer.x > step * 1.5) {
                            //向右下
                            if (step * 1.5 < pointer.y - redminister.y && pointer.y - redminister.y < step * 2.5) {
                                redminister.y += parseInt((pointer.y + step * 0.5 - redminister.y) / step) * step;
                                redminister.x += parseInt((pointer.x + step * 0.5 - redminister.x) / step) * step;
                                turn = 0;
                            }
                            //向右上
                            if (-step * 2.5 < pointer.y - redminister.y && pointer.y - redminister.y < -step * 1.5) {
                                redminister.y += parseInt((pointer.y - step * 0.5 - redminister.y) / step) * step;
                                redminister.x += parseInt((pointer.x + step * 0.5 - redminister.x) / step) * step;
                                turn = 0;
                            }
                        }
                        if (-step * 1.5 > -redminister.x + pointer.x && -redminister.x + pointer.x > -step * 2.5) {
                            //向左下
                            if (step * 1.5 < pointer.y - redminister.y && pointer.y - redminister.y < step * 2.5) {
                                redminister.y += parseInt((pointer.y + step * 0.5 - redminister.y) / step) * step;
                                redminister.x += parseInt((pointer.x - step * 0.5 - redminister.x) / step) * step;
                                turn = 0;
                            }
                            //向左上
                            if (-step * 2.5 < pointer.y - redminister.y && pointer.y - redminister.y < -step * 1.5) {
                                redminister.y += parseInt((pointer.y - step * 0.5 - redminister.y) / step) * step;
                                redminister.x += parseInt((pointer.x - step * 0.5 - redminister.x) / step) * step;
                                turn = 0;
                            }
                        }
                    }
                }
                //帅
                if (flag[7] == 1) {
                    showGeneralRangeXY(redgeneral);
                    if (pointer.x >= left + 2.5 * step && pointer.x <= left + step * 5.5 && pointer.y > bottom - 2.5 * step && pointer.y < bottom + 0.5 * step) {
                        if (-step * 0.5 <= redgeneral.x - pointer.x && redgeneral.x - pointer.x < step * 0.5) {
                            //向上
                            if (step * 0.5 <= pointer.y - redgeneral.y && pointer.y - redgeneral.y < step * 1.5) {
                                redgeneral.y += parseInt((pointer.y + step * 0.5 - redgeneral.y) / step) * step;
                                turn = 0;
                            }
                            //向下
                            if (-step * 1.5 < pointer.y - redgeneral.y && pointer.y - redgeneral.y <= -step * 0.5) {
                                redgeneral.y += parseInt((pointer.y - step * 0.5 - redgeneral.y) / step) * step;
                                turn = 0;
                            }
                        }
                        if (-step * 0.5 <= redgeneral.y - pointer.y && redgeneral.y - pointer.y < step * 0.5) {
                            //向左
                            if (step * 0.5 <= pointer.x - redgeneral.x && pointer.x - redgeneral.x < step * 1.5) {
                                redgeneral.x += parseInt((pointer.x + step * 0.5 - redgeneral.x) / step) * step;
                                turn = 0;
                            }
                            //向右
                            if (-step * 1.5 < pointer.x - redgeneral.x && pointer.x - redgeneral.x <= -step * 0.5) {
                                redgeneral.x += parseInt((pointer.x - step * 0.5 - redgeneral.x) / step) * step;
                                turn = 0;
                            }
                        }
                    }
                }
            }
            $.killCheck();
            // for(let i=0;i<10;i++){
            //     console.log(chess[i]);    
            // }
        });
        console.log(this.input)
        drawRangeXY();
    },
    update() {
        //console.log(redvehicle1.x);
        //console.log(redvehicle2.x);
        if (turn == 0) {
            $.getAllPlace();
            $(".point").hide();
            $.blackgeneralAvailable();
        }
        if (count != 0 && c == 0) {
            gameShuThis.scene.restart();
            c = 1;
        }
    },

});



jQuery.extend({
    //获取红色棋子位置
    'getRedChessPlace': function (piece) {
        var i, j;
        if (piece.x >= left) {
            j = parseInt((piece.x - left + 0.5 * step) / step);
            i = parseInt((piece.y - top + 0.5 * step) / step);
            chess[i][j] = 1;
        }
    },
    //获取黑色棋子位置
    'getBlackChessPlace': function (piece) {
        var i, j;
        if (piece.x > left) {
            j = parseInt((piece.x - left + 0.5 * step) / step);
            i = parseInt((piece.y - top + 0.5 * step) / step);
            chess[i][j] = -1;
        }
    },
    'getBlackGeneral': function () {
        var i, j;
        j = parseInt((blackgeneral.x - left + 0.5 * step) / step);
        i = parseInt((blackgeneral.y - top + 0.5 * step) / step);
        chess[i][j] = -2;
    },
    'getAllPlace': function () {
        //初始化 应用数组存储棋子位置
        for (let i = 0; i < 10; i++) {
            chess[i] = new Array();
            for (let j = 0; j < 9; j++) {
                chess[i][j] = 0;
            }
        }
        //获取红色棋子位置
        $.getRedChessPlace(redpawn1);
        $.getRedChessPlace(redpawn2);
        $.getRedChessPlace(redgun1);
        $.getRedChessPlace(redgun2);
        $.getRedChessPlace(redvehicle1);
        $.getRedChessPlace(redvehicle2);
        $.getRedChessPlace(redgeneral);
        $.getRedChessPlace(redminister);
        //获取黑色棋子位置x`
        $.getBlackChessPlace(blackpawn1);
        $.getBlackChessPlace(blackpawn2);
        $.getBlackChessPlace(blackpawn3);
        $.getBlackChessPlace(blackvehicle);
        $.getBlackChessPlace(blackgun);
        $.getBlackChessPlace(blackgeneral);
        //获取黑色将军位置
        $.getBlackGeneral();
    },
    //用于获取当前棋子位置
    'getCurrentChessPlace': function (piece) {
        x = parseInt((piece.x - left + 0.5 * step) / step);
        y = parseInt((piece.y - top + 0.5 * step) / step);

    },
    //获取x，y位置的直线类棋子能够走的范围
    'getRangeXY': function (x, y) {
        bottomy = y;
        topy = y;
        leftx = x;
        rightx = x;
        kill = 0;
        for (let i = x - 1; i >= 0; i--) {
            if (chess[y][i] < 0) {
                leftx = i;
                if (chess[y][i] == -2) kill = 1;

                break;
            }
            if (chess[y][i] == 1) {
                leftx = i + 1;

                break;
            }
            if (i == 0) leftx = 0;
        }
        for (let i = x + 1; i < 9; i++) {
            if (chess[y][i] < 0) {
                rightx = i;
                if (chess[y][i] == -2) kill = 1;

                break;
            }
            if (chess[y][i] == 1) {
                rightx = i - 1;

                break;
            }
            if (i == 8) rightx = 8;
        }
        for (let j = y - 1; j >= 0; j--) {
            if (chess[j][x] < 0) {
                topy = j;
                if (chess[j][x] == -2) kill = 1;
                break;
            }
            if (chess[j][x] == 1) {
                topy = j + 1;
                break;
            }
            if (j == 0) topy = 0;
        }
        for (let j = y + 1; j < 10; j++) {
            if (chess[j][x] < 0) {
                bottomy = j;
                if (chess[j][x] == -2) kill = 1;
                break;
            }
            if (chess[j][x] == 1) {
                bottomy = j - 1;
                break;
            }
            if (j == 9) bottomy = 9;
        }
    },
    //吃掉棋子后，将棋子坐标置为0
    'init': function (piece) {
        var i, j;
        j = parseInt((piece.x - left + 0.5 * step) / step);
        i = parseInt((piece.y - top + 0.5 * step) / step);
        chess[i][j] = 0;
        piece.x = 0;
        piece.y = 0;
    },
    //将军检测
    'blackgeneralAvailable': function () {
        var check = 0, check1 = 0, check2 = 0, check3 = 0, check4 = 0, check5 = 0, check6 = 0;
        //车检测
        if (redvehicle1.x != 0) {
            $.getCurrentChessPlace(redvehicle1);
            $.getRangeXY(x, y);
        }
        if (kill == 1 & redvehicle1.x != 0) {
            check1 = 1;
            check = 1;
        }
        if (redvehicle2.x != 0) {
            $.getCurrentChessPlace(redvehicle2);
            $.getRangeXY(x, y);
        }
        if (kill == 1 && redvehicle2.x != 0) {
            check2 = 1;
            check = 1;
        }
        //炮检测
        if (blackvehicle.y < redgun1.y && redgun1.x == blackgeneral.x) {
            check3 = 1;
            check = 1;
        }
        if (blackvehicle.y < redgun2.y && redgun2.x == blackgeneral.x) {
            check4 = 1;
            check = 1;
        }
        //兵检测
        if (redpawn2.x + step == blackgeneral.x && redpawn2.y == blackgeneral.y) {
            check5 = 1;
            check = 1;
        }
        if (redpawn2.x == blackgeneral.x && redpawn2.y - step == blackgeneral.y) {
            check6 = 1;
            check = 1;
        }
        // console.log(check1,check2,check3,check4,check5,check6);
        // console.log("v1",redvehicle1.x,redvehicle1.y);
        // console.log("v2",redvehicle2.x,redvehicle2.y);
        // console.log("black",blackgeneral.x,blackgeneral.y);
        if (check == 0) {
            setTimeout(function () {
                blackpawn2.y = bottom - step;
                //进入失败界面，可以重新开始
                $("#fail").show();
                turn = 1;
            }, 1000);
        }
    },
    //绝杀检测
    "killCheck": () => {
        if (blackgun.x > left + 4 * step && parseInt(redvehicle2.y / step) == parseInt(top / step)) {
            //进入最终结束场景
            console.log("绝杀！");
            // 更新记录
            $.post('src/server/update.php', {
                stage: 4,
            }, function (data) {
                console.log(data);
            }, 'json');
            
            $('.point').hide();
            $("#victory").show();

            // 胜利，跳转结局场景
            setTimeout(()=>{
                hideAll();
                
                gameShuThis.scene.start("sceneWin");
            },2000)
            

        }
    }
})

//画出所有用于显示可走范围的绿点
function drawRangeXY() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            var leftpx = 315.3, topy = 75.3;
            var str = "";
            str += "<div id=place" + i + j + " class='point'>";
            str += "</div>";
            $(str).appendTo("#game");
            $("#place" + i + j).css("position", "absolute");
            $("#place"+i+j).css("z-index", i*10+j);
            $("#place" + i + j).css("top", topy + i * step + "px");
            $("#place" + i + j).css("left", leftpx + j * step + "px");
            // $("#place" + i + j).css("left", leftpx + j * step + "px");
            $("#place" + i + j).css("pointer-events", "none");
        }
    }
    $(".point").hide();
}
function myShow(i, j) {
    $("#place" + i + j).show();
}
function showPawnRangeXY(piece) {
    let i, j;
    j = parseInt((piece.x - left + 0.5 * step) / step);
    i = parseInt((piece.y - top + 0.5 * step) / step);
    myShow(i - 1, j);
    myShow(i, j - 1);
    myShow(i, j + 1);

}
function showMinisterRangeXY(piece) {
    let i, j;
    j = parseInt((piece.x - left + 0.5 * step) / step);
    i = parseInt((piece.y - top + 0.5 * step) / step);
    myShow(i - 2, j + 2);
    myShow(i - 2, j - 2);
}
function showGeneralRangeXY(piece) {
    let i, j;
    j = parseInt((piece.x - left + 0.5 * step) / step);
    i = parseInt((piece.y - top + 0.5 * step) / step);
    myShow(i - 1, j);
    myShow(i, j + 1);
}
function showVehicle1RangeXY(piece) {
    let i, j;
    j = parseInt((piece.x - left + 0.5 * step) / step);
    i = parseInt((piece.y - top + 0.5 * step) / step);
    for (let m = leftx; m <= rightx; m++) {
        if (m != j)
            myShow(i, m);
    }
    for (let n = topy; n <= bottomy; n++) {
        if (n != i)
            myShow(n, j);
    }
}
function showGunRangeXY(piece) {
    let i, j;
    j = parseInt((piece.x - left + 0.5 * step) / step);
    i = parseInt((piece.y - top + 0.5 * step) / step);
    console.log(j, i);
    for (let m = leftx; m <= rightx; m++) {
        if (m != j)
            myShow(i, m);
    }
    for (let n = topy; n <= bottomy; n++) {
        if (n != i)
            myShow(n, j);
    }
}
//添加重开按钮
function addBtnRestart() {
    $("#game #restart").remove();
    var str = '';
    str += "<span id='restart'>";
    str += "<img id='restartimg' src=" + RESTART + ">";
    str += "重新开始</span>";
    $(str).appendTo("#game");
    $("#restart").on('click', onClickRestart);
}
function addBtnSurrender() {
    $("#game #surrend").remove();
    var str = '';
    str += "<span id='surrend'>";
    str += "<img id='surrendimg' src=" + SURREND + ">";
    str += "撤退</span>";
    $(str).appendTo("#game");
    console.log(8);
    $("#surrend").on('click', onClickSurrend);

}

function onClickRestart() {
    console.log(time);
    $('.point').css("display","none");
    

    if (time == 0) {
        $('#game').css("pointer-events","none");
        hideAll();
        var mengban = gameShuThis.add.image(500, 300, "mengban").setScale(2, 2).setAlpha(0.7);
        var tipOpen = gameShuThis.add.image(500, 300, 'message').setScale(0.9, 0.7);
        const TEXT = "当前战局已成死局，你只能撤退，暂避锋芒。"
        var tipShuOpenText = gameShuThis.make.text({
            x: 295,
            y: 200,
            text: '',
            // text:poetry[nowQuestionIndex],
            origin: { x: 0, y: 0 },
            style: {
                color: 'black',
                font: '30px 华文行楷',
                lineSpacing: 5,
                wordWrap: { width: 430, useAdvancedWrap: true }
            }
        }).setDepth(6).setAlpha(0);


        var timeEvent = gameShuThis.time.addEvent({
            delay: 100,
            callback: function () {
                // $('.point').hide();
                tipShuOpenText.setAlpha(1);
                tipShuOpenText.setText(TEXT.substring(0, TEXT.length + 10 - timeEvent.repeatCount));
                if (timeEvent.repeatCount == 0) {
                    $('#game').css("pointer-events","auto");
                    gameShuThis.scene.restart();
                    // time=1;
                    $("#surrend").show();
                    $("#restart").show();
                }
            },
            repeat: TEXT.length + 10,
        })

    }
    else {
        gameShuThis.scene.restart();
        time++;
    }

}
function onClickSurrend() {

    setTimeout(function () {
        hideAll();
        time = 1
        gameShuThis.scene.switch('sceneShu');
        count += 1;
    });
}

//绝杀后出现界面生成，即游戏胜利后界面
function addVictory() {
    $("#victory").remove();
    var str = '';
    str += "<div id=victory>";
    str += "<img id='victoryimg' src=" + VICTORY + ">";
    str += "</div>";
    $(str).appendTo("#game");
    $("#victory").hide();
}
function addFail() {
    $("#fail").remove();
    var str = '';
    str += "<div id=fail>";
    str += "<img id='failimg' src=" + FAIL + ">";
    str += "</div>";
    $(str).appendTo("#game");
    $("#fail").hide();
}
function hideAll() {
    $("#restart").hide();
    $("#surrend").hide();
    $("#fail").hide();
    $("#victory").hide();
}
export default gameShu