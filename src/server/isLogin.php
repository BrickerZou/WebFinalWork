<?php
    session_start();

    include("functions.php");
    $code=0;
    $MESSAGES=["未登录","已登录"];
    $data=[];

    if(isset($_SESSION["user"])){
        $code=1;
        $data['userName']=$_SESSION["user"];
        $data['stage']=$_SESSION["stage"];
    }
    
    echo getApiResult($code, $MESSAGES[$code], $data)


?>