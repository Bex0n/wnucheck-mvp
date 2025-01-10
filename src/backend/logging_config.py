import logging

from colorlog import ColoredFormatter


def setup_logging():
    """Configure logging for the entire application."""
    formatter = ColoredFormatter(
        "%(log_color)s%(asctime)s - %(name)s - %(levelname)s - %(reset)s%(message)s %(log_color)s(%(filename)s:%(lineno)d)",
        log_colors={
            "DEBUG": "cyan",
            "INFO": "green",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "bold_red",
        },
        secondary_log_colors={
            "message": {
                "INFO": "white",
                "DEBUG": "white",
                "WARNING": "white",
                "ERROR": "white",
                "CRITICAL": "white",
            },
        },
    )
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)

    # Get the root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.addHandler(handler)
    root_logger.addHandler(handler)
