<?php 
session_start();
require_once 'conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$friend_id = $_GET['friend_id'] ?? null; 
if (!$friend_id) {
    echo json_encode(["success" => false, "message" => "Friend ID is required"]);
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_SESSION['user_id'];
    $stmt = $pdo->prepare("SELECT * FROM messages WHERE (sender_id = :user_id AND receiver_id = :friend_id) OR (sender_id = :friend_id AND receiver_id = :user_id) ORDER BY timestamp ASC");
    $stmt->execute([':user_id' => $user_id, ':friend_id' => $friend_id]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "messages" => $messages]);
}
