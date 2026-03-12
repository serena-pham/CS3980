from typing import Annotated
from fastapi import APIRouter, HTTPException, Path, status
from movie import Movie, MovieRequest


movie_router = APIRouter()

movie_list = []
global_id = 0


@movie_router.get("")
async def get_all_movies() -> list[Movie]:
    return movie_list


@movie_router.post("", status_code=201)
async def create_new_movie(movie: MovieRequest) -> Movie:
    global global_id
    global_id += 1
    new_movie = Movie(id=global_id, title=movie.title, date=movie.date, rating=movie.rating, review=movie.review)
    movie_list.append(new_movie)
    return new_movie


@movie_router.put("/{id}")
async def edit_movie_by_id(
    id: Annotated[int, Path(gt=0, le=1000)], movie: MovieRequest
) -> Movie:
    for x in movie_list:
        if x.id == id:
            x.title = movie.title
            x.date = movie.date
            x.rating = movie.rating
            x.review = movie.review
            return x

    raise HTTPException(status_code=404, detail=f"Item with ID={id} is not found.")


@movie_router.get("/{id}")
async def get_movie_by_id(id: Annotated[int, Path(gt=0, le=1000)]) -> Movie:
    for movie in movie_list:
        if movie.id == id:
            return movie

    raise HTTPException(status_code=404, detail=f"Item with ID={id} is not found.")


@movie_router.delete("/{id}")
async def delete_movie_by_id(
    id: Annotated[
        int,
        Path(
            gt=0,
            le=1000,
            title="This is the ID for the desired movie to be deleted",
        ),
    ],
) -> dict:
    for i in range(len(movie_list)):
        movie = movie_list[i]
        if movie.id == id:
            movie_list.pop(i)
            return {"msg": f"The movie with ID={id} is deleted."}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Item with ID={id} is not found."
    )
