import React, { useEffect, useState } from "react";
import { FormField, Loader, Card } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllPost(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post, idx) => <Card key={idx} {...post} />);
    }
    return (
      <h2 className="font-bold mt-5  text-[#6469ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-[32px] font-extrabold flex flex-col">
          The Community Showcase
        </h1>
        <p className="md:text-sm text-md mt-2">
          Browse through of imaginative and visually stunning images generated
          by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] ">
                Showing Result for{" "}
                <span className=" text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Result Found"
                />
              ) : (
                <RenderCards data={allPost} title="NO POST FOUND" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
