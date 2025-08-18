import { render, fireEvent } from "@testing-library/react-native";
import SavedMovieCard from "../SavedMovieCard";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";

const mockSavedMovie: SavedMovie = {
  clicks_counter: 36,
  poster_url: "https://image.tmdb.org/t/p/w500/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg",
  title: "Lilo & Stitch",
  movie_id: 552524,
  release_date: "2025-05-17",
  vote_average: 7.351,
};

describe("<SavedMovieCard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders SavedMovieCard Correctly!", () => {
    const { getByTestId } = render(<SavedMovieCard {...mockSavedMovie} />);

    fireEvent.press(getByTestId("SavedMovieCard:Link"));
    expect(Link).toHaveBeenCalled();

    expect(getByTestId("SavedMovieCard:Navigation:Button")).toBeOnTheScreen();
    const poster = getByTestId("SavedMovieCard:PosterImage").props.source;
    expect(poster.uri).toBe(mockSavedMovie.poster_url);
    expect(getByTestId("SavedMovieCard:Title")).toHaveTextContent(
      mockSavedMovie.title
    );
    expect(getByTestId("SavedMovieCard:VoteBox")).toBeOnTheScreen();
    const voteStar = getByTestId("SavedMovieCard:VoteStarImage").props.source;
    expect(voteStar).toBe(icons.star);
    expect(getByTestId("SavedMovieCard:VoteAverage").props.children).toEqual(
      Math.round(mockSavedMovie.vote_average / 2)
    );
    expect(getByTestId("SavedMovieCard:ReleaseBox").props.children.length).toBe(
      2
    );
    expect(getByTestId("SavedMovieCard:ReleaseDate")).toHaveTextContent(
      mockSavedMovie.release_date.split("-")[0]
    );
    expect(getByTestId("SavedMovieCard:VideoType")).toHaveTextContent("Movie");
  });
});
