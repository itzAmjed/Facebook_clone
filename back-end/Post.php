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
$content = $_POST['content'] ?? null;

try {
    require_once "conn.php";

    // 1️⃣ insert the post first to get the post_id
    $query = "INSERT INTO posts (user_id, content) VALUES (:user_id, :content)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':content', $content);
    $stmt->execute();

    // 2️⃣ grab the new post id
    $post_id = $pdo->lastInsertId();

    // 3️⃣ handle multiple images if any were sent
    if (!empty($_FILES['image_url'])) {
        $targetDir = __DIR__ . "/uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $files = $_FILES['image_url'];
        $totalFiles = count($files['name']);

        // 4️⃣ loop through each file
        for ($i = 0; $i < $totalFiles; $i++) {

            // skip if this file had an upload error
            if ($files['error'][$i] !== UPLOAD_ERR_OK) continue;

            $fileName = time() . "_" . $i . "_" . basename($files['name'][$i]);
            $targetPath = $targetDir . $fileName;

            if (move_uploaded_file($files['tmp_name'][$i], $targetPath)) {
                // 5️⃣ insert each image into post_images table
                $imgQuery = "INSERT INTO post_images (post_id, image_url) 
                             VALUES (:post_id, :image_url)";
                $imgStmt = $pdo->prepare($imgQuery);
                $imgStmt->bindParam(':post_id', $post_id);
                $imgPath = "uploads/" . $fileName;
                $imgStmt->bindParam(':image_url', $imgPath);
                $imgStmt->execute();
            }
        }
    }

    echo json_encode(["success" => true, "message" => "Post created successfully"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}