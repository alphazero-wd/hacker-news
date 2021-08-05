import { useGlobalContext } from '../context';

const Stories = () => {
  const { loading, stories, removeStory } = useGlobalContext();
  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {stories.map((story) => {
        const { title, url, author, points, num_comments, objectID } = story;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by {author} | {num_comments} comments
            </p>
            <div>
              <a href={url} target="_blank" className="read-link">
                Read More
              </a>
              <button
                className="remove-btn"
                onClick={() => removeStory(objectID)}
              >
                Remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
