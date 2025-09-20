const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const sessions = {};  // Store active sessions

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mainak2005',
    database: 'fraud_sentry'
});

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

// Function to serve static files
const serveStatic = (filePath, res) => {
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('Not Found');
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
    });
};

// Get session ID from cookies
function getSessionId(req) {
    const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {}) || {};
    return cookies.session;
}

// HTTP server to handle requests
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/api/user') {
            const sessionId = getSessionId(req);
            const user = sessions[sessionId];
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(401);
                res.end('Unauthorized');
            }
        } else {
            let file = req.url === '/' ? '/index.html' : req.url;
            const filePath = path.join(__dirname, 'public', file);
            serveStatic(filePath, res);
        }
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                let data = {};
                if (body) {
                    data = JSON.parse(body);
                }

                if (req.url === '/api/signup') {
                    const { full_name, email, password, phone_number } = data;
                    db.query(
                        'INSERT INTO users (full_name, email, password, phone_number) VALUES (?, ?, ?, ?)',
                        [full_name, email, password, phone_number],
                        (err) => {
                            if (err) {
                                res.writeHead(500);
                                return res.end('Signup failed');
                            }
                            res.writeHead(201);
                            res.end('Signup success');
                        }
                    );
                } else if (req.url === '/api/signin') {
                    const { email, password } = data;
                    db.query(
                        'SELECT * FROM users WHERE email = ? AND password = ?',
                        [email, password],
                        (err, results) => {
                            if (err) {
                                res.writeHead(500);
                                return res.end('Database error');
                            }
                            if (results.length > 0) {
                                const user = results[0];
                                const sessionId = Math.random().toString(36).substring(2);
                                sessions[sessionId] = {
                                    full_name: user.full_name,
                                    email: user.email
                                };
                                res.writeHead(200, {
                                    'Set-Cookie': `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
                                    'Content-Type': 'text/plain'
                                });
                                res.end('Login success');
                            } else {
                                res.writeHead(401);
                                res.end('Invalid credentials');
                            }
                        }
                    );
                } else if (req.url === '/api/logout') {
                    const sessionId = getSessionId(req);
                    if (sessionId && sessions[sessionId]) {
                        delete sessions[sessionId];
                    }
                    res.writeHead(302, {
                        'Set-Cookie': 'session=; HttpOnly; Max-Age=0; Path=/',
                        'Location': '/signin.html'
                    });
                    res.end();
                } else {
                    res.writeHead(404);
                    res.end('Not Found');
                }
            } catch (e) {
                console.error('Error parsing body:', e);
                res.writeHead(400);
                res.end('Invalid JSON data');
            }
        });
    }
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
