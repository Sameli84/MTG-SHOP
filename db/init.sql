CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
CREATE TABLE IF NOT EXISTS `otp` (
  `id` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `otp` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `set` varchar(60),
  `image` varchar(500),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'sol ring',
    '3ed',
    "https://cards.scryfall.io/small/front/e/c/eca9ae7b-a6d9-43ea-92d4-0110fd6643a7.jpg?1680759435"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'mox diamond',
    'sth',
    "https://cards.scryfall.io/small/front/b/f/bf9fecfd-d122-422f-bd0a-5bf69b434dfe.jpg?1562431287"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'black lotus',
    'lea',
    "https://cards.scryfall.io/small/front/4/a/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c.jpg?1559591808"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'sol ring',
    '3ed',
    "https://cards.scryfall.io/small/front/e/c/eca9ae7b-a6d9-43ea-92d4-0110fd6643a7.jpg?1680759435"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'mox diamond',
    'sth',
    "https://cards.scryfall.io/small/front/b/f/bf9fecfd-d122-422f-bd0a-5bf69b434dfe.jpg?1562431287"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'black lotus',
    'lea',
    "https://cards.scryfall.io/small/front/4/a/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c.jpg?1559591808"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'sol ring',
    '3ed',
    "https://cards.scryfall.io/small/front/e/c/eca9ae7b-a6d9-43ea-92d4-0110fd6643a7.jpg?1680759435"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'mox diamond',
    'sth',
    "https://cards.scryfall.io/small/front/b/f/bf9fecfd-d122-422f-bd0a-5bf69b434dfe.jpg?1562431287"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'black lotus',
    'lea',
    "https://cards.scryfall.io/small/front/4/a/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c.jpg?1559591808"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'sol ring',
    '3ed',
    "https://cards.scryfall.io/small/front/e/c/eca9ae7b-a6d9-43ea-92d4-0110fd6643a7.jpg?1680759435"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'mox diamond',
    'sth',
    "https://cards.scryfall.io/small/front/b/f/bf9fecfd-d122-422f-bd0a-5bf69b434dfe.jpg?1562431287"
  );
INSERT INTO `cards` (`name`, `set`, `image`)
VALUES (
    'black lotus',
    'lea',
    "https://cards.scryfall.io/small/front/4/a/4a2e428c-dd25-484c-bbc8-2d6ce10ef42c.jpg?1559591808"
  );