<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
	$result['msg'] = 'No post data';
	echo json_encode($result);

	exit();
}

$data = json_decode($_POST['data']);
$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];

// db execution
$table = 'joinme_gas_station';

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    // var_dump($row);
    $station_id = $row->station_id;

    $whereClause = "{$table}.station_id = '{$station_id}'";          

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