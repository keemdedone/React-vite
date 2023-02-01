import { footerImages } from "../../model/model";
import "./footer.scss";

const footer = () => {
  return (
    <div className="footer">
      <h3 className="topic">Power by</h3>
      <div className="images">
        {footerImages.map((image, index) => (
          <img
            src={"/src/assets/" + image.src}
            alt={image.name}
            key={index}
            height="64"
            width="64"
          />
        ))}
      </div>
    </div>
  );
};

export default footer;
