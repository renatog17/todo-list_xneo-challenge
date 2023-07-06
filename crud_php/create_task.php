<?php
include 'db_connection.php';

$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

$sql = "INSERT INTO todolist.tarefas (descricao, prazo, prioridade) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $descricao, $prazo, $prioridade);

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