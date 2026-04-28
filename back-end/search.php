<?php 
session_start();

include_once 'conn.php';

if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection not established"]);
    exit();
}

// ✅ CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    $first_Name = $data["first_Name"] ?? '';
    $last_Name = $data["last_Name"] ?? '';

    try {
        $query = "SELECT id , first_Name, last_Name, profile_pic
                  FROM register 
                  WHERE first_Name LIKE :first_Name 
                     OR last_Name LIKE :last_Name";

        $stmt = $pdo->prepare($query); 
        $stmt->bindValue(':first_Name', "%$first_Name%");
        $stmt->bindValue(':last_Name', "%$last_Name%");
        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($users) {
            echo json_encode($users);
        } else {
            echo json_encode(["message" => "No users found"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
}
