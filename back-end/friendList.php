<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
require_once "conn.php";

// ensure logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$me = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            CASE 
                WHEN fr.sender_id = :me THEN fr.receiver_id 
                ELSE fr.sender_id 
            END AS friend_id,
            r.first_Name AS first_name,
            r.last_Name AS last_name,
            r.profile_pic
        FROM friend_requests fr
        JOIN register r ON r.id = (
            CASE 
                WHEN fr.sender_id = :me THEN fr.receiver_id 
                ELSE fr.sender_id 
            END
        )
        WHERE fr.status = 'accepted'
        AND (fr.sender_id = :me OR fr.receiver_id = :me)
    ");

    $stmt->execute([':me' => $me]);
    $friends = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "friends" => $friends]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}