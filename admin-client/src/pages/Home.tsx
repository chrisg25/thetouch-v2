import Layout from "../components/layout";

const Home = () => {
  return (
    <Layout>
      <div className="home">
        {/* Item */}
        <div className="home__article-item">
          <div style={{ width: "122px" }}>
            <img
              style={{ width: "100%", height: "142px", objectFit: "cover" }}
              className="home__article-item-photo"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt=""
            />
          </div>

          <div className="article-item-details">
            <h1 className="home__article-title">
              NEWS | Pub renewal: Ex-Adviser Malongo speaks
            </h1>
            <p className="home__article-author">by Lester Janito</p>
            <div className="home__buttons-container">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>

        {/* Item */}
        <div className="home__article-item">
          <div style={{ width: "122px" }}>
            <img
              style={{ width: "100%", height: "142px", objectFit: "cover" }}
              className="home__article-item-photo"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt=""
            />
          </div>

          <div className="article-item-details">
            <h1 className="home__article-title">
              NEWS | Pub renewal: Ex-Adviser Malongo speaks
            </h1>
            <p className="home__article-author">by Lester Janito</p>
            <div className="home__buttons-container">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>

        {/* Item */}
        <div className="home__article-item">
          <div style={{ width: "122px" }}>
            <img
              style={{ width: "100%", height: "142px", objectFit: "cover" }}
              className="home__article-item-photo"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt=""
            />
          </div>

          <div className="article-item-details">
            <h1 className="home__article-title">
              NEWS | Pub renewal: Ex-Adviser Malongo speaks
            </h1>
            <p className="home__article-author">by Lester Janito</p>
            <div className="home__buttons-container">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
