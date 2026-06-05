<?php
session_start();
include 'conn.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = $_POST['content'];
    $post_id = $_POST['post_id'];

    // 1. Update post content only
    $stmt = $pdo->prepare("UPDATE posts SET content = :content WHERE id = :id AND user_id = :user_id");
    $stmt->execute([
        'content' => $content,
        'id' => $post_id,
        'user_id' => $user_id
    ]);

    // 2. Only touch images if new ones were sent
    if (!empty($_FILES['image_url']['name'][0])) {
        
        // delete old images
        $stmt = $pdo->prepare("DELETE FROM post_images WHERE post_id = :post_id");
        $stmt->execute(['post_id' => $post_id]);

        // insert new images
        $targetDir = __DIR__ . "/uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $files = $_FILES['image_url'];
        $totalFiles = count($files['name']);

        for ($i = 0; $i < $totalFiles; $i++) {
            if ($files['error'][$i] !== UPLOAD_ERR_OK) continue;

            $fileName = time() . "_" . $i . "_" . basename($files['name'][$i]);
            $targetPath = $targetDir . $fileName;

            if (move_uploaded_file($files['tmp_name'][$i], $targetPath)) {
                $stmt = $pdo->prepare("INSERT INTO post_images (post_id, image_url) VALUES (:post_id, :image_url)");
                $stmt->execute([
                    'post_id' => $post_id,
                    'image_url' => "uploads/" . $fileName
                ]);
            }
        }
    }

    echo json_encode(['success' => true]);
    exit();
}