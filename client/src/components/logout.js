const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Clear the jobs state
    setJobs([]);
    
    // Redirect to login page
    navigate('/login');
};