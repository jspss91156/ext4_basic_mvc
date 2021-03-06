<?php
require "../../../../../init.php";

$result = [];
$table = "johnnyStudent";
$whereClause = '1=1';

$searchColumn = [
    'id',
    'name',
    'sex',
    'email',
    'cellphone',
];

$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$sql="SELECT * FROM {$table} where {$whereClause}";

$records = dbGetAll($sql);
$total = dbGetTotal($records);
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
closeConn();