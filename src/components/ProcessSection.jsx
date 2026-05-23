// import SectionHeader from "./SectionHeader";
// import { processItems } from "../data/siteData";

// export default function ProcessSection() {
//   return (
//     <section id="process" className="section light">
//       <SectionHeader title="PROCESS SECTION" badge="NEW" />
//       <div className="grid process">
//         {processItems.map((item) => (
//           <article className="card process-card" key={item.step}>
//             <div className="icon-box">{item.step}</div>
//             <h3>{item.title}</h3>
//             <p>{item.desc}</p>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }
import SectionHeader from "./SectionHeader";
import { processItems } from "../data/sitedata";
import "./ProcessSection.css"; // Import the layout styles

export default function ProcessSection() {
  return (
    <section id="process" className="section light">
      <SectionHeader title="PROCESS SECTION" badge="NEW" />
      
      <div className="alternating-container">
        {processItems.map((item, i) => {
          // If the index is odd, we flip the row direction
          const isReversed = i % 2 !== 0;

          return (
            <article 
              className={`process-row ${isReversed ? "reversed" : ""}`} 
              key={item.step || i}
            >
              {/* Image Side (Takes up more width) */}
              <div className="process-image-block">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                />
              </div>
              
              {/* Text/Description Side */}
              <div className="process-text-block">
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
