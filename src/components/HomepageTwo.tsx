
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageRenderer from "./HomepageRenderer";
import Seo from "./Seo";

function HomepageTwo() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Air Conditioning Service & Repairs Adelaide | Air Cool Dynamics"
        description="Aircon service, repairs and installation across Adelaide and surrounding suburbs. Ducted, split system, evaporative and coolrooms. Open 7 days. Call 1300 019 568."
        path="/"
      />
      {/* <Navbar /> */}
      <main className="flex-1">
        <HomepageRenderer />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default HomepageTwo;
