<?php
function getApiResult($code,$str,$data){
    $arrs=[];
    $arrs[0]["code"]=$code;
    $arrs[0]["data"]=$data;
    $arrs[0]["msg"]=$str;
    echo json_encode($arrs,JSON_UNESCAPED_UNICODE);
}

?>