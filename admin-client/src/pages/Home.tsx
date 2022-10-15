import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";
import { ArticleType } from "../types";

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);

  // check if user is authenticated
  useEffect(() => {
    if (!authContext?.isLoggedIn) {
      navigate("/login");
    }
  }, [authContext?.isLoggedIn]);

  // Fetch articles on page load
  useEffect(() => {
    const fetchdArticles = async () => {
      try {
        const res = (await fetch(
          "http://localhost:5000/articles/pagination/0"
        )) as any;
        const data: ArticleType[] = await res.json();

        setArticles(() => [...data]);
      } catch (error) {
        setFetchError((prevErr) => !prevErr);
      }
    };
    fetchdArticles();
  }, []);

  return (
    <Layout>
      <div className="home">
        {/* Item */}
        {articles.map((article) => {
          return (
            <div className="home__article-item" key={article.id}>
              <div style={{ width: "122px" }}>
                <img
                  style={{ width: "100%", height: "142px", objectFit: "cover" }}
                  className="home__article-item-photo"
                  src={`${article.photos[0]?.url}`}
                  alt=""
                />
              </div>

              <div className="article-item-details">
                <h1 className="home__article-title">{article.headline}</h1>
                <p className="home__article-author">{article.authored_by}</p>
                <div className="home__buttons-container">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
