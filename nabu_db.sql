--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: nabu; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE nabu WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect nabu

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: api_auth; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE api_auth (
    id integer,
    api_path text,
    api_token text
);


--
-- Name: api_details; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE api_details (
    id integer NOT NULL,
    api_name text,
    api_desc text,
    api_owner text,
    insert_datetime timestamp with time zone
);


--
-- Name: api_details_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE api_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: api_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE api_details_id_seq OWNED BY api_details.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY api_details ALTER COLUMN id SET DEFAULT nextval('api_details_id_seq'::regclass);


--
-- Name: api_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY api_details
    ADD CONSTRAINT api_details_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

