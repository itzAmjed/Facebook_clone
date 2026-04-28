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
    $query = "
        SELECT 
            posts.id,
            posts.user_id,
            posts.content,
            posts.created_at,
            register.first_Name AS first_name,
            register.last_Name AS last_name,
            register.profile_pic,
            GROUP_CONCAT(post_images.image_url) AS images
        FROM posts
        JOIN register ON posts.user_id = register.id
        LEFT JOIN post_images ON post_images.post_id = posts.id
        GROUP BY posts.id
        ORDER BY posts.created_at DESC
    ";
    $stmt = $pdo->query($query);
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // convert images string into array for each post
    foreach ($posts as &$post) {
        $post['images'] = $post['images'] 
            ? explode(',', $post['images']) 
            : [];
    }

    echo json_encode(["success" => true, "posts" => $posts]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch posts: " . $e->getMessage()]);
}