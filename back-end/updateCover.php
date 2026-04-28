<?php
session_start();
include_once 'conn.php';

header("Content-Type: application/json");

// check if logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$userId = $_SESSION['user_id'];

if (isset($_FILES['cover_photo']) && $_FILES['cover_photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = "uploads/covers/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileName = uniqid() . "_" . basename($_FILES["cover_photo"]["name"]);
    $filePath = $uploadDir . $fileName;

   if (move_uploaded_file($_FILES["cover_photo"]["tmp_name"], $filePath)) {
    $baseUrl = "http://localhost/facebook/";  // adjust if needed
    $fileUrl = $baseUrl . $filePath;

    // ✅ only this update
    $stmt = $pdo->prepare("UPDATE profiles SET cover_photo = ? WHERE user_id = ?");
    $stmt->execute([$fileUrl, $userId]);

    echo json_encode([
        "success" => true,
        "cover_photo" => $fileUrl
    ]);
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
}
