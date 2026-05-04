from sqlalchemy.orm import Session

from app import models, schemas


def create_notepad(db: Session, data: schemas.NotepadCreate) -> models.Notepad:
    notepad = models.Notepad(**data.model_dump())
    db.add(notepad)
    db.commit()
    db.refresh(notepad)
    return notepad


def list_notepads(db: Session) -> list[models.Notepad]:
    return db.query(models.Notepad).order_by(models.Notepad.id.asc()).all()


def get_notepad(db: Session, notepad_id: int) -> models.Notepad | None:
    return db.query(models.Notepad).filter(models.Notepad.id == notepad_id).first()
