# 🛡️ Fraud Sentry: Digital Fraud Awareness Platform

**Fraud Sentry** is a dedicated platform created to combat the alarming increase in digital fraud incidents globally.pptx]. Our mission is to provide clear, easy-to-understand information, actionable tips, and real-time tools to help individuals and businesses navigate the digital world safely.pptx].

The project has evolved into two key components: a primary web application and a proactive browser extension.

### 🎯 Target Audience

The primary target audience is individuals aged **40 to 70**, as well as the general public, students, professionals, and small businesses who are vulnerable to online scams.pptx].

-----

## ✨ Key Features

### 1\. Web Application (`/public` and `server.js`)

The web application serves as the central hub for learning and data analysis.

  * **Interactive Dashboard:** Provides data analysis and insights into fraud patterns (e.g., Performance Metrics Chart).
  * **Crime Ratio Statistics:** Displays regional statistics on different crime categories like Cyber Fraud, UPI Fraud, and Identity Theft using Chart.js.
  * **Current Affairs:** Features recent news and updates related to fraud and crime prevention.
  * **Learning Corner:** Houses educational resources, guides, and videos (currently mock videos) on topics like Phishing Scams and Secure Online Shopping.
  * **User Management:** Includes user sign-up and sign-in functionality utilizing a Node.js backend with MySQL integration.

### 2\. Proposed Browser Extension (Next Evolution)

The planned browser extension enhances the platform by adding a proactive defense layer directly into the user's browsing experience.

  * **Real-time Website Analysis:** Analyzes current web pages for signs of fraud or phishing.
  * **Blacklist/Heuristic Checking:** Performs checks against known malicious domains and uses heuristics (like URL length and character usage) to identify suspicious sites.
  * **Phishing Alert Banner:** Displays clear, non-blocking visual warnings on pages flagged as high-risk, advising the user not to input credentials.
  * **Community Reporting:** Allows users to easily report a suspected fraudulent website to continuously update the platform's defense database.

-----

## 💻 Technology Stack

The project is built using a minimal Node.js server with standard front-end technologies.

| Area | Technology | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Backend** | Node.js (Native `http` module) | Core | Used for serving static files and handling API requests. |
| **Database** | `mysql2` | Dependency | Used for user sign-in and sign-up logic. |
| **Authentication**| `cookie`, `bcryptjs` | Dependencies | `cookie` is used for session management. **`bcryptjs` is included but currently not implemented for password hashing** (a critical security improvement). |
| **Frontend** | HTML5, CSS3 (`style.css`), JavaScript | Core | Styling uses a distinct dark/teal palette. |
| **Data Viz** | `Chart.js` | Dependency | Used for the analysis and crime ratio charts. |

-----

## 🚀 Getting Started (Web Application)

### Prerequisites

1.  Node.js (LTS version recommended)
2.  MySQL Server running
3.  A MySQL database named `fraud_sentry` configured with a user `root` and password `mainak2005` (as specified in `server.js`).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository-url] fraud-sentry
    cd fraud-sentry
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Database Setup:**
    You will need to create the `fraud_sentry` database and a `users` table to support the application's login flow.

    ```sql
    CREATE DATABASE fraud_sentry;
    USE fraud_sentry;
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20)
    );
    ```

4.  **Start the server:**

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:3000`.

-----

## ⚠️ Security Warning & Future Development

**Critical Security Requirement:** The current implementation of `/api/signin` and `/api/signup` in `server.js` **does not use password hashing**, storing passwords in plain text.

**IMMEDIATE FIX REQUIRED:** Implement the `bcryptjs` package (already listed as a dependency) to securely hash and compare passwords before any production deployment.

### Development Roadmap

  * Implement password hashing using `bcryptjs`.
  * Migrate the Node.js server to the Express.js framework for improved routing and middleware support.
  * Develop the **Fraud Sentry Browser Extension** using the detection logic outlined above.
  * Refactor data loading to fetch dynamic content (Current Affairs/Crime Rates) from the server instead of hardcoding it in HTML.
