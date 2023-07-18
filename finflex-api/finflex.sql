\echo 'Delete and recreate finflex  db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE finflex;
CREATE DATABASE finflex;
\connect finflex;

\i finflex-schema.sql