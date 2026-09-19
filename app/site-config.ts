const defaultSiteUrl = "https://www.maliksdaycare.com";

const configuredSiteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
);

// GitHub Pages redirects the apex domain to www. Keep search signals aligned
// with that destination, including builds using an older SITE_URL.
if (
  ["maliksdaycare.com", "www.maliksdaycare.com"].includes(configuredSiteUrl.hostname)
) {
  configuredSiteUrl.protocol = "https:";
  configuredSiteUrl.hostname = "www.maliksdaycare.com";
}

export const siteUrl = configuredSiteUrl.href.replace(/\/$/, "");

export const business = {
  name: "Malik's Daycare",
  telephone: "+1-770-978-2627",
  locality: "Lawrenceville",
  region: "GA",
  country: "US",
  openingHours: {
    opens: "07:30",
    closes: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
};
