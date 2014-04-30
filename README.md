GladosControls_Serveur
======================

Attention il faut des crt pour pouvoir utilisé le plugin sur des sites comme google musique sinon impossible de chargé le plugin.

options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};
