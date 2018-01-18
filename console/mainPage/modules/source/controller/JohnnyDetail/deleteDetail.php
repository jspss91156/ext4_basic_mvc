<?php
require "../../../../../init.php";


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
$table = 'studentscore';

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    $detail_id = $row->detail_id;

    $whereClause = "{$table}.detail_id = '{$detail_id}'";          

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
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

echo json_encode($result);