import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";
import { ArticleType } from "../types";
import Spinner from "../components/spinner";

const TOKEN = localStorage.getItem("admin_token_tt");
const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toBeDeletedArticle, setToBeDeletedArticle] = useState<number | null>(
    null
  );

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
        const res = await fetch("http://localhost:5000/articles/pagination/0");
        const data: ArticleType[] = await res.json();
        setArticles(() => [...data]);
      } catch (error) {
        setFetchError((prevErr) => !prevErr);
      }
    };
    fetchdArticles();
  }, []);

  const onDeleteArticle = async (articleId: number) => {
    setToBeDeletedArticle(articleId);
    setShowModal((prevState) => !prevState);
  };

  const onEditArticle = (articleDetails: any) => {
    navigate("/add-articles", {
      state: articleDetails,
    });
  };

  const onConfirimedDeleteArticle = async () => {
    try {
      setIsDeleting((prevState) => true);
      await fetch(`http://localhost:5000/articles/${toBeDeletedArticle}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setArticles((prevState) =>
        prevState.filter((article) => article.id !== toBeDeletedArticle)
      );
      setIsDeleting((prevState) => false);
      setShowModal((prevState) => !prevState);
    } catch (error) {
      setFetchError((prevErr) => !prevErr);
    }
  };

  const onCancelDeletion = () => {
    setToBeDeletedArticle(null);
    setShowModal((prevState) => false);
  };

  return (
    <Layout>
      {showModal && (
        <div className="backdrop">
          <div className="prompt">
            <h1 className="prompt__message">
              Are you sure you want to delete this article?
            </h1>
            <div className="prompt__actions-container">
              {!isDeleting ? (
                <>
                  <button
                    className="prompt__action prompt__yes"
                    onClick={() => onConfirimedDeleteArticle()}
                  >
                    Yes
                  </button>
                  <button
                    className="prompt__action prompt__no"
                    onClick={() => onCancelDeletion()}
                  >
                    No
                  </button>
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      )}
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
                  <button onClick={() => onEditArticle(article)}>Edit</button>
                  <button onClick={() => onDeleteArticle(article.id as number)}>
                    Delete
                  </button>
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
