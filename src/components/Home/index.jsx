/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-useless-constructor */
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";
import { PostCard } from "../PostCard";
import { Button } from "../Button";
import { useEffect, useState, useCallback } from "react";


export const Home = () => {

  const[posts, setPosts] = useState([])//forma de se declara um stado de um user 
  const[allPosts, setAllPosts] = useState([])
  const[page, setPage] = useState(0)
  const[searchValue, setSearchValue] = useState("")
  const[postsPerPage] = useState(2)

  const filteredPosts = !!searchValue
      ? posts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
       })
      : posts;

  // // fetch aqui
  // componentDidMount() {
  //   this.loadPosts();
  // }

  const handleLoadPosts = useCallback(async (page,postsPerPage) => {
  
    const photosAndPosts = await loadPosts();

    setPosts(photosAndPosts.slice(page, postsPerPage))
    setAllPosts(photosAndPosts)
  
  },[]);

  const loadMorePosts = () => {


    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    setPosts([...posts, ...nextPosts])
    setPage(nextPage)

    // this.setState({ posts: [...posts, ...nextPosts], page: nextPage });
  };

 const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    // this.setState({ searchValue: value });
    // console.log(value);
  };

  useEffect(() => {
    handleLoadPosts(0,postsPerPage);

  },[handleLoadPosts, postsPerPage])
  
  return (
      <section className="container">
        <input
          type="text"
          name="txtSearch"
          id="txtSearch"
          placeholder="Search..."
          onChange={handleSearch}
          value={searchValue}
        />

        <div className="posts">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <Button text="Load more posts" action={loadMorePosts} />
      </section>
    );

 
}
