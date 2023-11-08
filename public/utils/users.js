function formatMessage(data, user, room, id,time) {

  return {
    data,
    user,
    room,
    id,
    time,
  };
}

module.exports = { formatMessage };
