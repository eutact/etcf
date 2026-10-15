/* Original English content. Keep IDs stable when editing or translating. See KIDS-CORNER.md. */
(function (root, factory) {
    const content = factory();
    if (typeof module === 'object' && module.exports) module.exports = content;
    else root.ETCFKidsContent = content;
}(typeof window !== 'undefined' ? window : this, function () {
    const q = (id, prompt, answers, correctAnswerId, hint, explanation, reference) => ({
        id, prompt, answers: answers.map(([id, text]) => ({ id, text })), correctAnswerId, hint, explanation, reference,
    });
    const missions = {
        creation: { talk: 'Which gift in God’s creation makes you smile?', prayer: 'Loving God, thank you for our beautiful world. Help us care for it and for each other. Amen.', action: 'Together, notice three good things in nature. Care for a plant or leave an outdoor space tidy.' },
        birth: { talk: 'How can our family make someone feel welcome?', prayer: 'Jesus, you came to live among us. Fill our home with your peace and love. Amen.', action: 'Make a cosy welcome for someone at home: offer a seat, a smile, or your help.' },
        sheep: { talk: 'What helps you feel cared for when you feel alone?', prayer: 'Jesus, our good shepherd, thank you for loving each of us. Help us notice anyone who feels left out. Amen.', action: 'With your caregiver, check in on someone in your family and spend a little time together.' },
        samaritan: { talk: 'How could we help someone who feels left out?', prayer: 'Jesus, help our family notice people who need kindness. Amen.', action: 'With your caregiver, welcome someone you have not spoken to before, or include someone in a game.' },
        feeding: { talk: 'What is one small thing we can share?', prayer: 'Jesus, thank you for our food and for the people who care for us. Teach us to share with grateful hearts. Amen.', action: 'At your next family meal, help set the table and offer to share something you already have.' },
        characters: { talk: 'How can we use the things we have to care for others?', prayer: 'God, thank you for people who listen to you. Help us listen and be helpful today. Amen.', action: 'Choose a small job you can do with your caregiver, such as putting toys away or watering a plant.' },
        symbols: { talk: 'Which of these things have you noticed at church?', prayer: 'Jesus, help us listen to your word and grow in your love. Amen.', action: 'With a grown-up, find a Bible or a cross at home or church. Pause together for a quiet thank-you prayer.' },
    };
    const quiz = [
        {
            id: 'creation', title: 'Creation', icon: '🌿', reference: 'Genesis 1:1–2:3',
            intro: 'God makes a world full of light and life. Plants, animals, and people belong to this good creation. God makes people in his image and blesses the seventh day as a day of rest.',
            adult: 'Read the passage as a celebration of God’s good creation and every person’s dignity. Invite wonder and care for the world.', mission: missions.creation,
            questions: [
                q('creation-light', 'What does God call into being at the start of the first day?', [['light', 'Light'], ['boats', 'Boats'], ['houses', 'Houses']], 'light', 'It helps us see when it is dark.', 'God creates light and separates it from darkness.', 'Genesis 1:3–5'),
                q('creation-plants', 'What grows on the land on the third day?', [['plants', 'Plants and fruit trees'], ['lamps', 'Street lamps'], ['tents', 'Tents']], 'plants', 'Think of things with roots and leaves.', 'The land brings forth plants and trees that bear fruit.', 'Genesis 1:11–13'),
                q('creation-stars', 'Which of these belongs with the lights in the sky?', [['stars', 'Stars'], ['stones', 'Stones'], ['shells', 'Shells']], 'stars', 'Look up on a clear night.', 'The creation story includes the sun, moon, and stars among the lights in the sky.', 'Genesis 1:14–19'),
                q('creation-image', 'In whose image does God make people?', [['god', 'God’s image'], ['mountain', 'A mountain’s image'], ['tree', 'A tree’s image']], 'god', 'Every person has a special dignity from our Creator.', 'God makes human beings in his image. Each person matters.', 'Genesis 1:26–27'),
                q('creation-good', 'How does God see everything he has made?', [['good', 'As very good'], ['unfinished', 'As a forgotten job'], ['unwanted', 'As something unwanted']], 'good', 'Creation is a gift to treasure.', 'God looks at the whole creation and sees that it is very good.', 'Genesis 1:31'),
                q('creation-rest', 'What does God do on the seventh day?', [['rest', 'Rests and blesses the day'], ['boat', 'Builds a boat'], ['race', 'Starts a race']], 'rest', 'It is a day set apart after the work of creation.', 'God rests from the work of creation and blesses the seventh day.', 'Genesis 2:1–3'),
            ],
        },
        {
            id: 'birth', title: 'The Birth of Jesus', icon: '⭐', reference: 'Luke 2:1–20',
            intro: 'Mary and Joseph travel to Bethlehem. Jesus is born, and Mary lays him in a manger. An angel brings good news to shepherds. They visit Jesus and return praising God.',
            adult: 'This activity follows Luke’s account with the shepherds. The visitors called Magi belong to Matthew’s account and are not included here.', mission: missions.birth,
            questions: [
                q('birth-town', 'In which town is Jesus born?', [['bethlehem', 'Bethlehem'], ['jericho', 'Jericho'], ['rome', 'Rome']], 'bethlehem', 'Joseph travels to the town linked with King David.', 'Luke places Jesus’ birth in Bethlehem, where Mary and Joseph have travelled.', 'Luke 2:4–7'),
                q('birth-mary', 'Who is Jesus’ mother?', [['mary', 'Mary'], ['martha', 'Martha'], ['elizabeth', 'Elizabeth']], 'mary', 'She travels to Bethlehem with Joseph.', 'Mary gives birth to Jesus and cares for him.', 'Luke 2:5–7'),
                q('birth-manger', 'Where does Mary lay baby Jesus?', [['manger', 'In a manger'], ['boat', 'In a boat'], ['basket', 'In a picnic basket']], 'manger', 'It is a place where animals are fed.', 'Mary wraps Jesus and lays him in a manger, an animal feeding place.', 'Luke 2:7'),
                q('birth-message', 'Who brings the shepherds good news about Jesus?', [['angel', 'An angel'], ['merchant', 'A merchant'], ['sailor', 'A sailor']], 'angel', 'This messenger comes from God.', 'An angel tells the shepherds that the Saviour has been born.', 'Luke 2:9–11'),
                q('birth-visitors', 'Who goes to visit Jesus after hearing the angel?', [['shepherds', 'The shepherds'], ['soldiers', 'A group of soldiers'], ['builders', 'A team of builders']], 'shepherds', 'They have been watching their flock.', 'The shepherds hurry to Bethlehem and find Mary, Joseph, and Jesus.', 'Luke 2:15–16'),
                q('birth-praise', 'What do the shepherds do as they return?', [['praise', 'Praise and thank God'], ['hide', 'Hide the good news'], ['forget', 'Forget what they saw']], 'praise', 'Their hearts are full of joy.', 'The shepherds return giving glory and praise to God for what they have heard and seen.', 'Luke 2:20'),
            ],
        },
        {
            id: 'lost-sheep', title: 'The Lost Sheep', icon: '🐑', reference: 'Luke 15:1–7',
            intro: 'Jesus tells a story about a shepherd with a hundred sheep. When one is lost, the shepherd searches for it. Finding the sheep brings great joy. Jesus helps us understand God’s loving welcome.',
            adult: 'Jesus tells this parable while welcoming sinners. Explain turning back to God as accepting love and beginning again, without labelling a child as bad.', mission: missions.sheep,
            questions: [
                q('sheep-flock', 'How many sheep does the shepherd have at the start?', [['hundred', 'One hundred'], ['two', 'Two'], ['ten', 'Ten']], 'hundred', 'It is ten groups of ten.', 'Jesus begins the story with a flock of one hundred sheep.', 'Luke 15:4'),
                q('sheep-lost', 'How many sheep are lost?', [['one', 'One'], ['all', 'All one hundred'], ['fifty', 'Fifty']], 'one', 'Even a single sheep matters to the shepherd.', 'The shepherd notices that one sheep is missing.', 'Luke 15:4'),
                q('sheep-search', 'What does the shepherd do about the missing sheep?', [['search', 'Goes to look for it'], ['forget', 'Forgets about it'], ['sleep', 'Stops to take a nap']], 'search', 'The shepherd wants to find the sheep.', 'The shepherd searches until the lost sheep is found.', 'Luke 15:4'),
                q('sheep-carry', 'Where does the shepherd carry the sheep?', [['shoulders', 'On his shoulders'], ['cart', 'In a cart'], ['boat', 'In a boat']], 'shoulders', 'The shepherd carries it close, above his arms.', 'The joyful shepherd puts the sheep on his shoulders.', 'Luke 15:5'),
                q('sheep-joy', 'What does the shepherd invite friends and neighbours to do?', [['rejoice', 'Celebrate with him'], ['race', 'Run a race'], ['build', 'Build a tower']], 'rejoice', 'Something precious has been found.', 'The shepherd shares the happiness of finding the sheep with others.', 'Luke 15:6'),
                q('sheep-heaven', 'What does Jesus say brings joy in heaven?', [['return', 'Someone turning back to God'], ['toys', 'Owning many toys'], ['winning', 'Winning every game']], 'return', 'God welcomes people who begin again with him.', 'Jesus speaks of joy when someone repents, or turns back to God.', 'Luke 15:7'),
            ],
        },
        {
            id: 'good-samaritan', title: 'The Good Samaritan', icon: '💛', reference: 'Luke 10:25–37',
            intro: 'A traveller is hurt on the road. Some people pass by, but a Samaritan stops to care for him. He takes the traveller to an inn and pays for more care. Jesus teaches us to show mercy.',
            adult: 'Keep the focus on compassion across differences. Do not act out the attack or suggest that children approach an unsafe situation without a trusted adult.', mission: missions.samaritan,
            questions: [
                q('samaritan-road', 'Where is the traveller going from Jerusalem?', [['jericho', 'Jericho'], ['bethlehem', 'Bethlehem'], ['nazareth', 'Nazareth']], 'jericho', 'The story names a road between Jerusalem and this town.', 'Jesus describes a traveller going down from Jerusalem to Jericho.', 'Luke 10:30'),
                q('samaritan-helper', 'Who stops to help the hurt traveller?', [['samaritan', 'A Samaritan'], ['priest', 'The priest who passes by'], ['levite', 'The Levite who passes by']], 'samaritan', 'The story is named after this caring helper.', 'The Samaritan notices the traveller and is moved with compassion.', 'Luke 10:31–33'),
                q('samaritan-care', 'What does the Samaritan do first to care for the traveller?', [['wounds', 'Cares for his wounds'], ['race', 'Asks him to race'], ['leave', 'Leaves him alone']], 'wounds', 'The traveller needs gentle help because he is hurt.', 'The Samaritan comes close and bandages the traveller’s wounds.', 'Luke 10:34'),
                q('samaritan-inn', 'Where does the Samaritan take the traveller for care?', [['inn', 'An inn'], ['market', 'A market stall'], ['field', 'An empty field']], 'inn', 'It is a place where travellers can stay.', 'The Samaritan brings the traveller to an inn and looks after him.', 'Luke 10:34'),
                q('samaritan-pay', 'Who gives the innkeeper money for the traveller’s care?', [['helper', 'The Samaritan'], ['traveller', 'The hurt traveller'], ['passerby', 'A person who passed by']], 'helper', 'The same person who stopped keeps helping.', 'The Samaritan pays the innkeeper and promises to cover further care.', 'Luke 10:35'),
                q('samaritan-mercy', 'What does Jesus ask us to learn from the helper?', [['mercy', 'Show mercy to others'], ['ignore', 'Ignore people in need'], ['fame', 'Help only to become famous']], 'mercy', 'Love becomes real when we care for someone.', 'Jesus asks his listener to act with mercy, as the caring neighbour did.', 'Luke 10:36–37'),
            ],
        },
        {
            id: 'five-thousand', title: 'Jesus Feeds the Five Thousand', icon: '🧺', reference: 'John 6:1–15',
            intro: 'A large crowd gathers near Jesus. A boy has five barley loaves and two fish. Jesus has the people sit down, gives thanks, and shares the food. Everyone has enough, with food left over.',
            adult: 'This activity follows John’s account, including the boy and barley loaves. Wonder, gratitude, and sharing are family reflections; the account describes a sign Jesus performs.', mission: missions.feeding,
            questions: [
                q('feeding-boy', 'Who has the loaves and fish in John’s story?', [['boy', 'A boy'], ['king', 'A king'], ['innkeeper', 'An innkeeper']], 'boy', 'Andrew notices this young person in the crowd.', 'Andrew points out a boy with barley loaves and fish.', 'John 6:8–9'),
                q('feeding-loaves', 'How many barley loaves does the boy have?', [['five', 'Five'], ['two', 'Two'], ['twelve', 'Twelve']], 'five', 'You can count them on the fingers of one hand.', 'The boy has five barley loaves.', 'John 6:9'),
                q('feeding-fish', 'How many fish does the boy have?', [['two', 'Two'], ['five', 'Five'], ['ten', 'Ten']], 'two', 'It is the number of your hands.', 'John says the boy has two fish along with the loaves.', 'John 6:9'),
                q('feeding-sit', 'What does Jesus ask the people to do before the meal?', [['sit', 'Sit down'], ['run', 'Run away'], ['line', 'Climb a tree']], 'sit', 'There is plenty of grass in that place.', 'Jesus asks that the people sit down before the food is shared.', 'John 6:10'),
                q('feeding-thanks', 'What does Jesus do before sharing the food?', [['thanks', 'Gives thanks'], ['hide', 'Hides the food'], ['sell', 'Sells the food']], 'thanks', 'Our family can do this before a meal too.', 'Jesus gives thanks and distributes the food to the people.', 'John 6:11'),
                q('feeding-baskets', 'How many baskets are filled with leftover pieces?', [['twelve', 'Twelve'], ['one', 'One'], ['three', 'Three']], 'twelve', 'It is also the number of months in a year.', 'After everyone has eaten, the remaining pieces fill twelve baskets.', 'John 6:12–13'),
            ],
        },
    ];
    const pair = (id, left, right, icon, fact, reference) => ({ id, left, right, icon, fact, reference });
    const matching = [
        { id: 'characters', title: 'People & Their Stories', icon: '⛵', reference: 'Genesis 6:14–22; Exodus 14:15–22; Luke 5:1–11; John 6:1–15', intro: 'Turn over two cards. Find a Bible person and the object connected with their story. Take turns and help each other remember.', mission: missions.characters, pairs: [
            pair('noah-ark', 'Noah', 'An ark', '⛵', 'Noah builds an ark as God directs and brings living creatures into it.', 'Genesis 6:14–22'),
            pair('moses-staff', 'Moses', 'A staff', '🌊', 'God tells Moses to lift his staff and stretch his hand over the sea.', 'Exodus 14:15–22'),
            pair('peter-net', 'Simon Peter', 'A fishing net', '🐟', 'Simon Peter is a fisherman. After a great catch, he follows Jesus.', 'Luke 5:1–11'),
            pair('boy-loaves', 'The boy near Jesus', 'Five barley loaves', '🍞', 'A boy has five barley loaves and two fish in the feeding of the crowd.', 'John 6:8–13'),
        ] },
        { id: 'nativity', title: 'Meet the Nativity', icon: '⭐', reference: 'Luke 2:1–20', intro: 'Discover the people and messengers in Luke’s account of Jesus’ birth. Match a name with its description.', mission: missions.birth, pairs: [
            pair('mary-mother', 'Mary', 'Jesus’ mother', '💙', 'Mary gives birth to Jesus and lays him in a manger.', 'Luke 2:6–7'),
            pair('joseph-bethlehem', 'Joseph', 'Travels with Mary to Bethlehem', '🏠', 'Joseph travels from Nazareth to Bethlehem with Mary.', 'Luke 2:4–5'),
            pair('shepherds-flock', 'The shepherds', 'Watch their flock at night', '🐑', 'Shepherds hear the good news while watching their sheep.', 'Luke 2:8–11'),
            pair('angel-news', 'The angel', 'Announces the Saviour’s birth', '⭐', 'An angel tells the shepherds the joyful news about Jesus.', 'Luke 2:9–11'),
        ] },
        { id: 'church', title: 'Discover Our Church', icon: '🕯️', reference: 'Catechism of the Catholic Church 1154, 1185, 1235, 1243', intro: 'Match things we see at church with what they help us remember. Say the words together as you discover a pair.', mission: missions.symbols, pairs: [
            pair('bible-word', 'The Bible', 'Scripture we hear at Mass', '📖', 'At Mass, we listen to readings from Scripture, including the Gospel.', 'CCC 1154'),
            pair('cross-love', 'A cross', 'A sign of Jesus’ saving love', '✝️', 'The cross reminds us that Jesus gives himself for us in love.', 'CCC 1235'),
            pair('font-water', 'A baptismal font', 'A place for the water of Baptism', '💧', 'The baptismal font is used in the celebration of Baptism.', 'CCC 1185'),
            pair('candle-light', 'A baptismal candle', 'A sign of Christ’s light', '🕯️', 'A candle lit from the Easter candle reminds us of the light of Christ.', 'CCC 1243'),
        ] },
    ];
    const scene = (id, caption, icon) => ({ id, caption, icon });
    const ordering = [
        { id: 'birth', title: 'The Birth of Jesus', icon: '⭐', reference: 'Luke 2:1–20', intro: 'Put Luke’s story of Jesus’ birth in order. Move a card earlier or later, then retell the story together.', hint: 'Begin with Mary and Joseph travelling. The shepherds hear the news before they visit Jesus.', mission: missions.birth, scenes: [
            scene('birth-travel', 'Mary and Joseph travel to Bethlehem.', '🏘️'),
            scene('birth-born', 'Jesus is born, and Mary lays him in a manger.', '👶'),
            scene('birth-angel', 'An angel tells the shepherds the joyful news.', '⭐'),
            scene('birth-visit', 'The shepherds visit Mary, Joseph, and Jesus.', '🐑'),
            scene('birth-return', 'The shepherds return, praising God.', '🎵'),
        ] },
        { id: 'good-samaritan', title: 'The Good Samaritan', icon: '💛', reference: 'Luke 10:25–37', intro: 'Follow a story of kindness. Put the scenes in order, using the earlier and later buttons.', hint: 'Start with the traveller needing help. The Samaritan cares for him before taking him to the inn.', mission: missions.samaritan, scenes: [
            scene('samaritan-hurt', 'A traveller is hurt beside the road.', '🛤️'),
            scene('samaritan-pass', 'Two people pass without stopping to help.', '👣'),
            scene('samaritan-stop', 'A Samaritan stops and cares for his wounds.', '💛'),
            scene('samaritan-stay', 'The Samaritan brings the traveller to an inn.', '🏠'),
            scene('samaritan-pay', 'He pays the innkeeper to keep caring for the traveller.', '🤲'),
        ] },
        { id: 'five-thousand', title: 'Jesus Feeds the Five Thousand', icon: '🧺', reference: 'John 6:1–15', intro: 'Build the story of a meal shared with a crowd. Move the scenes until you are ready to tell it together.', hint: 'The crowd gathers first. The boy’s food is noticed before Jesus has the people sit down and gives thanks.', mission: missions.feeding, scenes: [
            scene('feeding-crowd', 'A large crowd gathers near Jesus.', '👥'),
            scene('feeding-boy', 'A boy has five barley loaves and two fish.', '🍞'),
            scene('feeding-seated', 'Jesus asks the people to sit down.', '🌿'),
            scene('feeding-share', 'Jesus gives thanks and shares the food.', '🤲'),
            scene('feeding-remains', 'Everyone has enough, and twelve baskets are filled with leftovers.', '🧺'),
        ] },
    ];
    return {
        quiz, matching, ordering,
        activities: [
            { id: 'quiz', title: 'Bible Quiz Together', description: 'Wonder, learn, and discover five Bible stories, one question at a time.', ages: 'Ages 5–10 with a grown-up', duration: 'About 5–8 minutes', art: 'quiz', choose: 'Choose a Bible story', units: quiz },
            { id: 'match', title: 'Match & Discover', description: 'Turn over cards, find connected pairs, and discover something new together.', ages: 'Ages 5–10 with a grown-up', duration: 'About 3–5 minutes', art: 'match', choose: 'Choose a discovery set', units: matching },
            { id: 'order', title: 'Put the Story in Order', description: 'Move the scenes, build a Bible story, and tell it in your own words.', ages: 'Ages 5–10 with a grown-up', duration: 'About 5–8 minutes', art: 'order', choose: 'Choose a story to retell', units: ordering },
        ],
        ui: {
            homeTitle: 'A little time together. A little faith that grows.', homeIntro: 'Choose an activity, take turns, and enjoy discovering together. No timer. No rush.',
            play: 'Play Together', begin: 'Let’s begin', back: 'Back to activities', chooseAnother: 'Choose another', replay: 'Play again', restart: 'Start this round again',
            question: 'Question {current} of {total}', hint: 'Give us a hint', hintPrefix: 'A little hint: ', correct: 'That’s it! ', retry: 'Let’s think together. Try another answer. ',
            next: 'Next question', finish: 'Finish together', quizDone: 'You explored five questions together. Thank you for trying, thinking, and learning!',
            matchPrompt: 'Turn over two cards to find a connected pair. Take turns together.', matchCount: '{count} of {total} pairs discovered',
            cardDown: 'Card {number}, face down', cardUp: '{label}, face up', cardMatched: '{label}, matched', discover: 'Discover', matched: 'Matched',
            firstCard: 'Now choose another card.', mismatch: 'These belong to different pairs. Take a look together, then try again.', matchFound: 'A pair discovered! ',
            discoveries: 'What we discovered', matchDone: 'All four pairs discovered! Read the facts together, then take your mission into the day.',
            orderPrompt: 'Use the buttons to move each scene. You can do the whole activity without dragging.', earlier: 'Move earlier', later: 'Move later',
            moveLabel: '{action}: {caption}', scenePosition: 'Scene {position} of {total}', moved: 'Moved to scene {position} of {total}.',
            check: 'Check Our Story', orderRetry: 'You’re building the story! Look at the hint and try moving a scene. Your arrangement is still here.',
            retell: 'You put the story together! Now take turns telling it in your own words.', completeTitle: 'Wonderful exploring, family!',
            missionTitle: 'Your Family Faith Mission', talk: 'Talk together', pray: 'Pray together', action: 'Try this little mission',
            grownups: 'A little help for grown-ups', progress: 'Progress on this device', progressCount: '{count} of {total} activities completed',
            progressNote: 'Only completed activities are saved in this browser. No names or answers are collected.', reset: 'Reset progress', resetDone: 'Progress on this device has been reset.',
            completed: 'Completed on this device', saveFailed: 'You can still play. This browser could not save your progress.', saved: 'This activity is saved as completed on this device.',
        },
    };
}));
