export const createAllTables = `
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  firstname VARCHAR(50) DEFAULT '',
  lastname VARCHAR(50) DEFAULT '',
  password VARCHAR DEFAULT ''
  );
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  total INT NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  modified TIMESTAMPTZ NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  image VARCHAR(50) DEFAULT '',
  description VARCHAR NOT NULL
  );
CREATE TABLE IF NOT EXISTS cart (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(50) DEFAULT '',
  qty INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(50) DEFAULT '',
  qty INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
`;
export const dropAllTables = `
DROP TABLE order_items;
DROP TABLE orders;
DROP TABLE cart;
DROP TABLE items;
DROP TABLE users;
`;

export const insertIntoAllTables = `
INSERT INTO users (email, password, firstname, lastname) VALUES ('test user', 'test password', 'test', 'user');
INSERT INTO items (name, price, image, description) VALUES ('12 Rules for Life: An Antidote to Chaos : Jordan Peterson', 1499, '12rules.jpg', 'What does everyone in the modern world need to know? Renowned psychologist Jordan B. Peterson^s answer to this most difficult of questions uniquely combines the hard-won truths of ancient tradition with the stunning revelations of cutting-edge scientific research.
Humorous, surprising and informative, Dr. Peterson tells us why skateboarding boys and girls must be left alone, what terrible fate awaits those who criticize too easily, and why you should always pet a cat when you meet one on the street.
What does the nervous system of the lowly lobster have to tell us about standing up straight (with our shoulders back) and about success in life? Why did ancient Egyptians worship the capacity to pay careful attention as the highest of gods? What dreadful paths do people tread when they become resentful, arrogant and vengeful?
Dr. Peterson journeys broadly, discussing discipline, freedom, adventure and responsibility, distilling the world^s wisdom into 12 practical and profound rules for life. 12 Rules for Life shatters the modern commonplaces of science, faith and human nature, while transforming and ennobling the mind and spirit of its readers."');
INSERT INTO items (name, price, image, description) VALUES ('Thus Spoke Zarathustra: A Book for Everyone and No One : Friedrich
Nietzsche', 1299, 'zarathustra.jpg', 'Friedrich Nietzsche^s most accessible and influential philosophical work, misquoted, misrepresented, brilliantly original and enormously influential
Nietzsche was one of the most revolutionary and subversive thinkers in Western philosophy, and Thus Spoke Zarathustra remains his most famous and influential work. It describes how the ancient Persian prophet Zarathustra descends from his solitude in the mountains to tell the world that God is dead and that the Superman, the human embodiment of divinity, is his successor. Nietzsche^s utterance ^God is dead^, his insistence that the meaning of life is to be found in purely human terms, and his doctrine of the Superman and the will to power were all later seized upon and unrecognisably twisted by, among others, Nazi intellectuals. With blazing intensity and poetic brilliance, Nietzsche argues that the meaning of existence is not to be found in religious pieties or meek submission to authority, but in an all-powerful life force: passionate, chaotic and free. 
For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.');
INSERT INTO items (name, price, image, description) VALUES ('The Red Book : Carl Gustav Jung', 19999, 'redbook.jpg', '"The years, of which I have spoken to you, when I pursued the inner images, were the most important time of my life. Everything else is to be derived from this. It began at that time, and the later details hardly matter anymore. My entire life consisted in elaborating what had burst forth from the unconscious and flooded me like an enigmatic stream and threatened to break me. That was the stuff and material for more than only one life. Everything later was merely the outer classification, the scientific elaboration, and the integration into life. But the numinous beginning, which contained everything, was then."');
INSERT INTO items (name, price, image, description) VALUES ('Meditations : Marcus Aurelius', 999, 'meditations.jpg', 'A leading translation of Stoic philosophy in wise and practical aphorisms that have inspired Bill Clinton, Ryan Holiday, Anna Kendrick and many more.
Written in Greek by an intellectual Roman emperor without any intention of publication, the Meditations of Marcus Aurelius  offer a wide range of fascinating spiritual reflections and exercises developed as the leader struggled to understand himself and make sense of the universe. Spanning from doubt and despair to conviction and exaltation, they cover such diverse topics as the question of virtue, human rationality, the nature of the gods and the values of leadership. But while the Meditations were composed to provide personal consolation, in developing his beliefs Marcus also created one of the greatest of all works of philosophy: a series of wise and practical aphorisms that have been consulted and admired by statesmen, thinkers and ordinary readers for almost two thousand years.
To provide a full understanding of Aurelius^s seminal work, this edition includes explanatory notes, a general index, an index of quotations, an index of names, and an introduction by Diskin Clay putting the work in its biographical, historical, and literary context, a chronology of Marcus Aurelius^s life and career.
For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.');
INSERT INTO items (name, price, image, description) VALUES ('To Kill a Mockingbird : Harper Lee', 799, 'mockingbird.jpg', 'The explosion of racial hate in an Alabama town is viewed by a little girl whose father defends a black man accused of rape.');
INSERT INTO items (name, price, image, description) VALUES ('The Stand : Stephen King', 1999, 'thestand.jpg', 'Stephen King^s apocalyptic vision of a world blasted by virus and tangled in an elemental struggle between good and evil remains as riveting and eerily plausible as when it was first published.
^THE STAND is a masterpiece^ (Guardian). Set in a virus-decimated US, King^s thrilling American fantasy epic, is a Classic. First come the days of the virus. Then come the dreams.
Dark dreams that warn of the coming of the dark man. The apostate of death, his worn-down boot heels tramping the night roads. The warlord of the charnel house and Prince of Evil. His time is at hand. His empire grows in the west and the Apocalypse looms.
When a man crashes his car into a petrol station, he brings with him the foul corpses of his wife and daughter. He dies and it doesn^t take long for the virus which killed him to spread across America and the world.');
INSERT INTO items (name, price, image, description) VALUES ('Gardens of the Moon : Steven Erikson', 899, 'gotm.jpg', 'Bled dry by interminable warfare, infighting and bloody confrontations with Lord Anomander Rake and his Tiste Andii, the vast, sprawling Malazan empire simmers with discontent.
Even its imperial legions yearn for some respite. For Sergeant Whiskeyjack and his Bridgeburners and for Tattersail, sole surviving sorceress of the Second Legion, the aftermath of the siege of Pale should have been a time to mourn the dead. But Darujhistan, last of the Free Cities of Genabackis, still holds out - and Empress Lasseen^s ambition knows no bounds.
However, it seems the empire is not alone in this great game. Sinister forces gather as the gods themselves prepare to play their hand...
Conceived and written on an epic scale, Gardens of the Moon is a breathtaking achievement - a novel in which grand design, a dark and complex mythology, wild and wayward magic and a host of enduring characters combine with thrilling, powerful storytelling to resounding effect. Acclaimed by writers, critics and readers alike, here is the opening chapter in what has been hailed a landmark of epic fantasy: the awesome ^The Malazan Book of the Fallen^.');`;
