<?php 
include_once 'conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 0); // Don't send errors in HTML
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check DB connection
if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection not established"
    ]);
    exit();
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $postId = isset($data['id']) ? (int) $data['id'] : 0;

    if ($postId > 0) {
        $stmt = $pdo->prepare("DELETE FROM posts WHERE id = :id");
        $stmt->bindParam(':id', $postId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "message" => "Post not found"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete post"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid post ID"]);
    }
    exit();
}

// Any other method
http_response_code(405);
echo json_encode([
    "success" => false,
    "message" => "Method not allowed"
]);
exit();
