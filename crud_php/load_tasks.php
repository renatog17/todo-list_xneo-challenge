<?php
include 'db_connection.php';

// Consulta para buscar as tarefas do banco de dados
$sql = 'SELECT * FROM tarefas';
$result = $conn->query($sql);

// Converter os resultados em um array
$tasks = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
  }
}

// Fechar a conexão com o banco de dados
$conn->close();

// Retornar os dados das tarefas como uma resposta JSON
header('Content-Type: application/json');
echo json_encode($tasks);
?>
