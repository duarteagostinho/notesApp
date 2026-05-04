from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import create_notepad, get_notepad, list_notepads
from app.db import get_db
from app.schemas import NotepadCreate, NotepadRead

router = APIRouter(prefix="/notepads", tags=["notepads"])


@router.post("", response_model=NotepadRead, status_code=status.HTTP_201_CREATED)
def create_notepad_endpoint(payload: NotepadCreate, db: Session = Depends(get_db)) -> NotepadRead:
    return create_notepad(db, payload)


@router.get("", response_model=list[NotepadRead])
def list_notepads_endpoint(db: Session = Depends(get_db)) -> list[NotepadRead]:
    return list_notepads(db)


@router.get("/{notepad_id}", response_model=NotepadRead)
def get_notepad_endpoint(notepad_id: int, db: Session = Depends(get_db)) -> NotepadRead:
    item = get_notepad(db, notepad_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notepad not found")
    return item
