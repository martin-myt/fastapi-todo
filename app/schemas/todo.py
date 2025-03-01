from datetime import datetime
from pydantic import BaseModel, Field, field_validator


class TodoBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: str | None = None
    completed: bool = False


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: str | None = Field(None, min_length=1)
    description: str | None = None
    completed: bool | None = None


class Todo(TodoBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
