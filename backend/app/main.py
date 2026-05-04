from contextlib import asynccontextmanager
from time import sleep

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError

from app.db import Base, engine
from app import models
from app.routes.notepads import router as notepads_router



@asynccontextmanager
async def lifespan(_: FastAPI):
    for _ in range(30):
        try:
            Base.metadata.create_all(bind=engine)
            break
        except OperationalError:
            sleep(1)
    else:
        raise RuntimeError("Database is not ready")
    yield


app = FastAPI(title="Notepads API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(notepads_router)
