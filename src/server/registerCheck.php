<?php
    $userName = $_POST["username"];  
    // $userName = "123";  
    $code = 1;
    $Data = "";
    $MESSAGES = ["用户名已存在","用户名可注册"];
    $count = 0;

    include("conn.php");
    include("functions.php");

    $sql = "select * from users";
    $rs = mysqli_query($conn, $sql);
    if($userName == "")$code = 0;
    while($res = mysqli_fetch_assoc($rs)){
        if($res["user_name"] == $userName){
            $code = 0;
        }
        $count++;
    }

    $Data = $count;
    mysqli_close($conn);
    getApiResult($code, $MESSAGES[$code], $Data);
?>