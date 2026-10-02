import os

import pytest
import requests


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")


@pytest.fixture
def api_client():
    with requests.Session() as session:
        session.headers.update({"Content-Type": "application/json"})
        yield session


def test_api_health(api_client):
    response = api_client.get(f"{BASE_URL}/api/")
    assert response.status_code == 200
    assert response.json() == {"message": "Vikas Subramani portfolio API"}


def test_create_inquiry_returns_success(api_client):
    payload = {
        "name": "TEST Portfolio Visitor",
        "email": "test-portfolio@example.com",
        "project_type": "Interactive web app",
        "message": "TEST inquiry from portfolio regression test",
    }
    response = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert response.status_code == 200
    assert response.json() == {"success": True, "message": "Inquiry received"}


@pytest.mark.parametrize("payload", [{}, {"name": "Only name"}, {"email": "bad"}])
def test_inquiry_rejects_incomplete_payload(api_client, payload):
    response = api_client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert response.status_code == 422
    assert "detail" in response.json()