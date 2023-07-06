<?php
include 'db_connection.php';

// Obter os dados do formulário
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Preparar a consulta SQL com prepared statement
$sql = "INSERT INTO todolist.tarefas (descricao, prazo, prioridade) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $descricao, $prazo, $prioridade);

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
