<?php
session_start();
header("Content-Type: application/json");
require_once "conn.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$receiver_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("
    SELECT 
        fr.id, 
        fr.sender_id, 
        r.first_name, 
        r.last_name, 
        r.profile_pic, 
        fr.status, 
        fr.created_at
    FROM friend_requests fr
    JOIN register r ON fr.sender_id = r.id
    WHERE fr.receiver_id = :user_id
    ORDER BY fr.id DESC
");
$stmt->execute(['user_id' => $receiver_id]);

$requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "requests" => $requests
]);
