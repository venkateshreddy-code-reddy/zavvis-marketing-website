// src/components/ApproachSection.tsx
import "../style/approach.css";
import approachImg from "../assets/approach.png";

const ApproachSection: React.FC = () => {
  return (
    <section className="approach" aria-labelledby="approach-title">
      <div className="approach__bg" aria-hidden="true" />
      <div className="approach__stars" aria-hidden="true" />
      <div className="approach__vignette" aria-hidden="true" />

      <div className="approach__container">
        <div className="approach__grid">
          <div className="approach__media" aria-hidden="true">
            <div className="approach__mediaGlow" aria-hidden="true" />
            <div className="approach__imageFrame" aria-hidden="true">
              <img
                className="approach__image"
                src={approachImg}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="approach__imageBlend" aria-hidden="true" />
            </div>
          </div>

          <div className="approach__content">
            <header className="approach__header">
              <h2 className="approach__title" id="approach-title">
                Our Approach
              </h2>
            </header>

            <ul className="approach__bullets" role="list">
              <li className="approach__bullet">Zavvis is not a dashboard.</li>
              <li className="approach__bullet">Zavvis is not an FP&amp;A tool.</li>
              <li className="approach__bullet">Zavvis is not a reporting layer.</li>
            </ul>

            <p className="approach__emphasis">
              <strong>We are the observability engine for corporate finance.</strong>
            </p>

           

            <p className="approach__paragraph">
              The result: a continuously learning system that eliminates noise, removes busywork,
              and focuses your team on what actually moves the business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
