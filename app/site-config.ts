const defaultSiteUrl = "https://hadimalik12.github.io/maliks-daycare";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl
).replace(/\/$/, "");

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
