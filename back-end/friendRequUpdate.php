<?php
session_start();
header("Content-Type: application/json");
require_once "conn.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$request_id = $input['request_id'] ?? null;
$action = $input['action'] ?? null; // "accept" or "decline"
$user_id = $_SESSION['user_id'];

if (!$request_id || !$action) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

// ✅ Verify that the logged-in user is the receiver of this request
$stmt = $pdo->prepare("SELECT * FROM friend_requests WHERE id = :id AND receiver_id = :receiver");
$stmt->execute(['id' => $request_id, 'receiver' => $user_id]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$request) {
    echo json_encode(["success" => false, "message" => "Friend request not found"]);
    exit;
}

// ✅ Update status
$newStatus = ($action === "accept") ? "accepted" : "denied";
$stmt = $pdo->prepare("UPDATE friend_requests SET status = :status WHERE id = :id");
$stmt->execute(['status' => $newStatus, 'id' => $request_id]);

echo json_encode(["success" => true, "message" => "Friend request {$newStatus}"]);
