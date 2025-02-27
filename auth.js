document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    const users = {
        admin: { password: "admin123", role: "admin" },
        seller: { password: "seller123", role: "seller" }
    };

    function saveUserSession(username, role) {
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role }));
    }

    function getUserSession() {
        return JSON.parse(localStorage.getItem("loggedInUser"));
    }

    function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (users[username] && users[username].password === password) {
                saveUserSession(username, users[username].role);
                window.location.href = "dashboard.html"; 
            } else {
                alert("Invalid username or password");
            }
        });
    }

    window.checkAccess = function (allowedRoles) {
        const session = getUserSession();
        if (!session || !allowedRoles.includes(session.role)) {
            alert("Access Denied!");
            logout();
        }
    };

    window.logout = logout;
});
