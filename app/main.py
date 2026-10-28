from pathlib import Path
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.providers.epvo import EpvoProvider
from app.services.document_analyzer import inspect_document, SUPPORTED_MIME

ROOT = Path(__file__).resolve().parent.parent
WEB_DIR = ROOT / 'web'
MAX_BYTES = settings.max_upload_mb * 1024 * 1024
app = FastAPI(title='UNIPROOF AI API', version='0.1.0', description='Preliminary document review only; not an authenticity verdict.')

@app.get('/api/health')
async def health():
    return {'status': 'ok', 'service': 'UNIPROOF AI', 'version': app.version, 'official_verification': 'not_connected', 'storage': 'uploads processed in memory by this endpoint'}

@app.get('/api/official-verification/status')
async def official_verification_status():
    provider = EpvoProvider()
    return {'provider': 'EPVO / Smart Bridge', 'state': 'not_configured' if not provider.is_configured() else 'awaiting_contract', 'official_checks_enabled': False, 'message': 'Официальная проверка недоступна до подтверждения доступа и получения документации API.'}

@app.post('/api/analyze')
async def analyze_document(file: UploadFile = File(...)):
    filename = Path(file.filename or 'document').name
    suffix = Path(filename).suffix.lower()
    if suffix not in SUPPORTED_MIME:
        raise HTTPException(status_code=415, detail='Поддерживаются только PDF, PNG и JPG.')
    content_type = (file.content_type or '').lower()
    if content_type and content_type not in SUPPORTED_MIME[suffix]:
        raise HTTPException(status_code=415, detail='Тип файла не соответствует расширению.')
    data = await file.read(MAX_BYTES + 1)
    if not data:
        raise HTTPException(status_code=400, detail='Файл пуст.')
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail=f'Максимальный размер файла: {settings.max_upload_mb} МБ.')
    if suffix == '.pdf' and not data.startswith(b'%PDF-'):
        raise HTTPException(status_code=400, detail='Файл не похож на PDF.')
    if suffix in ('.jpg', '.jpeg') and not data.startswith(b'\xff\xd8\xff'):
        raise HTTPException(status_code=400, detail='Файл не похож на JPEG.')
    if suffix == '.png' and not data.startswith(b'\x89PNG\r\n\x1a\n'):
        raise HTTPException(status_code=400, detail='Файл не похож на PNG.')
    result = inspect_document(filename, data)
    result['analysis_mode'] = 'preliminary_technical_review'
    result['official_verification'] = {'state': 'not_connected', 'message': 'Этот отчёт не содержит результата государственной проверки.'}
    return result

@app.get('/', include_in_schema=False)
async def index():
    return FileResponse(WEB_DIR / 'index.html')

app.mount('/assets', StaticFiles(directory=WEB_DIR, check_dir=False), name='assets')
