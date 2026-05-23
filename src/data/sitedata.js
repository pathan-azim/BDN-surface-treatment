// src/data/siteData.js
import fw1 from "../assets/fw1.png";
import fw2 from "../assets/fw2.png";
import fw3 from "../assets/fw3.png";
import fw4 from "../assets/fw4.png";
import fw5 from "../assets/fw5.png";
import pretreatment from "../assets/pretreatment.png";
export const featuredWorks = [
  { title: "Project Saturn", subtitle: "Carbon green finish", tag: "NVIDIA", imageUrl:fw1 },
  { title: "Project Cosmos", subtitle: "Premium coating", tag: "apple", imageUrl:fw2 },
  { title: "Project Saturn", subtitle: "Gloss surface", tag: "apple", imageUrl:fw3 },
  { title: "Project Luna", subtitle: "Custom aluminum finish", tag: "siemens", imageUrl:fw4 },
  { title: "Project Nova", subtitle: "Metal component", tag: "intel", imageUrl:fw5 },
  { title: "Precision Engineered", subtitle: "Motor housing", tag: "NVIDIA", imageUrl:fw5 },
  { title: "Project Saturn", subtitle: "Industrial finish", tag: "NVIDIA" ,imageUrl:fw5},
  { title: "Project Saturn", subtitle: "Material study", tag: "jotun", imageUrl:fw5 },
  { title: "Project Saturn", subtitle: "Special coating", tag: "apple", imageUrl:fw5 },
];

export const processItems = [
  { step: "1", title: "Pre-Treatment", desc: "Chemical surface preparation and sandblasting.", imageUrl: pretreatment },
  { step: "2", title: "Electrostatic Coating", desc: "Precision powder application with electrostatic spray.", imageUrl: fw2 },
  { step: "3", title: "Thermal Curing", desc: "Optimal polymer cross-linking in controlled temperatures.", imageUrl: fw3 },
  { step: "4", title: "QC Inspection", desc: "Thickness and durability verification for flawless finish.", imageUrl: fw4 },
];

export const servicesData = [
  {
    title: "50th Anniversary",
    desc: "Commemorative custom metal fabrication and premium protective finishes.",
    imageUrl: fw1
  },
  {
    title: "SOHO NYC",
    desc: "Architectural structural coating designed for high-traffic metropolitan exposure.",
    imageUrl: fw2
  },
  {
    title: "NYWF Popup",
    desc: "Rapid deployment structural finishes with hyper-durable quick-cure polymers.",
    imageUrl: fw3
  },
  {
    title: "Makers Studio HOI",
    desc: "Artistic matte and metallic chemical treatments optimized for creative showcases.",
    imageUrl: fw4
  }
];

// Import your asset logos (the builder automatically compiles these into optimized assets)
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
// import logo4 from "../assets/logo4.png";

export const clientLogos = [
  { id: 1, name: "Company One", imageUrl: logo1 },
  { id: 2, name: "Company Two", imageUrl: logo2 },
  { id: 3, name: "Company Three", imageUrl: logo3 },
  { id: 4, name: "Company Four", imageUrl: logo3 },
  { id: 5, name: "Company Five", imageUrl: logo1 },
  { id: 6, name: "Company Six", imageUrl: logo3 },
  { id: 7, name: "Company Seven", imageUrl: logo3 },
  { id: 8, name: "Company Eight", imageUrl: logo1 },
  { id: 9, name: "Company Nine", imageUrl: logo2 },
  { id: 10, name: "Company Ten", imageUrl: logo3 },
];
