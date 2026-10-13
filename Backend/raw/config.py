from pydantic_settings import BaseSettings
from pathlib import Path


ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    database_hostname:str
    database_name: str
    database_username: str
    database_password:str
    database_port: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes:int
    model_config = {'env_file': ENV_FILE}






settings = Settings()
