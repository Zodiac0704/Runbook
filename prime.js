// HTML context: Assume this is loaded via a <script> tag in an HTML file
// <script src="prime.js"></script>

// Function to check Prime status and send request
function checkPrimeStatus(username) {
    let hasPrime = false; // Default: User does not have Prime

    // Simulate some "legitimate" logic to determine Prime status
    if (username === 'prime_user') {
        hasPrime = true; // Only this user should get Prime
    }

    // Debugger statement: Pauses execution here when DevTools is open
    debugger; // Attacker can use this to inspect and modify 'hasPrime'

    // Prepare the payload for the backend
    const payload = {
        username: username,
        hasPrime: hasPrime
    };

    // Send request to the PHP backend
    fetch('/prime_feature.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response:', data.message);
        if (data.status === 'success') {
            console.log('Prime Feature:', data.feature);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Normal usage: Regular user
console.log("Trying as a regular user:");
checkPrimeStatus("john_doe");

// Simulate an attacker using the script
console.log("\nAttacker attempting to exploit:");
checkPrimeStatus("attacker");
