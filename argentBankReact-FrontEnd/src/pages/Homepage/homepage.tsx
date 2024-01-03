import React from "react";
import Header from "../../components/Header/header";
import Hero from "../../components/Hero/hero";
import FeatureItem from "../../components/FeatureItem/featureItem";
import Footer from "../../components/Footer/footer";
import iconChat from "../../assets/icon-chat.png";
import iconMoney from "../../assets/icon-money.png";
import iconSecurity from "../../assets/icon-security.png";

import "./homepage.scss";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <section className="features">
          <FeatureItem icon={iconChat} title="You are our #1 priority">
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </FeatureItem>
          <FeatureItem icon={iconMoney} title="More savings means higher rates">
            The more you save with us, the higher your interest rate will be!
          </FeatureItem>
          <FeatureItem
            icon={iconSecurity}
            title="Security you can trust
            "
          >
            We use top of the line encryption to make sure your data and money
            is always safe.
          </FeatureItem>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
