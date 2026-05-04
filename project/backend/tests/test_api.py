import os
import tempfile
import sys
from pathlib import Path

from fastapi.testclient import TestClient


temp_db = tempfile.NamedTemporaryFile(suffix='.db', delete=False)
os.environ['DATABASE_URL'] = f"sqlite:///{temp_db.name}"

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.main import app


def test_health_check() -> None:
    with TestClient(app) as client:
        response = client.get('/health')
        assert response.status_code == 200
        assert response.json() == {'status': 'ok'}


def test_create_and_read_notepad() -> None:
    payload = {'title': 'Study plan', 'content': 'Finish the DevOps project'}

    with TestClient(app) as client:
        created = client.post('/notepads', json=payload)
        assert created.status_code == 201
        created_body = created.json()
        assert created_body['title'] == payload['title']
        assert created_body['content'] == payload['content']
        assert 'id' in created_body

        notepad_id = created_body['id']
        fetched = client.get(f'/notepads/{notepad_id}')
        assert fetched.status_code == 200
        assert fetched.json() == created_body
