from pydantic import BaseModel, Field


class NotepadBase(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    content: str = Field(min_length=1)


class NotepadCreate(NotepadBase):
    pass


class NotepadRead(NotepadBase):
    id: int

    model_config = {"from_attributes": True}
