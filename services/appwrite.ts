import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID_METRICS =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_METRICS!;
const COLLECTION_ID_SAVED =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_SAVED!;
const COLLECTION_ID_USERS =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_USER!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
const account = new Account(client);
// export const updateSearchCount = async (query: string, movie: Movie) => {
//   console.log("awa");
//   const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//     Query.equal("searchTerm", query),
//   ]);
//   console.log(result);
// };

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_METRICS,
      [Query.equal("searchTerm", query)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_METRICS,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID_METRICS,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
        }
      );
    }

    return result;
  } catch (err) {
    console.error("Appwrite error:", err);
    throw err;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_METRICS,
      [Query.limit(5), Query.orderDesc("count")]
    );
    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);

    // Create user profile in database after successful registration
    if (user) {
      await createUserProfile(user.$id, name, email);
    }

    return user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const user = await account.get();
    return user as AuthUser;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

// User profile functions
export const createUserProfile = async (
  userId: string,
  name: string,
  email: string
): Promise<User> => {
  try {
    const userProfile = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID_USERS,
      ID.unique(),
      {
        userId: userId,
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      }
    );
    return userProfile as unknown as User;
  } catch (error) {
    console.error("Create user profile error:", error);
    throw error;
  }
};

export const getUserDetails = async (): Promise<User | null> => {
  try {
    // First get the current authenticated user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    // Then get their profile from the users collection
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_USERS,
      [Query.equal("userId", currentUser.$id)]
    );

    if (result.documents.length > 0) {
      return result.documents[0] as unknown as User;
    } else {
      // If no profile exists, create one
      return await createUserProfile(
        currentUser.$id,
        currentUser.name,
        currentUser.email
      );
    }
  } catch (error) {
    console.error("Get user details error:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  try {
    // Find the user document
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_USERS,
      [Query.equal("userId", userId)]
    );

    if (result.documents.length === 0) {
      throw new Error("User profile not found");
    }

    const userDoc = result.documents[0];
    const updatedUser = await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID_USERS,
      userDoc.$id,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      }
    );

    return updatedUser as unknown as User;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

export const saveMovies = async (query: string, movie: Movie) => {
  await database.createDocument(DATABASE_ID, COLLECTION_ID_SAVED, ID.unique(), {
    movie_id: movie.id,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    title: movie.title,
  });
};

export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_SAVED,
      [Query.limit(5)]
    );
    return result.documents as unknown as SavedMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
