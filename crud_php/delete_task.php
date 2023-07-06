<?php
include 'db_connection.php';

// Obtém o ID da tarefa a ser excluída do parâmetro POST
$taskId = $_POST['taskId'];

// Preparar a consulta SQL com prepared statement
$sql = "DELETE FROM tarefas WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $taskId);

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
