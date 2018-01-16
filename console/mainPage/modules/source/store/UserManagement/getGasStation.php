<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
// 宣告資料儲存陣列
$table = 'joinme_gas_station';
// 要用的資料表
$whereClause = '1=1';
// 字元必須1=1

$searchColumn = [
	'station_id',
       // 所要搜尋的欄位名稱
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;
$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";

$sql="SELECT * FROM {$table} where $whereClause LIMIT {$start}, {$limit}";
$gas_type=isset($_POST['gas']) ? trim($_POST['gas']) : null;

// 根據whereClase輸入的值來搜尋整個資料表


$records = dbGetAll($sql);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;
$gas_type=$result['gas_type'];
// var_dump($gas_type);
switch ($gas_type) {
	case "1":
		echo "92";
	case "2":
		echo "95";
	case "3":
		echo "98";
break;
}
echo json_encode($result);
// 輸出搜尋結果
$sysConn = null;