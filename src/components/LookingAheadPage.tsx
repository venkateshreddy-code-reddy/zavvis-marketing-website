// LookingAheadSection.tsx

import "../style/lookingahead.css";
import lookingAheadImg from "../assets/lookingahead.png";

const LookingAheadSection: React.FC = () => {
  return (
    <section className="lookingAhead" aria-labelledby="lookingAhead-title">
      <div className="lookingAhead__bg" aria-hidden="true" />
      <div className="lookingAhead__stars" aria-hidden="true" />
      <div className="lookingAhead__vignette" aria-hidden="true" />

      <div className="lookingAhead__container">
        <div className="lookingAhead__grid">
          <div className="lookingAhead__content">
            <header className="lookingAhead__header">
              <h2 className="lookingAhead__title" id="lookingAhead-title">
                Looking Ahead
              </h2>

              <p className="lookingAhead__lead">
                Finance is shifting from static reporting to continuous observability — and Zavvis
                is leading this transformation for mid-market companies.
              </p>
            </header>

            <div className="lookingAhead__body">
              <p className="lookingAhead__p">
                As we expand our transactional models, anomaly libraries, and multi-system
                provenance across QuickBooks, NetSuite, Salesforce, SAP, and beyond — our focus
                remains unchanged:
              </p>

              <p className="lookingAhead__p">
                Enable finance teams to operate with clarity, control, and proactive intelligence. 
              </p>

              <p className="lookingAhead__p lookingAhead__p--emph">
                We’re not just building software.
              </p>

              <p className="lookingAhead__p lookingAhead__p--strong">
                We’re establishing the analytical foundation for the future of corporate finance.
              </p>
            </div>
          </div>

          <figure className="lookingAhead__visual" aria-hidden="true">
            <div className="lookingAhead__visualGlow" />
            <img
              className="lookingAhead__image"
              src={lookingAheadImg}
              alt=""
              loading="lazy"
              draggable={false}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default LookingAheadSection;
