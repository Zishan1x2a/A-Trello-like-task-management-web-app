import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";

function Home() {
  return (
    <main
      className="flex-1 text-white flex flex-col lg:flex-row items-center justify-between px-12"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
     
      <div className="max-w-xl bg-black/50 p-6 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          Brings all your tasks, teammates, and tools together
        </h2>
        <p className="mb-4 text-lg">
          Simple, flexible, and powerful. All it takes are boards, lists, and
          cards to get a clear view of who’s doing what and what needs to get
          done.
        </p>
        <h3 className="font-semibold mb-2">WHAT YOU GET ON THE FREE PLAN:</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Unlimited cards</li>
          <li>Unlimited Power-Ups per board</li>
        </ul>
        <button className="bg-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
          Sign up – it’s free!
        </button>
      </div>

      
      <div className="lg:ml-12 relative w-[420px] h-[70vh] mt-10 lg:mt-0">
       
        <img
          src={pic1}
          alt="Board 1"
          className="absolute top-20 left-45 w-[90%] h-auto rounded-lg shadow-xl object-contain transform rotate-[-18deg] z-10"
        />

        
        <img
           src={pic2}
          alt="Board 2"
          className="absolute top-20 left-45 w-[90%] h-auto rounded-lg shadow-xl object-contain transform rotate-[-0deg] z-20"
        />
        
        
        <img
          src={pic3}
          alt="Card"
          className="absolute top-20 -left-0 w-[75%] h-auto rounded-lg shadow-xl object-contain transform rotate-[-8deg] z-30"
        />
      </div>
    </main>
  );
}

export default Home;
