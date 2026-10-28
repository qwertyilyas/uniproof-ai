from __future__ import annotations
from io import BytesIO
from pathlib import Path
from typing import Any
from pypdf import PdfReader
from PIL import Image

SUPPORTED_MIME = {'.pdf': {'application/pdf'}, '.png': {'image/png'}, '.jpg': {'image/jpeg'}, '.jpeg': {'image/jpeg'}}

def _field_summary(text: str) -> str:
    lower = text.lower()
    groups = {
        'упоминание диплома/квалификации': ('диплом', 'diploma', 'qualification'),
        'имя или ФИО': ('фамилия', 'имя', 'surname', 'name'),
        'учебное заведение': ('университет', 'институт', 'university', 'college'),
        'дата': ('дата', 'date', 'года', 'year'),
        'номер документа': ('номер', '№', 'number', 'serial'),
    }
    found = [label for label, words in groups.items() if any(w in lower for w in words)]
    missing = [label for label in groups if label not in found]
    if not found:
        return 'Текст извлечён, но тип документа и ожидаемые поля автоматически не определены.'
    result = 'Найдены текстовые признаки: ' + ', '.join(found) + '.'
    if missing:
        result += ' Не обнаружены поиском (это не означает, что их нет): ' + ', '.join(missing) + '.'
    return result

def inspect_document(filename: str, data: bytes) -> dict[str, Any]:
    """Basic technical checks only. This function never determines authenticity."""
    if Path(filename).suffix.lower() == '.pdf':
        try:
            reader = PdfReader(BytesIO(data), strict=False)
            if reader.is_encrypted:
                try:
                    if not reader.decrypt(''):
                        raise ValueError('encrypted PDF')
                except Exception as exc:
                    raise ValueError('encrypted PDF') from exc
            page_count = len(reader.pages)
            text = '\n'.join((page.extract_text() or '') for page in reader.pages[:30])
        except Exception:
            return {
                'status': 'could_not_read',
                'summary': 'Не удалось прочитать PDF. Файл может быть повреждён или защищён.',
                'checks': [
                    {'id': 'file_readability', 'label': 'Читаемость файла', 'status': 'attention', 'details': 'Система не смогла извлечь содержимое PDF.'},
                    {'id': 'official_verification', 'label': 'Официальное подтверждение', 'status': 'not_checked', 'details': 'Государственный источник не подключён.'},
                ],
                'metadata': {'filename': filename, 'pages': None, 'text_characters': 0},
                'limitations': ['Результат не подтверждает подлинность документа.'],
            }
        image_only = len(text.strip()) < 20
        checks = [
            {'id': 'file_readability', 'label': 'Читаемость файла', 'status': 'attention' if image_only else 'ok', 'details': 'Похоже, PDF состоит из сканов или текст не извлекается.' if image_only else 'Текстовый слой PDF доступен для предварительного анализа.'},
            {'id': 'document_structure', 'label': 'Структура документа', 'status': 'ok' if page_count > 0 else 'attention', 'details': f'Обнаружено страниц: {page_count}.'},
            {'id': 'expected_fields', 'label': 'Возможные ключевые поля', 'status': 'attention' if image_only else 'review', 'details': 'Для сканов нужен OCR.' if image_only else _field_summary(text)},
            {'id': 'official_verification', 'label': 'Официальное подтверждение', 'status': 'not_checked', 'details': 'Проверка через государственную систему пока не подключена.'},
        ]
        return {
            'status': 'attention' if any(c['status'] == 'attention' for c in checks) else 'preliminary',
            'summary': 'Предварительный технический анализ выполнен. Это не проверка подлинности.',
            'checks': checks,
            'metadata': {'filename': filename, 'pages': page_count, 'text_characters': len(text)},
            'limitations': ['Автоматический анализ не устанавливает подлинность документа.', 'Результат основан на технических признаках, а не на официальной записи.', 'OCR для сканированных PDF пока не подключён.'],
        }
    try:
        image = Image.open(BytesIO(data))
        image.verify()
        image = Image.open(BytesIO(data))
        width, height, fmt = image.width, image.height, image.format or 'unknown'
    except Exception:
        return {'status': 'could_not_read', 'summary': 'Не удалось прочитать изображение.', 'checks': [{'id': 'file_readability', 'label': 'Читаемость файла', 'status': 'attention', 'details': 'Файл не распознан как корректное изображение.'}, {'id': 'official_verification', 'label': 'Официальное подтверждение', 'status': 'not_checked', 'details': 'Государственный источник не подключён.'}], 'metadata': {'filename': filename}, 'limitations': ['Результат не подтверждает подлинность документа.']}
    return {'status': 'preliminary', 'summary': 'Изображение открывается. OCR и анализ содержимого пока не подключены.', 'checks': [{'id': 'file_readability', 'label': 'Читаемость файла', 'status': 'ok', 'details': f'Формат {fmt}, размер {width}×{height} пикселей.'}, {'id': 'document_structure', 'label': 'Структура документа', 'status': 'not_checked', 'details': 'Для анализа структуры изображения нужен OCR.'}, {'id': 'official_verification', 'label': 'Официальное подтверждение', 'status': 'not_checked', 'details': 'Государственный источник не подключён.'}], 'metadata': {'filename': filename, 'width': width, 'height': height, 'format': fmt}, 'limitations': ['Содержимое изображения не распознаётся на этом этапе.', 'Автоматический анализ не устанавливает подлинность документа.']}
