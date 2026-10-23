"use strict";

const currentYear = document.querySelector("#year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

// Add profile URLs here when the CreatorGyde social accounts are ready.
const socialUrls = {
  instagram: "https://www.instagram.com/creatorgyde/?utm_source=ig_web_button_share_sheet",
  youtube: "https://www.youtube.com/@CreatorGyde",
};

document.querySelectorAll("[data-social]").forEach((link) => {
  const url = socialUrls[link.dataset.social];
  if (!url) return;

  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.removeAttribute("aria-disabled");
  link.removeAttribute("title");
  link.setAttribute("aria-label", link.dataset.social === "youtube" ? "CreatorGyde on YouTube" : "CreatorGyde on Instagram");
  link.classList.remove("is-pending");
});

const emailAddress = "creatorgyde@gmail.com";
const mailtoUrl = `mailto:${emailAddress}`;
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;
const emailLinks = document.querySelectorAll("[data-email-contact]");
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/i.test(navigator.userAgent);
const isMobile = navigator.userAgentData?.mobile || isIOS || isAndroid;

emailLinks.forEach((link) => {
  if (!isMobile) {
    link.href = gmailComposeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${link.getAttribute("aria-label") || "Email CreatorGyde"} (opens Gmail in a new tab)`);
    return;
  }

  // Keep a standard mail link as a fallback when JavaScript or Gmail is unavailable.
  link.href = mailtoUrl;
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (isAndroid) {
      const fallback = encodeURIComponent(gmailComposeUrl);
      window.location.href = `intent://compose?to=${encodeURIComponent(emailAddress)}#Intent;scheme=mailto;package=com.google.android.gm;S.browser_fallback_url=${fallback};end`;
      return;
    }

    if (isIOS) {
      let appOpened = false;
      const markAppOpened = () => {
        if (document.visibilityState === "hidden") appOpened = true;
      };
      document.addEventListener("visibilitychange", markAppOpened, { once: true });
      window.location.href = `googlegmail:///co?to=${encodeURIComponent(emailAddress)}`;
      window.setTimeout(() => {
        document.removeEventListener("visibilitychange", markAppOpened);
        if (!appOpened && document.visibilityState === "visible") window.location.href = mailtoUrl;
      }, 900);
      return;
    }

    window.location.href = mailtoUrl;
  });
});
