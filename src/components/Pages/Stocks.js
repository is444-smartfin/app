import React, { useState, useEffect } from "react";

function Stocks() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    setNews([
      {
        description:
          "Dow Jones futures: The stock market rally could go…us but stay engaged. Tesla fell on S&P; 500 news.",
        guid: "9803606d-a324-3864-83a8-2bd621e6ccbd",
        link:
          "https://finance.yahoo.com/m/9803606d-a324-3864-83a…1e6ccbd/dow-jones-futures%3A-after.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 16:45:01 +0000",
        title:
          "Dow Jones Futures: After Stock Market Rally Dive, What To Do Now; Tesla Gets S&P 500 Surprise",
      },
      {
        description:
          "* Benzinga has examined the prospects for many inv…t provide investment advice. All rights reserved.",
        guid: "efd2e7ba-aee1-3805-991c-953f98a94fb2",
        link:
          "https://finance.yahoo.com/news/benzingas-bulls-bears-week-apple-131736560.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 13:17:36 +0000",
        title:
          "Benzinga's Bulls And Bears Of The Week: Apple, Costco, FedEx And More",
      },
      {
        description:
          "On CNBC's &quot;Options Action,&quot; Tony Zha…t provide investment advice. All rights reserved.",
        guid: "69daf284-bf60-33e4-af72-47b4ada6f83e",
        link:
          "https://finance.yahoo.com/news/tony-zhangs-apple-options-trade-125004404.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 12:50:04 +0000",
        title: "Tony Zhang's Apple Options Trade",
      },
      {
        description:
          "Marketing campaigns have started touting the natio…ather after a relentless rally off of March lows.",
        guid: "4c669879-5beb-3aae-b169-718d8a3cfebd",
        link:
          "https://finance.yahoo.com/m/4c669879-5beb-3aae-b16…8a3cfebd/3-top-5g-stocks-to-buy-in.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 11:00:00 +0000",
        title: "3 Top 5G Stocks to Buy in September",
      },
      {
        description:
          "Warren Buffett is about as different from the ster…ost popular Robinhood stocks that Buffett adores.",
        guid: "1e6626b0-2e0c-3d2c-8eae-4b89fb2642cc",
        link:
          "https://finance.yahoo.com/m/1e6626b0-2e0c-3d2c-8ea…89fb2642cc/3-robinhood-stocks-that.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 10:44:00 +0000",
        title: "3 Robinhood Stocks That Warren Buffett Absolutely Loves",
      },
      {
        description:
          "Few events have garnered more attention this year …39;s respective 4-for-1 and 5-for-1 stock splits.",
        guid: "22a5b8b2-8ed1-3355-b618-a7bcb53dfb26",
        link:
          "https://finance.yahoo.com/m/22a5b8b2-8ed1-3355-b61…3dfb26/4-things-learned-from-apple.html?.tsrc=rss",
        pubDate: "Sun, 06 Sep 2020 10:36:00 +0000",
        title: "4 Things Learned From Apple and Tesla Stock Splits",
      },
    ]);
  }, []);
  return (
    <div>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Stocks</h1>
            <h2 className="subtitle">$AAPL</h2>
          </div>
        </div>
      </section>
      <div className="container">
        {news.map((data) => {
          return (
            <div className="card" key={data}>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        src="https://bulma.io/images/placeholders/96x96.png"
                        alt="Placeholder"
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.title}
                      </a>
                    </p>
                    <p className="subtitle is-6">{data.pubDate}</p>
                  </div>
                </div>

                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stocks;
