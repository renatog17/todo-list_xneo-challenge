<?php
include 'db_connection.php';

$taskId = $_POST['taskId'];

$sql = "DELETE FROM tarefas WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $taskId);

header('Content-Type: application/json'); 
if ($stmt->execute()) {
    $stmt->close();
    $response = array('success' => true);
    echo json_encode($response); 
} else {
    $stmt->close();
    $response = array('success' => false);
    echo json_encode($response); 
}
?>