from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from movie_routes import movie_router
import os

app = FastAPI(title="Movie Tracker", version="1.0.0")

# used absolute path to avoid issues with OneDrive
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app.include_router(movie_router, tags=["Movies"], prefix="/movies")
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend")), name="static")

@app.get("/")
async def home():
    return FileResponse(os.path.join(BASE_DIR, "frontend", "index.html"))
