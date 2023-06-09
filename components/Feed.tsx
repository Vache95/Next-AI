"use client"

import { useState,useEffect, FormEvent } from "react"
import PromptCard from "./PromptCard"

type PromptCardListProps = {
  data:any,
  handleTagClick:any
}

const PromptCardList:React.FC<PromptCardListProps> = ({ data, handleTagClick }):JSX.Element => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post:any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);


    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);


    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
  
      setAllPosts(data);
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);

    const filterPrompts = (searchtext:any) => {
      const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
      return allPosts.filter(
        (item:any) =>
          regex.test(item?.creator.username) ||
          regex.test(item?.tag) ||
          regex.test(item?.prompt)
      );
    };

  const handleSearchChange = (e:FormEvent) => {
    // @ts-ignore
  clearTimeout(searchTimeout);
  // @ts-ignore
    setSearchText(e.target.value);
    setSearchTimeout(
      // @ts-ignore
      setTimeout(() => {
        // @ts-ignore
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handleTagClick = (tagName:any) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
          <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          />
      </form>
     {/* All Prompts */}
     {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed