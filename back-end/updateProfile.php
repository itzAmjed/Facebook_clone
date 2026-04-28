<?php
session_start();
include_once 'conn.php';
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$userId = $_SESSION['user_id'];

if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = "uploads/profile_pic/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileName = uniqid() . "_" . basename($_FILES["profile_pic"]["name"]);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $filePath)) {
        $baseUrl = "http://localhost/facebook/";
        $fileUrl = $baseUrl . $filePath;

        $stmt = $pdo->prepare("UPDATE register SET profile_pic = ? WHERE id = ?");
        $stmt->execute([$fileUrl, $userId]);

        echo json_encode([
            "success" => true,
            "profile_pic" => $fileUrl
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
}
