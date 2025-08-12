import { render, fireEvent } from "@testing-library/react-native";
import MovieCard from "@/app/components/MovieCard";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";

const mockMovie: Movie = {
  adult: false,
  backdrop_path: "/A3cY1DrX44Iixrl75uyDLd8ecXm.jpg",
  genre_ids: [37],
  id: 426777,
  original_language: "en",
  original_title: "Action",
  overview:
    "Three Outlaws came across a stranded baby and must decide to save the child or escape from the law.",
  popularity: 0.1329,
  release_date: "1921-09-12",
  title: "Action",
  video: false,
  vote_average: 4,
  vote_count: 2,
  poster_path:
    "https://image.tmdb.org/t/p/w500/1f6vxdfhmj5rzsU9ySYOW7i4vfS.jpg",
};

describe("<MovieCard />", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders MovieCard Correctly!", () => {
    const { getByTestId } = render(<MovieCard {...mockMovie} />);
   
    fireEvent.press(getByTestId('MovieCard:Link'));
    expect(Link).toHaveBeenCalled();
    
    expect(getByTestId("MovieCard:Navigation:Button")).toBeOnTheScreen();
    const poster = getByTestId("MovieCard:PosterImage").props.source;
    expect(poster.uri).toBe(`https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`);
    expect(getByTestId("MovieCard:Title")).toHaveTextContent("Action");
    expect(getByTestId("MovieCard:VoteBox")).toBeOnTheScreen();
    const voteStar = getByTestId("MovieCard:VoteStarImage").props.source;
    expect(voteStar).toBe(icons.star);
    expect(getByTestId("MovieCard:VoteAverage").props.children).toEqual(
      Math.round(mockMovie.vote_average / 2)
    );
    expect(getByTestId("MovieCard:ReleaseBox").props.children.length).toBe(
      2
    );
    expect(getByTestId("MovieCard:ReleaseDate")).toHaveTextContent(mockMovie.release_date.split('-')[0]);
    expect(getByTestId("MovieCard:VideoType")).toHaveTextContent("Movie");
  });
});
