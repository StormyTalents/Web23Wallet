const colorValue = [
  "lime",
  "yellow",
  "red",
  "orange",
  "blue",
  "indigo",
  "purple",
];

const getBGColorSchema = (color: string) => {
  switch (color) {
    case "lime":
      return "bg-[#D7FC51]";
    case "yellow":
      return "bg-[#FFCE0A]";
    case "red":
      return "bg-[#FF3D50]";
    case "orange":
      return "bg-[#FFB33D]";
    case "blue":
      return "bg-[#3D9EFF]";
    case "indigo":
      return "bg-[#5957E5]";
    case "purple":
      return "bg-[#B558E4]";

    default:
      return "bg-[#D7FC51]";
  }
};

const getBorderColorSchema = (color: string = "lime") => {
  switch (color) {
    case "lime":
      return "border-[#D7FC51]";
    case "yellow":
      return "border-[#FFCE0A]";
    case "red":
      return "border-[#FF3D50]";
    case "orange":
      return "border-[#FFB33D]";
    case "blue":
      return "border-[#3D9EFF]";
    case "indigo":
      return "border-[#5957E5]";
    case "purple":
      return "border-[#B558E4]";

    default:
      return "border-[#D7FC51]";
  }
};

const getAfterBorderColorSchema = (color: string = "lime") => {
  switch (color) {
    case "lime":
      return "after:border-[#D7FC51]";
    case "yellow":
      return "after:border-[#FFCE0A]";
    case "red":
      return "after:border-[#FF3D50]";
    case "orange":
      return "after:border-[#FFB33D]";
    case "blue":
      return "after:border-[#3D9EFF]";
    case "indigo":
      return "after:border-[#5957E5]";
    case "purple":
      return "after:border-[#B558E4]";

    default:
      return "after:border-[#D7FC51]";
  }
};

export {
  colorValue,
  getBGColorSchema,
  getBorderColorSchema,
  getAfterBorderColorSchema,
};
