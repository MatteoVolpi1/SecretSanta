export type Hint = { label: string; url?: string };
export type Person = {
  name: string;
  seen: boolean;
  email: string;
  hints: Hint[];
};

export const persons: Person[] = [
  {
    name: "Loyda",
    seen: false,
    email: "loydacarniello@msn.com",
    hints: [
      { label: "DSW Gift Card for winter shoes" },
      { label: "Ross Gift Card" },
      { label: "Cortinas de ducha tipo", url: "https://a.co/d/fQp7b2t" },
      { label: "Horno holandés de hierro fundido tipo", url: "https://a.co/d/gOIWBjy" },
      { label: "Mono color vino, talla LARGE tipo", url: "https://a.co/d/8rnHznD" },
    ],
  },
  {
    name: "Gavin",
    seen: false,
    email: "gavinkelley04@gmail.com",
    hints: [
      { label: "Batería para máquina de tatuar tipo este", url: "https://a.co/d/0bqmRnU" },
      { label: "Lámpara clásica verde de biblioteca tipo este", url: "https://a.co/d/48Jm9Fd" },
      { label: "Champú de esta marca", url: "https://a.co/d/gmJdalZ" },
    ],
  },
  {
    name: "Stephanie",
    seen: false,
    email: "stephanievilcapoma.sv@gmail.com",
    hints: [
      { label: "Funda Wildflower para iPhone 15", url: "https://a.co/d/6jWDCkm" },
      { label: "Top deportivo", url: "https://a.co/d/0bqmRnU" },
      { label: "Tarjeta de regalo de Dick’s (ahorrando para New Balance 1080 para cuando esté trabajando)" },
      { label: "Juego de tupper de vidrio (puede ser este u otra opción similar)", url: "https://a.co/d/73bwfGA" },
      { label: "Auriculares Loop (Experience 2)", url: "https://a.co/d/fPzhsGh" },
      { label: "Auriculares Loop (Switch 2)", url: "https://a.co/d/0fdqvLX" },
    ],
  },
  {
    name: "Victoria",
    seen: false,
    email: "byvicvvs@gmail.com",
    hints: [
      { label: "Leggings tipo", url: "https://a.co/d/9Fer1bl" },
      { label: "Gym set: shorts o leggings con top deportivo" },
      { label: "Tacones tipo", url: "https://a.co/d/8oal2XR" },
      { label: "Tacones tipo", url: "https://a.co/d/dy1OdZ6" },
      { label: "Gift card" },
    ],
  },
  {
    name: "Abuela",
    seen: false,
    email: "yrisfranco79@gmail.com",
    hints: [
      { label: "Dinero 💰" },
      { label: "Money 💸" },
      { label: "Plata 💵" },
    ],
  },
  {
    name: "Abuelo",
    seen: false,
    email: "jorgerafsanchez@gmail.com",
    hints: [
      { label: "Gorra de frío" },
      { label: "Perfume bueno (con notas dulces)" },
    ],
  },
  {
    name: "Tía Eliana",
    seen: false,
    email: "elianacarolinasan@gmail.com",
    hints: [
      { label: "celimax The Vita A Retinal Shot Firming | Retina 0.1%, Matryxyl 3%, Minimizer Pores, Wrinkles & Fine Lines, Firmer Skin, 15ml" },
      { label: "Gift card" },
      { label: "Reloj dorado" },
      { label: "Zapatillas bonitas de punta negro o camel, número 6.5 US" },
      { label: "YCZ firming lift neck cream" },
      { label: "KAHI wrinkle bounce" },
    ],
  },
  {
    name: "Elgin",
    seen: false,
    email: "elginvillanueva@gmail.com",
    hints: [
      { label: "Wireless Earbuds for AI Language Translation Real-Time", url: "https://a.co/d/5qkfiav" },
      { label: "Juego para PLAYSTATION 5: Koei Tecmo Games Winning Post 10" },
    ],
  },
  {
    name: "Vanessa",
    seen: false,
    email: "vanezuela98@gmail.com",
    hints: [
      { label: "Gift card tarjeta de crédito (de supermercado)" },
      { label: "Gift card Park City Outlet (si existe)" },
      { label: "BCAA de Sascha Fitness (cualquier sabor)" },
      { label: "Cualquier Lego (ya tengo: la casa de Up, el árbol genealógico; no Star Wars ni cosas de guerra), solo cosas bonitas 😍" },
      { label: "Perfume sol de Janeiro (número 62)" }
    ],
  },
  {
    name: "Matteo",
    seen: false,
    email: "foxdodici@gmail.com",
    hints: [
      { label: "Ravenor: The Omnibus (book)", url: "https://www.amazon.com/Ravenor-Omnibus-Warhammer-40-000/dp/1836090919" },
      { label: "Machine Learning Engineering (book)", url: "https://www.amazon.com/Machine-Learning-Engineering-Andriy-Burkov/dp/1999579577/" },
      { label: "Fun colorful shirt/Hoodie (Size M)" }
    ],
  },
  {
    name: "Lucia",
    seen: false,
    email: "Paintinglc@yahoo.com",
    hints: [
      { label: "Gift card Ulta Beauty" },
      { label: "Cremas rejuvenecedoras que quiten 20 años 🤪" },
      { label: "Crema de contorno de ojos (buena)" },
      { label: "Ropa para caminar" },
      { label: "Crema clinique anti age para los ojos" }
    ],
  },
];
