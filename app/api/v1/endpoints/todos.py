from typing import List, Optional, Union

from fastapi import APIRouter, Depends, HTTPException, Query
from loguru import logger
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.todo import todo as crud_todo
from app.schemas.todo import Todo, TodoCreate, TodoUpdate, TodosResponse

router = APIRouter()


@router.get("", response_model=Union[List[Todo], TodosResponse])
async def get_todos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    paginate: bool = Query(False),
    db: Session = Depends(get_db),
):
    """Get all todos with optional pagination."""
    logger.info("Fetching todos with skip={}, limit={}, paginate={}", skip, limit, paginate)
    try:
        if paginate:
            todos = crud_todo.get_todos_paginated(db, skip=skip, limit=limit)
            logger.debug("Retrieved {} todos with pagination", len(todos.items))
        else:
            todos = crud_todo.get_todos(db, skip=skip, limit=limit)
            logger.debug("Retrieved {} todos without pagination", len(todos))
        return todos
    except Exception as e:
        logger.error("Error fetching todos: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("", response_model=Todo, status_code=201)
async def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    """Create a new todo."""
    logger.info("Creating new todo: {}", todo.dict())
    try:
        db_todo = crud_todo.create_todo(db=db, todo=todo)
        logger.debug("Created todo with id={}", db_todo.id)
        return db_todo
    except Exception as e:
        logger.error("Error creating todo: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """Get a specific todo by ID."""
    logger.info("Fetching todo with id={}", todo_id)
    try:
        db_todo = crud_todo.get_todo(db, todo_id=todo_id)
        if db_todo is None:
            logger.warning("Todo with id={} not found", todo_id)
            raise HTTPException(status_code=404, detail="Todo not found")
        logger.debug("Retrieved todo: {}", db_todo)
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error fetching todo {}: {}", todo_id, str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    """Update a todo."""
    logger.info("Updating todo with id={}: {}", todo_id, todo.dict(exclude_unset=True))
    try:
        db_todo = crud_todo.update_todo(db=db, todo_id=todo_id, todo=todo)
        if db_todo is None:
            logger.warning("Todo with id={} not found for update", todo_id)
            raise HTTPException(status_code=404, detail="Todo not found")
        logger.debug("Updated todo: {}", db_todo)
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error updating todo {}: {}", todo_id, str(e))
        raise HTTPException(status_code=500, detail="Internal server error")


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """Delete a todo."""
    logger.info("Deleting todo with id={}", todo_id)
    try:
        success = crud_todo.delete_todo(db=db, todo_id=todo_id)
        if not success:
            logger.warning("Todo with id={} not found for deletion", todo_id)
            raise HTTPException(status_code=404, detail="Todo not found")
        logger.debug("Successfully deleted todo with id={}", todo_id)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error deleting todo {}: {}", todo_id, str(e))
        raise HTTPException(status_code=500, detail="Internal server error") 