from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str
    date: str
    rating: float
    review: str

class MovieRequest(BaseModel):
    title: str
    date: str
    rating: float
    review: str