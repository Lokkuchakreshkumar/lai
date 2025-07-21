const scrollAndExtractConnections = async () => {
  const scrollDelay = 1000; // 1 second between scrolls
  const scrollSteps = 20;   // adjust this based on how many connections you have

  for (let i = 0; i < scrollSteps; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, scrollDelay));
  }

  const connections = [];

  document.querySelectorAll("div[componentkey^='auto-component']").forEach(card => {
    const nameAnchor = card.querySelector("a[href*='/in/']");
    const name = nameAnchor?.textContent?.trim() || "N/A";
    const profileUrl = nameAnchor?.href || "N/A";

    const headlineEl = card.querySelector("p[class*='df958442']");
    const headline = headlineEl?.textContent?.trim() || "N/A";

    const connectedDate = Array.from(card.querySelectorAll("p"))
      .find(p => p.textContent.includes("Connected on"))?.textContent?.trim() || "N/A";

    connections.push({ name, profileUrl, headline, connectedDate });
  });

  console.log("👥 Extracted All Connections:", connections);
  return connections;
};

scrollAndExtractConnections();
