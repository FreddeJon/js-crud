const casual = require("casual").sv_SE;
casual.define("player", function () {
  return {
    id: casual.uuid,
    namn: casual.full_name,
    age: casual.integer((from = 17), (to = 49)),
    jersey: casual.integer((from = 1), (to = 99)),
    born: casual.city,
  };
});

module.exports = () => {
  const data = { players: [] };
  for (let i = 0; i < 10; i++) {
    const player = casual.player;
    data.players.push(player);
  }
  return data;
};
