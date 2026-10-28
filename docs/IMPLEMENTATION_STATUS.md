# Статус реализации UNIPROOF AI MVP 0.1

## Реализовано
- FastAPI backend.
- Health endpoint and official-verification status endpoint.
- Preliminary PDF text-layer/page-count checks and image decoding/metadata checks.
- File type/size limits and basic file-signature checks.
- Upload bytes are processed in memory by the API endpoint and are not persisted there.
- Explicitly labelled EPVO / Smart Bridge adapter boundary.
- Basic automated tests.

## Не реализовано / требуется позже
- OCR для сканов и изображений.
- Полноценное извлечение ФИО, серии, номера, даты, учебного заведения с контролем ошибок.
- Подключение EPVO: нет подтверждённого API-контракта и учётных данных.
- Аутентификация пользователей, управление согласием, аудит доступа и процесс удаления.
- Production deployment, HTTPS, мониторинг, rate limiting и security review.

## Ограничение
Не использовать MVP для автоматического отказа кандидату, зачисления или иных решений с серьёзными последствиями. Отчёт показывает технические сигналы, а не устанавливает подлинность.
