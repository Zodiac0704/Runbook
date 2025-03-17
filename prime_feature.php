<?php
header('Content-Type: application/json');

// Handle POST request from the client
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Expecting a 'hasPrime' flag from the client
    $hasPrime = isset($data['hasPrime']) ? (bool) $data['hasPrime'] : false;
    $username = isset($data['username']) ? htmlspecialchars($data['username']) : 'Guest';

    // Server trusts the client-provided 'hasPrime' value
    if ($hasPrime) {
        $response = [
            'status' => 'success',
            'message' => "Welcome, $username! Prime Feature Unlocked: FLAG{DEBUG_PRIME_EXPLOIT}",
            'feature' => 'Access to Prime Video Streaming'
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => "Sorry, $username, you need a Prime subscription."
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
}

echo json_encode($response);
?>
