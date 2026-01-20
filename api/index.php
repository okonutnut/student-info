<?php
// index.php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$DB_HOST = "localhost";
$DB_NAME = "student-info";
$DB_USER = "root";
$DB_PASS = "";

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];
$uri = explode("/", trim($_SERVER["REQUEST_URI"], "/"));
$resource = $uri[0] ?? null;
$id = $uri[1] ?? null;

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
if ($resource === "login" && $method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("SELECT id, code, name, password FROM users WHERE code = ?");
    $stmt->execute([$data["code"]]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user["password"] === $data["password"]) {
        echo json_encode([
            "message" => "Login successful",
            "user" => [
                "id" => $user["id"],
                "code" => $user["code"],
                "name" => $user["name"]
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials"]);
    }
    exit;
}

/*
|--------------------------------------------------------------------------
| STUDENTS CRUD
|--------------------------------------------------------------------------
*/
if ($resource !== "students") {
    http_response_code(404);
    echo json_encode(["error" => "Resource not found"]);
    exit;
}

switch ($method) {

    case "GET":
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM students ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            INSERT INTO students (id, code, name, student_id, gender, course, year, gwa)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data["id"],
            $data["code"],
            $data["name"],
            $data["student_id"],
            $data["gender"],
            $data["course"],
            $data["year"],
            $data["gwa"]
        ]);

        echo json_encode(["message" => "Student created"]);
        break;

    case "PUT":
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID required"]);
            break;
        }

        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            UPDATE students SET
                code = ?, name = ?, student_id = ?, gender = ?, course = ?, year = ?, gwa = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $data["code"],
            $data["name"],
            $data["student_id"],
            $data["gender"],
            $data["course"],
            $data["year"],
            $data["gwa"],
            $id
        ]);

        echo json_encode(["message" => "Student updated"]);
        break;

    case "DELETE":
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID required"]);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["message" => "Student deleted"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
}
