<?php
include 'db_connection.php';

$taskId = $_POST['taskId'];
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

$sql = "UPDATE tarefas SET descricao = ?, prazo = ?, prioridade = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $descricao, $prazo, $prioridade, $taskId);

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