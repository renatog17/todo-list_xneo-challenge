<?php
include 'db_connection.php';

// Obtém os dados da tarefa enviados pela requisição Ajax
$taskId = $_POST['taskId'];
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Query de atualização da tarefa
$sql = "UPDATE tarefas SET descricao = '$descricao', prazo = '$prazo', prioridade = '$prioridade' WHERE id = '$taskId'";

// Executa a query de atualização
if ($conn->query($sql) === TRUE) {
  $response = array('success' => true);
} else {
  $response = array('success' => false);
}

// Retorna a resposta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
