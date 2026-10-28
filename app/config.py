from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
    epvo_enabled: bool = False
    epvo_base_url: str = ''
    epvo_api_key: str = ''
    epvo_timeout_seconds: float = 10.0
    max_upload_mb: int = 10

settings = Settings()
