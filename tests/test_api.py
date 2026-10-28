from io import BytesIO
from fastapi.testclient import TestClient
from pypdf import PdfWriter
from app.main import app

client = TestClient(app)

def test_health_is_up():
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json()['official_verification'] == 'not_connected'

def test_rejects_unsupported_extension():
    response = client.post('/api/analyze', files={'file': ('notes.txt', b'hello', 'text/plain')})
    assert response.status_code == 415

def test_rejects_invalid_pdf_signature():
    response = client.post('/api/analyze', files={'file': ('diploma.pdf', b'not a pdf', 'application/pdf')})
    assert response.status_code == 400

def test_pdf_report_is_preliminary():
    out = BytesIO()
    writer = PdfWriter()
    writer.add_blank_page(width=300, height=300)
    writer.write(out)
    response = client.post('/api/analyze', files={'file': ('diploma.pdf', out.getvalue(), 'application/pdf')})
    assert response.status_code == 200
    body = response.json()
    assert body['analysis_mode'] == 'preliminary_technical_review'
    assert body['official_verification']['state'] == 'not_connected'
    assert any('подлинность' in item.lower() for item in body['limitations'])
