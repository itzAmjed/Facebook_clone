<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

require_once "conn.php";

// If ?id is provided, use it, otherwise default to the logged-in user
$id = isset($_GET['id']) && ctype_digit($_GET['id']) 
    ? (int)$_GET['id'] 
    : (int)$_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT r.id, r.first_name, r.last_name, r.email, r.profile_pic, 
       p.bio, p.location, p.birthday, p.cover_photo
FROM register r
LEFT JOIN profiles p ON r.id = p.user_id
WHERE r.id = :id");
$stmt->bindParam(":id", $id, PDO::PARAM_INT);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}
