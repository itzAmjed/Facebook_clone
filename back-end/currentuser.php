<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

require_once "conn.php";

// ✅ Adjust the table/column names to match your DB
$stmt = $pdo->prepare("SELECT id, first_name, last_name, profile_pic FROM register WHERE id = :id");
$stmt->bindParam(":id", $_SESSION['user_id']);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}