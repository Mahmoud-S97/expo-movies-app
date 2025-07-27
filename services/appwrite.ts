import { Client, Databases, ID, Query } from "react-native-appwrite";

// Track the searches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_METRICS_ID =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_METRICS_ID!;
const COLLECTION_SAVED_MOVIES_ID =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_SAVED_MOVIES_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_METRICS_ID,
      [Query.equal("searchTerm", query)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_METRICS_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_METRICS_ID,
        ID.unique(),
        {
          movie_id: movie.id,
          title: movie.title,
          searchTerm: query,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.log("Appwrite Docs Error: ", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const results = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_METRICS_ID,
      [Query.limit(10), Query.orderDesc("count")]
    );
    console.log("Tresnding Movies:: ", results.documents);
    const filteredRes = Array.from(
      new Map(
        results.documents.map((movie) => [movie.movie_id, movie])
      ).values()
    );
    return filteredRes as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveMovie = async (movie: MovieDetails) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_MOVIES_ID,
      [Query.equal("movie_id", movie.id)]
    );

    console.log("Saved-Movie-Res:: ", result);

    if (result?.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_SAVED_MOVIES_ID,
        existingMovie.$id,
        {
          clicks_counter: existingMovie.clicks_counter + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_SAVED_MOVIES_ID,
        ID.unique(),
        {
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          clicks_counter: 1,
        }
      );
    }
  } catch (error) {
    console.log("Error in saving the movie", error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_MOVIES_ID,
      [
        Query.greaterThanEqual("clicks_counter", 3),
        Query.orderDesc("clicks_counter"),
      ]
    );
    console.log("Limited-Saved-Movies:: ", result.documents);
    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.log("Error in fetching saved movies: ", error);
    throw error;
  }
};

const getAllSavedMovies = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_MOVIES_ID,
      []
    );
    return result.documents;
  } catch (error) {
    console.log("Error in deleting saved movies", error);
    throw error;
  }
};

export const deleteAllSavedMovies = async () => {
  const fetchAllDocs = await getAllSavedMovies();

  if (fetchAllDocs && fetchAllDocs.length > 0) {
    for (const doc of fetchAllDocs) {
      try {
        await database.deleteDocument(
          DATABASE_ID,
          COLLECTION_SAVED_MOVIES_ID,
          doc.$id
        );
        console.log(`Deleted document id: ${doc.movie_id}`);
      } catch (error) {
        console.log(`Error while deleting document: ${doc.movie_id} : `, error);
        throw error;
      }
    }
  }
};
