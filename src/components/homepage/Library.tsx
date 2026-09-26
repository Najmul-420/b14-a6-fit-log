import { TLibrary } from "@/types/library.type";
import LibraryCard from "../shared/LibraryCard";

const getLibrary = async (): Promise<TLibrary[]> => {
  try {
    const response = await fetch("https://api.api-store.workers.dev/api/fitlog", {
      cache: "no-store", 
    });

    if (!response.ok) {
      console.error(`API Response Status: ${response.status}`);
      return []; 
    }

    const data: TLibrary[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching library data:", error);
    return []; 
  }
};

const Library = async () => {
  const libraryData = await getLibrary();

  if (!libraryData || libraryData.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16 text-center text-red-400">
        <p>Library data is currently unavailable. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          THE LIBRARY
        </h2>

        <p className="mt-3 max-w-xl text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {libraryData.map((library) => (
          <LibraryCard key={library.id} library={library} />
        ))}
      </div>
    </section>
  );
};

export default Library;