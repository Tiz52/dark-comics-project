import bcrypt from "bcryptjs";

export interface SeedComic {
  title: string;
  slug: string;
  description: string;
  images: string[];
  inStock: number;
  art_by: string;
  written_by: string;
  series: string;
  publisher: string;
  type: string;
  on_sale_date: string;
  page_count: number;
  price: number;
  character: string;
}

export interface SeedPublisher {
  name: string;
  slug: string;
  description: string;
  banner: string;
  characters?: string[];
}

export interface SeedCharacter {
  name: string;
  slug: string;
  image: string;
  publisher: string;
  comics?: string[];
}

interface SeedData {
  comics: SeedComic[];
  publishers: SeedPublisher[];
  characters: SeedCharacter[];
  users: SeedUser[];
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

export type IPublishers = "DC Cómics" | "Marvel Cómics" | "DC Black Label";
export type IMarvelCharacters = "Spider-Man" | "X-Men" | "Daredevil";
export type IDCBlackLabelCharacters = "Swamp Thing" | "Preacher";

export const initialData: SeedData = {
  users: [
    {
      name: "Carlos Murillo",
      email: "carls@google.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
    },
    {
      name: "Juan Perez",
      email: "juan@google.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
    },
  ],
  characters: [
    {
      name: "Batman",
      slug: "batman",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076158/Dark%20C%C3%B3mics./Personajes/gmtbg3usni6qlkdlfvi1.jpg",
    },
    {
      name: "Superman",
      slug: "superman",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076275/Dark%20C%C3%B3mics./Personajes/ffa2dgoaymi5lxx8ntjt.jpg",
    },
    {
      name: "Flash",
      slug: "flash",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076202/Dark%20C%C3%B3mics./Personajes/rwssigzrofgdhqbiuyia.jpg",
    },
    {
      name: "Catwoman",
      slug: "catwoman",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076172/Dark%20C%C3%B3mics./Personajes/kmb3v3kcihlazxpzgq3f.jpg",
    },
    {
      name: "Watchmen",
      slug: "watchmen",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076298/Dark%20C%C3%B3mics./Personajes/o2xc4si2qfk8pzivzrqi.jpg",
    },
    {
      name: "Doom Patrol",
      slug: "doom-patrol",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076200/Dark%20C%C3%B3mics./Personajes/w5ffobzygfys8tprt8w4.jpg",
    },
    {
      name: "Spider-Man",
      slug: "spider-man",
      publisher: "Marvel Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076256/Dark%20C%C3%B3mics./Personajes/jdz6jiucvfddnhnkcg0y.jpg",
    },
    {
      name: "X-Men",
      slug: "x-men",
      publisher: "Marvel Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076298/Dark%20C%C3%B3mics./Personajes/pzeoulofunlapoqwvrsm.jpg",
    },
    {
      name: "Daredevil",
      slug: "daredevil",
      publisher: "Marvel Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076174/Dark%20C%C3%B3mics./Personajes/boocwwswbwjwon0dyetx.jpg",
    },
    {
      name: "Swamp Thing",
      slug: "swamp-thing",
      publisher: "DC Cómics",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076275/Dark%20C%C3%B3mics./Personajes/vywlikowjupfnvvn9yow.jpg",
    },
    {
      name: "Preacher",
      slug: "preacher",
      publisher: "DC Black Label",
      image:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076254/Dark%20C%C3%B3mics./Personajes/moywlvr83exgihtjt6i2.jpg",
    },
  ],
  publishers: [
    {
      name: "DC Cómics",
      slug: "dc-comics",
      description:
        "DC Comics es una editorial de cómics estadounidense cuyas iniciales son una abreviatura de Detective Comics, uno de los títulos emblemáticos de la compañía.",
      banner:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076338/Dark%20C%C3%B3mics./Editoriales/f8fexuks0jzjzppru6sm.jpg",
      characters: [
        "Batman",
        "Catwoman",
        "Doom Patrol",
        "Flash",
        "Superman",
        "Watchmen",
      ],
    },
    {
      name: "Marvel Cómics",
      slug: "marvel-comics",
      description:
        "Marvel Comics es la casa editorial estadounidense que en el año de 1961 publicó su primera historieta mejor conocida como “Los 4 Fantásticos”. En el 2009 fue adquirida por The Walt Disney Company.",
      banner:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076337/Dark%20C%C3%B3mics./Editoriales/m0wvfom0u43ljygkcf6u.jpg",
      characters: ["Spider-Man", "X-Men", "Daredevil"],
    },
    {
      name: "DC Black Label",
      slug: "dc-black-label",
      description:
        "DC Black Label es una impresión de DC Comics que consta de series limitadas originales y reimpresiones de libros.",
      banner:
        "https://res.cloudinary.com/tiz52/image/upload/v1654076338/Dark%20C%C3%B3mics./Editoriales/dtyvknfjrk6vla3vecsq.jpg",
      characters: ["Swamp Thing", "Preacher"],
    },
  ],
  comics: [
    {
      title: "Batman: Damned #1",
      character: "Batman",
      slug: "batman-damned-1",
      description:
        "DC BLACK LABEL, the highly. anticipated new imprint from DC Comics, starts here!\nThe Joker is dead.\nThere is no doubt about that. But whether Batman finally snapped his scrawny neck or some other sinister force in Gotham City did the deed is still a mystery.\nProblem is, Batman can't remember...and the more he digs into this labyrinthine case, the more he starts to doubt everything he's uncovering.\nSo who better to set him straight than…John Constantine? Problem with that is as much as John loves a good mystery, he loves messing with people’s heads even more. So with John’s “help,” the pair will delve into the sordid underbelly of Gotham as they race toward the mind-blowing truth of who murdered The Joker.\nBATMAN: DAMNED is a bimonthly super-natural horror story told by two of comics’ greatest modern creators—a visceral thrill-ride that proudly puts the “black” in BLACK LABEL.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654068345/Dark%20C%C3%B3mics./C%C3%B3mics/ysveedovsyhkdmsuoitv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068344/Dark%20C%C3%B3mics./C%C3%B3mics/zkzd5hca2jtzlkly9i4u.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068344/Dark%20C%C3%B3mics./C%C3%B3mics/fti7gua2wfsti6qyvtcw.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068344/Dark%20C%C3%B3mics./C%C3%B3mics/pc7nyyysdirub65ckt6d.jpg",
      ],
      art_by: "Lee Bermejo",
      written_by: "Brian Azarello",
      series: "Batman: Damned 2018",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2018-08-19",
      page_count: 53,
      price: 6.99,
      inStock: 12,
    },
    {
      title: "Dark Nights: The Dawnbreaker #1",
      character: "Batman",
      slug: "dark-nights-the-dawnbreaker-1",
      description:
        "As the events of DARK NIGHTS: METAL rock the DC Universe, the creatures of the Dark Multiverse stand ready to invade our world! How can even the World’s Greatest Heroes stop a horde of deadly beings that appear to be powerful, nightmare versions of familiar figures?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070346/Dark%20C%C3%B3mics./C%C3%B3mics/in8ig4vo0l0lyglul5wf.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070346/Dark%20C%C3%B3mics./C%C3%B3mics/qp9ktfxmfa4mdrlxejeg.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070346/Dark%20C%C3%B3mics./C%C3%B3mics/uiv3rgque1t8gqzqe45o.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070347/Dark%20C%C3%B3mics./C%C3%B3mics/gzek1ffqdxfl3rojfa9i.jpg",
      ],
      art_by: "Ethan Van Sciver",
      written_by: "Sam Humphries",
      series: "Dark Nights: Metal 2017",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2017-10-04",
      page_count: 32,
      price: 3.99,
      inStock: 12,
    },
    {
      title: "Catwoman #48",
      character: "Catwoman",
      slug: "catwoman-48",
      description:
        "Some of the nastiest villains in the DCU have laid siege to the East End, and Catwoman is the only thing keeping them from running riot! But now that she's dead center in their sights, even Batman won't be able to talk her off a path that leads straight into the heart of danger!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070005/Dark%20C%C3%B3mics./C%C3%B3mics/rpk5kknglzlv5u1qnnrt.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070005/Dark%20C%C3%B3mics./C%C3%B3mics/fg4s4t7tszppryg6o2ic.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070005/Dark%20C%C3%B3mics./C%C3%B3mics/ef24qtaekmfewcjioi9d.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070005/Dark%20C%C3%B3mics./C%C3%B3mics/jkp4gjemrlmmwsoowuqn.jpg",
      ],
      art_by: "Jim Balent",
      written_by: "Doug Moench",
      series: "Catwoman 2002",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2005-10-26",
      page_count: 32,
      price: 5.99,
      inStock: 32,
    },
    {
      title: "Before Watchmen: Dr. Manhattan #1",
      character: "Watchmen",
      slug: "before-watchmen-dr-manhattan-1",
      description: `“I watch as a box containing a mystery is lowered into the soil.” And don’t miss the latest chapter of the CRIMSON CORSAIR backup epic from writer and artist JOHN HIGGINS!`,
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069727/Dark%20C%C3%B3mics./C%C3%B3mics/c652ne05gzz2nvz1asxi.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069727/Dark%20C%C3%B3mics./C%C3%B3mics/ohu67ynro9ddrocsfqut.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069727/Dark%20C%C3%B3mics./C%C3%B3mics/qew9fjpspapzxnbpu2dy.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069728/Dark%20C%C3%B3mics./C%C3%B3mics/nrhc8bncpfgilg52oiy6.jpg",
      ],
      art_by: "Adam Hughes",
      written_by: "J. Michael Straczynski",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-08-22",
      page_count: 32,
      price: 2.99,
      inStock: 17,
    },
    {
      title: "Amazing Spider-Man Vol 1 #698",
      character: "Spider-Man",
      slug: "Amazing-spider-man-vol-1-698",
      description:
        "The end of Spider-Man's world begins when Doctor Octopus discovers who Peter Parker really is.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654068161/Dark%20C%C3%B3mics./C%C3%B3mics/obl4yzxmr5v4qtlhfrzw.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068162/Dark%20C%C3%B3mics./C%C3%B3mics/ydm4mov7a8s1mzfggghq.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068162/Dark%20C%C3%B3mics./C%C3%B3mics/tzat32pef8bm1ff3hzhm.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068164/Dark%20C%C3%B3mics./C%C3%B3mics/y5crcmmatbknfacey0cr.jpg",
      ],
      art_by: "Paolo Rivera y Richard Elson",
      written_by: "Dan Slott",
      series: "The Amazing Spider-Man",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2012-10-21",
      page_count: 32,
      price: 4.99,
      inStock: 0,
    },
    {
      title: "Swamp Thing Vol 2 #38",
      character: "Swamp Thing",
      slug: "swamp-thing-vol-2-38",
      description:
        "In Rosewood, Illinois, a group of boys swim in a pond, despite their parents' warnings. Suddenly, the boys realize that the pond is infested with leeches, and they all rush out except Nicky, who has grown unnaturally pale. Just below the surface, vampiric creatures have drained him of all of his blood. The boys are too afraid to go back into the water for him, and they run away. The vampires return to their homes, deep under the water in old Rosewood, the sunken town.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071874/Dark%20C%C3%B3mics./C%C3%B3mics/xvfv03ndkawyf7l8b4u6.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071874/Dark%20C%C3%B3mics./C%C3%B3mics/kbjuze1dobo7d7usxono.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071874/Dark%20C%C3%B3mics./C%C3%B3mics/s7hq5zzrrevujqgih5ca.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071875/Dark%20C%C3%B3mics./C%C3%B3mics/kn13qwxqup7z6yhqeqx5.jpg",
      ],
      art_by: "John Totleben, Tatjana Wood y Stan Woch",
      written_by: "Alan Moore",
      series: "Swamp Thing",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "1985-06-30",
      page_count: 36,
      price: 2.99,

      inStock: 84,
    },
    {
      title: "Batman: The Dark Knight Returns #1",
      character: "Batman",
      slug: "batman-the-dark-knight-returns-1",
      description:
        "This masterpiece of comics storytelling brings to life a dark world...and an even darker man. Frank Miller completely reinvents the legend of Batman in his saga of a near-future Gotham City gone to rot, ten years after the Dark Knight's retirement.\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069035/Dark%20C%C3%B3mics./C%C3%B3mics/pbnepaw9h7tvd11z2doz.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069034/Dark%20C%C3%B3mics./C%C3%B3mics/fxbf4dk0zfcrl9fya8fj.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069035/Dark%20C%C3%B3mics./C%C3%B3mics/twgpcd1mgxvrckddv9lb.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069035/Dark%20C%C3%B3mics./C%C3%B3mics/dxeimg4rejaqv7amsh1t.jpg",
      ],
      art_by: "Lynn Varley, Frank Miller y John Costanza",
      written_by: "Frank Miller",
      series: "Batman: The Dark Knight Returns",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "1986-06-01",
      page_count: 52,
      price: 2.99,
      inStock: 22,
    },
    {
      title: "Flashpoint #1",
      character: "Flash",
      slug: "flashpoint-1",
      description:
        "Not a dream, not an imaginary story, not an elseworld. This is Flash Fact: when Barry Allen wakes at his desk, he discovers the world has changed. Family is alive, loved ones are strangers, and close friends are different, gone, or worse. It's a world on the brink of a cataclysmic war--but where are Earth's Greatest Heroes to stop it? The DCU world-changing event FLASHPOINT begins here!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070746/Dark%20C%C3%B3mics./C%C3%B3mics/p2pwjyb3ol4sgdiqbj9b.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070746/Dark%20C%C3%B3mics./C%C3%B3mics/mqfbnr6bgtqyyjjuwlsc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070746/Dark%20C%C3%B3mics./C%C3%B3mics/ckpsudtp8gdoobwggwfn.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070747/Dark%20C%C3%B3mics./C%C3%B3mics/q1l1khwskc9epjhelvf4.jpg",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis y Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2011-04-11",
      page_count: 40,
      price: 3.99,
      inStock: 19,
    },
    {
      title: "Marvel Knights Spider-Man #1",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-1",
      description:
        "DOWN AMONG THE DEAD PART 1 Being Spider-Man has put an enormous strain on Peter Parker's personal life. To make matters worse, Spidey must throw down with his greatest foe, the Green Goblin!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071020/Dark%20C%C3%B3mics./C%C3%B3mics/jztlwokbojxlmc2jmc6o.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071021/Dark%20C%C3%B3mics./C%C3%B3mics/jfgchnl1viyxl5ysyi2m.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071022/Dark%20C%C3%B3mics./C%C3%B3mics/x5vhq4n4woymxut586nm.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071023/Dark%20C%C3%B3mics./C%C3%B3mics/mcmoxotvhejwnxbtauxu.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-05-14",
      page_count: 23,
      price: 2.99,
      inStock: 71,
    },
    {
      title: "Preacher Book One",
      character: "Preacher",
      slug: "preacher-book-one",
      description:
        "In this now-legendary graphic novel series that serves as the inspiration for the hit AMC television series, Jesse Custer was just a small-town preacher in Texas... until his congregation was flattened by powers beyond his control and the Preacher became imbued with abilities beyond anyone's understanding.\nNow possessed by Genesis—the unholy coupling of an angel and demon—Jesse holds Word of God, an ability to command anyone or anything with a mere utterance. And he’ll use this power to hold the Lord accountable for the people He has forsaken.\nFrom the ashes of a small-town church to the bright lights of New York City to the backwoods of Louisiana, Jesse Custer cuts a righteous path across the soul of America in his quest for the divine—an effort that will be met by every evil that Heaven and Earth can assemble. Joined by his gun-toting girlfriend, Tulip, and the hard-drinking Irish vampire, Cassidy, Jesse will stop at nothing to fulfill his quest to find God.\nThe creative powerhouse team of Garth Ennis and Steve Dillon bring readers on a violent and riotous journey across the country in this award-winning Vertigo series, beginning with Preacher Book One. Collects issues #1-12.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071266/Dark%20C%C3%B3mics./C%C3%B3mics/a8bkifpllljv4atf9l1t.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071266/Dark%20C%C3%B3mics./C%C3%B3mics/cuovyvl9fdyd5tl4nrum.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071266/Dark%20C%C3%B3mics./C%C3%B3mics/ekzvxfka2khv4sjfxdh5.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071266/Dark%20C%C3%B3mics./C%C3%B3mics/mhpyf4gqnikbdnqu2ftg.jpg",
      ],
      art_by: "Steven Dillon",
      written_by: "Garth Ennis",
      series: "Peacher",
      publisher: "DC Black Label",
      type: "Comic Book",

      on_sale_date: "2013-05-18",
      page_count: 352,
      price: 14.99,
      inStock: 12,
    },
    {
      title: "Doom Patrol (2004-2006) #1",
      character: "Doom Patrol",
      slug: "doom-patrol-1",
      description:
        "The original World’s Strangest Heroes are back, in the way that only the legendary John Byrne can deliver! Picking up in the wake of the events of “The Tenth Circle” saga in JLA, this series reunites Robotman, Elasti-Girl, Negative Man and Niles Caulder with a host of edgy new superheroes! They’ve defeated the vampire Crucifer...or have they?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070392/Dark%20C%C3%B3mics./C%C3%B3mics/rfzk3ovcrurfof0ufs5e.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070392/Dark%20C%C3%B3mics./C%C3%B3mics/ax4stnug8m0cepzlqfdw.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070393/Dark%20C%C3%B3mics./C%C3%B3mics/k9k985ermkrhzl7rbkta.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070394/Dark%20C%C3%B3mics./C%C3%B3mics/glnda0lvcylpjfrd7av8.jpg",
      ],
      art_by: "Todd Klein y Doug Hazlewood",
      written_by: "John Byrne",
      series: "Doom Patrol(2004-2006)",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2004-06-30",
      page_count: 21,
      price: 2.99,
      inStock: 22,
    },
    {
      title: "Doom Patrol (2004-2006) #2",
      slug: "doom-patrol-2",
      character: "Doom Patrol",
      description:
        "The newly formed DP springs into action against several escaped “specimens” in Caulder’s facility!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070455/Dark%20C%C3%B3mics./C%C3%B3mics/hahdy861jvke8odwayd8.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070454/Dark%20C%C3%B3mics./C%C3%B3mics/bmp7by70rly0cqabfssv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070454/Dark%20C%C3%B3mics./C%C3%B3mics/xwcysqgmnxt6sthxiaip.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070453/Dark%20C%C3%B3mics./C%C3%B3mics/gytr7ugdrb7xqfvnypvd.jpg",
      ],
      art_by: "Todd Klein y Doug Hazlewood",
      written_by: "John Byrne",
      series: "Doom Patrol(2004-2006)",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2004-07-28",
      page_count: 23,
      price: 2.99,
      inStock: 22,
    },
    {
      title: "Batman: Damned #2",
      slug: "batman-damned-2",
      character: "Batman",
      description:
        "As Batman’s descent into the madness of Gotham City’s decadent underbelly continues, he must try to exorcise some of his demons…and who better to help than the Demon, Etrigan himself. And where there’s demons, there’s also a Deadman, a Spectre, an Enchantress and a host of other supernatural friends and foes—it’s a veritable Grand Guignol!",

      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654068605/Dark%20C%C3%B3mics./C%C3%B3mics/a01v1shrgfyq3r6srtez.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068605/Dark%20C%C3%B3mics./C%C3%B3mics/f5bruudjhmr8ghi5stwi.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068605/Dark%20C%C3%B3mics./C%C3%B3mics/k2kvasdks9167pbenjrv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068606/Dark%20C%C3%B3mics./C%C3%B3mics/sz6r93qtmql0fxt2t8js.jpg",
      ],
      art_by: "Lee Bermejo",
      written_by: "Brian Azarello",
      series: "Batman: Damned",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2018-12-04",
      page_count: 48,
      price: 6.99,
      inStock: 10,
    },
    {
      title: "Batman: Damned #3",
      slug: "batman-damned-3",
      character: "Batman",

      description:
        "The stunning conclusion to the groundbreaking miniseries by the critically acclaimed team of writer Brian Azzarello and artist Lee Bermejo is here! Batman’s most baffling case brings him face to face with his worst nightmare in this highly anticipated finale!",

      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654068978/Dark%20C%C3%B3mics./C%C3%B3mics/dajibzktld7vinwlxrqk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068979/Dark%20C%C3%B3mics./C%C3%B3mics/rsemumgqnjpsgzniuxzx.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068980/Dark%20C%C3%B3mics./C%C3%B3mics/s5qn7wnhkgxnotbhsahk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654068983/Dark%20C%C3%B3mics./C%C3%B3mics/pbr2sm3xlqdil192wubp.jpg",
      ],
      art_by: "Lee Bermejo y Jim Lee",
      written_by: "Brian Azarello",
      series: "Batman: Damned",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2019-06-26",
      page_count: 48,
      price: 6.99,
      inStock: 5,
    },
    {
      title: "Batman: The Dark Knight Returns #2",
      slug: "batman-the-dark-knight-returns-2",
      character: "Batman",
      description:
        "The iconic series continues as a new Robin debuts and a gang of violent mutants stakes a claim on the streets of Gotham City. Unfortunately for them, The Dark Knight is about to prove that these streets are his, and he has a battle tank of a Batmobile to back him up!\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069117/Dark%20C%C3%B3mics./C%C3%B3mics/hbdvpyi9vwmoryheoysz.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069116/Dark%20C%C3%B3mics./C%C3%B3mics/iax08rpknsyd6qpbnah3.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069114/Dark%20C%C3%B3mics./C%C3%B3mics/ywsfm0feveaygddf8fzm.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069113/Dark%20C%C3%B3mics./C%C3%B3mics/oxpqefypa8q9bq9frlwv.jpg",
      ],
      art_by: "Lynn Varley, Frank Miller y John Costanza",
      written_by: "Frank Miller",
      series: "Batman: The Dark Knight Returns",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2010-11-10",
      page_count: 52,
      price: 6.99,
      inStock: 23,
    },
    {
      title: "Batman: The Dark Knight Returns #3",
      slug: "batman-the-dark-knight-returns-3",
      character: "Batman",
      description:
        "What ever happened to Batman's greatest ally and his most dangerous foe? Find out here as The Man of Steel and the Joker both make explosive returns to the life of The Dark Knight. And you won't believe the vicious final confrontation between the Clown Prince of Crime and the Caped Crusader!\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069184/Dark%20C%C3%B3mics./C%C3%B3mics/ip1nb4nqccitqwe0km8d.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069186/Dark%20C%C3%B3mics./C%C3%B3mics/g6ydd58wpfy7lcpwxviv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069187/Dark%20C%C3%B3mics./C%C3%B3mics/rpxs1vivfskp4xkqbkix.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069188/Dark%20C%C3%B3mics./C%C3%B3mics/flgkvgrfrup3rwgdbqow.jpg",
      ],
      art_by: "Lynn Varley, Frank Miller y John Costanza",
      written_by: "Frank Miller",
      series: "Batman: The Dark Knight Returns",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2010-11-10",
      page_count: 52,
      price: 6.99,
      inStock: 42,
    },
    {
      title: "Batman: The Dark Knight Returns #4",
      slug: "batman-the-dark-knight-returns-4",
      character: "Batman",
      description:
        "In this final legendary issue, it's Batman vs. Superman with the fate of the Earth at their feet. Nuclear Armageddon stands just within reach as the two biggest heroes on earth battle it out and the world watches on. Can The Dark Knight possibly take down the Man of Steel?\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069383/Dark%20C%C3%B3mics./C%C3%B3mics/orzxnloi73a2kidhnyyr.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069382/Dark%20C%C3%B3mics./C%C3%B3mics/olgb7ivcyyvqdwiieydk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069383/Dark%20C%C3%B3mics./C%C3%B3mics/znjiksqyx64wrlnvqzps.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069384/Dark%20C%C3%B3mics./C%C3%B3mics/q2qexvlxyeuovpqdoihd.jpg",
      ],
      art_by: "Lynn Varley, Frank Miller y John Costanza",
      written_by: "Frank Miller",
      series: "Batman: The Dark Knight Returns",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2010-11-10",
      page_count: 52,
      price: 6.99,
      inStock: 0,
    },
    {
      title: "Batman: The Killing Joke",
      slug: "batman-the-killing-joke",
      character: "Batman",
      description:
        "A NEW YORK TIMES Bestseller!\nPresented for the first time with stark, stunning new coloring by Brian Bolland, BATMAN: THE KILLING JOKE is Alan Moore's unforgettable meditation on the razor-thin line between sanity and insanity, heroism and villainy, comedy and tragedy.\nAccording to the grinning engine of madness and mayhem known as the Joker, that's all that separates the sane from the psychotic. Freed once again from the confines of Arkham Asylum, he's out to prove his deranged point. And he's going to use Gotham City's top cop, Commissioner Jim Gordon, and the Commissioner's brilliant and beautiful daughter Barbara to do it.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069436/Dark%20C%C3%B3mics./C%C3%B3mics/ci1yijdvzxfrnmbrdbgp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069435/Dark%20C%C3%B3mics./C%C3%B3mics/sozcwykbll2hdqgesmqz.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069435/Dark%20C%C3%B3mics./C%C3%B3mics/v5dyvfwljagpzsu1zfkl.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069435/Dark%20C%C3%B3mics./C%C3%B3mics/dkqqa6gjf9dibttp5wcb.jpg",
      ],
      art_by: "Brian Bolland",
      written_by: "Alan Moore",
      series: "Batman: The Killing Joke",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2014-12-23",
      page_count: 66,
      price: 9.99,
      inStock: 1,
    },
    {
      title: "Flashpoint #2",
      slug: "flashpoint-2",
      character: "Flash",
      description:
        "The world-changing miniseries continues! Where are the World's Greatest Super Heroes? Barry Allen is on a mission to find out or die trying – and that may be what's happening as he tries to make lightning strike twice! Meanwhile, around the submerged Paris, the pirate Deathstroke confronts Emperor Aquaman!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070789/Dark%20C%C3%B3mics./C%C3%B3mics/qqlsjisqxykqm46t5cqn.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070789/Dark%20C%C3%B3mics./C%C3%B3mics/avgdkqwcmkxl2hbvxxit.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070788/Dark%20C%C3%B3mics./C%C3%B3mics/h8wmaz4fhko40ivxcmsq.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070788/Dark%20C%C3%B3mics./C%C3%B3mics/ygeladbuf7aturn5kwem.jpg",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis y Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2011-06-01",
      page_count: 40,
      price: 4.99,
      inStock: 5,
    },
    {
      title: "Flashpoint #3",
      slug: "flashpoint-3",
      character: "Flash",
      description:
        "FLASH QUESTION: Will The Flash and his new allies be able to fix the world?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070840/Dark%20C%C3%B3mics./C%C3%B3mics/zywqorj0rquyqnnadkan.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070840/Dark%20C%C3%B3mics./C%C3%B3mics/qwufp0evvip8ytqbzfu9.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070840/Dark%20C%C3%B3mics./C%C3%B3mics/dhz2qrpcdvhpwpewjdyb.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070840/Dark%20C%C3%B3mics./C%C3%B3mics/o1jr26ic0jroevasnuwr.jpg",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis y Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2011-07-06",
      page_count: 32,
      price: 4.99,
      inStock: 0,
    },
    {
      title: "Flashpoint #4",
      slug: "flashpoint-4",
      character: "Flash",
      description:
        "FLASH FACT: The war between the Amazons and the Atlantians has arrived. The battle between Diana of Themyscira and Emperor Aquaman will tear this world apart – unless The Flash can fix it!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070890/Dark%20C%C3%B3mics./C%C3%B3mics/dm5ikdmfosp6z23ravun.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070889/Dark%20C%C3%B3mics./C%C3%B3mics/bmsnlcyht1hvh9ubvzni.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070889/Dark%20C%C3%B3mics./C%C3%B3mics/ijkgasu1stz9pllaopcc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070888/Dark%20C%C3%B3mics./C%C3%B3mics/ryqgtzabh9npetmulw4t.jpg",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis y Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2011-08-03",
      page_count: 40,
      price: 4.99,
      inStock: 32,
    },
    {
      title: "Flashpoint #5",
      slug: "flashpoint-5",
      character: "Flash",
      description:
        "FLASH FACT: The war between the Amazons and the Atlantians has arrived. The battle between Diana of Themyscira and Emperor Aquaman will tear this world apart – unless The Flash can fix it!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070950/Dark%20C%C3%B3mics./C%C3%B3mics/csmbohpibhvqkbjitcwp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070950/Dark%20C%C3%B3mics./C%C3%B3mics/ligfc4y3ua36zozlzgvx.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070950/Dark%20C%C3%B3mics./C%C3%B3mics/px149qonmetzba7svxle.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070951/Dark%20C%C3%B3mics./C%C3%B3mics/uwv77igjw1d4zdjlvkiz.jpg",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis y Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2011-08-31",
      page_count: 40,
      price: 4.99,
      inStock: 0,
    },
    {
      title: "Flash: The Fastest Man Alive #1",
      slug: "flash-the-fastest-man-alive-1",
      character: "Flash",
      description:
        "Who is the Flash? Following the events of INFINITE CRISIS, Wally West is no longer the Fastest Man Alive. Instead, former Kid Flash Bart Allen has taken up the mantle, but why is Bart suddenly much older than he was before?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070569/Dark%20C%C3%B3mics./C%C3%B3mics/pdokplk0zlcvdigygq7w.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070568/Dark%20C%C3%B3mics./C%C3%B3mics/vvdo0cgqdnhqyzh0gebm.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070568/Dark%20C%C3%B3mics./C%C3%B3mics/s7ogh20skrwbemvzth75.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070569/Dark%20C%C3%B3mics./C%C3%B3mics/lrnmp4udnuvxeivaiuaz.jpg",
      ],
      art_by: "Ken Lashley, Andy Kubert, Joe Kubert y Dave Stewart",
      written_by: "Jimmy Palmiotti, Justin Gray, Paul De Meo y Danny Bilson",
      series: "Flash: The Fastest Man Alive 2006",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2006-06-21",
      page_count: 23,
      price: 3.99,
      inStock: 12,
    },
    {
      title: "Flash: The Fastest Man Alive #2",
      slug: "flash-the-fastest-man-alive-2",
      character: "Flash",
      description:
        "The Flash's closest friends and allies aren't on his side anymore. One feels lied to...another is hiding a dangerous family secret...and another is about to steal his thunder by making a play to be Keystone's hero!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070615/Dark%20C%C3%B3mics./C%C3%B3mics/eu4az6qgy9fkh6dcsk7n.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070614/Dark%20C%C3%B3mics./C%C3%B3mics/wihbsrat4dbdy4rghdni.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070614/Dark%20C%C3%B3mics./C%C3%B3mics/rikff1pfqljwhsmoyib4.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070616/Dark%20C%C3%B3mics./C%C3%B3mics/gd7qtpixehttdnuvhhvw.jpg",
      ],
      art_by: "Ken Lashley, Andy Kubert, Joe Kubert y Dave Stewart",
      written_by: "Jimmy Palmiotti, Justin Gray, Paul De Meo y Danny Bilson",
      series: "Flash: The Fastest Man Alive 2006",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2006-07-19",
      page_count: 22,
      price: 3.99,
      inStock: 10,
    },
    {
      title: "Flash: The Fastest Man Alive #3",
      slug: "flash-the-fastest-man-alive-3",
      character: "Flash",
      description:
        "Who's giving the Flash a run for his money as the new hero of Keystone?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070662/Dark%20C%C3%B3mics./C%C3%B3mics/auaynnhdt9h795flswml.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070661/Dark%20C%C3%B3mics./C%C3%B3mics/bq2vatbgyarks6tuzaeu.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070662/Dark%20C%C3%B3mics./C%C3%B3mics/x20mpi2twtl9i2vairlv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070663/Dark%20C%C3%B3mics./C%C3%B3mics/adqumuw1yeqy8in95nig.jpg",
      ],
      art_by: "Ken Lashley, Andy Kubert, Joe Kubert y Dave Stewart",
      written_by: "Jimmy Palmiotti, Justin Gray, Paul De Meo y Danny Bilson",
      series: "Flash: The Fastest Man Alive 2006",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2006-08-26",
      page_count: 23,
      price: 3.99,
      inStock: 12,
    },
    {
      title: "Flash: The Fastest Man Alive #4",
      slug: "flash-the-fastest-man-alive-4",
      character: "Flash",
      description:
        "The Flash loses his heart-- and maybe even more-- as the Speed Force's secret is revealed!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070699/Dark%20C%C3%B3mics./C%C3%B3mics/ep9zxq5pj7w4qnqcmth9.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070699/Dark%20C%C3%B3mics./C%C3%B3mics/uqcwfscobshu5lraotfp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070700/Dark%20C%C3%B3mics./C%C3%B3mics/we3efavjln7fgypmna4a.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070701/Dark%20C%C3%B3mics./C%C3%B3mics/vipimxzmdaq4xc2guqfa.jpg",
      ],
      art_by: "Ken Lashley, Andy Kubert, Joe Kubert y Dave Stewart",
      written_by: "Jimmy Palmiotti, Justin Gray, Paul De Meo y Danny Bilson",
      series: "Flash: The Fastest Man Alive 2006",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2006-09-20",
      page_count: 23,
      price: 3.99,
      inStock: 12,
    },
    {
      title: "Superman: Doomed #1",
      slug: "superman-doomed-1",
      character: "Superman",
      description: `"Superman: Doomed!" part 1. The Man of Steel must unleash insane levels of power in order to defeat the monster known as Doomsday, but beating his enemy is only the beginning of the battle. Continued in ACTION COMICS (2011- ) #31.`,
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071625/Dark%20C%C3%B3mics./C%C3%B3mics/h3onphzhbagok6g5ra6d.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071625/Dark%20C%C3%B3mics./C%C3%B3mics/osk7rhnln02g7uvoertc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071628/Dark%20C%C3%B3mics./C%C3%B3mics/qbe46fsumewze2gyfusl.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071623/Dark%20C%C3%B3mics./C%C3%B3mics/z8njmfsfybnjxazhxlmq.jpg",
      ],
      art_by: "Ken Lashley",
      written_by: "Scott Lobdell",
      series: "Superman: Doomed",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2014-05-14",
      page_count: 38,
      price: 3.99,
      inStock: 12,
    },
    {
      title: "Superman: Doomed #2",
      slug: "superman-doomed-2",
      character: "Superman",
      description: `"Superman: Doomed" Part 14! Continued from SUPERMAN/WONDER WOMAN #11! The Monster of Steel must once again go up against the first threat he ever faced: a villain who now has the power to warp reality with a thought.`,
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071674/Dark%20C%C3%B3mics./C%C3%B3mics/crmajmvlxentl7qkirat.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071674/Dark%20C%C3%B3mics./C%C3%B3mics/z5yvlxb3qbkjnnuftzgu.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071675/Dark%20C%C3%B3mics./C%C3%B3mics/qckwk9gwu7l8xoovrmth.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071675/Dark%20C%C3%B3mics./C%C3%B3mics/pzd1q81kwqd4133plz21.jpg",
      ],
      art_by: "Ken Lashley",
      written_by: "Scott Lobdell",
      series: "Superman: Doomed",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2014-07-24",
      page_count: 43,
      price: 3.99,
      inStock: 21,
    },
    {
      title: "Superman: Year One #1",
      slug: "superman-year-one-1",
      character: "Superman",
      description:
        "From the burning world of Krypton to the bucolic fields of Kansas, the first chapter of SUPERMAN YEAR ONE tracks Clark Kent’s youth in Kansas, as he comes to terms with his strange powers and struggles to find his place in our world. DC BLACK LABEL is proud to present the definitive origin of Superman as rendered by the legendary comics creators Frank Miller and John Romita Jr.!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071777/Dark%20C%C3%B3mics./C%C3%B3mics/zixvvbcuxyovqaudnine.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071777/Dark%20C%C3%B3mics./C%C3%B3mics/lmbv6v3h5q2z2nef3ho5.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071778/Dark%20C%C3%B3mics./C%C3%B3mics/prph5at78dfwtes27ocy.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071778/Dark%20C%C3%B3mics./C%C3%B3mics/vnk0lchuixqxcpucskkn.jpg",
      ],
      art_by: "Alex Sinclair, John Romita Jr. y Danny Miki",
      written_by: "Frank Miller",
      series: "Superman: Year One",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2019-06-19",
      page_count: 67,
      price: 7.99,
      inStock: 12,
    },
    {
      title: "Superman: Year One #2",
      slug: "superman-year-one-2",
      character: "Superman",
      description:
        "Clark Kent’s journey of self-discovery continues in the second installment of Frank Miller and John Romita Jr.’s remarkable reimagining of Superman’s origin story. This chapter takes young Clark to the Pacific coast and beyond, as he discovers a place as sensational as he is…Atlantis! There he meets new people, finds love, clashes with gargantuan beasts and discovers the man he’s meant to be.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071806/Dark%20C%C3%B3mics./C%C3%B3mics/knxplopow7jsy57ec7b3.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071806/Dark%20C%C3%B3mics./C%C3%B3mics/vntwgdesorto0us6wx4y.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071806/Dark%20C%C3%B3mics./C%C3%B3mics/ojbksjese8dafs2qu4ik.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071806/Dark%20C%C3%B3mics./C%C3%B3mics/r2nuzbmkc9m2s3i3f7f9.jpg",
      ],
      art_by: "Alex Sinclair, John Romita Jr. y Danny Miki",
      written_by: "Frank Miller",
      series: "Superman: Year One",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2019-08-21",
      page_count: 65,
      price: 7.99,
      inStock: 3,
    },
    {
      title: "Superman: Year One #3",
      slug: "superman-year-one-3",
      character: "Superman",
      description:
        "It’s the jaw-dropping conclusion to Frank Miller and John Romita Jr.’s blockbuster reimagining of Superman’s origin! In this final chapter, Clark Kent arrives in Metropolis, the city where he will fulfill his heroic destiny. Witness the first meeting between Superman and Lois Lane, the beginnings of Clark Kent’s career at the Daily Planet, and the birth of his rivalry with Lex Luthor. But when The Joker arrives on the scene, the Man of Steel must enlist the help of his two strange new friends: Wonder Woman and Batman!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071841/Dark%20C%C3%B3mics./C%C3%B3mics/rulmpwlt5tcpyvsbxeqo.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071841/Dark%20C%C3%B3mics./C%C3%B3mics/oxd6k8wl75vxvtqafcpw.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071841/Dark%20C%C3%B3mics./C%C3%B3mics/fryqymhr7cultovp76wp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071841/Dark%20C%C3%B3mics./C%C3%B3mics/xmxmbjomcmsec7dlrda8.jpg",
      ],
      art_by: "Alex Sinclair, John Romita Jr. y Danny Miki",
      written_by: "Frank Miller",
      series: "Superman: Year One",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2019-10-16",
      page_count: 66,
      price: 7.99,
      inStock: 12,
    },
    {
      title: "Before Watchmen: Dr. Manhattan #2",
      slug: "before-watchmen-dr-manhattan-2",
      character: "Watchmen",
      description:
        "Lightning never strikes the same place twice, remember?” And don’t miss the latest sensational chapter of the CRIMSON CORSAIR, from writer and artist JOHN HIGGINS.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069847/Dark%20C%C3%B3mics./C%C3%B3mics/n3drtkillo2ckg74th2q.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069845/Dark%20C%C3%B3mics./C%C3%B3mics/gzygqd2a3jnmlpba6blq.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069845/Dark%20C%C3%B3mics./C%C3%B3mics/mjzx6r9e6mbgmva4bji6.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069845/Dark%20C%C3%B3mics./C%C3%B3mics/nunxojpnditvxkhhcomh.jpg",
      ],
      art_by: "Adam Hughes",
      written_by: "J. Michael Straczynski",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-01-01",
      page_count: 29,
      price: 2.99,
      inStock: 17,
    },
    {
      title: "Before Watchmen: Dr. Manhattan #3",
      slug: "before-watchmen-dr-manhattan-3",
      character: "Watchmen",
      description:
        "Dr. Manhattan can now see the scope of the damage he’s done to the cosmic order—but is there a way to repair it? And what incident from his own past holds the key to understanding where he went wrong?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069911/Dark%20C%C3%B3mics./C%C3%B3mics/pwolp6qsmyv9qjxawzcb.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069912/Dark%20C%C3%B3mics./C%C3%B3mics/hjeltd72ba1jtqtivtuc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069913/Dark%20C%C3%B3mics./C%C3%B3mics/g1ce1gakheyhdksph3dm.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069913/Dark%20C%C3%B3mics./C%C3%B3mics/vwv6inwjpasbs5jsyvqq.jpg",
      ],
      art_by: "Adam Hughes",
      written_by: "J. Michael Straczynski",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-12-12",
      page_count: 28,
      price: 2.99,
      inStock: 17,
    },
    {
      title: "Before Watchmen: Dr. Manhattan #4",
      slug: "before-watchmen-dr-manhattan-4",
      character: "Watchmen",
      description:
        "Dr. Manhattan has put everything back in the box-or has he? Has he left footprints on the face of time itself, and what awe-inspiring responsibility has he entrusted to Ozymandias, of all people?\nThis book contains upside-down and sideways pages. To maximize the reading experience, you may want to lock the orientation on your device.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069949/Dark%20C%C3%B3mics./C%C3%B3mics/u513doj4lkbxqxzqii5o.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069949/Dark%20C%C3%B3mics./C%C3%B3mics/hpydygquo7tquzcq8gsp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069949/Dark%20C%C3%B3mics./C%C3%B3mics/kgaote5znqqfgs2e4vpv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069949/Dark%20C%C3%B3mics./C%C3%B3mics/mmd4gik4npuh4rgcj6rx.jpg",
      ],
      art_by: "Adam Hughes",
      written_by: "J. Michael Straczynski",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2013-02-27",
      page_count: 25,
      price: 2.99,
      inStock: 17,
    },
    {
      title: "Before Watchmen: Comedian #1",
      slug: "before-watchmen-comedian-1",
      character: "Watchmen",
      description:
        "What happens when you find out the whole world is a joke? You become the Comedian. Writer Brian Azzarello teams with artist J.G. Jones to explore the mad mind of one of WATCHMEN's darkest characters.\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069524/Dark%20C%C3%B3mics./C%C3%B3mics/pdlqovwccpwdlbhwamfo.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069524/Dark%20C%C3%B3mics./C%C3%B3mics/er8gcy3onpbl7gbzc3ll.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069524/Dark%20C%C3%B3mics./C%C3%B3mics/pdzynuplmd3cw8wijdrr.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069525/Dark%20C%C3%B3mics./C%C3%B3mics/ypk83jv2tvyslvwuppga.jpg",
      ],
      art_by: "John Higgins, J.G. Jones y Alex Sinclair",
      written_by: "Brian Azzarello",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-06-20",
      page_count: 27,
      price: 2.99,
      inStock: 12,
    },
    {
      title: "Before Watchmen: Comedian #2",
      slug: "before-watchmen-comedian-2",
      character: "Watchmen",
      description:
        "What happens when you find out the whole world is a joke? You become the Comedian. Writer Brian Azzarello teams with artist J.G. Jones to explore the mad mind of one of WATCHMEN's darkest characters.\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069601/Dark%20C%C3%B3mics./C%C3%B3mics/wc8iioaxzxot5py1gln1.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069601/Dark%20C%C3%B3mics./C%C3%B3mics/jhln20vys3z9kzmqgtzp.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069602/Dark%20C%C3%B3mics./C%C3%B3mics/h8uykzowbysjkgrmta26.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069602/Dark%20C%C3%B3mics./C%C3%B3mics/ugioq5r1enfzvhjgzsrt.jpg",
      ],
      art_by: "John Higgins, J.G. Jones y Alex Sinclair",
      written_by: "Brian Azzarello",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-12-19",
      page_count: 25,
      price: 2.99,
      inStock: 11,
    },
    {
      title: "Before Watchmen: Comedian #3",
      slug: "before-watchmen-comedian-3",
      character: "Watchmen",
      description:
        "What happens when you find out the whole world is a joke? You become the Comedian. Writer Brian Azzarello teams with artist J.G. Jones to explore the mad mind of one of WATCHMEN's darkest characters.\nNOTE: This series contains material suggested for mature readers.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654069656/Dark%20C%C3%B3mics./C%C3%B3mics/fij8tc2zqmjsslx2gkpx.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069656/Dark%20C%C3%B3mics./C%C3%B3mics/kyrzzbuufucbcd3uywj0.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069656/Dark%20C%C3%B3mics./C%C3%B3mics/ce19z9ogkmccssqflvfh.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654069656/Dark%20C%C3%B3mics./C%C3%B3mics/dudeur2ikjo972qtb5jk.jpg",
      ],
      art_by: "John Higgins, J.G. Jones y Alex Sinclair",
      written_by: "Brian Azzarello",
      series: "Before Watchmen 2012",
      publisher: "DC Cómics",
      type: "Comic Book",

      on_sale_date: "2012-12-19",
      page_count: 25,
      price: 2.99,
      inStock: 13,
    },
    {
      title: "Marvel Knights Spider-Man #2",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-2",
      description:
        "Spider-Man is no longer in control! Can the Avengers help everyone's favorite web-headed super hero?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071064/Dark%20C%C3%B3mics./C%C3%B3mics/qke975py2kcju3c2zeba.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071063/Dark%20C%C3%B3mics./C%C3%B3mics/fh0k5gcszehqnj8fh8eh.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071063/Dark%20C%C3%B3mics./C%C3%B3mics/bkbwscman2uwdgwqwp4c.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071067/Dark%20C%C3%B3mics./C%C3%B3mics/glhj9zjbi4qz0dtzhuhw.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-05-12",
      page_count: 26,
      price: 2.99,
      inStock: 21,
    },
    {
      title: "Marvel Knights Spider-Man #3",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-3",
      description: "Spider-Man versus Electro in a brutal confrontation!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071109/Dark%20C%C3%B3mics./C%C3%B3mics/eipict6cghqouwlsb8lx.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071107/Dark%20C%C3%B3mics./C%C3%B3mics/ucvb85a7rcxq3zevzded.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071109/Dark%20C%C3%B3mics./C%C3%B3mics/a6wmarw2hwlx4g8ch9i3.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071109/Dark%20C%C3%B3mics./C%C3%B3mics/m7p1bl8tc2vsgrj0ralt.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-06-09",
      page_count: 23,
      price: 2.99,
      inStock: 12,
    },
    {
      title: "Marvel Knights Spider-Man #4",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-4",
      description:
        "Peter's loved one is still missing? Can he defeat his most vile enemies and make a daring rescue before it is too late?!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071146/Dark%20C%C3%B3mics./C%C3%B3mics/z2cnmnyb3xjuo7tjihoo.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071145/Dark%20C%C3%B3mics./C%C3%B3mics/n6dghcgqznjtvuihamnk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071145/Dark%20C%C3%B3mics./C%C3%B3mics/qdoikg1eqdwlet5pwdry.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071144/Dark%20C%C3%B3mics./C%C3%B3mics/kf8v9hwrqnm3s9vvvaph.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-07-14",
      page_count: 24,
      price: 2.99,
      inStock: 19,
    },
    {
      title: "Marvel Knights Spider-Man #5",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-5",
      description:
        "Doc Ock is on a rampage! With Peter in terrible shape after a vicious encounter with the Vulture, will Spidey have what it takes to defeat Doctor Octopus?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071180/Dark%20C%C3%B3mics./C%C3%B3mics/eszyfcjxl8b1u0is4dnk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071180/Dark%20C%C3%B3mics./C%C3%B3mics/nhbxrk9ks5c5pgh1ryhg.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071181/Dark%20C%C3%B3mics./C%C3%B3mics/q8ivlxsaut0x9vuovjms.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071181/Dark%20C%C3%B3mics./C%C3%B3mics/do0pedlagpbd03erovua.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-08-11",
      page_count: 25,
      price: 2.99,
      inStock: 10,
    },
    {
      title: "Marvel Knights Spider-Man #6",
      character: "Spider-Man",
      slug: "marvel-knights-spider-man-6",
      description:
        "To find Aunt May, Spidey heads to Xavier's School for Gifted Youngsters to enlist the help of the X-Men!",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071227/Dark%20C%C3%B3mics./C%C3%B3mics/in1wdlvjupynjzshxusk.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071225/Dark%20C%C3%B3mics./C%C3%B3mics/k1svtfp8jbqmoydx2bld.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071226/Dark%20C%C3%B3mics./C%C3%B3mics/fcsb4riy3z6tk5dncqj9.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071227/Dark%20C%C3%B3mics./C%C3%B3mics/ke1ikkhxpmbj6lij4qzf.jpg",
      ],
      art_by: "Terry Dodson y Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-09-08",
      page_count: 25,
      price: 2.99,
      inStock: 8,
    },
    {
      title: "Secret Invasion: X-Men #1",
      character: "X-Men",
      slug: "secret-invasion-x-men-1",
      description:
        "The Skrulls don't expect the X-Men when they hit San Francisco, but that doesn't mean they don't have something prepared for Cyclops and his army when they find them at their new home.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071350/Dark%20C%C3%B3mics./C%C3%B3mics/lbxqsms8u0mdmz5rsefa.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071350/Dark%20C%C3%B3mics./C%C3%B3mics/jcjqsd9pqtacwwlkuidg.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071350/Dark%20C%C3%B3mics./C%C3%B3mics/mgrog9egntde5domirlc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071349/Dark%20C%C3%B3mics./C%C3%B3mics/anyvxx5agin2ewamomvy.jpg",
      ],
      art_by: "Cary Nord",
      written_by: "Mike Carey",
      series: "Secret invasion",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2008-08-13",
      page_count: 22,
      price: 1.99,
      inStock: 10,
    },
    {
      title: "Secret Invasion: X-Men #2",
      character: "X-Men",
      slug: "secret-invasion-x-men-2",
      description:
        "The X-Men's guerilla war enters a new phase. But Nightcrawler is being subverted by a lost Skrull bible, and the Beast's search for a last-ditch anti-Skrull weapon requires one extra ingredient: a Super-Skrull to dissect...",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071398/Dark%20C%C3%B3mics./C%C3%B3mics/aptl9iblgblpbenrte7c.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071397/Dark%20C%C3%B3mics./C%C3%B3mics/vsoohwtlyeuhkrelcvin.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071398/Dark%20C%C3%B3mics./C%C3%B3mics/btwhcpk4vck7q3zjmrjq.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071399/Dark%20C%C3%B3mics./C%C3%B3mics/qwkpsexpwvhowkfzmrxr.jpg",
      ],
      art_by: "Cary Nord",
      written_by: "Mike Carey",
      series: "Secret invasion",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2008-09-10",
      page_count: 24,
      price: 1.99,
      inStock: 10,
    },
    {
      title: "Secret Invasion: X-Men #3",
      character: "X-Men",
      slug: "secret-invasion-x-men-3",
      description:
        "Emma Frost fights alone against the Skrull thought-wall and Anole goes deep behind enemy lines. Beast searches for the secret weapon that will give the X-Men a decisive advantage: but using it may be worse than losing the war...",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071440/Dark%20C%C3%B3mics./C%C3%B3mics/ib3ys9cb6w6xs7okaclb.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071440/Dark%20C%C3%B3mics./C%C3%B3mics/c2fmuslngbljb5zsphpv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071440/Dark%20C%C3%B3mics./C%C3%B3mics/k8f69jiwzhwfcpma1rf2.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071439/Dark%20C%C3%B3mics./C%C3%B3mics/clxnerwzh24gdow4h5z4.jpg",
      ],
      art_by: "Cary Nord",
      written_by: "Mike Carey",
      series: "Secret invasion",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2008-10-29",
      page_count: 25,
      price: 1.99,
      inStock: 0,
    },
    {
      title: "Secret Invasion: X-Men #4",
      character: "X-Men",
      slug: "secret-invasion-x-men-4",
      description:
        "The X-Men's tactics force Commander H'Kurrek to take ruthless measures against the people of San Francisco. Thousands of lives are at stake, and there are only minutes left. Are the X-Men prepared to descend to the same brutalities as their enemies?",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654071484/Dark%20C%C3%B3mics./C%C3%B3mics/fziywiqv67awdh5zb8yv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071483/Dark%20C%C3%B3mics./C%C3%B3mics/w39cin3xlxsicxffcfbh.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071483/Dark%20C%C3%B3mics./C%C3%B3mics/nai4yjxlj2qbb5jw9d0b.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654071483/Dark%20C%C3%B3mics./C%C3%B3mics/doogw1zrc9qizwl8xaqi.jpg",
      ],
      art_by: "Cary Nord",
      written_by: "Mike Carey",
      series: "Secret invasion",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2008-11-26",
      page_count: 25,
      price: 1.99,
      inStock: 2,
    },
    {
      title: "Daredevil: Born Again",
      character: "Daredevil",
      slug: "daredevil-born-again",
      description: `"And I -- I have shown him... that a man without hope is a man without fear." The definitive Daredevil tale! Karen Page, Matt Murdock's former lover, has traded away the Man Without Fear's secret identity for a drug fix. Now, Daredevil must find strength as the Kingpin of Crime wastes no time taking him down as low as a human can get.`,
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070079/Dark%20C%C3%B3mics./C%C3%B3mics/byqf3xogoqj6hb0zzstf.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070080/Dark%20C%C3%B3mics./C%C3%B3mics/n7ekqqvrcslsbk6ikxof.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070081/Dark%20C%C3%B3mics./C%C3%B3mics/ryglsyga9i6t61bfiqik.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070082/Dark%20C%C3%B3mics./C%C3%B3mics/n6jhuhmenmo7ritxcswv.jpg",
      ],
      art_by: "David Mazzucchelli",
      written_by: "Frank Miller",
      series: "Daredevil: Born Again",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2014-03-27",
      page_count: 231,
      price: 12.99,
      inStock: 10,
    },
    {
      title: "Daredevil: Reborn #1",
      character: "Daredevil",
      slug: "daredevil-reborn-1",
      description:
        "The apocalyptic events of SHADOWLAND have left the once-proud legacy of Daredevil in tatters. Now, far from the mean streets of Hell's Kitchen, a new evil is rising, and the only man crazy enough to face it is a man with nothing left to lose.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070154/Dark%20C%C3%B3mics./C%C3%B3mics/kn9yvjyh96ux3pmmtuuc.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070153/Dark%20C%C3%B3mics./C%C3%B3mics/ytkk9v5d1en3e0qwppap.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070154/Dark%20C%C3%B3mics./C%C3%B3mics/rjpdjmgu4pr9xb604ehf.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070153/Dark%20C%C3%B3mics./C%C3%B3mics/ytkk9v5d1en3e0qwppap.jpg",
      ],
      art_by: "Davide Gianfelice",
      written_by: "Andy Diggle",
      series: "Daredevil: Reborn",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2011-01-12",
      page_count: 24,
      price: 2.99,
      inStock: 13,
    },
    {
      title: "Daredevil: Reborn #2",
      character: "Daredevil",
      slug: "daredevil-reborn-2",
      description:
        "THE SHADOWLAND FOLLOW-UP CONTINUES! He thought he had left his crime-fighting days behind him. But when Daredevil stumbles across small-town corruption that threatens to erupt into something altogether more deadly, he finds that he cannot deny the hero within.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070198/Dark%20C%C3%B3mics./C%C3%B3mics/hcw501ipdiym2qkkrxn5.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070199/Dark%20C%C3%B3mics./C%C3%B3mics/nmqfztjnicn8mq3xos8w.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070198/Dark%20C%C3%B3mics./C%C3%B3mics/dbam8dveznoj5lhfynps.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070198/Dark%20C%C3%B3mics./C%C3%B3mics/qacb63prln0qyc8jogfw.jpg",
      ],
      art_by: "Davide Gianfelice",
      written_by: "Andy Diggle",
      series: "Daredevil: Reborn",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2011-02-16",
      page_count: 25,
      price: 2.99,
      inStock: 12,
    },
    {
      title: "Daredevil: Reborn #3",
      character: "Daredevil",
      slug: "daredevil-reborn-3",
      description:
        "He thought he was unworthy to wear the mantle of hero. But now, trapped between a corrupt police department and a ruthless gang of killers. Matt Murdock learns that the legacy of Daredevil cannot be denied. One man can make a difference...",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070265/Dark%20C%C3%B3mics./C%C3%B3mics/tfxtkwpcc1gupv67obs2.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070264/Dark%20C%C3%B3mics./C%C3%B3mics/m9amn0ke3hgq0t4vohlg.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070265/Dark%20C%C3%B3mics./C%C3%B3mics/uijk8f0udrhrmvikqigu.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070265/Dark%20C%C3%B3mics./C%C3%B3mics/xtwqinohpl3n5vbj5knv.jpg",
      ],
      art_by: "Davide Gianfelice",
      written_by: "Andy Diggle",
      series: "Daredevil: Reborn",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2011-03-23",
      page_count: 25,
      price: 2.99,
      inStock: 12,
    },
    {
      title: "Daredevil: Reborn #4",
      character: "Daredevil",
      slug: "daredevil-reborn-4",
      description:
        "Is this the final end for Daredevil? For years he was known as the Man Without Fear. But now, trapped in his own very personal hell, Matt Murdock must confront the darkness within himself -- and what he finds there terrifies him to the core.",
      images: [
        "https://res.cloudinary.com/tiz52/image/upload/v1654070307/Dark%20C%C3%B3mics./C%C3%B3mics/diikt1femhls2y3bseoy.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070307/Dark%20C%C3%B3mics./C%C3%B3mics/jwxorcnlcqwatelcgygv.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070307/Dark%20C%C3%B3mics./C%C3%B3mics/u4l3zm0qnfks9neafqoy.jpg",
        "https://res.cloudinary.com/tiz52/image/upload/v1654070307/Dark%20C%C3%B3mics./C%C3%B3mics/t4ku8l2frc7mxp2dsof6.jpg",
      ],
      art_by: "Davide Gianfelice",
      written_by: "Andy Diggle",
      series: "Daredevil: Reborn",
      publisher: "Marvel Cómics",
      type: "Comic Book",

      on_sale_date: "2011-05-11",
      page_count: 25,
      price: 2.99,
      inStock: 1,
    },
  ],
};
