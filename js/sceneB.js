

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

var player;
var direction;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;



const Scene0 = new Phaser.Class({
    Extends: Phaser.Scene,
   
    initialize:
    function Scene0 ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });

        this.cursors;
    },
    preload :function()
{   
    // 加载图片 例如设置sky为图片id，后面可直接使用sky代表图片
    this.load.image('sky', 'assets/assets/back/sky.png');
    this.load.image('ground', 'assets/assets/board/prisonboard.png');
    this.load.image('fangwu1', 'assets/fangwu1.png');
    this.load.image('kezhan1', 'assets/kezhan1.png');
    this.load.image('baodian1', 'assets/baodian1.png');

    this.load.image('cloud1', cloud1);
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('moon','assets/assets/decoration/moon1.png')
    this.load.spritesheet('dude', 'assets/css_sprites_1.png', { frameWidth: 32, frameHeight: 45 });
},
create ()
{       
    // 设置游戏总界限，不同于画面大小
    this.cameras.main.setBounds(0, 0, 800 * 2, 600 );
    this.physics.world.setBounds(0, 0, 800 * 2, 600 );

    // 开启另一'game1'场景
    //  this.scene.start(game1);

    // 在x=0,y=0位置放置图片     设置图片原点为0,0,否则默认为中心点
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(800, 0, 'sky').setOrigin(0, 0).setFlipX(true);
    this.add.image(100,100,'moon').setScale(0.5).setOrigin(0,0).setScrollFactor(0,1);
    this.add.image(100,100,'cloud1').setScale(0.5).setOrigin(0,0).setScrollFactor(0.1,1);
    this.add.image(300,100,'cloud1').setScale(0.5).setOrigin(0,0).setScrollFactor(0.1,1);
    // 增加一个静态group
    platforms = this.physics.add.staticGroup();
    // 创建一个平台,放在x=0，y=555处 以ground为背景，宽度扩大3倍。
    // setDisplaySize(1000,45)和setScale(2,1)都会拉伸失真
    platforms.create(0, 510, 'ground').setScale(2,2).setOrigin(0, 0).refreshBody();
    platforms.create(599, 510, 'ground').setScale(2,2).setOrigin(0, 0).refreshBody();
    
    // 增加一个精灵，即主角
    player = this.physics.add.sprite(100, 350, 'dude').setScale(1.5).setOrigin(0, 0);
    
    // 可改变相机的长宽
    // this.cameras.main.setSize(0,900);

     // 镜头一直跟随主角
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    //   设置玩家的反弹值为0.2 ，且与世界边缘产生碰撞，否则可以移动出画面
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    
    // 创建精灵行为
    this.anims.create({
        key: 'right',
        // 前1-4帧为向左走的动画
        frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
        frameRate: 10,
        // -1代表循环
        repeat: -1
    });

    this.anims.create({
        key: 'rightStop',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'leftStop',
        frames: [ { key: 'dude', frame: 5 } ],
        frameRate: 20
    });

    //  cursors为一个输入事件的类
    cursors = this.input.keyboard.createCursorKeys();


    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    

    // 遍历stars的儿子
    stars.children.iterate(function (child) {
        // 设置Y方向的弹性值,为0.4-0.8的随机数
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    stars.children.iterate(function (child) {
        // 设置Y方向的弹性值,为0.4-0.8的随机数
        child.disableBody(true, true);

    });
    

    bombs = this.physics.add.group();

    //增加文字 
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });



    // 设置碰撞事件
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    

    // 设置重叠事件
    this.physics.add.overlap(player, stars, this.collectStar, null, this);    
    this.input.on('pointerup', function () {        
        //  this.scene.stop('scene0');
        //  // 切换场景

        this.scene.pause("scene0")
        
        /* 
        启动给定的场景并与这个场景并行运行。
        这将在下一次场景管理器更新时发生，而不是立即发生。 */
        // launch也是启动  开始
         this.scene.run('sceneA');
     

         this.scene.resume('scene0')
         
      

    }, this);
},


update ()
{   

    // 设置玩家移动
    if (gameOver)
    {
        // 游戏停止
        return;
    }
    // 方向左键按下
    if (cursors.left.isDown)
    {   
        // 设置x轴速度
        player.setVelocityX(-160);  
        player.anims.play('left', true);
        direction="left";

      

       
    }
    else if (cursors.right.isDown)
    {    
        player.setVelocityX(160);       
        player.anims.play('right', true);
        direction="right";
        // console.log(this.scene.isPaused('sceneA'))
    }
    else
    {
        player.setVelocityX(0);
        if(direction==="left")
            player.anims.play('leftStop');
        else 
            player.anims.play('rightStop');

    }

    // 触碰地面
    if (cursors.up.isDown && player.body.touching.down)
    {   
        player.setVelocityY(-300);
    }
   
}
,
 collectStar :function(player, star)
{   
    // 禁用和隐藏
    star.disableBody(true, true);
    //相反的事件
    // star.enableBody()
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        // 取消重力属性
        bomb.allowGravity = false;

    }
},


   hitBomb : function  (player, bomb)
    {   
        // 暂停
        this.physics.pause();
        // 该值应设置为十六进制数，即红色为 0xff0000，紫色为 0xff00ff。
        player.setTint(0xff0000);
        gameOver = true;
    }


});





