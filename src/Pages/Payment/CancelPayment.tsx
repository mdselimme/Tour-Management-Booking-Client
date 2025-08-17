import { useLocation } from "react-router";

const CancelPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const transactionId = queryParams.get("transactionId");
  const message = queryParams.get("message");
  const amount = queryParams.get("amount");
  const status = queryParams.get("status");
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 text-yellow-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="space-y-2 text-left">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ৳{amount}
          </p>
          <p>
            <span className="font-semibold">Status:</span>
            <span className="text-yellow-600 font-medium"> {status}</span>
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/payment")}
          className="mt-6 w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
        >
          Choose Another Payment Method
        </button>
      </div>
    </div>
  );
};

export default CancelPayment;
