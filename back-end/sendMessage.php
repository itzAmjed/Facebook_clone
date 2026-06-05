<?php
session_start();
require_once 'conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
} 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sender_id = $_SESSION['user_id'];
   $input = json_decode(file_get_contents("php://input"), true);
$receiver_id = $input['receiver_id'] ?? null;
$message = $input['message'] ?? null;

    // Validate input
    if (empty($receiver_id) || empty($message)) {
        echo json_encode(["success" => false, "error" => "Invalid input"]);
        exit();
    }

    // Save message to database
    $stmt = $pdo->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (:sender_id, :receiver_id, :message)");
    if ($stmt->execute([':sender_id' => $sender_id, ':receiver_id' => $receiver_id, ':message' => $message])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to send message"]);
    }
}
