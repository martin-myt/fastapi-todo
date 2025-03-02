import logging
import sys
from typing import Any, Dict

from loguru import logger


class InterceptHandler(logging.Handler):
    def emit(self, record: logging.LogRecord) -> None:
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        frame, depth = sys.exc_info()[2], 2
        while frame and frame.tb_frame.f_code.co_filename == __file__:
            frame = frame.tb_next
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def setup_logging(config: Dict[str, Any] = None) -> None:
    """Configure logging for the application."""
    
    # Remove default loguru handler
    logger.remove()
    
    # Add custom handler with formatting
    logger.add(
        sys.stdout,
        enqueue=True,
        backtrace=True,
        level="INFO",
        format=(
            "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
            "<level>{level: <8}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
            "<level>{message}</level>"
        ),
    )
    
    # Add file handler for errors
    logger.add(
        "logs/error.log",
        rotation="500 MB",
        retention="10 days",
        enqueue=True,
        backtrace=True,
        level="ERROR",
    )

    # Intercept standard library logging
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)

    # Disable uvicorn access logging
    logging.getLogger("uvicorn.access").handlers = [InterceptHandler()] 