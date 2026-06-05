<?php
session_start();
header("Content-Type: application/json");
include_once "conn.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$current_user_id = $_SESSION['user_id']; // person who is logged in
$profile_id = $input['profile_id'] ?? null; // person whose profile is being viewed

if (!$profile_id) {
    echo json_encode(["success" => false, "message" => "Profile ID missing"]);
    exit;
}

// ✅ Check if there’s already a friend request in either direction
$stmt = $pdo->prepare("
    SELECT * FROM friend_requests
    WHERE (sender_id = :current AND receiver_id = :profile)
       OR (sender_id = :profile AND receiver_id = :current)
");
$stmt->execute([
    'current' => $current_user_id,
    'profile' => $profile_id
]);
$request = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$request) {
    echo json_encode(["success" => true, "status" => "none"]); // no request at all
    exit;
}

// ✅ Determine the relationship and what should be shown
if ($request['status'] === 'pending') {
    // if the logged-in user is the receiver -> can Accept or Decline
    if ($request['receiver_id'] == $current_user_id) {
        echo json_encode(["success" => true, "status" => "pending", "relation" => "receiver"]);
    } else {
        echo json_encode(["success" => true, "status" => "pending", "relation" => "sender"]);
    }
} elseif ($request['status'] === 'accepted') {
    echo json_encode(["success" => true, "status" => "friends"]);
} elseif ($request['status'] === 'rejected') {
    echo json_encode(["success" => true, "status" => "rejected"]);
} else {
    echo json_encode(["success" => true, "status" => "none"]);
}
?>
