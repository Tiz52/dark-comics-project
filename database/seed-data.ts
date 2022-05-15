export interface SeedComic {
  title: string;
  slug: string;
  description: string[];
  images: string[];
  art_by: string;
  written_by: string;
  series: string;
  publisher: string;
  type: string;
  on_sale_date: string;
  page_count: number;
  price: number;
  avaible: boolean;
}

interface SeedData {
  comics: SeedComic[];
}

export const initialData: SeedData = {
  comics: [
    {
      title: "Batman: Damned #1",
      slug: "batman-damned-1",
      description: [
        "DC BLACK LABEL, the highly anticipated new imprint from DC Comics, starts here!",
        "The Joker is dead.",
        "There is no doubt about that. But whether Batman finally snapped his scrawny neck or some other sinister force in Gotham City did the deed is still a mystery.",
        "Problem is, Batman can't remember...and the more he digs into this labyrinthine case, the more he starts to doubt everything he's uncovering.",
        "So who better to set him straight than…John Constantine? Problem with that is as much as John loves a good mystery, he loves messing with people’s heads even more. So with John’s “help,” the pair will delve into the sordid underbelly of Gotham as they race toward the mind-blowing truth of who murdered The Joker.",
        "BATMAN: DAMNED is a bimonthly super-natural horror story told by two of comics’ greatest modern creators—a visceral thrill-ride that proudly puts the “black” in BLACK LABEL.",
      ],
      images: [
        "Batman_Damned_1_0",
        "Batman_Damned_1_1",
        "Batman_Damned_1_2",
        "Batman_Damned_1_3",
      ],
      art_by: "Lee Bermejo",
      written_by: "Brian Azarello",
      series: "Batman: Damned 2018",
      publisher: "DC Black Label",
      type: "Comic Book",

      on_sale_date: "2018-08-19",
      page_count: 53,
      price: 6.99,
      avaible: true,
    },
    {
      title: "Dark Nights: The Dawnbreaker #1",
      slug: "dark-nights-the-dawnbreaker-1",
      description: [
        "As the events of DARK NIGHTS: METAL rock the DC Universe, the creatures of the Dark Multiverse stand ready to invade our world! How can even the World’s Greatest Heroes stop a horde of deadly beings that appear to be powerful, nightmare versions of familiar figures?",
      ],
      images: [
        "Dark_Nights_The_Dawnbreaker_1_0",
        "Dark_Nights_The_Dawnbreaker_1_1",
        "Dark_Nights_The_Dawnbreaker_1_2",
        "Dark_Nights_The_Dawnbreaker_1_3",
      ],
      art_by: "Ethan Van Sciver",
      written_by: "Sam Humphries",
      series: "Dark Nights: Metal 2017",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "2017-10-04",
      page_count: 32,
      price: 3.99,
      avaible: true,
    },
    {
      title: "Catwoman #48",
      slug: "catwoman-48",
      description: [
        "Some of the nastiest villains in the DCU have laid siege to the East End, and Catwoman is the only thing keeping them from running riot! But now that she's dead center in their sights, even Batman won't be able to talk her off a path that leads straight into the heart of danger!",
      ],
      images: [
        "Catwoman_48_0",
        "Catwoman_48_1",
        "Catwoman_48_2",
        "Catwoman_48_3",
      ],
      art_by: "Jim Balent",
      written_by: "Doug Moench",
      series: "Catwoman 2002",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "2005-10-26",
      page_count: 32,
      price: 2.5,
      avaible: true,
    },
    {
      title: "Before Watchmen: Dr. Manhattan #1",
      slug: "before-watchmen-dr-manhattan-1",
      description: [
        `“I watch as a box containing a mystery is lowered into the soil.” And don’t miss the latest chapter of the CRIMSON CORSAIR backup epic from writer and artist JOHN HIGGINS!`,
      ],
      images: [
        "Before_Watchmen_Dr_Manhattan_1_0",
        "Before_Watchmen_Dr_Manhattan_1_1",
        "Before_Watchmen_Dr_Manhattan_1_2",
        "Before_Watchmen_Dr_Manhattan_1_3",
      ],
      art_by: "Adam Hughes",
      written_by: "J. Michael Straczynski",
      series: "Before Watchmen 2012",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "2012-08-22",
      page_count: 32,
      price: 2.5,
      avaible: true,
    },
    {
      title: "Amazing Spider-Man Vol 1 #698",
      slug: "Amazing-spider-man-vol-1-698",
      description: [
        "The end of Spider-Man's world begins when Doctor Octopus discovers who Peter Parker really is.",
      ],
      images: [
        "Amazing_Spider_Man_Vol_1_698_0",
        "Amazing_Spider_Man_Vol_1_698_1",
        "Amazing_Spider_Man_Vol_1_698_2",
        "Amazing_Spider_Man_Vol_1_698_3",
      ],
      art_by: "Paolo Rivera and Richard Elson",
      written_by: "Dan Slott",
      series: "The Amazing Spider-Man",
      publisher: "Marvel Comics",
      type: "Comic Book",

      on_sale_date: "2012-10-21",
      page_count: 32,
      price: 2.5,
      avaible: false,
    },
    {
      title: "Swamp Thing Vol 2 #38",
      slug: "swamp-thing-vol-2-38",
      description: [
        "In Rosewood, Illinois, a group of boys swim in a pond, despite their parents' warnings. Suddenly, the boys realize that the pond is infested with leeches, and they all rush out except Nicky, who has grown unnaturally pale. Just below the surface, vampiric creatures have drained him of all of his blood. The boys are too afraid to go back into the water for him, and they run away. The vampires return to their homes, deep under the water in old Rosewood, the sunken town.",
      ],
      images: [
        "Swamp_Thing_Vol_2_38_0",
        "Swamp_Thing_Vol_2_38_1",
        "Swamp_Thing_Vol_2_38_2",
        "Swamp_Thing_Vol_2_38_3",
      ],
      art_by: "John Totleben, Tatjana Wood and Stan Woch",
      written_by: "Alan Moore",
      series: "Swamp Thing",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "1985-06-30",
      page_count: 36,
      price: 2.5,
      avaible: true,
    },
    {
      title: "Batman: The Dark Knight Returns #1",
      slug: "batman-the-dark-knight-returns-1",
      description: [
        "This masterpiece of comics storytelling brings to life a dark world...and an even darker man. Frank Miller completely reinvents the legend of Batman in his saga of a near-future Gotham City gone to rot, ten years after the Dark Knight's retirement.",
        "NOTE: This series contains material suggested for mature readers.",
      ],
      images: [
        "Batman_The_Dark_Knight_Returns_1_0",
        "Batman_The_Dark_Knight_Returns_1_1",
        "Batman_The_Dark_Knight_Returns_1_2",
        "Batman_The_Dark_Knight_Returns_1_3",
      ],
      art_by: "Lynn Varley, Frank Miller, and John Costanza",
      written_by: "Frank Miller",
      series: "Batman: The Dark Knight Returns",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "1986-06-01",
      page_count: 52,
      price: 2.99,
      avaible: true,
    },
    {
      title: "Flashpoint #1",
      slug: "flashpoint-1",
      description: [
        "Not a dream, not an imaginary story, not an elseworld. This is Flash Fact: when Barry Allen wakes at his desk, he discovers the world has changed. Family is alive, loved ones are strangers, and close friends are different, gone, or worse. It's a world on the brink of a cataclysmic war--but where are Earth's Greatest Heroes to stop it? The DCU world-changing event FLASHPOINT begins here!",
      ],
      images: [
        "Flashpoint_1_0",
        "Flashpoint_1_1",
        "Flashpoint_1_2",
        "Flashpoint_1_3",
      ],
      art_by: "Patrick Martin, Andy Kubert, Ivan Reis and Sandra Hope",
      written_by: "Geoff Johns",
      series: "Flashpoint 2011",
      publisher: "DC Comics",
      type: "Comic Book",

      on_sale_date: "2011-04-11",
      page_count: 40,
      price: 3.99,
      avaible: true,
    },
    {
      title: "Marvel Knights Spider-Man #1",
      slug: "marvel-knights-spider-man-1",
      description: [
        "DOWN AMONG THE DEAD PART 1 Being Spider-Man has put an enormous strain on Peter Parker's personal life. To make matters worse, Spidey must throw down with his greatest foe, the Green Goblin!",
      ],
      images: [
        "Marvel_Knights_Spider_Man_1_0",
        "Marvel_Knights_Spider_Man_1_1",
        "Marvel_Knights_Spider_Man_1_2",
        "Marvel_Knights_Spider_Man_1_3",
      ],
      art_by: "Terry Dodson and Rachel Dodson",
      written_by: "Mark Millar",
      series: "Marvel Knights",
      publisher: "Marvel Comics",
      type: "Comic Book",

      on_sale_date: "2014-05-14",
      page_count: 23,
      price: 2.99,
      avaible: true,
    },
  ],
};
