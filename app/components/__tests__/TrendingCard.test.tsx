import { render, fireEvent } from "@testing-library/react-native";
import TrendingCard from "../TrendingCard";
import { Link } from "expo-router";
import { images } from "@/constants/images";

const mockTrendingMovie: TrendingMovie = {
  searchTerm: "The hills have eyes",
  count: 5,
  poster_url: "https://image.tmdb.org/t/p/w500/2eJL1Ccr1FN3dm9OSDwyd8uaX1b.jpg",
  movie_id: 9792,
  title: "The Hills Have Eyes",
};

describe("<TrendingMovieCard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders TrendingMovieCard Correctly!", () => {
    const { getByTestId } = render(
      <TrendingCard movie={{ ...mockTrendingMovie }} index={0} />
    );

    fireEvent.press(getByTestId("TrendingMovieCard:Link"));
    expect(Link).toHaveBeenCalled();

    expect(
      getByTestId("TrendingMovieCard:Navigation:Button")
    ).toBeOnTheScreen();
    const poster = getByTestId("TrendingMovieCard:PosterImage").props.source;
    expect(poster.uri).toBe(mockTrendingMovie.poster_url);
    expect(getByTestId("TrendingMovieCard:MaskedViewBox")).toBeTruthy();
    expect(getByTestId("TrendingMovieCard:MaskedViewComponent")).toBeTruthy();
    expect(getByTestId("TrendingMovieCard:MaskedViewText").props.children).toBe(
      1
    );
    const rankImage = getByTestId("TrendingMovieCard:RankingImage").props
      .source;
    expect(rankImage).toBe(images.rankingGradient);
    expect(getByTestId("TrendingMovieCard:Title")).toHaveTextContent(
      mockTrendingMovie.title
    );
  });
});
