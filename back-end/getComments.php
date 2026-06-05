<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include_once 'conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
try {
    $post_id = $_GET['post_id'] ?? null;
    if (!$post_id) {
        echo json_encode(["error" => "Post ID is required"]);
        exit;
    }

    $query = "
        SELECT 
            comments.id,
            comments.user_id,
            comments.comment,
            comments.created_at,
            register.first_Name AS first_name,
            register.last_Name AS last_name,
            register.profile_pic
        FROM comments
        JOIN register ON comments.user_id = register.id
        WHERE comments.post_id = :post_id
        ORDER BY comments.created_at ASC
    ";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':post_id', $post_id, PDO::PARAM_INT);
    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "comments" => $comments]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch comments: " . $e->getMessage()]);
}