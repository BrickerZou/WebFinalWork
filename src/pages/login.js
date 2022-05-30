
const SceneLogin = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
        function SceneLogin() {
            Phaser.Scene.call(this, { key: 'sceneLogin' });
        },
    preload: function () {
        this.load.image('pic', 'static/images/back/loginBack.png');
        this.load.html('nameform', 'static/html/login.html');
    },
    create() {
        var scene = this.scene;

        this.add.image(500, 300, 'pic');
        var element = this.add.dom(500, 600).createFromCache('nameform');
        registerEvent();

        var text = this.add.text(10, 10, '');
        element.setPerspective(800);
        element.addListener('click');

        element.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    //  移除事件绑定 
                    // this.removeListener('click');
                    //   发送登录请求
                    $.post("src/server/login.php",
                        {
                            "username": inputUsername.value,
                            "pwd": inputPassword.value
                        },
                        (data) => {
                            if (data[0].code == 1) {
                                alert("登录成功");
                                // 全屏效果
                                $('#game')[0].requestFullscreen();
                                this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
                                this.scene.tweens.add({
                                    targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                                    onComplete: function () {
                                        element.setVisible(false);
                                    }
                                });
                                text.setText('Welcome ' + inputUsername.value);
                                setTimeout(() => {
                                    let stage = parseInt(data[0].data[0]['stage']);
                                    console.log(stage)
                                    if (stage === 0) {
                                        scene.start('sceneQin')
                                    }
                                    else if (stage === 1) {
                                        scene.start('sceneShen')
                                    }
                                    else if (stage === 2) {
                                        scene.start('town')

                                    }
                                    else if (stage === 3) {
                                        scene.start('sceneShu')

                                    }
                                    else if (stage === 4) {
                                        scene.start('sceneWin')
                                    }
                                    else {
                                        scene.start('sceneQin')
                                    }
                                }, 2500)


                            }
                            else {
                                alert("账号或秘密错误");

                            }

                        },
                        "json"
                    );

                }
                else {
                    alert("请输入账号密码！")
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 250,
            duration: 3000,
            ease: 'Power3'
        });

    }


});


function registerEvent() {
    $(".register").hide();

    $("#toRegisterButton").on("click", toRegister);
    $("#registerButton").on("click", registerFunc);

    function toRegister() {
        $(".login").hide();
        $(".register").show();
    }

    function registerFunc() {
        let username = $("#registerUsername").val();
        var pwd = $("#registerPassword").val();
        console.log(username, pwd);
        $.post("src/server/registerCheck.php",
            {
                "username": username
            },
            function (data) {
                console.log(data[0].data);
                let num = data[0].data + 1;
                if (data[0].code == 1) {
                    $.post("src/server/register.php",
                        {
                            "user_name": username,
                            "pwd": pwd,
                            "id": num,
                        },
                        function (data) {
                            console.log(data[0].code);
                            if (data[0].code === 1) {
                                alert("注册成功");
                                window.location.href = "index.html?id=" + num + "";
                            }
                        },
                        "json"
                    );
                    $(".register").hide();
                    $(".login").show();
                } else {
                    alert("用户名已存在");
                }
            },
            "json"
        );
    }
}




export default SceneLogin; 