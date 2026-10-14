"use client";

import { useState } from "react";

import {
  ChevronDown,
  Menu,
  ShieldCheck,
  Smartphone,
  Star,
} from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
const SUPPORT_URL = process.env.NEXT_PUBLIC_SUPPORT_URL;
const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL;
const AMBASSADOR_URL = process.env.NEXT_PUBLIC_AMBASSADOR_URL;

const LINKS = {
  home: "/",
  signInGoogle: `${APP_URL}/login?provider=google&utm_source=landing`,
  signInEmail: `${APP_URL}/signup?utm_source=landing`,
  signIn: `${APP_URL}/login`,
  explore: `${APP_URL}/?utm_source=landing`,
  whatsNew: `${SUPPORT_URL}`,
  helpCenter: `${SUPPORT_URL}`,
  support: `${SUPPORT_URL}`,
  privacy: `${PRIVACY_URL}`, 
  ambassador: `${AMBASSADOR_URL}`, 
};

const forecastFeatures = [
  {
    title: "Power Forecast",
    body: "See an estimate of how many hours of electricity your location could have today. Plan your work day, and where you need to be.",
    link: "Check your Power Forecast",
    href: `${APP_URL}/forecast`,
    image: "/mockups/power-forecast-crop.jpg",
    imageClass: "forecast-image",
  },
  {
    title: "Discover",
    body: "Need somewhere to work, charge, relax or escape an outage? Explore cafes, workspaces and charging spots around you and check their details before you head out.",
    link: "Check your Power Forecast",
    href: `${APP_URL}/discover`,
    image: "/landing-static/mockups/discover-map-crop.jpg",
    imageClass: "discover-image",
  },
  {
    title: "Power Feed",
    body: "Find Updates. Share what's happening around you. Read recent power reports people are posting in your area and catch up on relevant news. Share what's happening where you are to help others make better plans.",
    link: "Check your Power Forecast",
    href: `${APP_URL}/feed`,
    image: "/landing-static/mockups/power-feed-crop.jpg",
    imageClass: "feed-image",
  },
];

const faqs = [
  {
    question:
      "Does the forecast tell me exactly when power will come on or go off?",
    answer:
      "No. PowerMap provides you an estimate of expected power availability in your area, not an exact schedule for when electricity will come on or go off. Actual supply can change due to faults, maintenance, grid conditions and other factors outside PowerMap's control.",
  },
  {
    question: "How accurate are the predictions?",
    answer:
      "Forecast accuracy depends on the availability of the underlying data for your area from the electricity distribution companies [DisCos]. PowerMap uses available electricity supply information and community updates to help estimate power availablity. Conditions can change after a forecast is generated, so actual supply may differ from what is predicted. We do not guarantee a specific number of hours of electricity.",
  },
  {
    question: "Is information available for my area?",
    answer:
      "PowerMap covers areas where relevant electricity data is available. The level of detail may vary by location. Select your area on PowerMap to see the information currently available.",
  },
  {
    question: "Where do the community updates come from?",
    answer:
      "Community updates come from PowerMap users sharing reports about the power situation in their areas. These reports help others understand what is happening on the groud, alongside the available forecast data.",
  },
];

function BrandLogo({ src = "/landing-static/images/powermap-logo.svg" }: { src?: string }) {
  return (
    <a className="brand-logo" href={LINKS.home} aria-label="PowerMap home">
      <img src={src} alt="PowerMap" />
    </a>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="landing-page">
      <div className="browser-bar" aria-hidden="true">
        <span className="lock-dot" />
        <span>powermap.tech</span>
      </div>

      <div className="page-frame">
      <div className="page-panel">
      <header className="page-header">
        <BrandLogo />
        <button className="menu-button" aria-label="Open navigation">
          <Menu size={22} />
        </button>
      </header>

      <section className="hero-section">
        <h1>Power your productivity</h1>
        <p>
          PowerMap helps you see today's estimated electricity hours for your
          area, explore nearby places with power, and stay informed on local
          power updates - so you can plan your day.
        </p>

        <div className="auth-card">
          <a className="auth-button primary" href={LINKS.signInGoogle}>
            Continue with Google
          </a>
          <a className="auth-button secondary" href={LINKS.signInEmail}>
            Continue with email
          </a>
          <small>
            By continuing, you acknowledge PowerMap&apos;s{" "}
            <a href={LINKS.privacy}>Privacy Policy</a> and agree to get
            occasional promotional emails and notifications.
          </small>
        </div>
      </section>

      <section className="how-section">
        <h2>See How It Works</h2>
        <figure className="reference-card video-reference">
          <img
            src="/mockups/grid-feed.jpg"
            alt="Power grid video preview with a Power Feed tweet inside a phone"
          />
        </figure>
        <p className="trust-copy">Trusted by users across 17 states in Nigeria</p>
      </section>

      {forecastFeatures.map((feature) => (
        <section className="feature-section" key={feature.title}>
          <h2>{feature.title}</h2>
          <p>{feature.body}</p>
          <a className="inline-link" href={feature.href}>
            {feature.link}
          </a>
          <figure className={`reference-card feature-reference ${feature.imageClass}`}>
            <img src={feature.image} alt={`${feature.title} app preview`} />
          </figure>
        </section>
      ))}

      <section className="latest-section">
        <h2>Latest Releases</h2>
        <p>
          We&apos;re continuously improving how you understand and navigate
          electricity around you. Explore the latest updates, improvements, and
          new ways to use PowerMap.
        </p>
        <a className="inline-link" href={LINKS.whatsNew}>
          See what&apos;s new.
        </a>
        <figure className="reference-card release-reference">
          <img
            src="/mockups/release-crop.jpg"
            alt="What's new on PowerMap release preview"
          />
        </figure>
      </section>

      <section className="faq-section">
        <h2>FAQs</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={faq.question}>
                    <button
                      className="faq-row"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={15} />
                    </button>
                    {isOpen && <p className="faq-answer">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
        <a className="support-link" href={LINKS.support}>
          Go to support page
        </a>
      </section>

      <section className="final-cta">
        <h2>
          Stop Guessing.
          <br />
          Start Knowing.
        </h2>
        <p>
          Whether you&apos;re planning your workday or trying to know where the
          lights are on, make your next move with PowerMap.
        </p>
        <div className="auth-card cta-card">
          <a className="auth-button primary" href={LINKS.explore}>
            Explore PowerMap
          </a>
          <small>
            By continuing, you acknowledge PowerMap&apos;s{" "}
            <a href={LINKS.privacy}>Privacy Policy</a> and agree to get
            occasional promotional emails and notifications.
          </small>
        </div>
      </section>

      </div>
      </div>

      <footer className="footer">
        <BrandLogo src="/landing-static/images/powermap-logo-footer.svg" />
        <nav aria-label="Footer navigation">
           <a href={LINKS.signIn}>Sign In</a>
          <a href={LINKS.whatsNew}>Latest Updates</a>
          <a href={LINKS.helpCenter}>Help Center</a>
          <a href={LINKS.privacy}>Privacy Policy</a>
          <a href={LINKS.ambassador}>Ambassador Program</a>
        </nav>
      </footer>
    </main>
  );
}
