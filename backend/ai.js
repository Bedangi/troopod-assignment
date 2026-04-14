import * as cheerio from "cheerio";

export async function generateModifiedHTML(adText, htmlContent) {
  const $ = cheerio.load(htmlContent);
  const lowerAd = adText.toLowerCase();

  let headingText = "Welcome";
  let paragraphText = "Discover something amazing.";
  let buttonText = "Get Started";

  // 🎯 DISCOUNT
  if (lowerAd.includes("%")) {
    const match = adText.match(/\d+%/);
    if (match) {
      headingText = `Get ${match[0]} OFF Today`;
      paragraphText = "Unlock exclusive savings with this limited-time offer.";
      buttonText = "Claim Discount";
    }
  }

  // 💪 FITNESS
  if (lowerAd.includes("gym") || lowerAd.includes("fitness")) {
    headingText = "Transform Your Body Today";
    paragraphText = "Start your fitness journey now.";
    buttonText = "Join Now";
  }

  // 💻 TECH
  if (lowerAd.includes("ai") || lowerAd.includes("productivity")) {
    headingText = "Boost Your Productivity";
    paragraphText = "Save time using smart AI tools.";
    buttonText = "Try Now";
  }

  // ✨ MODIFY EXISTING ELEMENTS

  // Change first h1
  if ($("h1").length) {
    $("h1").first().text(headingText);
  }

  // Change first paragraph
  $("p").each((i, el) => {
    if (i === 0) $(el).text(paragraphText);
});

  // Change button OR create one if missing
  if ($("button").length) {
    $("button").first().text(buttonText);
  } else {
    $("body").append(`<button>${buttonText}</button>`);
  }

  // 🔥 Add urgency if needed
  if (lowerAd.includes("limited") || lowerAd.includes("today")) {
    $("body").append(
      `<p style="color:red;">Limited Time Offer – Act Now!</p>`
    );
  }

  return $.html();
}