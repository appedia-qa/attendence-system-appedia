import { ReactComponent as Fertilizer } from "../../assets/icons/greenWeb/Artboard_1.svg";
import { ReactComponent as Irrigation } from "../../assets/icons/greenWeb/Artboard_2.svg";
import { ReactComponent as Maintenance } from "../../assets/icons/greenWeb/Artboard_3.svg";
import { ReactComponent as Gardens } from "../../assets/icons/greenWeb/Artboard_4.svg";
import { ReactComponent as Flowers } from "../../assets/icons/greenWeb/Artboard_5.svg";
import { ReactComponent as SellAgricultural } from "../../assets/icons/greenWeb/Artboard_6.svg";
import { ReactComponent as Agricultural } from "../../assets/icons/greenWeb/Artboard_7.svg";

const categoryList = [
  {
    id: 0,
    name: "Stationery",
    active: SellAgricultural,
    p: "Sell Agricultural Pots & Tools",
  },
  {
    id: 1,
    name: "Fashion",
    active: Gardens,
    p: "Design and implementation of gardens",
  },
  { 
    id: 2,
    name: "Electronics",
    active: Flowers,
    p: "Flowers Arrangement",
  },
  {
    id: 3,
    name: "All",
    active: Fertilizer,
    p: "Fertilizer Trading",
  },
  {
    id: 4,
    name: "Beauty",
    active: Maintenance,
    p: "Periodic maintenance of public and private agricultural gardens.",
  },
  {
    id: 5,
    name: "IconSeven",
    active: Agricultural,
    p: "Sell Agricultural Pots & Tools",
  },
  {
    id: 6,
    name: "Baby",
    active: Irrigation,
    p: "Design and implementation of irrigation networks.",
  },
];

export default categoryList;
