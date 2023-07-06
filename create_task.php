<?php
// Obter os dados do formulário
$descricao = $_POST['descricao'];
$prazo = $_POST['prazo'];
$prioridade = $_POST['prioridade'];

// Conectar ao banco de dados
$servername = 'localhost';
$username = 'root';
$password = 'admin';
$dbname = 'todolist';

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se a conexão foi bem-sucedida
if ($conn->connect_error) {
  die('Erro na conexão: ' . $conn->connect_error);
}

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

//
