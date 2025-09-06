# 🏠 Household Service App  

A simple full-stack project that connects **customers** with **service professionals** (plumbers, electricians, cleaners, etc.) and manages service requests.  
This project also includes a **Celery task scheduler** for background jobs and task automation.  

---

## 🚀 Features  
- 👤 User (Customer) registration and login  
- 🛠️ Service professional registration and management  
- 📑 Customers can raise service requests  
- 📊 Service request tracking  
- ⏰ Background job scheduling using **Celery** (e.g., reminders, periodic checks)  
- ⚡ Flask backend with clean, modular structure  

---

## 🛠 Tech Stack  
- **Backend:** Flask (Python)  
- **Database:** SQLite / PostgreSQL (depending on your setup)  
- **Task Queue:** Celery with Redis / RabbitMQ  
- **Frontend:** HTML / CSS / JS (basic templates, extendable)  

---

## 📦 Installation & Setup  


### 1️⃣ Clone the repository
- **git clone https://github.com/your-username/household-service-app.git
- **cd household-service-app

### 2️⃣ Create a virtual environment (recommended)
- **python -m venv venv
- **source venv/bin/activate   # On macOS/Linux
- **venv\Scripts\activate      # On Windows

### 3️⃣ Install dependencies
- **pip install -r requirements.txt

### 4️⃣ Run the application
- **python app.py

# The app will now be running at:
# 👉 http://127.0.0.1:5000/

⏰ Running Celery (Task Scheduler)

###Make sure Redis or RabbitMQ is installed and running.

### Start Celery worker
- **celery -A app.celery worker --loglevel=info

### Start Celery beat scheduler
- **celery -A app.celery beat --loglevel=info

##👨‍💻 Author

- **Developed by Aryan Pratihasta

- **Open for suggestions & improvements!
