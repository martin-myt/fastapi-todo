from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import Base, engine
from app.core.logging import setup_logging

# Set up logging
setup_logging()

# Create database tables
Base.metadata.create_all(bind=engine)
logger.info("Database tables created successfully")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI Todo List Application",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logger.info("CORS middleware configured with allowed origins: {}", settings.ALLOWED_ORIGINS)

# Include API router
app.include_router(api_router, prefix="/api/v1")
logger.info("API router mounted at /api/v1")


@app.get("/health")
async def health_check():
    logger.debug("Health check endpoint called")
    return {"status": "healthy"}


# Create database tables on startup
@app.on_event("startup")
async def startup():
    logger.info("Starting up FastAPI application")
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created on startup")


@app.on_event("shutdown")
async def shutdown():
    logger.info("Shutting down FastAPI application")
