<?php
include 'db_connection.php';

// Preparar a consulta SQL com prepared statement
$sql = 'SELECT * FROM tarefas';
$stmt = $conn->prepare($sql);

// Executar a consulta preparada
$stmt->execute();

// Obter os resultados da consulta
$result = $stmt->get_result();

// Converter os resultados em um array
$tasks = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
  }
}

// Fechar a conexão com o banco de dados
$stmt->close();
$conn->close();

// Retornar os dados das tarefas como uma resposta JSON
header('Content-Type: application/json');
echo json_encode($tasks);
?>
