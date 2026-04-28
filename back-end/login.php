<?php 
session_start();

include_once 'conn.php';

if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection not established"]);
    exit();
}

// ✅ CORS headers — must be at the top before any output
header("Access-Control-Allow-Origin:  http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Handle preflight requests (important for modern browsers)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
   http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"];
    $pwd =$data["pwd"];

    try {
        $query ="SELECT * FROM register WHERE email = :email";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if($user && password_verify($pwd,$user["pwd"])){
            $_SESSION['user_id'] = $user['id']; // Assuming 'id' is the primary key in your register table
                echo json_encode(["success" => true, "message" => "Login successful", "user" => $user]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        }


    } catch (PDOException $e) {
     die("Query failed:". $e->getMessage())   ;   
    }

}
