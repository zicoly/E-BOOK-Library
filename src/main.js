import menu from "./menu.js";
import swiper from "./swiper.js";
import scrollup from "./scrollup.js";
import dark_light from "./dark&light-theme.js";
import fetchAuthorsData from "./API/Authors.js";
import getBookCovers from "./API/getBookCovers.js";
import searchContent from "./API/searchContent.js";
import getNewBookCovers from "./API/getNewBookCovers.js";
import getFeaturedBookCovers from "./API/getFeaturedBookCovers.js";

menu();
swiper();
scrollup();
dark_light();
getBookCovers();
searchContent();
fetchAuthorsData();
getNewBookCovers();
getFeaturedBookCovers();
