<?php 

session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$input = json_decode(file_get_contents("php://input"), true);
$comment = $input['comment'] ?? null;
$post_id = $input['post_id'] ?? null;

if (empty($comment) || empty($post_id)) {
    echo json_encode(["error" => "Comment and Post ID are required"]);
    exit;
}

try {
    require_once "conn.php";

    $query = "INSERT INTO comments (user_id, post_id, comment) VALUES (:user_id, :post_id, :comment)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':post_id', $post_id);
    $stmt->bindParam(':comment', $comment);
    $stmt->execute();

    echo json_encode(["success" => "Comment added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
