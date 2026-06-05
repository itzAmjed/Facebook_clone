<?php
session_start();
header("Content-Type: application/json");
require_once "conn.php";

// ✅ Ensure logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

// ✅ Decode JSON body
$input = json_decode(file_get_contents("php://input"), true);
$receiver_id = $input['receiver_id'] ?? null;
$sender_id   = $_SESSION['user_id'];

// ✅ Check if receiver_id was provided
if (!$receiver_id) {
    echo json_encode(["success" => false, "message" => "receiver_id is required"]);
    exit;
}

// ✅ Prevent sending request to yourself
if ($receiver_id == $sender_id) {
    echo json_encode(["success" => false, "message" => "You cannot send a request to yourself"]);
    exit;
}

// ✅ Check if receiver exists
$stmt = $pdo->prepare("SELECT id FROM register WHERE id = :id");
$stmt->execute([":id" => $receiver_id]);
$receiverExists = $stmt->fetch();

if (!$receiverExists) {
    echo json_encode(["success" => false, "message" => "Receiver not found"]);
    exit;
}

// ✅ Insert friend request
try {
    $stmt = $pdo->prepare("INSERT INTO friend_requests (sender_id, receiver_id, status) 
                           VALUES (:sender_id, :receiver_id, 'pending')");
    $stmt->execute([
        ":sender_id" => $sender_id,
        ":receiver_id" => $receiver_id
    ]);

    echo json_encode(["success" => true, "message" => "Friend request sent"]);
} catch (PDOException $e) {
    // Handle duplicate requests (unique constraint)
    if ($e->getCode() == "23000") {
        echo json_encode(["success" => false, "message" => "Friend request already exists"]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error", "error" => $e->getMessage()]);
    }
}
