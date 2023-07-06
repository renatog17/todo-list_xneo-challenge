<?php
include 'db_connection.php';

$sql = 'SELECT * FROM tarefas';
$stmt = $conn->prepare($sql);

$stmt->execute();

$result = $stmt->get_result();

$tasks = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
  }
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($tasks);
?>