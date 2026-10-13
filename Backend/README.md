# Backend

FastAPI backend for task management, including user authentication, tasks, and task comments.

## Setup

Create and activate a virtual environment, then install the dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirement.txt
```

Create a `.env` file in `Backend/` with the following values:

```dotenv
database_hostname=localhost
database_name=your_database
database_username=your_database_user
database_password=your_database_password
database_port=5432
secret_key=replace-with-a-long-random-secret
algorithm=HS256
access_token_expire_minutes=30
```

Start the API from the repository root:

```bash
uvicorn Backend.raw.main:app --reload
```

Open `/docs` to use the generated API documentation.

## Checks

Run the smoke test from the repository root:

```bash
python -m unittest discover -s Backend/tests
```

The test verifies imports, SQLAlchemy relationship configuration, and route registration. It does not connect to PostgreSQL.
