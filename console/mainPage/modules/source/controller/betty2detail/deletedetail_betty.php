<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

if (! isset($_POST['data']) || empty($_POST['data'])) {//未輸入或輸入空白
    $result['success'] = false;
	$result['msg'] = 'No post data';
	echo json_encode($result);

	exit();
}

$data = json_decode($_POST['data']);
$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];//is_array是否為陣列 是輸出否則加上陣列輸出

// db execution
$table = 'joinme_brand_log';

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    // var_dump($row);
    $offer_id = $row->offer_id;

    $whereClause = "{$table}.offer_id = '{$offer_id}'";          

    // 刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records) == 0){
        return;
    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false;
        break;
    }
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);