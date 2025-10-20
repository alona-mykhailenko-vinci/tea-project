import Navbar from '../Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl tea-heading font-semibold">
            TeaShop
          </h1>
          <h2 className="text-xl tea-heading font-normal">
            Welcome to our premium tea collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Discover the finest selection of teas from around the world. 
            From traditional green teas to exotic herbal blends, we have 
            something special for every tea lover.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;