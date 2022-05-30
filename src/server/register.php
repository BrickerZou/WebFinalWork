<?php
    $userName = $_POST["user_name"];
    $userPwd = $_POST["pwd"];
    $userId = $_POST["id"];
    $stage = 0;


    $code = 0;
    $Data = [];
    $MESSAGES = ["注册失败","注册成功"];
    
    include("conn.php");
    include("functions.php");

    $sql = "INSERT INTO users(id,user_name,pwd,stage) values($userId, '$userName', '$userPwd',$stage)";
    $rs = mysqli_query($conn, $sql);
    if($rs){
        $code = 1;
    }
    mysqli_close($conn);
    getApiResult($code, $MESSAGES[$code], $Data);
?>