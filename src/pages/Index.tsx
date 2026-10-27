import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageRenderer from "@/components/HomepageRenderer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HomepageRenderer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
