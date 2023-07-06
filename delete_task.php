<?php
// Conectar ao banco de dados
$servername = 'localhost';
$username = 'root';
$password = 'admin';
$dbname = 'todolist';

// Obtém o ID da tarefa a ser excluída do parâmetro POST
$taskId = $_POST['taskId'];

// Conecta ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die('Falha na conexão com o banco de dados: ' . $conn->connect_error);
}

// Query para excluir a tarefa
$sql = "DELETE FROM tarefas WHERE id = '$taskId'";

// Executa a query de exclusão
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
