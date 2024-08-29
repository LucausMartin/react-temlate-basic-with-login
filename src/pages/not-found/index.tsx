import './index.less';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="text">{'404 Page Not Found'}</div>
      <div className="lamp">
        <div className="light-line"></div>
        <div className="lampshade"></div>
        <div className="lampshade-oval-big"></div>
        <div className="lampshade-oval-small-mask">
          <div className="lampshade-oval-small"></div>
        </div>
        <div className="light"></div>
      </div>
    </div>
  );
};

export { NotFound };
