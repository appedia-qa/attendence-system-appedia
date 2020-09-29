import { ReactComponent as Fertilizer } from "../../assets/icons/greenWeb/place.svg";
import { ReactComponent as Irrigation } from "../../assets/icons/greenWeb/home.svg";
import { ReactComponent as Maintenance } from "../../assets/icons/greenWeb/industory.svg";
import { ReactComponent as Gardens } from "../../assets/icons/greenWeb/bulding.svg";
import { ReactComponent as Flowers } from "../../assets/icons/greenWeb/garden.svg";
import { ReactComponent as SellAgricultural } from "../../assets/icons/greenWeb/home.svg";
import { ReactComponent as Agricultural } from "../../assets/icons/greenWeb/Artboard_7.svg";

const categoryList = [
  {
    id: 0,
    name: "Stationery",
    active: SellAgricultural,
    text: "Individuals",
    p: "Designing private home gardens, providing indoor trees for homes",
  },
  {
    id: 1,
    name: "Fashion",
    active: Gardens,
    text: "Residential compounds",
    p:
      "Working on its gardens, designing, constructing, and performing the necessary periodic maintenance for it",
  },
  {
    id: 2,
    name: "Electronics",
    active: Flowers,
    text: "Public Places",
    p: "Caring for crops and implementing designs for public streets",
  },
  {
    id: 3,
    name: "All",
    active: Fertilizer,
    text: "Embassies",
    p:"Working on its gardens, designing, constructing, and performing maintains periodic plantations for the embassies",
  },
  {
    id: 4,
    name: "Beauty",
    active: Maintenance,
    text:'Ministries and companies',
    p: "we work in beautifying many ministries and companies, by designing and implementing agricultural areas",
  },
];

export default categoryList;
