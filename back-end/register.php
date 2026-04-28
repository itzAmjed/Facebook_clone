<?php 

include_once 'conn.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection not established"
    ]);
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $first_name = $data["first_name"];
    $last_name = $data["last_name"];
    $email = $data["email"];
    $pwd = $data["pwd"];

    $hashedPassword = password_hash($data["pwd"], PASSWORD_DEFAULT);
try {
    $query = "INSERT INTO register (first_Name, last_Name, email, pwd)
              VALUES (:first_Name, :last_Name, :email, :pwd)";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':first_Name', $first_name);
    $stmt->bindParam(':last_Name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':pwd', $hashedPassword);
    $stmt->execute();

    $userId = $pdo->lastInsertId();

    $profileQuery = "INSERT INTO profiles (user_id) VALUES (?)";
    $profileStmt = $pdo->prepare($profileQuery);
    $profileStmt->bindParam(':user_id', $userId);
    $profileStmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "User registered successfully"
    ]);
    exit();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Query failed",
        "details" => $e->getMessage()
    ]);
    exit();
}
}