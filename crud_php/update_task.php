<?php
include 'db_connection.php';

// Obtém os dados da tarefa enviados pela requisição Ajax
$taskId = $_POST['taskId'];
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Preparar a consulta SQL com prepared statement
$sql = "UPDATE tarefas SET descricao = ?, prazo = ?, prioridade = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $descricao, $prazo, $prioridade, $taskId);

// Executar a consulta preparada
header('Content-Type: application/json'); // Define o cabeçalho como JSON
if ($stmt->execute()) {
    $stmt->close();
    $response = array('success' => true);
    echo json_encode($response); // Envia a resposta como JSON
} else {
    $stmt->close();
    $response = array('success' => false);
    echo json_encode($response); // Envia a resposta como JSON
}
?>
