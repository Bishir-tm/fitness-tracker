import React from "react";

const Feedbacks = ({ feedbacks }) => {
  return (
    <div className="my-5 rounded-2xl bg-white p-5">
      <h2 className="font-semibold">Feedbacks</h2>
      {feedbacks.length > 0
        ? feedbacks.map((feed) => {
            return (
              <div
                className="border-teal-500 m-4 border-s-4 p-4 rounded-xl shadow-xl"
                key={feed.id}
              >
                {feed.message}
              </div>
            );
          })
        : "No Feedbacks Yet !"}
    </div>
  );
};

export default Feedbacks;
