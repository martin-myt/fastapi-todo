from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def test_db():
    Base.metadata.create_all(bind=engine)
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(test_db):
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def sample_todo(client):
    response = client.post(
        "/api/v1/todos/",
        json={
            "title": "Test todo",
            "description": "Test description",
            "completed": False,
        },
    )
    return response.json()


def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_create_todo(client):
    """Test creating a todo item"""
    response = client.post(
        "/api/v1/todos/",
        json={
            "title": "Test todo",
            "description": "Test description",
            "completed": False,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test todo"
    assert data["description"] == "Test description"
    assert data["completed"] == False
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_create_todo_validation(client):
    """Test validation when creating a todo"""
    # Test missing title
    response = client.post(
        "/api/v1/todos/",
        json={"description": "Test description"},
    )
    assert response.status_code == 422

    # Test empty title
    response = client.post(
        "/api/v1/todos/",
        json={"title": "", "description": "Test description"},
    )
    assert response.status_code == 422


def test_read_todos(client, sample_todo):
    """Test reading todo list"""
    response = client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == sample_todo["title"]


def test_read_todos_pagination(client):
    """Test todo list pagination"""
    # Create multiple todos
    for i in range(5):
        client.post(
            "/api/v1/todos/",
            json={"title": f"Todo {i}", "description": f"Description {i}"},
        )

    # Test limit
    response = client.get("/api/v1/todos/?limit=2")
    assert response.status_code == 200
    assert len(response.json()) == 2

    # Test skip
    response = client.get("/api/v1/todos/?skip=2&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Todo 2"


def test_read_todo(client, sample_todo):
    """Test reading a specific todo"""
    response = client.get(f"/api/v1/todos/{sample_todo['id']}")
    assert response.status_code == 200
    assert response.json() == sample_todo


def test_read_todo_not_found(client):
    """Test reading a non-existent todo"""
    response = client.get("/api/v1/todos/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"


def test_update_todo(client, sample_todo):
    """Test updating a todo"""
    response = client.patch(
        f"/api/v1/todos/{sample_todo['id']}",
        json={"title": "Updated todo", "completed": True},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated todo"
    assert data["completed"] == True
    assert data["description"] == sample_todo["description"]
    assert data["updated_at"] != sample_todo["updated_at"]


def test_update_todo_not_found(client):
    """Test updating a non-existent todo"""
    response = client.patch(
        "/api/v1/todos/999",
        json={"title": "Updated todo"},
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"


def test_update_todo_validation(client, sample_todo):
    """Test validation when updating a todo"""
    # Test empty title
    response = client.patch(
        f"/api/v1/todos/{sample_todo['id']}",
        json={"title": ""},
    )
    assert response.status_code == 422


def test_delete_todo(client, sample_todo):
    """Test deleting a todo"""
    # Delete the todo
    response = client.delete(f"/api/v1/todos/{sample_todo['id']}")
    assert response.status_code == 204

    # Verify it's deleted
    response = client.get(f"/api/v1/todos/{sample_todo['id']}")
    assert response.status_code == 404


def test_delete_todo_not_found(client):
    """Test deleting a non-existent todo"""
    response = client.delete("/api/v1/todos/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"
