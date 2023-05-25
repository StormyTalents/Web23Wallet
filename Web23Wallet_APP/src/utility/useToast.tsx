import toast, { Toaster } from "react-hot-toast";

import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";

const useToast = () => {
  return {
    ToasterBox: (
      <div className="[&>div>div]:!bottom-[90px]">
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    ),
    showToast: (
      title: string,
      type: "info" | "success" | "danger" | "error" = "success"
    ) => {
      toast.custom((t) => (
        <div
          className={`flex px-2 py-1 rounded-2xl bg-grey-200 gap-2 pointer-events-auto ${
            t.visible ? "animate-enter" : "animate-leave"
          } ${type === "error" && "bg-red-500"}`}
        >
          {type === "success" && <CircleCheckSVG className="fill-grey-900" />}
          <p
            className={`text-base font-bold text-grey-900 ${
              type === "error" && "text-grey-200"
            }`}
          >
            {title}
          </p>
        </div>
      ));
    },
  };
};

export default useToast;
