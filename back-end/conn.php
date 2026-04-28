<?php 
 
 $dsn = "mysql:host=localhost;dbname=facebook;";
 $username = "root";
 $password = "";
 try {
     $pdo = new PDO($dsn, $username, $password);
     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 } catch (PDOException $e) {
     http_response_code(500);
     echo "Connection failed: " . $e->getMessage();
 }