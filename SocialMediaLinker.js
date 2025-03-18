import React, { useState } from "react";

const platforms = [
  "OnlyFans", "Twitter", "Instagram", "Facebook", "TikTok", "YouTube",
  "Snapchat", "Reddit", "Twitch", "Discord", "Pinterest", "Telegram",
  "LinkedIn", "Patreon", "Kick"
];

const SocialMediaLinker = () => {
  const [links, setLinks] = useState({});

  const handleChange = (platform, value) => {
    setLinks(prevLinks => ({ ...prevLinks, [platform]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/link-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(links),
      });

      if (!response.ok) throw new Error("Failed to link accounts");
      alert("Accounts linked successfully!");
    } catch (error) {
      console.error(error);
      alert("Error linking accounts");
    }
  };

  return (
    <div>
      <h2>Link Your Social Media</h2>
      {platforms.map(platform => (
        <div key={platform}>
          <label>{platform}</label>
          <input
            type="url"
            placeholder={`Enter your ${platform} profile URL`}
            onChange={(e) => handleChange(platform, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Save Links</button>
    </div>
  );
};

export default SocialMediaLinker;
