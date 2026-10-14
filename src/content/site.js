// Replace these null values with verified company details before publication.
// Keep contact facts separate from translated interface copy.
export const company = {
  email: "info@crownbridgerealestate.com",
  phone: "+971503386590",
  address: "CROWN BRIDGE REAL ESTATE L.L.C\nOffice No. S1-283, Dubai investment complex 1\nDubai, UAE",
  social: { instagram: null, linkedin: null, facebook: null },
};

export const sections = [
  "home",
  "about",
  "services",
  "properties",
  "why",
  "process",
  "contact",
];
export const services = ["buy", "sell", "rent", "offplan"];

export const propertyTypes = [
  "apartment",
  "townhouse",
  "villa",
  "commercial",
  "retail",
  "plot",
];

// Illustrative concepts only; replace with verified inventory before publication.
export const properties = [
  {
    id: "residence",
    image: "/images/interior.jpg",
    type: "apartment",
    bedrooms: 2,
    area: 120,
  },
  {
    id: "villa",
    image: "/images/villa.jpg",
    type: "villa",
    bedrooms: 4,
    area: 280,
  },
  {
    id: "offplan",
    image: "/images/skyline.jpg",
    type: "offplan",
    bedrooms: null,
    area: null,
  },
];
