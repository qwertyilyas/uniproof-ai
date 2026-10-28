from dataclasses import dataclass
from typing import Any
from app.config import settings

@dataclass
class ProviderResult:
    state: str
    message: str
    data: dict[str, Any] | None = None

class EpvoProvider:
    def is_configured(self) -> bool:
        return bool(settings.epvo_enabled and settings.epvo_base_url and settings.epvo_api_key)

    async def verify(self, identifiers: dict[str, str]) -> ProviderResult:
        if not self.is_configured():
            return ProviderResult('not_configured', 'Официальная интеграция EPVO не настроена: нет подтверждённого доступа и технического контракта.')
        # Do not guess endpoint, HTTP method, payload or response fields.
        # Implement only after the service owner provides the approved API specification.
        return ProviderResult('awaiting_contract', 'Доступ настроен, но контракт API ещё не подтверждён. Запрос не отправлялся.')
