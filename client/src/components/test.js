const accessToken = localStorage.getItem('access_token');

fetch('http://127.0.0.1:8080/api/protected-resource', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Protected resource data:', data);
})
.catch(error => {
    console.error('Error fetching protected resource:', error);
});