import style from "../../css/SocialLinks.module.css";
export default function SocialLinks() {
  return (
    <div className={style.socialHeader}>
      <a>
        <i className="fa-brands fa-facebook-f" />
      </a>
      <a>
        <i className="fa-brands fa-x-twitter" />
      </a>
      <a>
        <i className="fa-brands fa-linkedin-in" />
      </a>
      <a>
        <i className="fa-brands fa-instagram" />
      </a>
      <a>
        <i className="fa-brands fa-youtube" />
      </a>
    </div>
  );
}
