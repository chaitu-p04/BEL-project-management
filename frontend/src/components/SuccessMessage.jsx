import logo from '../assets/bel_logo.jpg';

const SuccessMessage = () => {
  return (
    <div className="flex h-screen bg-[#dceeff]">
      <div className="flex w-full justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <img src={logo} alt="BEL Logo" className="mx-auto mb-4" width="100" />
          <h2 className="text-2xl font-bold mb-6 text-green-600">Password Updated Successfully</h2>
          <a href="/">
            <button className="bg-blue-700 text-white px-6 py-2 rounded">Go to Login</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
