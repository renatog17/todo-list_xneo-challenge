<?php
include 'db_connection.php';

// Obter os dados do formulário
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Inserir os dados na tabela de tarefas
$sql = "INSERT INTO todolist.tarefas (descricao, prazo, prioridade) VALUES ('$descricao', '$prazo', '$prioridade')";
header('Content-Type: application/json'); // Define o cabeçalho como JSON

if ($conn->query($sql) === TRUE) {
    $conn->close();
    $response = array('success' => true);
    echo json_encode($response); // Envia a resposta como JSON
} else {
  $conn->close();
  $response = array('success' => false);
  echo json_encode($response); // Envia a resposta como JSON
}
?>
