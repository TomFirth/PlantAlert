export default sendDM = (client, userId, subject, message) => {
  const user = client.users.cache.get(userId);
  if (user) {
    user.send(`${subject}: ${message}`)
      .then(() => console.log('DM sent successfully'))
      .catch(console.error);
  } else {
    console.log('User not found');
  }
}