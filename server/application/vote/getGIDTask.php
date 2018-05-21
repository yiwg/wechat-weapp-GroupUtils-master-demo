<?php
header('Content-Type: application/json');
$config=include '../config/dbconfig.php';
$conn=mysqli_connect($config[HOST],$config[USERNAME],$config[PASSWORD],$config[DBNAME]);
mysqli_set_charset($conn,$config[CHARSET]);
$groupid=$_REQUEST['gid'];
$sql="select * from vote_chatgroup a left join vote_task b on a.voteid=b.voteid where a.groupid='$groupid'";
$result=mysqli_query($conn,$sql);
if($result){
	$tasklist=mysqli_fetch_all($result,MYSQLI_ASSOC);
}else{
	$tasklist=array();
}
echo json_encode($tasklist); 