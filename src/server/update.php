<?php
    session_start();
    $userId=$_SESSION["user"];
    $stage=$_POST["stage"];
    $_SESSION["stage"]=$stage;
    $code = 0;
    $arrData = [];
    $MESSAGES = ["更新失败","更新成功"];

    include("conn.php");
    include("functions.php");
    
    $sql = "update users set stage=$stage ";
    $sql.="where id=$userId";
    $stmt=mysqli_prepare($conn, $sql);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    if(mysqli_stmt_affected_rows($stmt)){
        $code = 1;
    }else {
        $code = 0;

    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    echo getApiResult($code, $MESSAGES[$code], $arrData)
    
?>




