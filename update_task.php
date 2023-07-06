<?php
// Conectar ao banco de dados
$servername = 'localhost';
$username = 'root';
$password = 'admin';
$dbname = 'todolist';

// Obtém os dados da tarefa enviados pela requisição Ajax
$taskId = $_POST['taskId'];
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Conecta ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die('Falha na conexão com o banco de dados: ' . $conn->connect_error);
}

// Query de atualização da tarefa
$sql = "UPDATE tarefas SET descricao = '$descricao', prazo = '$prazo', prioridade = '$prioridade' WHERE id = '$taskId'";

// Executa a query de atualização
if ($conn->query($sql) === TRUE) {
  $response = array('success' => true);
} else {
  $response = array('success' => false);
}

// Fecha a conexão com o banco de dados
$conn->close();

// Retorna a resposta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>