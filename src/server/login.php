<?php
    session_start();
    $userName = $_POST["username"];
    $userPwd = $_POST["pwd"];

    $code = 0;
    $arrData = [];
    $MESSAGES = ["登录失败","登录成功"];

    include("conn.php");
    include("functions.php");
    
    $sql = "select id,stage from users ";
    $sql.="where user_name=? and pwd=?";
    $stmt=mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $userName, $userPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $userId,$stage);
    if(mysqli_stmt_fetch($stmt)){
        $code = 1;
        $arrData[0]["userId"]=$userId;
        $arrData[0]["stage"]=$stage;
        $_SESSION["user"] = $userId;
        $_SESSION["stage"] = $stage;
        

    }else {
        $code = 0;

    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    echo getApiResult($code, $MESSAGES[$code], $arrData)
    
?>




