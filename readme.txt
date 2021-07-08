local service provider for development with simplesamlphp

The idea behind it:
- to actually work on our simplesamlphp based packages, we often need additional components that are leightweight and just stand in for the actual products we use.
- this is a local service provider (read: application that uses SAML to login)

This repo also contains configs to use with dev environment for idp

ADDED: Express-Session statefull session logic implementation By Sergiy Koyev.
- Added session_table.sql DB/Postgress file for the persistent session.
- Added into package.json - connect-pg-simple module to use as PG persistent store.
- app.js - added pg, pgSession, pgPool objects
- app.js - changed express-session to use statefull store as pgSession
- app.js - added cookies
- config/config.js - added database params for the connection.
