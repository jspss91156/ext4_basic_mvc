<?php
require "../../../../../init.php";

if (!isset($_POST['data']) || empty($_POST['data'])) { 
    $result['success'] = false;
    $result['msg'] = 'No post data';
    echo json_encode($result);

    exit();
}
$result = [];
$data = json_decode($_POST['data']);
$data = is_array($data) ? $data : [$data];
$table = 'johnnyStudent';

dbBegin();

$dbResult = true;

foreach($data as $key => $row) {
    $id = $row->id;
    $whereClause = "{$table}.id = '{$id}'";
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records) == 0) {
        return; 
    }

    if (!dbDelete($table, $whereClause)) {
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

echo json_encode($result);